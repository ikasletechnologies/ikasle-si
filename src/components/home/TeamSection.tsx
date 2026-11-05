import { useRef, type CSSProperties, type PointerEvent } from 'react'
import { teamCards, teamHeading } from '@/data/content'
import { useInView } from '@/hooks/useInView'
import type { TeamCard as TeamCardData } from '@/types'
import { AnimatedHeading } from './AnimatedHeading'
import { TeamIconDefs } from './TeamIcons'
import './TeamSection.css'

const MAX_TILT_DEGREES = 5

function TeamCard({ card, index }: { card: TeamCardData; index: number }) {
  const { ref, inView, revealed } = useInView<HTMLElement>()
  const { icon: Icon, title, description } = card
  const state = `${revealed ? ' is-revealed' : ''}${inView ? '' : ' is-paused'}`

  return <article ref={ref} className={`team-card${state}`} style={{ '--i': index } as CSSProperties}>
    <div className="team-card__inner">
      <div className="team-card__icon"><Icon /></div>
      <div className="team-card__text">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  </article>
}

export function TeamSection() {
  const frame = useRef(0)

  // Every card tracks the same pointer, so the light on the borders carries across
  // the gaps and neighbouring cards catch it too. Limited to one update per frame.
  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || frame.current) return
    const grid = event.currentTarget
    const { clientX, clientY } = event
    frame.current = requestAnimationFrame(() => {
      frame.current = 0
      grid.querySelectorAll<HTMLElement>('.team-card').forEach((card) => {
        const bounds = card.getBoundingClientRect()
        const x = clientX - bounds.left
        const y = clientY - bounds.top
        const isOver = x >= 0 && y >= 0 && x <= bounds.width && y <= bounds.height
        card.style.setProperty('--mx', `${x}px`)
        card.style.setProperty('--my', `${y}px`)
        card.style.setProperty('--ry', isOver ? `${(x / bounds.width - 0.5) * 2 * MAX_TILT_DEGREES}deg` : '0deg')
        card.style.setProperty('--rx', isOver ? `${(0.5 - y / bounds.height) * 2 * MAX_TILT_DEGREES}deg` : '0deg')
      })
    })
  }

  const resetTilt = (event: PointerEvent<HTMLElement>) => {
    cancelAnimationFrame(frame.current)
    frame.current = 0
    event.currentTarget.querySelectorAll<HTMLElement>('.team-card').forEach((card) => {
      card.style.setProperty('--rx', '0deg')
      card.style.setProperty('--ry', '0deg')
    })
  }

  return <section className="team-section">
    <TeamIconDefs />
    <AnimatedHeading text={teamHeading} />
    <div className="team-grid" onPointerMove={trackPointer} onPointerLeave={resetTilt}>
      {teamCards.map((card, index) => <TeamCard key={card.title} card={card} index={index} />)}
    </div>
  </section>
}
