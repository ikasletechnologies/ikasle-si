export interface Enquiry {
  name: string
  company: string
  email: string
  phone: string
  service: string
  details: string
  agreed: boolean
}

export type EnquiryField = keyof Enquiry
export type EnquiryErrors = Partial<Record<EnquiryField, string>>

export const emptyEnquiry: Enquiry = { name: '', company: '', email: '', phone: '', service: '', details: '', agreed: false }

// Top-to-bottom order on the page, so the first problem found is the first one the visitor reaches.
export const enquiryFieldOrder: EnquiryField[] = ['name', 'company', 'email', 'phone', 'service', 'details', 'agreed']

export function validateEnquiry(enquiry: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  const name = enquiry.name.trim()
  const company = enquiry.company.trim()
  const email = enquiry.email.trim()
  const phone = enquiry.phone.trim()
  const phoneDigits = phone.replace(/\D/g, '')
  const details = enquiry.details.trim()

  if (!name) errors.name = 'Please enter your full name.'
  else if (name.length < 2 || name.length > 60 || !/^[\p{L}][\p{L}\p{M} .'-]*$/u.test(name)) errors.name = 'Enter a valid name using letters, spaces, apostrophes or hyphens.'
  if (!company) errors.company = 'Please enter your company name.'
  else if (company.length < 2 || company.length > 100) errors.company = 'Company name must be between 2 and 100 characters.'
  if (!email) errors.email = 'Please enter your email address.'
  else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)) errors.email = 'Please enter a valid email address.'
  if (!phone) errors.phone = 'Please enter your phone number.'
  else if (!/^\+?[\d\s().-]+$/.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) errors.phone = 'Enter a valid phone number with 7 to 15 digits.'
  if (!enquiry.service) errors.service = 'Please select a service.'
  if (!details) errors.details = 'Please tell us what you would like to improve or build.'
  else if (details.length < 10) errors.details = 'Project details must contain at least 10 characters.'
  if (!enquiry.agreed) errors.agreed = 'Please agree to the Privacy Policy to continue.'
  return errors
}
