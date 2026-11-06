import { ArrowRight, UserRound } from 'lucide-react'
import { solutions } from '@/data/content'
import type { PageName } from '@/types'

export function SolutionsView({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  return <section className="content">
    <div className="question-pill"><UserRound /><span>What AI solutions do you offer?</span></div>
    <div className="hero-copy">
      <div className="sparkles">✦</div>
      <div>
        <h1>AI built around your business.</h1>
        <p>Practical AI solutions that help your team access knowledge, simplify work and<br className="desktop-break" /> turn information into action.</p>
      </div>
    </div>
    <div className="solution-grid">
      {solutions.map(({ title, description, icon: Icon }) =>
        <article key={title} tabIndex={0}><Icon /><h2>{title}</h2><p>{description}</p></article>
      )}
    </div>
    <button type="button" className="explore-button" onClick={() => onNavigate('AI Solutions')}>Explore AI Solutions <ArrowRight /></button>
  </section>
}
