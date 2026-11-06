import { ArrowRight, Clock3, Sparkles } from 'lucide-react'
import { ContactView } from '@/components/contact/ContactView'
import { AutomationPage } from '@/components/automation/AutomationPage'
import { ConnectionSection } from '@/components/home/ConnectionSection'
import { FaqPage } from '@/components/legal/FaqPage'
import { LegalPage } from '@/components/legal/LegalPage'
import { ServicesPage } from '@/components/services/ServicesPage'
import { OfferingPage } from '@/components/pages/OfferingPage'
import { offeringPages } from '@/data/content'
import { privacyIntro, privacySections, termsIntro, termsSections } from '@/data/legal'
import { IndustriesPage } from '@/components/industries/IndustriesPage'
import { ProcessSection } from '@/components/home/ProcessSection'
import { WhySection } from '@/components/home/WhySection'
import type { PageName } from '@/types'

interface PageViewProps { page: PageName; onNavigate: (page: PageName) => void }

function AboutView() { return <div className="page-view"><ConnectionSection /><WhySection /><ProcessSection /></div> }
function BlogsView({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  return <section className="blogs-view">
    <div className="blogs-coming-soon">
      <div className="blogs-orbit" aria-hidden="true"><Clock3 /><span><Sparkles /></span></div>
      <span className="blogs-badge"><i /> Coming Soon</span>
      <p className="eyebrow">IKASLE INSIGHTS</p>
      <h1>Fresh ideas are<br />on the way.</h1>
      <p className="blogs-intro">We’re preparing practical insights on AI, automation and smarter ways to grow your business.</p>
      <button type="button" onClick={() => onNavigate('Contact')}>Talk to our team <ArrowRight /></button>
    </div>
  </section>
}

export function PageView({ page, onNavigate }: PageViewProps) {
  if (page === 'About Us') return <AboutView />
  if (page === 'Automation') return <AutomationPage onNavigate={onNavigate} />
  if (page === 'Services') return <ServicesPage onNavigate={onNavigate} />
  if (page === 'AI Solutions' || page === 'Intelligent Tools' || page === 'Business Innovation') return <OfferingPage key={page} content={offeringPages[page]} onNavigate={onNavigate} />
  if (page === 'Industries') return <IndustriesPage onNavigate={onNavigate} />
  if (page === 'Blogs') return <BlogsView onNavigate={onNavigate} />
  if (page === 'Contact') return <ContactView />
  if (page === 'FAQ') return <FaqPage onNavigate={onNavigate} />
  if (page === 'Privacy Policy') return <LegalPage key={page} title="Privacy Policy" intro={privacyIntro} sections={privacySections} />
  if (page === 'Terms & Conditions') return <LegalPage key={page} title="Terms & Conditions" intro={termsIntro} sections={termsSections} />
  return null
}