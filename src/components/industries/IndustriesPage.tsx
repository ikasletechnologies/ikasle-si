import { Fragment, type CSSProperties } from 'react'
import { ChevronRight } from 'lucide-react'
import { followPointer } from '@/components/home/followPointer'
import { sectorCards, sectorContact, sectorIntro, sectorStepsHeading, sectorSteps, sectorsHeading, sectorSupport, sectorTrust, sectorTrustHeading } from '@/data/content'
import type { GrowthCard, PageName } from '@/types'
import { SectorArtDefs } from './SectorArt'
import { ContactBand, Revealed, SectorHeading, StepList } from './SectorParts'

interface NavigateProps {
  onNavigate: (page: PageName) => void
}

function SectorCard({ card, index, onNavigate }: NavigateProps & { card: GrowthCard; index: number }) {
  const { title, description, features, art: Art } = card
  return <Revealed as="article" className="sector-card" style={{ '--i': index, '--side': index % 2 ? 1 : -1 } as CSSProperties}>
    <div className="sector-card__frame" onPointerMove={followPointer}>
      <div className="sector-card__inner">
        <Art />
        <span className="sector-card__divider" />
        <div className="sector-card__copy">
          {/* Each word stays whole, so "E-Commerce" never splits at its hyphen. */}
          <h3>{title.split(' ').map((word) => <Fragment key={word}><span>{word}</span>{' '}</Fragment>)}</h3>
          <p>{description}</p>
          <ul>
            {features.map((feature, featureIndex) =>
              <li key={feature} style={{ '--b': featureIndex } as CSSProperties}><ChevronRight aria-hidden="true" />{feature}</li>
            )}
          </ul>
          <button type="button" className="sector-button" aria-label={`Discuss your requirements for ${title}`} onClick={() => onNavigate('Contact')}>
            <span>Discuss Your Requirements</span><ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </Revealed>
}

function SupportBand() {
  return <Revealed className="sector-band">
    <span className="sector-band__bar" />
    <p>{sectorSupport.text}</p>
    <ul>
      {sectorSupport.sectors.map(({ label, icon: Icon }, index) =>
        <li key={label} style={{ '--n': index } as CSSProperties}><Icon aria-hidden="true" />{label}</li>
      )}
    </ul>
  </Revealed>
}

function Trust() {
  return <div className="sector-trust">
    {sectorTrust.map(({ title, description, icon: Icon }, index) =>
      <Revealed as="article" key={title} className={`sector-trust__card sector-trust__card--${index + 1}`} style={{ '--i': index } as CSSProperties}>
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

export function IndustriesPage({ onNavigate }: NavigateProps) {
  return <div className="page-view">
    <div className="sector-page">
      <SectorArtDefs />
      <Revealed as="header" className="sector-intro">
        <span className="sector-intro__bar" />
        <div>
          <h1><span>{sectorIntro.heading}</span></h1>
          <p>{sectorIntro.text}</p>
        </div>
      </Revealed>

      <SectorHeading>{sectorsHeading}</SectorHeading>
      <div className="sector-grid">
        {sectorCards.map((card, index) => <SectorCard key={card.title} card={card} index={index} onNavigate={onNavigate} />)}
      </div>
      <SupportBand />

      <SectorHeading>{sectorStepsHeading}</SectorHeading>
      <StepList steps={sectorSteps} />

      <SectorHeading>{sectorTrustHeading}</SectorHeading>
      <Trust />

      <ContactBand {...sectorContact} onNavigate={onNavigate} />
    </div>
  </div>
}
