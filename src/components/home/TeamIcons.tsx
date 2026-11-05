import type { CSSProperties } from 'react'

const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties

// Hidden with zero size rather than display:none, which would stop the gradients resolving.
export function TeamIconDefs() {
  return <svg className="team-defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="team-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#62ecff" /><stop offset="1" stopColor="#0a7be0" />
      </linearGradient>
      <linearGradient id="team-fill-soft" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2aa8ee" /><stop offset="1" stopColor="#0a4f9e" />
      </linearGradient>
      <linearGradient id="team-scan" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset=".5" stopColor="#fff" stopOpacity=".75" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <clipPath id="team-page-clip">
        <path d="M14 6h24l14 14v36a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" />
      </clipPath>
    </defs>
  </svg>
}

const layer = (cy: number) => `8,${cy} 32,${cy - 12} 56,${cy} 32,${cy + 12}`
const star = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z`

// Typing indicator.
export function ChatIcon() {
  return <svg className="team-icon team-icon--chat" viewBox="0 0 64 64" aria-hidden="true">
    <path className="team-chat-bubble" d="M12 8h40a8 8 0 0 1 8 8v24a8 8 0 0 1-8 8H30L16 60V48h-4a8 8 0 0 1-8-8V16a8 8 0 0 1 8-8z" fill="url(#team-fill)" />
    {[20, 32, 44].map((cx, index) =>
      <circle key={cx} className="team-chat-dot" cx={cx} cy="28" r="3.6" style={delay(index * 0.16)} />
    )}
  </svg>
}

// Layers lift apart as if being searched through, with a light passing up the stack.
export function LayersIcon() {
  return <svg className="team-icon team-icon--layers" viewBox="0 0 64 64" aria-hidden="true">
    <polygon className="team-layer" style={{ ...delay(0), '--lift': '0px' } as CSSProperties} points={layer(46)} fill="url(#team-fill-soft)" />
    <polygon className="team-layer" style={{ ...delay(0.15), '--lift': '-3px' } as CSSProperties} points={layer(33)} fill="url(#team-fill-soft)" />
    <polygon className="team-layer team-layer--top" style={{ ...delay(0.3), '--lift': '-6px' } as CSSProperties} points={layer(20)} fill="url(#team-fill)" />
  </svg>
}

// A page being read: a light scans down while the lines of text are written in.
export function DocumentIcon() {
  return <svg className="team-icon team-icon--doc" viewBox="0 0 64 64" aria-hidden="true">
    <path d="M14 6h24l14 14v36a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" fill="url(#team-fill)" />
    <path d="M38 6l14 14H42a4 4 0 0 1-4-4z" fill="#c9f8ff" />
    {[{ y: 27, width: 30 }, { y: 36, width: 30 }, { y: 45, width: 19 }].map(({ y, width }, index) =>
      <rect key={y} className="team-doc-line" style={delay(index * 0.35)} x="17" y={y} width={width} height="3.6" rx="1.8" />
    )}
    <g clipPath="url(#team-page-clip)">
      <rect className="team-doc-scan" x="8" y="-6" width="46" height="14" fill="url(#team-scan)" />
    </g>
  </svg>
}

export function SparkleIcon() {
  return <svg className="team-icon team-icon--sparkle" viewBox="0 0 64 64" aria-hidden="true">
    <path className="team-star" style={delay(0)} d={star(25, 37, 23)} fill="url(#team-fill)" />
    <path className="team-star" style={delay(0.7)} d={star(50, 14, 11)} fill="url(#team-fill)" />
    <path className="team-star" style={delay(1.3)} d={star(52, 50, 7.5)} fill="url(#team-fill)" />
  </svg>
}

// The lens roams as if looking for something, with a glint crossing the glass.
export function SearchIcon() {
  return <svg className="team-icon team-icon--search" viewBox="0 0 64 64" aria-hidden="true">
    <g className="team-lens">
      <circle cx="27" cy="27" r="18" fill="#0a7be02e" />
      <path className="team-lens-glint" d="M16 25a12 12 0 0 1 9-10" fill="none" stroke="#d6fbff" strokeWidth="3" strokeLinecap="round" />
      <circle className="team-draw" pathLength={1} cx="27" cy="27" r="18" fill="none" stroke="url(#team-fill)" strokeWidth="6" />
      <line className="team-draw" style={delay(0.35)} pathLength={1} x1="41" y1="41" x2="57" y2="57" stroke="#1aa6ee" strokeWidth="8" strokeLinecap="round" />
    </g>
  </svg>
}

// Two links pull together and a spark marks the moment they connect.
export function LinkIcon() {
  return <svg className="team-icon team-icon--link" viewBox="0 0 64 64" aria-hidden="true">
    <g transform="rotate(-45 32 32)" fill="none" strokeWidth="6.5">
      <rect className="team-draw team-link team-link--a" pathLength={1} x="3" y="23" width="33" height="18" rx="9" stroke="#1aa6ee" />
      <rect className="team-draw team-link team-link--b" style={delay(0.2)} pathLength={1} x="28" y="23" width="33" height="18" rx="9" stroke="url(#team-fill)" />
    </g>
    <circle className="team-link-spark" cx="32" cy="32" r="4" />
  </svg>
}
