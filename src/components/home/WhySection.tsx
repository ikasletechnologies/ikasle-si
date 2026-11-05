import type { CSSProperties } from 'react'
import { whyCards, whyHeading, whyHeadingAccent } from '@/data/content'
import { inViewClass, useInView } from '@/hooks/useInView'
import type { IconCard } from '@/types'
import { AnimatedHeading } from './AnimatedHeading'
import { followPointer } from './followPointer'
import { WhyIconDefs } from './WhyIcons'
import './WhySection.css'

function WhyCard({ card, index }: { card: IconCard; index: number }) {
  const { ref, inView, revealed } = useInView<HTMLElement>()
  const { icon: Icon, title, description } = card

  return <article ref={ref} className={`why-card${inViewClass(revealed, inView)}`} style={{ '--i': index, '--from': index - 1 } as CSSProperties}>
    <div className="why-card__inner" onPointerMove={followPointer}>
      <div className="why-card__icon"><Icon /></div>
      <div className="why-card__text">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  </article>
}

export function WhySection() {
  return <section className="why-section">
    <WhyIconDefs />
    <AnimatedHeading text={whyHeading} accent={whyHeadingAccent} />
    <div className="why-grid">
      {whyCards.map((card, index) => <WhyCard key={card.title} card={card} index={index} />)}
    </div>
  </section>
}
