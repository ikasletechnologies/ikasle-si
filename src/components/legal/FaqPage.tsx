import { FaqBlock } from '@/components/home/FaqSection'
import { ContactBand, Revealed } from '@/components/industries/SectorParts'
import { faqGroups, faqIntro } from '@/data/legal'
import type { PageName } from '@/types'
import './LegalPage.css'

export function FaqPage({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  return <div className="page-view">
    <div className="sector-page faq-page">
      <Revealed as="header" className="sector-intro">
        <span className="sector-intro__bar" />
        <div>
          <h1><span>Frequently Asked Questions</span></h1>
          <p>{faqIntro}</p>
        </div>
      </Revealed>
      {faqGroups.map(({ lines, items }, index) =>
        <FaqBlock key={lines.join(' ')} lines={lines} items={items} initialOpen={index === 0 ? 0 : null} />
      )}
      <ContactBand
        heading="Still have a question?"
        text="Tell us what you’d like to know and our team will help."
        action="Talk to Our Team"
        onNavigate={onNavigate}
      />
    </div>
  </div>
}
