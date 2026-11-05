import type { CSSProperties, PointerEvent } from 'react'
import { growthCards, growthHeading } from '@/data/content'
import { useInView } from '@/hooks/useInView'
import type { GrowthCard as GrowthCardData } from '@/types'
import { AnimatedHeading } from './AnimatedHeading'
import { GrowthArtDefs } from './GrowthArt'
import './GrowthSection.css'

const MAX_TILT_DEGREES = 9

// CSS variables are written directly so tracking the pointer never re-renders React.
function trackPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse') return
  const card = event.currentTarget
  const bounds = card.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width
  const y = (event.clientY - bounds.top) / bounds.height
  card.style.setProperty('--mx', `${x * 100}%`)
  card.style.setProperty('--my', `${y * 100}%`)
  card.style.setProperty('--ry', `${(x - 0.5) * 2 * MAX_TILT_DEGREES}deg`)
  card.style.setProperty('--rx', `${(0.5 - y) * 2 * MAX_TILT_DEGREES}deg`)
}

function resetTilt(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--rx', '0deg')
  event.currentTarget.style.setProperty('--ry', '0deg')
}

function GrowthCard({ card, index }: { card: GrowthCardData; index: number }) {
  const { ref, inView, revealed } = useInView<HTMLElement>()
  const { art: Art, title, description, features } = card
  const state = `${revealed ? ' is-revealed' : ''}${inView ? '' : ' is-paused'}`

  return <article
    ref={ref}
    className={`growth-card${state}`}
    style={{ '--i': index } as CSSProperties}
    onPointerMove={trackPointer}
    onPointerLeave={resetTilt}
  >
    {/* Tilt lives on this inner layer so the pointer is measured against a box that doesn't move. */}
    <div className="growth-card__inner">
      <div className="growth-card__art"><Art /></div>
      <div className="growth-card__text">
        <h3>{title}</h3>
        <p>{description}</p>
        <ul>
          {features.map((feature, featureIndex) =>
            <li key={feature} style={{ '--n': featureIndex } as CSSProperties}>
              <svg className="growth-check" viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="10" cy="10" r="9" />
                <path pathLength={1} d="M5.6 10.4l3 3 5.8-6.4" />
              </svg>
              {feature}
            </li>
          )}
        </ul>
      </div>
    </div>
  </article>
}

export function GrowthSection() {
  return <section className="growth-section">
    <GrowthArtDefs />
    <AnimatedHeading text={growthHeading} />
    <div className="growth-grid">
      {growthCards.map((card, index) => <GrowthCard key={card.title} card={card} index={index} />)}
    </div>
  </section>
}
