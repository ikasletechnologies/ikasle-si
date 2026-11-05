import { useEffect, useId, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { PrivacyDialog } from '@/components/legal/LegalPage'
import { contactServices } from '@/data/content'
import { emptyEnquiry, enquiryFieldOrder, validateEnquiry, type Enquiry, type EnquiryErrors, type EnquiryField } from './enquiry'

const DETAILS_MAX_LENGTH = 1500
type SubmitStatus = { kind: 'success' | 'error'; message: string } | null

interface FieldProps {
  id: string
  label: string
  error?: string
  order: number
  wide?: boolean
  children: ReactNode
}

function Field({ id, label, error, order, wide = false, children }: FieldProps) {
  return <div className={`contact-field${wide ? ' contact-field--wide' : ''}${error ? ' has-error' : ''}`} style={{ '--f': order } as CSSProperties}>
    <label htmlFor={id}>{label} <span className="contact-required" aria-hidden="true">*</span></label>
    {children}
    {error && <p id={`${id}-error`} className="contact-field__error">{error}</p>}
  </div>
}

export function ContactForm() {
  const baseId = useId()
  const [values, setValues] = useState<Enquiry>(emptyEnquiry)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<SubmitStatus>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const privacyRef = useRef<HTMLDialogElement>(null)
  const fieldId = (field: EnquiryField) => `${baseId}-${field}`

  useEffect(() => {
    if (status) statusRef.current?.scrollIntoView({ block: 'nearest' })
  }, [status])

  const update = (changes: Partial<Enquiry>) => {
    const next = { ...values, ...changes }
    setValues(next)
    setStatus(null)
    if (attempted) setErrors(validateEnquiry(next))
  }

  const controlProps = (field: 'name' | 'company' | 'email' | 'phone' | 'service' | 'details') => ({
    id: fieldId(field),
    value: values[field],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => update({ [field]: event.target.value }),
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${fieldId(field)}-error` : undefined,
  })

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const found = validateEnquiry(values)
    setAttempted(true)
    setErrors(found)
    const firstProblem = enquiryFieldOrder.find((field) => found[field])
    if (firstProblem) {
      setStatus(null)
      document.getElementById(fieldId(firstProblem))?.focus()
      return
    }

    setSending(true)
    setStatus(null)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const result = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null
      // Many web hosts answer an unknown address with an ordinary page and status 200,
      // so only the server's own confirmation counts as sent.
      if (!response.ok || !result?.ok) throw new Error(result?.error || 'We could not send your enquiry. Please try again.')
      setValues(emptyEnquiry)
      setErrors({})
      setAttempted(false)
      setStatus({ kind: 'success', message: 'Thank you. Your enquiry was sent successfully.' })
    } catch (error) {
      setStatus({ kind: 'error', message: error instanceof Error ? error.message : 'We could not send your enquiry. Please try again.' })
    } finally {
      setSending(false)
    }
  }
  return <form className="contact-form" onSubmit={submit} noValidate>
    <p className="contact-required-note"><span aria-hidden="true">*</span> All fields are mandatory</p>
    <div className="contact-form__grid">
      <Field id={fieldId('name')} label="Full Name" error={errors.name} order={0}>
        <input {...controlProps('name')} type="text" autoComplete="name" maxLength={60} required />
      </Field>
      <Field id={fieldId('company')} label="Company Name" error={errors.company} order={1}>
        <input {...controlProps('company')} type="text" autoComplete="organization" maxLength={100} required />
      </Field>
      <Field id={fieldId('email')} label="Email Address" error={errors.email} order={2}>
        <input {...controlProps('email')} type="email" autoComplete="email" maxLength={254} required />
      </Field>
      <Field id={fieldId('phone')} label="Phone Number" error={errors.phone} order={3}>
        <input {...controlProps('phone')} type="tel" autoComplete="tel" inputMode="tel" maxLength={25} required />
      </Field>
      <Field id={fieldId('service')} label="Interested In" error={errors.service} order={4} wide>
        <div className="contact-select">
          <select {...controlProps('service')} className={values.service ? '' : 'is-empty'} required>
            <option value="">Select a service</option>
            {contactServices.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
          <ChevronDown aria-hidden="true" />
        </div>
        <div className="contact-services" role="group" aria-label="Quick pick a service">
          {contactServices.map((service) =>
            <button key={service} type="button" aria-pressed={values.service === service} onClick={() => update({ service: values.service === service ? '' : service })}>{service}</button>
          )}
        </div>
      </Field>
      <Field id={fieldId('details')} label="Project Details" error={errors.details} order={5} wide>
        <textarea {...controlProps('details')} rows={3} minLength={10} maxLength={DETAILS_MAX_LENGTH} placeholder="What would you like to improve or build?" required />
      </Field>
    </div>

    <div className={`contact-consent-wrap${errors.agreed ? ' has-error' : ''}`} style={{ '--f': 6 } as CSSProperties}>
      <label className="contact-consent">
        <input
          id={fieldId('agreed')}
          type="checkbox"
          checked={values.agreed}
          onChange={(event) => update({ agreed: event.target.checked })}
          aria-invalid={errors.agreed ? true : undefined}
          aria-describedby={errors.agreed ? `${fieldId('agreed')}-error` : undefined}
        />
        <span className="contact-consent__box" aria-hidden="true">
          <svg viewBox="0 0 16 16"><path pathLength={1} d="M3.2 8.4l3.2 3.2 6.4-7" /></svg>
        </span>
        <span>
          I agree to the <button type="button" className="contact-consent__policy" onClick={(event) => { event.preventDefault(); privacyRef.current?.showModal() }}>Privacy Policy</button>.
        </span>
      </label>
      {errors.agreed && <p id={`${fieldId('agreed')}-error`} className="contact-field__error">{errors.agreed}</p>}
    </div>

    <button type="submit" className="contact-submit" style={{ '--f': 7 } as CSSProperties} disabled={sending}>
      <span>{sending ? 'Sending…' : 'Send Enquiry'}</span><ChevronRight aria-hidden="true" />
    </button>

    <div ref={statusRef} className="contact-status-wrap" role="status">
      {status && <p className={`contact-status contact-status--${status.kind}`}>
        {status.message}
      </p>}
    </div>
    <PrivacyDialog ref={privacyRef} />
  </form>
}
