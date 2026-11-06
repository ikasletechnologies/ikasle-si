import type { CSSProperties } from 'react'
import { PageHero } from '@/components/automation/AutomationPage'
import { ContactArtDefs } from '@/components/contact/ContactArt'
import { SectorArtDefs } from '@/components/industries/SectorArt'
import { ContactBand, Revealed, SectorHeading, StepList } from '@/components/industries/SectorParts'
import { ConnectedSystems } from '@/components/services/ServicesPage'
import { serviceConnect, servicePath } from '@/data/content'
import type { IconCard, OfferingContent, PageName } from '@/types'
import './OfferingPage.css'

function Cards({ cards }: { cards: IconCard[] }) {
  // Keeps rows full: four cards sit two by two, three or six sit in threes.
  const style = { '--cols': cards.length % 3 === 0 ? 3 : 2 } as CSSProperties
  return <div className="sector-trust offering-cards" style={style}>
    {cards.map(({ title, description, icon: Icon }, index) =>
      <Revealed as="article" key={title} className="sector-trust__card" style={{ '--i': index } as CSSProperties}>
        <div className="sector-trust__inner">
          <span className="sector-trust__icon"><Icon /></span>
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </Revealed>
    )}
  </div>
}

// The AI Solutions, Intelligent Tools and Business Innovation pages: same layout, different content.
export function OfferingPage({ content, onNavigate }: { content: OfferingContent; onNavigate: (page: PageName) => void }) {
  const { hero, art, features, more, contact } = content

  return <div className="page-view">
    <div className="sector-page offering-page">
      <ContactArtDefs />
      <SectorArtDefs />
      <PageHero hero={hero} art={art} onNavigate={onNavigate} />

      <SectorHeading sub={features.text}>{features.heading}</SectorHeading>
      <Cards cards={features.cards} />

      <SectorHeading sub={more.text}>{more.heading}</SectorHeading>
      <Cards cards={more.cards} />

      <SectorHeading sub={serviceConnect.text}>{serviceConnect.heading}</SectorHeading>
      <ConnectedSystems systems={serviceConnect.systems} />

      <SectorHeading sub={servicePath.text}>{servicePath.heading}</SectorHeading>
      <StepList steps={servicePath.steps} />

      <ContactBand {...contact} onNavigate={onNavigate} />
    </div>
  </div>
}
