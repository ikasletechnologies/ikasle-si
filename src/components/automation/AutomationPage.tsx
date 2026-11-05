import type { CSSProperties } from 'react'
import { ChevronRight, MoveRight } from 'lucide-react'
import '@/components/contact/ContactView.css'
import { resetArt, tiltArt } from '@/components/home/followPointer'
import { SectorArtDefs } from '@/components/industries/SectorArt'
import { ContactBand, Revealed, SectorHeading } from '@/components/industries/SectorParts'
import { ConnectedSystems } from '@/components/services/ServicesPage'
import { automationAreas, automationContact, automationFlow, automationHero, automationTools } from '@/data/content'
import { inViewClass, useInView } from '@/hooks/useInView'
import type { PageName } from '@/types'
import { AutomationHeroArt } from './AutomationArt'
import './AutomationPage.css'

interface NavigateProps {
  onNavigate: (page: PageName) => void
}

function Hero({ onNavigate }: NavigateProps) {
  const { ref, inView, revealed } = useInView<HTMLElement>()
  const { eyebrow, lines, accent, text, action } = automationHero

  return <header ref={ref} className={`contact-hero auto-hero${inViewClass(revealed, inView)}`} onPointerMove={tiltArt} onPointerLeave={resetArt}>
    <div className="contact-hero__copy">
      <span className="contact-eyebrow">{eyebrow}</span>
      <div className="contact-eyebrow__rule" />
      <h1>
        <span className="contact-hero__line"><span>{lines}</span></span>{' '}
        <span className="contact-hero__line contact-hero__line--accent"><span>{accent}</span></span>
      </h1>
      <p>{text}</p>
      <button type="button" className="sector-button sector-button--large auto-hero__action" onClick={() => onNavigate('Contact')}>
        <span>{action}</span><ChevronRight aria-hidden="true" />
      </button>
    </div>
    <AutomationHeroArt />
  </header>
}

function Workflow() {
  // Each stage enters when seen, but the light is timed from the whole list to stay in sequence.
  const { ref, inView, revealed } = useInView<HTMLOListElement>()

  return <Revealed className="auto-flow">
    <SectorHeading>{automationFlow.heading}</SectorHeading>
    <ol ref={ref} className={`auto-stages${inViewClass(revealed, inView)}`}>
      {automationFlow.stages.map(({ label, art: Art }, index) =>
        <li key={label} className={`auto-stage auto-stage--${index + 1}`} style={{ '--i': index } as CSSProperties}>
          <Art />
          <h3>{label}</h3>
          {index < automationFlow.stages.length - 1 && <MoveRight className="auto-stage__arrow" aria-hidden="true" />}
        </li>
      )}
    </ol>
  </Revealed>
}

export function AutomationPage({ onNavigate }: NavigateProps) {
  return <div className="page-view">
    <div className="sector-page automation-page">
      <SectorArtDefs />
      <Hero onNavigate={onNavigate} />

      <div className="auto-areas">
        {automationAreas.map(({ label, art: Art }, index) =>
          <Revealed as="article" key={label} className="auto-area" style={{ '--i': index } as CSSProperties}>
            <div className="auto-area__inner">
              <Art />
              <h2>{label}</h2>
            </div>
          </Revealed>
        )}
      </div>

      <Workflow />

      <div className="auto-tools">
        <SectorHeading>{automationTools.heading}</SectorHeading>
        <ConnectedSystems systems={automationTools.systems} />
      </div>

      <ContactBand {...automationContact} onNavigate={onNavigate} />
    </div>
  </div>
}
