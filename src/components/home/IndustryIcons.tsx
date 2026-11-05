import type { CSSProperties, ReactNode } from 'react'

const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties

// userSpaceOnUse, because a bounding-box gradient makes straight strokes like the belt on the
// briefcase vanish. Hidden with zero size rather than display:none so the gradient resolves.
export function IndustryIconDefs() {
  return <svg className="industry-defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="industry-stroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0" stopColor="#3ff0ff" /><stop offset="1" stopColor="#0a8bee" />
      </linearGradient>
    </defs>
  </svg>
}

function Icon({ children }: { children: ReactNode }) {
  return <svg className="industry-icon" viewBox="0 0 64 64" fill="none" stroke="url(#industry-stroke)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
}

// Smoke rises from the chimney while the shop-floor windows light up along the line.
export function FactoryIcon() {
  return <Icon>
    {[0, 1, 2].map((index) =>
      <circle key={index} className="industry-smoke" style={delay(index * 0.8)} cx="51" cy="9" r="3" fill="#7ce6fa" stroke="none" />
    )}
    <path d="M6 57V33l14 9v-9l14 9v-9l12 9V13h10v44z" fill="#0a7be038" />
    {[12, 24, 36].map((x, index) =>
      <rect key={x} className="industry-window" style={delay(index * 0.45)} x={x} y="47" width="6" height="5" rx="1" fill="#7ce6fa" stroke="none" />
    )}
  </Icon>
}

// The cart rolls along on turning wheels while an order drops in.
export function CartIcon() {
  return <Icon>
    <rect className="industry-parcel" x="31" y="9" width="11" height="11" rx="2" fill="#7ce6fa" stroke="none" />
    <g className="industry-cart">
      <path d="M5 9h8l7 32h30l6-23H15" />
      {[25, 45].map((cx) =>
        <g key={cx} className="industry-cart-wheel">
          <circle cx={cx} cy="51" r="5" fill="#0b1317" />
          <path d={`M${cx - 2.6} 51h5.2`} strokeWidth="1.8" />
        </g>
      )}
    </g>
  </Icon>
}

// The cap hops with a little pride while its tassel swings.
export function CapIcon() {
  return <Icon>
    <g className="industry-cap">
      <path d="M16 31v13c0 5 8 9 16 9s16-4 16-9V31" />
      <path d="M32 11l28 14-28 14L4 25z" fill="#0b1317" />
      <g className="industry-tassel">
        <path d="M58 26v15" />
        <circle cx="58" cy="44" r="2.4" fill="#7ce6fa" stroke="none" />
      </g>
    </g>
  </Icon>
}

const TOWER_WINDOWS = [
  { x: 26.5, y: 14 }, { x: 33, y: 14 },
  { x: 26.5, y: 24 }, { x: 33, y: 24 },
  { x: 26.5, y: 34 }, { x: 33, y: 34 },
  { x: 13, y: 36 }, { x: 46, y: 30 }, { x: 46, y: 41 },
]
// Lit in an order that reads as people arriving, not a sweep down the columns.
const WINDOW_ORDER = [3, 7, 0, 5, 8, 2, 6, 1, 4]

// Lights come on across the buildings, floor by floor.
export function TowerIcon() {
  return <Icon>
    <path d="M23 57V8h18v49M23 28H8v29M41 22h15v35M4 57h56" />
    {TOWER_WINDOWS.map(({ x, y }, index) =>
      <rect key={`${x}-${y}`} className="industry-light" style={delay(WINDOW_ORDER[index] * 0.42)} x={x} y={y} width="4.5" height="5" rx="1" fill="#7ce6fa" stroke="none" />
    )}
  </Icon>
}

// The case lifts as if picked up, with a ring pushing out from the clasp.
export function BriefcaseIcon() {
  return <Icon>
    <g className="industry-case">
      <path d="M23 18v-5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v5" />
      <rect x="6" y="18" width="52" height="37" rx="6" fill="#0a7be020" />
      <path d="M6 35h22M36 35h22" />
      <circle className="industry-clasp-ring" cx="32" cy="35" r="6" strokeWidth="1.6" />
      <rect className="industry-clasp" x="28" y="31" width="8" height="8" rx="2" fill="#7ce6fa" stroke="none" />
    </g>
  </Icon>
}

// On the road: wheels turning, the lane rushing past and speed lines behind the cargo box.
export function TruckIcon() {
  return <Icon>
    <path className="industry-road" d="M2 58h60" strokeWidth="2" pathLength={60} />
    {[20, 28, 36].map((y, index) =>
      <path key={y} className="industry-speed" style={delay(index * 0.25)} d={`M-8 ${y}h7`} strokeWidth="2" />
    )}
    <g className="industry-truck">
      <path d="M5 13h31a3 3 0 0 1 3 3v29H5a3 3 0 0 1-3-3V16a3 3 0 0 1 3-3z" fill="#0a7be020" />
      <path d="M39 23h10l11 12v10H39z" fill="#0a7be020" />
    </g>
    {[15, 48].map((cx) =>
      <g key={cx} className="industry-truck-wheel">
        <circle cx={cx} cy="47" r="6" fill="#0b1317" />
        <path d={`M${cx - 3} 47h6`} strokeWidth="1.8" />
      </g>
    )}
  </Icon>
}
