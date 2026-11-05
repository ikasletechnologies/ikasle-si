import { useEffect, useState, type CSSProperties, type PointerEvent } from 'react'
import { ChevronRight } from 'lucide-react'
import { automateItems, automateLines } from '@/data/content'
import { useInView } from '@/hooks/useInView'
import type { PageName } from '@/types'
import { AutomateArt } from './AutomateArt'
import './AutomateSection.css'

const CYCLE_MS = 3000

const stateClass = (revealed: boolean, inView: boolean) =>
  `${revealed ? ' is-revealed' : ''}${inView ? '' : ' is-paused'}`

// Written directly to CSS variables so tracking the pointer never re-renders React.
function trackParallax(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse') return
  const panel = event.currentTarget
  const bounds = panel.getBoundingClientRect()
  panel.style.setProperty('--px', String(((event.clientX - bounds.left) / bounds.width - 0.5) * 2))
  panel.style.setProperty('--py', String(((event.clientY - bounds.top) / bounds.height - 0.5) * 2))
}

function resetParallax(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--px', '0')
  event.currentTarget.style.setProperty('--py', '0')
}

export function AutomateSection({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  const { ref: copyRef, revealed: copyRevealed, inView: copyInView } = useInView<HTMLDivElement>()
  const { ref: artRef, revealed: artRevealed, inView: artInView } = useInView<HTMLDivElement>()
  const { ref: listRef, revealed: listRevealed, inView: listInView } = useInView<HTMLUListElement>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHeld, setIsHeld] = useState(false)
  const isVisible = artInView || listInView

  // Steps through the list on its own until someone hovers or focuses it.
  useEffect(() => {
    if (!isVisible || isHeld || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setActiveIndex((index) => (index + 1) % automateItems.length), CYCLE_MS)
    return () => clearInterval(timer)
  }, [isVisible, isHeld])

  return <section className="automate-section">
    {/* The section is the size container, and a container can't restyle itself, so the grid sits inside. */}
    <div className="automate-grid">
      <div ref={copyRef} className={`automate-copy${stateClass(copyRevealed, copyInView)}`}>
        <h2>
          {automateLines.map((line, index) =>
            <span key={line} className="automate-copy__line">
              <span style={{ '--line': index } as CSSProperties}>{line}</span>{' '}
            </span>
          )}
        </h2>
        <div className="automate-copy__rule" />
      </div>

      <div
        ref={artRef}
        className={`automate-diagram${stateClass(artRevealed, artInView)}`}
        onPointerMove={trackParallax}
        onPointerLeave={resetParallax}
      >
        <AutomateArt active={automateItems[activeIndex].node} />
      </div>

      <ul
        ref={listRef}
        className={`automate-list${stateClass(listRevealed, listInView)}${isHeld ? ' is-held' : ''}`}
        onPointerEnter={() => setIsHeld(true)}
        onPointerLeave={() => setIsHeld(false)}
        onFocus={() => setIsHeld(true)}
        onBlur={() => setIsHeld(false)}
      >
        {automateItems.map(({ label }, index) =>
          <li key={label} style={{ '--n': index } as CSSProperties}>
            <button
              className={`automate-item${index === activeIndex ? ' is-active' : ''}`}
              onClick={() => onNavigate('Automation')}
              onPointerEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            >
              <span>{label}</span>
              <ChevronRight aria-hidden="true" />
            </button>
          </li>
        )}
      </ul>
    </div>
  </section>
}
