import type { CSSProperties } from 'react'
import { gearPath } from './gearPath'

const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties

// Gradients shared by all four illustrations. Hidden with zero size rather than
// display:none, which would stop the gradients resolving.
export function GrowthArtDefs() {
  return <svg className="growth-art-defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="growth-top" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7cecff" /><stop offset="1" stopColor="#1496f0" />
      </linearGradient>
      <linearGradient id="growth-left" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1273c9" /><stop offset="1" stopColor="#07305f" />
      </linearGradient>
      <linearGradient id="growth-right" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0b5aa8" /><stop offset="1" stopColor="#041f42" />
      </linearGradient>
      <linearGradient id="growth-plate" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0f4f8f" /><stop offset="1" stopColor="#062a52" />
      </linearGradient>
      <linearGradient id="growth-gear" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#62dcff" /><stop offset="1" stopColor="#0a68bd" />
      </linearGradient>
      <linearGradient id="growth-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6ff0ff" /><stop offset="1" stopColor="#0a6cc2" />
      </linearGradient>
      <linearGradient id="growth-screen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0c2c4c" /><stop offset="1" stopColor="#051426" />
      </linearGradient>
      <linearGradient id="growth-scan" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#7cecff" stopOpacity="0" />
        <stop offset=".5" stopColor="#7cecff" stopOpacity=".32" />
        <stop offset="1" stopColor="#7cecff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="growth-arrow" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#0a6cc2" stopOpacity=".15" />
        <stop offset=".55" stopColor="#14a4f0" />
        <stop offset="1" stopColor="#7cf3ff" />
      </linearGradient>
      <radialGradient id="growth-glow">
        <stop offset="0" stopColor="#00d9f0" stopOpacity=".6" />
        <stop offset="1" stopColor="#00d9f0" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
}

const rhombus = (cx: number, cy: number, a: number) =>
  `${cx - a},${cy} ${cx},${cy - a / 2} ${cx + a},${cy} ${cx},${cy + a / 2}`

function IsoBlock({ cx, cy, a, depth, top = 'url(#growth-top)' }: { cx: number; cy: number; a: number; depth: number; top?: string }) {
  const front = cy + a / 2
  return <g className="growth-block">
    <polygon points={`${cx - a},${cy} ${cx},${front} ${cx},${front + depth} ${cx - a},${cy + depth}`} fill="url(#growth-left)" />
    <polygon points={`${cx},${front} ${cx + a},${cy} ${cx + a},${cy + depth} ${cx},${front + depth}`} fill="url(#growth-right)" />
    <polygon points={rhombus(cx, cy, a)} fill={top} />
  </g>
}

function Floor({ cx, cy, a }: { cx: number; cy: number; a: number }) {
  return <g className="growth-floor">
    <ellipse cx={cx} cy={cy} rx={a * 1.25} ry={a * 0.5} fill="url(#growth-glow)" />
    <polygon points={rhombus(cx, cy, a)} fill="#07263f" stroke="#1fc6ee" strokeOpacity=".55" />
  </g>
}

function Sparks({ points }: { points: [number, number, number][] }) {
  return <>{points.map(([x, y, start]) =>
    <circle key={`${x}-${y}`} className="growth-spark" cx={x} cy={y} r="1.5" style={delay(start)} />
  )}</>
}

export function ChipArt() {
  return <svg className="growth-art growth-art--chip" viewBox="0 0 200 152" aria-hidden="true">
    <Floor cx={100} cy={114} a={66} />
    <g className="growth-traces" fill="none" stroke="#35d9f5" strokeWidth="1.4">
      <path pathLength={1} d="M34 114 L16 105 L16 93" />
      <path pathLength={1} d="M166 114 L184 105 L184 93" />
      <path pathLength={1} d="M68 131 L54 139" />
      <path pathLength={1} d="M132 131 L146 139" />
    </g>
    <g className="growth-chip-layer" style={delay(0.1)}>
      <g className="growth-chip-float" style={{ '--lift': '-2px', '--spread': '0px' } as CSSProperties}>
        <g className="growth-chip-spread"><IsoBlock cx={100} cy={92} a={60} depth={8} top="url(#growth-plate)" /></g>
      </g>
    </g>
    <g className="growth-chip-layer" style={delay(0.28)}>
      <g className="growth-chip-float" style={{ '--lift': '-4px', '--spread': '-6px' } as CSSProperties}>
        <g className="growth-chip-spread"><IsoBlock cx={100} cy={75} a={54} depth={7} top="url(#growth-plate)" /></g>
      </g>
    </g>
    <g className="growth-chip-layer" style={delay(0.46)}>
      <g className="growth-chip-float" style={{ '--lift': '-7px', '--spread': '-13px' } as CSSProperties}>
        <g className="growth-chip-spread">
          <IsoBlock cx={100} cy={56} a={50} depth={9} />
          <polygon className="growth-chip-face" points={rhombus(100, 56, 41)} />
          <polygon className="growth-chip-ring" points={rhombus(100, 56, 50)} />
          <text className="growth-chip-text" transform="translate(100 56) matrix(.89 -.45 .89 .45 0 0)" textAnchor="middle" dominantBaseline="central">AI</text>
        </g>
      </g>
    </g>
    <Sparks points={[[46, 66, 0], [158, 58, 1.1], [130, 22, 2.2], [68, 28, 3]]} />
  </svg>
}

// Each depth layer spins about its own centre, so the 3D edge stays pointing the
// same way as the teeth turn. The small gears' phase and spacing make the teeth mesh.
const MAIN = { cx: 100, cy: 58, d: gearPath(100, 58, 44, 35, 14, 12) }
const LEFT = { cx: 57.2, cy: 100.8, d: gearPath(57.2, 100.8, 23, 16.5, 7, 6, 15) }
const RIGHT = { cx: 142.8, cy: 100.8, d: gearPath(142.8, 100.8, 23, 16.5, 7, 6, -15) }

function Gear({ gear, spin, start }: { gear: { cx: number; cy: number; d: string }; spin: string; start: number }) {
  const origin = { transformOrigin: `${gear.cx}px ${gear.cy}px` }
  return <g className="growth-gear-pop" style={{ ...origin, ...delay(start) }}>
    {[4, 3, 2, 1].map((layer) =>
      <g key={layer} transform={`translate(${layer * 1.5} ${layer * 1.1})`}>
        <path className={spin} style={origin} d={gear.d} fillRule="evenodd" fill="#06386a" />
      </g>
    )}
    <path className={`${spin} growth-gear-face`} style={origin} d={gear.d} fillRule="evenodd" fill="url(#growth-gear)" />
  </g>
}

export function GearArt() {
  return <svg className="growth-art growth-art--gear" viewBox="0 0 200 152" aria-hidden="true">
    <Floor cx={100} cy={118} a={66} />
    <Gear gear={LEFT} spin="growth-spin-back" start={0.45} />
    <Gear gear={RIGHT} spin="growth-spin-back" start={0.6} />
    <Gear gear={MAIN} spin="growth-spin" start={0.15} />
    <Sparks points={[[24, 62, 0.4], [176, 54, 1.6], [150, 20, 2.6], [44, 24, 3.3]]} />
  </svg>
}

const BARS = [
  { x: 48, height: 20 },
  { x: 74, height: 34 },
  { x: 100, height: 50 },
  { x: 126, height: 68 },
]

export function ChartArt() {
  return <svg className="growth-art growth-art--chart" viewBox="0 0 200 152" aria-hidden="true">
    <clipPath id="growth-screen-clip"><rect x="36" y="16" width="128" height="90" rx="7" /></clipPath>
    <Floor cx={100} cy={118} a={62} />
    <g className="growth-screen" transform="matrix(1 -.16 0 1 0 16)">
      <rect x="42" y="21" width="128" height="90" rx="7" fill="#06386a" />
      <rect x="36" y="16" width="128" height="90" rx="7" fill="url(#growth-screen)" stroke="#39d7f5" strokeOpacity=".75" strokeWidth="1.3" />
      <g clipPath="url(#growth-screen-clip)">
        <g stroke="#6fdcf5" strokeOpacity=".14">
          <line x1="36" y1="38" x2="164" y2="38" /><line x1="36" y1="58" x2="164" y2="58" /><line x1="36" y1="78" x2="164" y2="78" />
        </g>
        {BARS.map(({ x, height }, index) =>
          <g key={x} className="growth-bar" style={delay(0.35 + index * 0.13)}>
            <rect className="growth-bar-idle" style={delay(index * 0.5)} x={x} y={98 - height} width="18" height={height} rx="2.5" fill="url(#growth-bar)" />
          </g>
        )}
        <polyline className="growth-line" pathLength={1} points="57,70 83,56 109,40 135,22" />
        <polyline className="growth-line-comet" pathLength={1} points="57,70 83,56 109,40 135,22" />
        <rect className="growth-scan" x="36" y="16" width="44" height="90" fill="url(#growth-scan)" />
      </g>
    </g>
    <Sparks points={[[22, 72, 0.2], [180, 40, 1.4], [176, 90, 2.5], [28, 34, 3.2]]} />
  </svg>
}

export function GrowthChartArt() {
  return <svg className="growth-art growth-art--growth" viewBox="0 0 200 152" aria-hidden="true">
    <Floor cx={104} cy={118} a={66} />
    <g className="growth-cube" style={delay(0.2)}><IsoBlock cx={60} cy={102} a={20} depth={14} /></g>
    <g className="growth-cube" style={delay(0.35)}><IsoBlock cx={105} cy={86} a={23} depth={30} /></g>
    <g className="growth-cube" style={delay(0.5)}><IsoBlock cx={150} cy={66} a={23} depth={50} /></g>
    <path className="growth-arrow-line" pathLength={1} d="M14 104 C 70 104, 130 76, 176 22" />
    <path className="growth-arrow-comet" pathLength={1} d="M14 104 C 70 104, 130 76, 176 22" />
    <g transform="translate(176 22) rotate(-49.6)">
      <polygon className="growth-arrow-head" points="17,0 -6,-13 -6,13" fill="#7cf3ff" />
    </g>
    <Sparks points={[[32, 70, 0.6], [80, 46, 1.7], [124, 26, 2.6], [188, 62, 3.4]]} />
  </svg>
}
