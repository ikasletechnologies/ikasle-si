import type { CSSProperties } from 'react'

const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties

// Hidden with zero size rather than display:none, which would stop the gradients resolving.
export function ToolsIconDefs() {
  return <svg className="tools-defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="tools-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#62ecff" /><stop offset="1" stopColor="#0a7be0" />
      </linearGradient>
      <linearGradient id="tools-side-left" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1a8fe0" /><stop offset="1" stopColor="#084683" />
      </linearGradient>
      <linearGradient id="tools-side-right" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0d62b4" /><stop offset="1" stopColor="#052c5a" />
      </linearGradient>
      <linearGradient id="tools-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7cf3ff" /><stop offset="1" stopColor="#0a7be0" />
      </linearGradient>
    </defs>
  </svg>
}

// An enquiry being answered: typing dots inside a bubble that responds as each one lands.
export function EnquiryIcon() {
  return <svg className="tools-icon" viewBox="0 0 64 64" aria-hidden="true">
    <path className="tools-bubble" d="M13 8h38a9 9 0 0 1 9 9v22a9 9 0 0 1-9 9H30L17 59V48h-4a9 9 0 0 1-9-9V17a9 9 0 0 1 9-9z" fill="url(#tools-fill)" />
    {[20, 32, 44].map((cx, index) =>
      <circle key={cx} className="tools-dot" cx={cx} cy="28" r="3.8" style={delay(index * 0.18)} />
    )}
  </svg>
}

// A quotation filling in line by line, ending on a heavier total.
export function QuotationIcon() {
  return <svg className="tools-icon" viewBox="0 0 64 64" aria-hidden="true">
    <rect x="11" y="5" width="42" height="54" rx="6" fill="url(#tools-fill)" />
    <rect x="19" y="13" width="26" height="4.5" rx="2.2" fill="#fff" />
    {[{ y: 24, width: 26 }, { y: 32, width: 26 }, { y: 40, width: 18 }].map(({ y, width }, index) =>
      <rect key={y} className="tools-row" style={delay(index * 0.4)} x="19" y={y} width={width} height="3.6" rx="1.8" fill="#e8fdff" />
    )}
    <rect className="tools-row" style={delay(1.2)} x="30" y="48" width="15" height="4.8" rx="2.2" fill="#04345f" />
  </svg>
}

// The tick is re-drawn on a loop, with a ring pushing out as each request is signed off.
export function ApprovalIcon() {
  return <svg className="tools-icon" viewBox="0 0 64 64" aria-hidden="true">
    <rect className="tools-approve-ring" x="7" y="7" width="50" height="50" rx="10" fill="none" stroke="#a6f6ff" strokeWidth="1.6" />
    <rect x="7" y="7" width="50" height="50" rx="10" fill="url(#tools-fill)" />
    <path className="tools-tick" pathLength={1} d="M19 33l9 9 17-20" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

const CALENDAR_CELLS = [
  { x: 17, y: 32 }, { x: 29, y: 32 }, { x: 41, y: 32 },
  { x: 17, y: 43 }, { x: 29, y: 43 }, { x: 41, y: 43 },
]

// Days ticking by towards a due date, with the rings nudging like a reminder.
export function CalendarIcon() {
  return <svg className="tools-icon" viewBox="0 0 64 64" aria-hidden="true">
    <rect x="7" y="11" width="50" height="46" rx="8" fill="#0a7be02e" stroke="url(#tools-fill)" strokeWidth="4" />
    <path d="M7 19a8 8 0 0 1 8-8h34a8 8 0 0 1 8 8v6H7z" fill="url(#tools-fill)" />
    <g className="tools-rings" fill="#d6fbff">
      <rect x="19" y="5" width="4.5" height="12" rx="2.2" />
      <rect x="40.5" y="5" width="4.5" height="12" rx="2.2" />
    </g>
    {CALENDAR_CELLS.map(({ x, y }, index) =>
      <rect key={`${x}-${y}`} className="tools-cell" style={delay(index * 0.75)} x={x} y={y} width="6.5" height="6.5" rx="1.6" />
    )}
  </svg>
}

// Stock with an alert pinging on its corner.
export function InventoryIcon() {
  return <svg className="tools-icon" viewBox="0 0 64 64" aria-hidden="true">
    <g className="tools-box">
      <polygon points="8,20 32,32 32,58 8,46" fill="url(#tools-side-left)" />
      <polygon points="32,32 56,20 56,46 32,58" fill="url(#tools-side-right)" />
      <polygon points="8,20 32,8 56,20 32,32" fill="url(#tools-fill)" />
      <path d="M8 20l24 12 24-12M32 32v26" fill="none" stroke="#c9f8ff" strokeOpacity=".75" strokeWidth="1.3" />
    </g>
    <circle className="tools-ping" cx="53" cy="12" r="6" fill="none" stroke="#fff" strokeWidth="1.6" />
    <circle className="tools-alert" cx="53" cy="12" r="5" fill="#fff" />
  </svg>
}

// Figures coming in: the bars rise in turn.
export function ReportsIcon() {
  return <svg className="tools-icon" viewBox="0 0 64 64" aria-hidden="true">
    {[{ x: 8, height: 20 }, { x: 26, height: 34 }, { x: 44, height: 50 }].map(({ x, height }, index) =>
      <rect key={x} className="tools-report-bar" style={delay(index * 0.28)} x={x} y={57 - height} width="13" height={height} rx="3" fill="url(#tools-bar)" />
    )}
  </svg>
}
