import { ArrowRight } from 'lucide-react'
import heroArt from '@/assets/ai-automation-hero.png'
import type { PageName } from '@/types'

interface HomeHeroProps {
  onNavigate: (page: PageName) => void
}

export function HomeHero({ onNavigate }: HomeHeroProps) {
  return <section className="home-hero">
    <div className="home-copy">
      <span className="eyebrow">IKASLE SUPER INTELLIGENCE</span>
      <h1>AI Solutions &amp;<br />Business Automation<br />Built Around <em>Your<br />Business</em></h1>
      <div className="cyan-rule" />
      <p>Simplify operations. Connect information.<br />Build smarter workflows.</p>
      <div className="home-actions">
        <button onClick={() => onNavigate('Services')}>Explore Our Solutions <ArrowRight /></button>
        <button onClick={() => onNavigate('Contact')}>Discuss Your Project</button>
      </div>
    </div>
    <div className="home-art">
      <div className="art-glow" />
      <img src={heroArt} alt="AI automation platform connected to code, workflow, analytics and document tools" />
    </div>
  </section>
}
