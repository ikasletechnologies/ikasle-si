import type { IncomingMessage, ServerResponse } from 'node:http'
import nodemailer from 'nodemailer'
import type { Connect, Plugin } from 'vite'

const MAX_BODY_BYTES = 32 * 1024
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const attempts = new Map<string, { count: number; resetAt: number }>()

type Enquiry = {
  name: string
  company: string
  email: string
  phone: string
  service: string
  details: string
  agreed: boolean
  website?: string
}

function sendJson(res: ServerResponse, status: number, payload: Record<string, unknown>) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

async function readBody(req: IncomingMessage) {
  let body = ''
  for await (const chunk of req) {
    body += chunk
    if (body.length > MAX_BODY_BYTES) return null
  }
  return body
}

function parseEnquiry(body: string): Enquiry | null {
  let value: unknown
  try { value = JSON.parse(body) } catch { return null }
  const item = value as Partial<Enquiry>
  if (!item || typeof item !== 'object') return null
  if (typeof item.name !== 'string' || !/^[\p{L}][\p{L}\p{M} .'-]{1,59}$/u.test(item.name.trim())) return null
  if (typeof item.company !== 'string' || item.company.trim().length < 2 || item.company.trim().length > 100) return null
  if (typeof item.email !== 'string' || item.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(item.email.trim())) return null
  if (typeof item.phone !== 'string' || !/^\+?[\d\s().-]+$/.test(item.phone.trim())) return null
  const digits = item.phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) return null
  if (typeof item.service !== 'string' || !item.service.trim() || item.service.length > 100) return null
  if (typeof item.details !== 'string' || item.details.trim().length < 10 || item.details.length > 1500) return null
  if (item.agreed !== true) return null
  if (item.website && item.website.trim()) return null
  return {
    name: item.name.trim(), company: item.company.trim(), email: item.email.trim(),
    phone: item.phone.trim(), service: item.service.trim(), details: item.details.trim(), agreed: true,
  }
}

function escaped(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
}

function limited(req: IncomingMessage) {
  const forwarded = req.headers['x-forwarded-for']
  const key = (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0])?.trim() || req.socket.remoteAddress || 'unknown'
  const now = Date.now()
  const current = attempts.get(key)
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  current.count += 1
  return current.count > MAX_REQUESTS
}

function createHandler(env: Record<string, string>): Connect.NextHandleFunction {
  return async (req, res, next) => {
    if (req.url?.split('?')[0] !== '/api/contact') return next()
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'Use POST.' })
    if (!req.headers['content-type']?.startsWith('application/json')) return sendJson(res, 415, { error: 'Send JSON.' })
    if (limited(req)) return sendJson(res, 429, { error: 'Too many enquiries. Please try again in a few minutes.' })

    const body = await readBody(req)
    if (body === null) return sendJson(res, 413, { error: 'The enquiry is too large.' })
    const enquiry = parseEnquiry(body)
    if (!enquiry) return sendJson(res, 400, { error: 'Please check all form fields and try again.' })

    const host = env.SMTP_HOST?.trim()
    const port = Number(env.SMTP_PORT || 587)
    const user = env.SMTP_USER?.trim()
    const pass = env.SMTP_PASS
    const from = env.SMTP_FROM?.trim() || user
    const to = env.CONTACT_RECEIVER_EMAIL?.trim()
    if (!host || !Number.isInteger(port) || !user || !pass || !from || !to) {
      console.error('[contact] SMTP configuration is incomplete.')
      return sendJson(res, 503, { error: 'Email service is not configured yet. Please try again later.' })
    }

    const transport = nodemailer.createTransport({
      host, port, secure: env.SMTP_SECURE === 'true', auth: { user, pass },
    })
    const subject = `Website enquiry from ${enquiry.name}`
    const text = `Name: ${enquiry.name}\nCompany: ${enquiry.company}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone}\nInterested in: ${enquiry.service}\n\nProject details:\n${enquiry.details}`
    const html = `<h2>New website enquiry</h2><p><strong>Name:</strong> ${escaped(enquiry.name)}</p><p><strong>Company:</strong> ${escaped(enquiry.company)}</p><p><strong>Email:</strong> ${escaped(enquiry.email)}</p><p><strong>Phone:</strong> ${escaped(enquiry.phone)}</p><p><strong>Interested in:</strong> ${escaped(enquiry.service)}</p><h3>Project details</h3><p>${escaped(enquiry.details).replace(/\n/g, '<br>')}</p>`

    try {
      await transport.sendMail({ from, to, replyTo: enquiry.email, subject, text, html })
      return sendJson(res, 200, { ok: true })
    } catch (error) {
      console.error('[contact] SMTP delivery failed:', error instanceof Error ? error.message : error)
      return sendJson(res, 502, { error: 'We could not send your enquiry right now. Please try again shortly.' })
    }
  }
}

export function contactApi(env: Record<string, string>): Plugin {
  const handler = createHandler(env)
  return { name: 'ikasle-contact-api', configureServer: (server) => void server.middlewares.use(handler), configurePreviewServer: (server) => void server.middlewares.use(handler) }
}