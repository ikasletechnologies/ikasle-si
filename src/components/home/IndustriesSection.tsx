import { Fragment, type CSSProperties } from 'react'
import { industries, industriesHeading } from '@/data/content'
import { inViewClass, useInView } from '@/hooks/useInView'
import type { IconCard } from '@/types'
import { AnimatedHeading } from './AnimatedHeading'
import { IndustryIconDefs } from './IndustryIcons'
import './IndustriesSection.css'

function IndustryCard({ card, index }: { card: IconCard; index: number }) {
  const { ref, inView, revealed } = useInView<HTMLElement>()
  const { icon: Icon, title, description } = card

  return <article ref={ref} className={`industry-card${inViewClass(revealed, inView)}`} style={{ '--i': index } as CSSProperties}>
    <div className="industry-card__inner">
      <div className="industry-card__icon"><Icon /></div>
      {/* Each word stays whole, so "E-Commerce" never splits at its hyphen. */}
      <h3>{title.split(' ').map((word) => <Fragment key={word}><span>{word}</span>{' '}</Fragment>)}</h3>
      <p>{description}</p>
    </div>
  </article>
}

export function IndustriesSection() {
  return <section className="industries-section">
    <IndustryIconDefs />
    <AnimatedHeading text={industriesHeading} />
    <div className="industries-grid">
      {industries.map((card, index) => <IndustryCard key={card.title} card={card} index={index} />)}
    </div>
  </section>
}
