import { Fragment, type CSSProperties } from 'react'
import { useInView } from '@/hooks/useInView'
import './AnimatedHeading.css'

// `accent` names the trailing words of `text` to pick out in cyan.
export function AnimatedHeading({ text, accent = '' }: { text: string; accent?: string }) {
  const { ref, inView, revealed } = useInView<HTMLElement>()
  const state = `${revealed ? ' is-revealed' : ''}${inView ? '' : ' is-paused'}`
  const words = text.split(' ')
  const accentStart = accent ? words.length - accent.split(' ').length : words.length

  return <header ref={ref} className={`section-heading${state}`}>
    <h2>
      {words.map((word, index) =>
        <Fragment key={index}>
          <span className={`section-heading__word${index >= accentStart ? ' section-heading__word--accent' : ''}`}><span style={{ '--w': index } as CSSProperties}>{word}</span></span>{' '}
        </Fragment>
      )}
    </h2>
    <div className="section-heading__rule" />
  </header>
}
