import type { CSSProperties } from 'react'
import { ContactArt } from '@/components/contact/ContactArt'
import '@/components/contact/ContactView.css'
import { gearPath } from '@/components/home/gearPath'
import { Art, Glass } from '@/components/industries/SectorArt'

const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties

// The same glass chat bubbles as the contact page, dots typing.
export function ChatArt() {
  return <ContactArt variant="card" />
}

const ARROW = <>
  <path d="M28 62a76 76 0 0 1 118-26" strokeWidth="8" />
  <path d="M136 16l28 28-38 8z" fill="#58e6fb" strokeWidth="2.4" />
</>

// The gear turns one way while the arrows sweep around it the other, each as its own layer.
export function TurningGearArt() {
  return <Art
    kind="gear"
    base={<path d={gearPath(100, 85, 46, 35, 15, 8)} fillRule="evenodd" fill="url(#sector-glass)" strokeWidth="2.6" />}
    live={<>
      <g>{ARROW}</g>
      <g transform="rotate(180 100 85)">{ARROW}</g>
    </>}
  />
}

// A laptop running live figures: bars rising, the chart turning, lines filling in.
export function LaptopArt() {
  return <Art
    kind="laptop"
    base={<>
      <Glass d="M46 20l128-12-6 112H36z" dx={3} dy={-1} />
      <path d="M26 124h152l20 24a4 4 0 0 1-3 7H9a4 4 0 0 1-3-7z" fill="url(#sector-glass)" />
    </>}
    live={<>
      {[{ x: 58, h: 16 }, { x: 72, h: 26 }, { x: 86, h: 36 }, { x: 100, h: 46 }].map(({ x, h }, index) =>
        <rect key={x} className="service-bar" style={delay(index * 0.22)} x={x} y={88 - h} width="10" height={h} rx="1.5" fill="#8ff4ff" stroke="none" />
      )}
      <circle cx="140" cy="54" r="17" fill="#8ff4ff" fillOpacity=".3" strokeWidth="2.4" />
      <path className="service-pie" d="M140 54V37a17 17 0 0 1 17 17z" fill="#c8fbff" stroke="none" />
      {[{ y: 98, width: 96 }, { y: 108, width: 62 }].map(({ y, width }, index) =>
        <rect key={y} className="service-line" style={delay(index * 0.4)} x="54" y={y} width={width} height="3.4" rx="1.7" fill="#8ff4ff" stroke="none" />
      )}
    </>}
  />
}

const RAYS = [
  'M100 2v14', 'M46 22l10 10', 'M154 22l-10 10', 'M26 66h14', 'M174 66h-14',
]

// The bulb warms up as an idea takes shape, with its rays lighting in turn.
export function BulbArt() {
  return <Art
    kind="bulb"
    base={<>
      <path d="M60 138h80l22 12-22 14H60l-22-14z" fill="url(#sector-glass)" />
      <path d="M100 24a42 42 0 0 1 25 76c-5 4-7 10-7 18H82c0-8-2-14-7-18a42 42 0 0 1 25-76z" fill="url(#sector-glass)" />
      <path d="M82 118h36v14a6 6 0 0 1-6 6H88a6 6 0 0 1-6-6z" fill="url(#sector-side)" />
      <path d="M82 126h36" strokeWidth="2" />
    </>}
    live={<>
      <circle className="service-bulb-glow" cx="100" cy="64" r="46" fill="url(#sector-core)" stroke="none" />
      <path className="service-filament" d="M88 72l12 14 12-14M100 86v30" strokeWidth="3.4" />
      {RAYS.map((d, index) => <path key={d} className="service-ray" style={delay(index * 0.28)} d={d} strokeWidth="5" />)}
    </>}
  />
}
