import { forwardRef, useRef } from 'react'
import { X } from 'lucide-react'
import { Revealed } from '@/components/industries/SectorParts'
import { contactDetails } from '@/data/content'
import { legalLastUpdated, privacyIntro, privacySections, type LegalSection } from '@/data/legal'
import './LegalPage.css'

function LegalContact() {
  return <ul className="legal-contact">
    {contactDetails.map(({ label, lines, href, external, icon: Icon }) =>
      <li key={label}>
        <Icon aria-hidden="true" />
        <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{lines.join(' ')}</a>
      </li>
    )}
  </ul>
}

function LegalBody({ section }: { section: LegalSection }) {
  return <>
    {section.blocks.map((block, index) => Array.isArray(block)
      ? <ul key={index}>{block.map((item) => <li key={item}>{item}</li>)}</ul>
      : <p key={index}>{block}</p>
    )}
    {section.showContact && <LegalContact />}
  </>
}

const scrollBehaviour = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

interface LegalPageProps {
  title: string
  intro: string
  sections: LegalSection[]
}

export function LegalPage({ title, intro, sections }: LegalPageProps) {
  const sectionRefs = useRef(new Map<string, HTMLElement>())

  return <div className="page-view">
    <div className="sector-page legal-page">
      <Revealed as="header" className="sector-intro legal-intro">
        <span className="sector-intro__bar" />
        <div>
          <h1><span>{title}</span></h1>
          <p>{intro}</p>
          <p className="legal-updated">Last updated: {legalLastUpdated}</p>
        </div>
      </Revealed>

      <div className="legal-layout">
        <nav className="legal-contents" aria-label={`${title} contents`}>
          <h2>On this page</h2>
          <ol>
            {sections.map(({ id, heading }) =>
              <li key={id}>
                <button type="button" onClick={() => sectionRefs.current.get(id)?.scrollIntoView({ behavior: scrollBehaviour(), block: 'start' })}>{heading}</button>
              </li>
            )}
          </ol>
        </nav>
        <div className="legal-sections">
          {sections.map((section, index) =>
            <section key={section.id} ref={(element) => { if (element) sectionRefs.current.set(section.id, element); else sectionRefs.current.delete(section.id) }} className="legal-section">
              <Revealed className="legal-section__inner">
                <h2><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{section.heading}</h2>
                <LegalBody section={section} />
              </Revealed>
            </section>
          )}
        </div>
      </div>
    </div>
  </div>
}

// Opens over the contact form, because this site has no separate page addresses and
// leaving the page would throw away everything the visitor has typed.
export const PrivacyDialog = forwardRef<HTMLDialogElement>(function PrivacyDialog(_props, ref) {
  const close = (dialog: HTMLDialogElement | null) => dialog?.close()

  return <dialog
    ref={ref}
    className="legal-dialog"
    aria-labelledby="legal-dialog-title"
    onClick={(event) => { if (event.target === event.currentTarget) close(event.currentTarget) }}
  >
    <div className="legal-dialog__panel">
      <header className="legal-dialog__head">
        <div>
          <h2 id="legal-dialog-title">Privacy Policy</h2>
          <p className="legal-updated">Last updated: {legalLastUpdated}</p>
        </div>
        <button type="button" aria-label="Close Privacy Policy" onClick={(event) => close(event.currentTarget.closest('dialog'))}><X aria-hidden="true" /></button>
      </header>
      <div className="legal-dialog__body" tabIndex={0}>
        <p>{privacyIntro}</p>
        {privacySections.map((section) =>
          <section key={section.id} className="legal-section__inner">
            <h3>{section.heading}</h3>
            <LegalBody section={section} />
          </section>
        )}
      </div>
    </div>
  </dialog>
})
