import type { CSSProperties } from 'react'
import { processHeading, processSteps } from '@/data/content'
import { inViewClass, useInView } from '@/hooks/useInView'
import type { ProcessStep as ProcessStepData } from '@/types'
import { AnimatedHeading } from './AnimatedHeading'
import './ProcessSection.css'

function ProcessStep({ step, index }: { step: ProcessStepData; index: number }) {
  const { ref, revealed } = useInView<HTMLLIElement>()

  return <li ref={ref} className={`process-step${revealed ? ' is-revealed' : ''}`} style={{ '--i': index } as CSSProperties}>
    <div className="process-step__inner">
      <span className="process-step__tile" aria-hidden="true">{index + 1}</span>
      <div className="process-step__text">
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
    </div>
  </li>
}

export function ProcessSection() {
  // Each step enters when it scrolls into view, but the "current step" light is timed from
  // the list as a whole so the six stay in sequence however far apart they appear.
  const { ref, inView, revealed } = useInView<HTMLOListElement>()

  return <section className="process-section">
    <AnimatedHeading text={processHeading} />
    <ol ref={ref} className={`process-grid${inViewClass(revealed, inView)}`}>
      {processSteps.map((step, index) => <ProcessStep key={step.title} step={step} index={index} />)}
    </ol>
  </section>
}
