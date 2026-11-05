import type { CSSProperties, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { inViewClass, useInView } from '@/hooks/useInView'
import type { IconCard, PageName } from '@/types'
import './IndustriesPage.css'

// The building blocks the Industries and Services pages have in common.

export function Revealed({ as: Tag = 'div', className, style, children }: { as?: 'div' | 'article' | 'li' | 'header'; className: string; style?: CSSProperties; children: ReactNode }) {
  const { ref, inView, revealed } = useInView<HTMLElement>()
  const Element = Tag as 'div'
  return <Element ref={ref as never} className={`${className}${inViewClass(revealed, inView)}`} style={style}>{children}</Element>
}

export function SectorHeading({ children, sub }: { children: string; sub?: string }) {
  return <Revealed as="header" className="sector-heading">
    <span className="sector-heading__bar" />
    <div className="sector-heading__text">
      <h2><span>{children}</span></h2>
      {sub && <p>{sub}</p>}
    </div>
  </Revealed>
}

export function StepList({ steps }: { steps: IconCard[] }) {
  // Each step enters as it scrolls into view, but the moving light is timed from the whole
  // list so the steps stay in sequence however far apart they appear.
  const { ref, inView, revealed } = useInView<HTMLOListElement>()
  return <ol ref={ref} className={`sector-steps${inViewClass(revealed, inView)}`}>
    {steps.map(({ title, description, icon: Icon }, index) =>
      <Revealed as="li" key={title} className={`sector-step sector-step--${index + 1}`} style={{ '--i': index } as CSSProperties}>
        <div className="sector-step__inner">
          <div className="sector-step__top">
            <span className="sector-step__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span className="sector-step__icon"><Icon /></span>
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {index < steps.length - 1 && <ChevronRight className="sector-step__arrow" aria-hidden="true" />}
      </Revealed>
    )}
  </ol>
}

interface ContactBandProps {
  heading: string
  text?: string
  action: string
  onNavigate: (page: PageName) => void
}

export function ContactBand({ heading, text, action, onNavigate }: ContactBandProps) {
  return <Revealed className="sector-cta">
    <span className="sector-cta__bar" />
    <div className="sector-cta__copy">
      <h2>{heading}</h2>
      {text && <p>{text}</p>}
    </div>
    <button type="button" className="sector-button sector-button--large" onClick={() => onNavigate('Contact')}>
      <span>{action}</span><ChevronRight aria-hidden="true" />
    </button>
  </Revealed>
}
