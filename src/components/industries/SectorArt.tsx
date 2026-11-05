import type { CSSProperties, ReactNode } from 'react'

const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties
const DEPTH = [1, 0.75, 0.5, 0.25]

// Hidden with zero size rather than display:none, which would stop the gradients resolving.
// The rim uses userSpaceOnUse because a bounding-box gradient makes straight strokes vanish.
export function SectorArtDefs() {
  return <svg className="sector-defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="sector-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1aa8cf" stopOpacity=".62" />
        <stop offset="1" stopColor="#073a55" stopOpacity=".78" />
      </linearGradient>
      <linearGradient id="sector-side" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2bc9ec" />
        <stop offset="1" stopColor="#0a5f85" />
      </linearGradient>
      <radialGradient id="sector-core">
        <stop offset="0" stopColor="#e6fdff" stopOpacity=".95" />
        <stop offset="1" stopColor="#7feeff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="sector-rim" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="170">
        <stop offset="0" stopColor="#d8fcff" />
        <stop offset="1" stopColor="#41e6ff" />
      </linearGradient>
    </defs>
  </svg>
}

// A glass shape with a little thickness: stacked copies of it behind a lit front face.
export function Glass({ d, dx = 0, dy = 0 }: { d: string; dx?: number; dy?: number }) {
  return <>
    {(dx || dy) ? DEPTH.map((step) => <path key={step} d={d} transform={`translate(${dx * step} ${dy * step})`} fill="url(#sector-side)" stroke="none" />) : null}
    <path d={d} fill="url(#sector-glass)" />
  </>
}

// The glowing picture and the moving details are separate drawings. Each moving detail would
// otherwise force the glow to be redrawn every frame, which is what cost earlier sections 8fps.
export function Art({ kind, base, live }: { kind: string; base: ReactNode; live: ReactNode }) {
  const drawing = { viewBox: '0 0 200 170', fill: 'none', stroke: 'url(#sector-rim)', strokeWidth: 2.4, strokeLinejoin: 'round', strokeLinecap: 'round' } as const
  return <div className={`sector-art sector-art--${kind}`} aria-hidden="true">
    <div className="sector-art__floor" />
    <div className="sector-art__body">
      <svg className="sector-art__base" {...drawing}>{base}</svg>
      <svg className="sector-art__live" {...drawing}>{live}</svg>
    </div>
  </div>
}

// Smoke rises from the chimney while the shop-floor windows light up along the line.
export function FactoryArt() {
  return <Art
    kind="factory"
    base={<>
      <Glass d="M12 150V92l36-24v24l36-24v24l36-24V34h30v116z" dx={5} dy={-2} />
      <path d="M120 54h30M120 74h30" strokeWidth="1.8" />
    </>}
    live={<>
      {[0, 1, 2].map((index) => <circle key={index} className="sector-smoke" style={delay(index * 0.9)} cx="136" cy="26" r="6" fill="#9ff3ff" stroke="none" />)}
      {[30, 62, 94].map((x, index) => <rect key={x} className="sector-window" style={delay(index * 0.5)} x={x} y="112" width="18" height="18" rx="2.5" fill="#8ff4ff" stroke="none" />)}
    </>}
  />
}

// The bag sways from its handle while the cart inside rolls along.
export function BagArt() {
  return <Art
    kind="bag"
    base={<>
      <path d="M70 66V46a30 30 0 0 1 60 0v20" strokeWidth="5" />
      <Glass d="M42 62h116l14 90a8 8 0 0 1-8 9H36a8 8 0 0 1-8-9z" dx={3} dy={-1} />
    </>}
    live={<g className="sector-cart">
      <path d="M66 94h12l10 38h40l9-28H82" strokeWidth="3.4" />
      {[96, 122].map((cx) => <g key={cx} className="sector-cart-wheel"><circle cx={cx} cy="146" r="6" fill="#0b2536" strokeWidth="3" /><path d={`M${cx - 3} 146h6`} strokeWidth="1.8" /></g>)}
    </g>}
  />
}

// The cap hops and its tassel swings.
export function CapArt() {
  return <Art
    kind="cap"
    base={<>
      <Glass d="M50 88v34c0 14 23 26 50 26s50-12 50-26V88z" dx={0} dy={2} />
      <Glass d="M100 26l90 40-90 40-90-40z" dx={0} dy={5} />
      <circle cx="100" cy="66" r="3.4" fill="#d8fcff" stroke="none" />
      <path d="M100 66l66 10" strokeWidth="2.6" />
    </>}
    live={<g className="sector-tassel">
      <path d="M166 76v44" strokeWidth="3" />
      <path d="M160 120h12l4 26h-20z" fill="#7feeff" stroke="none" />
    </g>}
  />
}

const TOWER_WINDOWS = [
  ...[60, 78, 96, 114].flatMap((y) => [{ x: 84, y }, { x: 102, y }]),
  ...[64, 82, 100, 118].flatMap((y) => [{ x: 130, y }, { x: 146, y }]),
  { x: 38, y: 100 }, { x: 56, y: 100 }, { x: 38, y: 120 }, { x: 56, y: 120 },
]
// Lit in an order that reads as people arriving, not a sweep down the columns.
const WINDOW_ORDER = [5, 12, 2, 16, 9, 0, 14, 7, 18, 3, 11, 1, 15, 6, 19, 10, 4, 13, 8, 17]

// Lights come on across the buildings.
export function TowerArt() {
  return <Art
    kind="tower"
    base={<>
      <path d="M12 146h176l8 14H4z" fill="url(#sector-glass)" />
      <Glass d="M28 146V88h48v58z" />
      <path d="M122 28l40 16v102h-40z" fill="url(#sector-side)" fillOpacity=".5" />
      <Glass d="M76 44l46-16v118H76z" />
    </>}
    live={TOWER_WINDOWS.map(({ x, y }, index) =>
      <rect key={`${x}-${y}`} className="sector-light" style={delay(WINDOW_ORDER[index] * 0.27)} x={x} y={y} width="10" height="11" rx="1.6" fill="#8ff4ff" stroke="none" />
    )}
  />
}

// The case floats as if carried, with a ring pushing out from the clasp.
export function CaseArt() {
  return <Art
    kind="case"
    base={<>
      <path d="M72 50V38a11 11 0 0 1 11-11h34a11 11 0 0 1 11 11v12" strokeWidth="6" />
      <Glass d="M30 50h140a14 14 0 0 1 14 14v78a14 14 0 0 1-14 14H30a14 14 0 0 1-14-14V64a14 14 0 0 1 14-14z" dx={3} dy={-1} />
      <path d="M16 96c30 14 62 18 72 18M112 114c10 0 42-4 72-18" />
    </>}
    live={<>
      <rect className="sector-clasp-ring" x="86" y="100" width="28" height="28" rx="6" strokeWidth="2" />
      <rect className="sector-clasp" x="86" y="100" width="28" height="28" rx="6" fill="#58dcf2" strokeWidth="2.4" />
    </>}
  />
}

// On the road: wheels turning, the lane rushing past and speed lines behind the cargo box.
export function TruckArt() {
  return <Art
    kind="truck"
    base={<>
      <Glass d="M18 42h102a6 6 0 0 1 6 6v84H18a6 6 0 0 1-6-6V48a6 6 0 0 1 6-6z" dx={3} dy={-1} />
      <Glass d="M126 70h30l30 32v30h-60z" />
      <path d="M138 80h14l18 22h-32z" fill="#9ff3ff" fillOpacity=".3" />
      <path d="M32 74h56M32 92h36" strokeWidth="3.4" />
    </>}
    live={<>
      <path className="sector-road" d="M6 162h188" strokeWidth="3" />
      {[50, 70, 90].map((y, index) => <path key={y} className="sector-speed" style={delay(index * 0.25)} d={`M-6 ${y}h14`} strokeWidth="3" />)}
      {[56, 154].map((cx) =>
        <g key={cx} className="sector-truck-wheel">
          <circle cx={cx} cy="136" r="15" fill="#0b2536" strokeWidth="4" />
          <path d={`M${cx - 7} 136h14`} strokeWidth="3" />
        </g>
      )}
    </>}
  />
}

// Rising bars, each growing in turn.
export function GrowthBarsIcon() {
  return <svg className="sector-bars" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    {[{ x: 4, top: 16 }, { x: 9.5, top: 12 }, { x: 15, top: 8 }, { x: 20.5, top: 3 }].map(({ x, top }, index) =>
      <path key={x} style={delay(index * 0.2)} d={`M${x} 21V${top}`} />
    )}
  </svg>
}
