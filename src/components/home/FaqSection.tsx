import { useId, useState, type CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqHeadingLines, faqs } from '@/data/content'
import { inViewClass, useInView } from '@/hooks/useInView'
import type { FaqItem as FaqItemData } from '@/types'
import './FaqSection.css'

interface FaqItemProps {
  item: FaqItemData
  index: number
  open: boolean
  onToggle: () => void
}

function FaqItem({ item, index, open, onToggle }: FaqItemProps) {
  const id = useId()
  const buttonId = `${id}-question`
  const answerId = `${id}-answer`

  return <div className={`faq-item${open ? ' is-open' : ''}`} style={{ '--i': index } as CSSProperties}>
    <h3>
      <button id={buttonId} type="button" className="faq-question" aria-expanded={open} aria-controls={answerId} onClick={onToggle}>
        <span>{item.question}</span>
        <ChevronDown className="faq-chevron" aria-hidden="true" />
      </button>
    </h3>
    <div id={answerId} role="region" aria-labelledby={buttonId} className="faq-answer">
      <div className="faq-answer__clip"><p>{item.answer}</p></div>
    </div>
  </div>
}

export function FaqSection() {
  return <FaqBlock lines={faqHeadingLines} items={faqs} initialOpen={0} />
}

interface FaqBlockProps {
  lines: string[]
  items: FaqItemData[]
  initialOpen: number | null
}

export function FaqBlock({ lines, items, initialOpen }: FaqBlockProps) {
  const { ref, inView, revealed } = useInView<HTMLDivElement>()
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpen)

  return <section className="faq-section">
    <div ref={ref} className={`faq-layout${inViewClass(revealed, inView)}`}>
      <header className="faq-heading">
        <h2>
          {lines.map((line, index) =>
            <span key={line} className="faq-heading__line"><span style={{ '--l': index } as CSSProperties}>{line}</span>{' '}</span>
          )}
        </h2>
        <div className="faq-heading__rule" />
      </header>
      <div className="faq-panel">
        {items.map((item, index) =>
          <FaqItem
            key={item.question}
            item={item}
            index={index}
            open={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        )}
      </div>
    </div>
  </section>
}
