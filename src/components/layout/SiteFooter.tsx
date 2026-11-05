import type { CSSProperties } from 'react'
import { contactDetails, contactEmail, footerAddress, footerPhone, footerSolutions, footerTagline, navigation, socialLinks } from '@/data/content'
import { inViewClass, useInView } from '@/hooks/useInView'
import type { PageName } from '@/types'
import './SiteFooter.css'

interface SiteFooterProps {
  onNavigate: (page: PageName) => void
}

const QUICK_LINKS: { label: string; page: PageName }[] = [
  ...navigation.map(({ label, page }) => ({ label, page })),
  { label: 'FAQ', page: 'FAQ' },
]

function linkFor(label: string) {
  return contactDetails.find((detail) => detail.label === label)
}

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  const { ref, inView, revealed } = useInView<HTMLElement>()
  const email = linkFor('Email')
  const phone = linkFor('Phone')
  const office = linkFor('Office')

  return <footer ref={ref} className={`site-footer${inViewClass(revealed, inView)}`}>
    <div className="site-footer__inner">
      <div className="site-footer__columns">
        <div className="site-footer__brand" style={{ '--c': 0 } as CSSProperties}>
          <button type="button" className="site-footer__logo" aria-label="Go to Home" onClick={() => onNavigate('Home')}>
            <span className="brand-mark" aria-hidden="true"><i /><i /></span>
            <span><strong>IKASLE</strong><small>SUPER INTELLIGENCE</small></span>
          </button>
          <p>{footerTagline.map((line) => <span key={line}>{line} </span>)}</p>
        </div>

        <nav className="site-footer__column" style={{ '--c': 1 } as CSSProperties} aria-label="Solutions">
          <h2>Solutions</h2>
          <ul>
            {footerSolutions.map(({ label, page }) =>
              <li key={label}><button type="button" onClick={() => onNavigate(page)}>{label}</button></li>
            )}
          </ul>
        </nav>

        <nav className="site-footer__column" style={{ '--c': 2 } as CSSProperties} aria-label="Quick links">
          <h2>Quick Links</h2>
          <ul className="site-footer__quick">
            {QUICK_LINKS.map(({ label, page }) =>
              <li key={page}><button type="button" onClick={() => onNavigate(page)}>{label}</button></li>
            )}
          </ul>
        </nav>

        <div className="site-footer__column" style={{ '--c': 3 } as CSSProperties}>
          <h2>Contact</h2>
          <ul className="site-footer__contact">
            {email && <li><email.icon aria-hidden="true" /><a href={email.href}>{contactEmail}</a></li>}
            {phone && <li><phone.icon aria-hidden="true" /><a href={phone.href}>{footerPhone}</a></li>}
            {office && <li><office.icon aria-hidden="true" /><a href={office.href} target="_blank" rel="noopener noreferrer">{footerAddress.map((line) => <span key={line}>{line} </span>)}</a></li>}
          </ul>
        </div>

        <div className="site-footer__socials" style={{ '--c': 4 } as CSSProperties}>
          {socialLinks.map(({ label, href, icon: Icon }) => href
            ? <a key={label} className="site-footer__social" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon /></a>
            : <span key={label} className="site-footer__social"><Icon /></span>
          )}
        </div>
      </div>

      <div className="site-footer__rule" />

      <div className="site-footer__bottom">
        <p>© 2026 IKASLE Super Intelligence. All rights reserved.</p>
        <div className="site-footer__legal">
          <button type="button" onClick={() => onNavigate('Privacy Policy')}>Privacy Policy</button>
          <button type="button" onClick={() => onNavigate('Terms & Conditions')}>Terms &amp; Conditions</button>
        </div>
      </div>
    </div>
  </footer>
}
