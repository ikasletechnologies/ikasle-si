import type { CSSProperties } from 'react'
import { connectedSystems, connectHeadingLines, toolCards, toolsHeading } from '@/data/content'
import { useInView } from '@/hooks/useInView'
import type { ToolCard as ToolCardData } from '@/types'
import { AnimatedHeading } from './AnimatedHeading'
import { ToolsIconDefs } from './ToolsIcons'
import './ToolsSection.css'

const stateClass = (revealed: boolean, inView: boolean) =>
  `${revealed ? ' is-revealed' : ''}${inView ? '' : ' is-paused'}`

// How far a card sits from the middle of the row, so the entrance opens outward from the centre.
const distanceFromCentre = (index: number) => Math.abs(index - (toolCards.length - 1) / 2) - 0.5

function ToolCard({ card, index }: { card: ToolCardData; index: number }) {
  const { ref, inView, revealed } = useInView<HTMLElement>()
  const { icon: Icon, title, description } = card
  const style = { '--i': index, '--from-centre': distanceFromCentre(index), '--side': index < toolCards.length / 2 ? -1 : 1 } as CSSProperties

  return <article ref={ref} className={`tools-card${stateClass(revealed, inView)}`} style={style}>
    <div className="tools-card__inner">
      <div className="tools-card__icon"><Icon /></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </article>
}

function ConnectBand() {
  const { ref, inView, revealed } = useInView<HTMLDivElement>()

  return <div ref={ref} className={`tools-band${stateClass(revealed, inView)}`}>
    <h3 className="tools-band__heading">
      {connectHeadingLines.map((line) => <span key={line}>{line} </span>)}
    </h3>
    <div className="tools-band__divider" aria-hidden="true" />
    <ul className="tools-systems">
      {connectedSystems.map(({ label, icon: Icon }, index) =>
        <li key={label} className="tools-system" style={{ '--n': index } as CSSProperties}>
          <span className="tools-system__icon"><Icon aria-hidden="true" /></span>
          <span className="tools-system__label">{label}</span>
        </li>
      )}
    </ul>
  </div>
}

export function ToolsSection() {
  return <section className="tools-section">
    <ToolsIconDefs />
    <AnimatedHeading text={toolsHeading} />
    <div className="tools-grid">
      {toolCards.map((card, index) => <ToolCard key={card.title} card={card} index={index} />)}
    </div>
    <ConnectBand />
  </section>
}
