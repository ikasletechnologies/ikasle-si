import type { CSSProperties } from 'react'
import { contactDetails, socialLinks } from '@/data/content'
import { resetArt, tiltArt } from '@/components/home/followPointer'
import { inViewClass, useInView } from '@/hooks/useInView'
import { ContactArt, ContactArtDefs } from './ContactArt'
import { ContactForm } from './ContactForm'
import './ContactView.css'

function ContactHero() {
  const { ref, inView, revealed } = useInView<HTMLElement>()

  return <header ref={ref} className={`contact-hero${inViewClass(revealed, inView)}`} onPointerMove={tiltArt} onPointerLeave={resetArt}>
    <div className="contact-hero__copy">
      <span className="contact-eyebrow">CONTACT US</span>
      <div className="contact-eyebrow__rule" />
      <h1>
        <span className="contact-hero__line"><span>Let’s build something</span></span>{' '}
        <span className="contact-hero__line contact-hero__line--accent"><span>intelligent.</span></span>
      </h1>
      <p>Tell us about your business challenge. We’ll help you explore the right AI solution, automation workflow or custom tool.</p>
    </div>
    <ContactArt variant="hero" />
  </header>
}

function ContactCard() {
  const { ref, inView, revealed } = useInView<HTMLElement>()

  return <aside ref={ref} className={`contact-card contact-card--details${inViewClass(revealed, inView)}`}>
    <h2>Start a conversation</h2>
    <div className="contact-card__rule" />
    <ul className="contact-rows">
      {contactDetails.map(({ label, lines, href, external, icon: Icon }, index) =>
        <li key={label} style={{ '--n': index } as CSSProperties}>
          <a className={`contact-row contact-row--${label.toLowerCase()}`} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            <span className="contact-row__tile"><Icon aria-hidden="true" /></span>
            <span className="contact-row__text">
              <strong>{label}</strong>
              {lines.map((line) => <span key={line}>{line} </span>)}
            </span>
          </a>
        </li>
      )}
    </ul>
    <div className="contact-socials">
      {socialLinks.map(({ label, href, icon: Icon }) => href
        ? <a key={label} className="contact-social" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon /></a>
        : <span key={label} className="contact-social contact-social--inert"><Icon /></span>
      )}
    </div>
    <ContactArt variant="card" />
  </aside>
}

function EnquiryCard() {
  const { ref, inView, revealed } = useInView<HTMLElement>()

  return <section ref={ref} className={`contact-card contact-card--form${inViewClass(revealed, inView)}`}>
    <h2>Tell us what you have in mind</h2>
    <div className="contact-card__rule" />
    <ContactForm />
  </section>
}

export function ContactView() {
  return <div className="contact-page">
    <ContactArtDefs />
    <ContactHero />
    <div className="contact-columns">
      <ContactCard />
      <EnquiryCard />
    </div>
  </div>
}
