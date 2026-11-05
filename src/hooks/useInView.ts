import { useEffect, useRef, useState } from 'react'

// `revealed` latches on first sight to play an entrance once. `inView` keeps tracking
// so looping animations can pause while off screen.
export const inViewClass = (revealed: boolean, inView: boolean) =>
  `${revealed ? ' is-revealed' : ''}${inView ? '' : ' is-paused'}`

export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setRevealed(true)
      },
      { threshold: 0.15, rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, inView, revealed }
}
