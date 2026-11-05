import type { ReactNode } from 'react'

// userSpaceOnUse, because a bounding-box gradient makes straight strokes vanish.
// Hidden with zero size rather than display:none so the gradient resolves.
export function WhyIconDefs() {
  return <svg className="why-defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="why-stroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0" stopColor="#3ff0ff" /><stop offset="1" stopColor="#0a8bee" />
      </linearGradient>
    </defs>
  </svg>
}

function Icon({ children }: { children: ReactNode }) {
  return <svg className="why-icon" viewBox="0 0 64 64" fill="none" stroke="url(#why-stroke)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
}

// A dart flies into the bullseye and the rings ripple from the hit: built around your goals.
export function TargetIcon() {
  return <Icon>
    <circle className="why-ripple" cx="28" cy="36" r="24" strokeWidth="1.6" />
    <circle cx="28" cy="36" r="24" />
    <circle cx="28" cy="36" r="14" />
    <circle className="why-bull" cx="28" cy="36" r="5" fill="#7ce6fa" stroke="none" />
    <g className="why-dart">
      <path d="M28 36L52 12" />
      <path d="M46 8v10h10l6-6h-6V2z" fill="#0b1317" />
    </g>
  </Icon>
}

// The person in front stays put while the team behind nods along: people stay in control.
export function PeopleIcon() {
  return <Icon>
    <g className="why-person why-person--back">
      <path d="M41 13a9.5 9.5 0 0 1 0 18.5" />
      <path d="M47 38c6.5 2.5 11 8.5 11 16" />
    </g>
    <circle className="why-person-pulse" cx="25" cy="22" r="11" strokeWidth="1.6" />
    <g className="why-person why-person--front">
      <circle cx="25" cy="22" r="10.5" fill="#0b1317" />
      <path d="M6 54c0-11 8.5-17 19-17s19 6 19 17" />
    </g>
  </Icon>
}

// The stack opens up and settles as a new layer is added: designed to grow.
export function LayersGrowIcon() {
  return <Icon>
    <path className="why-layer why-layer--bottom" d="M6 44l26 13 26-13" />
    <path className="why-layer why-layer--middle" d="M6 33l26 13 26-13" />
    <path className="why-layer why-layer--top" d="M32 7l26 13-26 13L6 20z" fill="#0a7be030" />
  </Icon>
}
