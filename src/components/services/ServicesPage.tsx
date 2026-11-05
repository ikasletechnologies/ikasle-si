import type { CSSProperties } from 'react'
import { ChevronRight } from 'lucide-react'
import { ContactArtDefs } from '@/components/contact/ContactArt'
import { followPointer } from '@/components/home/followPointer'
import { SectorArtDefs } from '@/components/industries/SectorArt'
import { ContactBand, Revealed, SectorHeading, StepList } from '@/components/industries/SectorParts'
import { serviceConnect, serviceContact, serviceGroups, servicePath } from '@/data/content'
import type { ConnectedSystem, PageName, ServiceGroup } from '@/types'
import './ServicesPage.css'

interface NavigateProps {
  onNavigate: (page: PageName) => void
}

function ServicePanel({ group, index, onNavigate }: NavigateProps & { group: ServiceGroup; index: number }) {
  const { title, description, page, art: Art, features } = group
  const number = String(index + 1).padStart(2, '0')

  return <Revealed as="article" className="service-panel" style={{ '--p': index } as CSSProperties}>
    <div className="service-panel__frame" onPointerMove={followPointer}>
      <div className="service-panel__inner">
        <div className="service-panel__copy">
          <span className="service-panel__number" aria-hidden="true">{number}</span>
          <h2>{title}</h2>
          <p>{description}</p>
          <button type="button" className="sector-button service-panel__explore" aria-label={`Explore ${title}`} onClick={() => onNavigate(page)}>
            <span>Explore</span><ChevronRight aria-hidden="true" />
          </button>
        </div>
        <div className="service-panel__art"><Art /></div>
        <span className="service-panel__divider" />
        <ul className="service-features">
          {features.map(({ title: name, description: detail, icon: Icon }, featureIndex) =>
            <li key={name} className="service-feature" style={{ '--f': featureIndex } as CSSProperties}>
              <span className="service-feature__icon"><Icon aria-hidden="true" /></span>
              <div>
                <h3>{name}</h3>
                <p>{detail}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  </Revealed>
}

export function ConnectedSystems({ systems }: { systems: ConnectedSystem[] }) {
  return <Revealed className="service-systems">
    <ul>
      {systems.map(({ label, icon: Icon }, index) =>
        <li key={label} style={{ '--n': index } as CSSProperties}><Icon aria-hidden="true" /><span>{label}</span></li>
      )}
    </ul>
  </Revealed>
}

export function ServicesPage({ onNavigate }: NavigateProps) {
  return <div className="page-view">
    <div className="sector-page services-page">
      <ContactArtDefs />
      <SectorArtDefs />
      {/* The design opens straight on the first service, so this names the page for screen readers. */}
      <h1 className="services-page__title">Our services</h1>

      <div className="service-list">
        {serviceGroups.map((group, index) => <ServicePanel key={group.title} group={group} index={index} onNavigate={onNavigate} />)}
      </div>

      <SectorHeading sub={serviceConnect.text}>{serviceConnect.heading}</SectorHeading>
      <ConnectedSystems systems={serviceConnect.systems} />

      <SectorHeading sub={servicePath.text}>{servicePath.heading}</SectorHeading>
      <StepList steps={servicePath.steps} />

      <ContactBand {...serviceContact} onNavigate={onNavigate} />
    </div>
  </div>
}
