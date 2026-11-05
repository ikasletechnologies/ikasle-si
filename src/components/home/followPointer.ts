import type { PointerEvent } from 'react'

// Writes straight to CSS variables so following the pointer never re-renders React.
// For artwork that drifts with the mouse: -1 to 1 across the element.
export function tiltArt(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse') return
  const area = event.currentTarget
  const box = area.getBoundingClientRect()
  area.style.setProperty('--px', String(((event.clientX - box.left) / box.width - 0.5) * 2))
  area.style.setProperty('--py', String(((event.clientY - box.top) / box.height - 0.5) * 2))
}

export function resetArt(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--px', '0')
  event.currentTarget.style.setProperty('--py', '0')
}

export function followPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse') return
  const card = event.currentTarget
  const box = card.getBoundingClientRect()
  card.style.setProperty('--mx', `${event.clientX - box.left}px`)
  card.style.setProperty('--my', `${event.clientY - box.top}px`)
}
