import { AutomateSection } from './AutomateSection'
import { ConnectionSection } from './ConnectionSection'
import { FaqSection } from './FaqSection'
import { GrowthSection } from './GrowthSection'
import { HomeHero } from './HomeHero'
import { IndustriesSection } from './IndustriesSection'
import { ProcessSection } from './ProcessSection'
import { TeamSection } from './TeamSection'
import { ToolsSection } from './ToolsSection'
import { WhySection } from './WhySection'
import type { PageName } from '@/types'

interface HomeViewProps {
  onNavigate: (page: PageName) => void
}

export function HomeView({ onNavigate }: HomeViewProps) {
  return <div className="home-content">
    <HomeHero onNavigate={onNavigate} />
    <ConnectionSection />
    <GrowthSection />
    <TeamSection />
    <AutomateSection onNavigate={onNavigate} />
    <ToolsSection />
    <IndustriesSection />
    <ProcessSection />
    <WhySection />
    <FaqSection />
  </div>
}
