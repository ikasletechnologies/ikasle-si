import type { CSSProperties, ReactNode } from 'react'
import type { AutomateNode } from '@/types'
import { gearPath } from './gearPath'

const rhombus = (cx: number, cy: number, a: number) =>
  `${cx - a},${cy} ${cx},${cy - a / 2} ${cx + a},${cy} ${cx},${cy + a / 2}`

function Block({ cx, cy, a, depth, top }: { cx: number; cy: number; a: number; depth: number; top: string }) {
  const front = cy + a / 2
  return <g>
    <polygon points={`${cx - a},${cy} ${cx},${front} ${cx},${front + depth} ${cx - a},${cy + depth}`} fill="url(#automate-left)" />
    <polygon points={`${cx},${front} ${cx + a},${cy} ${cx + a},${cy + depth} ${cx},${front + depth}`} fill="url(#automate-right)" />
    <polygon points={rhombus(cx, cy, a)} fill={top} stroke="#7ceeff" strokeOpacity=".6" strokeLinejoin="round" />
  </g>
}

// Each route starts well inside its node, which is drawn on top, so no gap opens
// as the node floats. Direction shows flow: work comes in on the left, results leave on the right.
const ROUTES: { node: AutomateNode; d: string; end: [number, number] }[] = [
  { node: 'people', d: 'M96 84 V124 Q96 132 104 132 H175', end: [175, 132] },
  { node: 'data', d: 'M108 230 H160 Q175 230 175 215 V184', end: [175, 184] },
  { node: 'check', d: 'M245 132 H322 Q330 132 330 124 V74', end: [245, 132] },
  { node: 'chart', d: 'M245 184 V215 Q245 230 260 230 H318', end: [245, 184] },
]

const GEAR = gearPath(0, 0, 28, 21.5, 9, 10)
const ISO = 'matrix(.89 .45 -.89 .45 0 0)'

function Node({ id, active, order, depth, glow, children }: {
  id: AutomateNode
  active: AutomateNode
  order: number
  depth: number
  glow: [number, number, number]
  children: ReactNode
}) {
  const [cx, cy, radius] = glow
  return <g
    className={`automate-node${id === active ? ' is-on' : ''}`}
    style={{ '--order': order, '--depth': depth } as CSSProperties}
  >
    <g className="automate-node__parallax">
      <g className="automate-node__float">
        <ellipse className="automate-node__glow" cx={cx} cy={cy} rx={radius} ry={radius * 0.8} fill="url(#automate-glow)" />
        <g className="automate-node__lift">{children}</g>
      </g>
    </g>
  </g>
}

function Card({ x, y, tilt, width, height, children }: { x: number; y: number; tilt: number; width: number; height: number; children: ReactNode }) {
  const left = -width / 2
  const top = -height / 2
  return <g transform={`translate(${x} ${y}) matrix(1 ${tilt} 0 1 0 0)`}>
    <rect x={left + 5} y={top + 5} width={width} height={height} rx="10" fill="#052a52" />
    <rect className="automate-card" x={left} y={top} width={width} height={height} rx="10" fill="url(#automate-card)" />
    {children}
  </g>
}

export function AutomateArt({ active }: { active: AutomateNode }) {
  return <svg className="automate-art" viewBox="0 0 420 300" aria-hidden="true">
    <defs>
      <linearGradient id="automate-top" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0f6db8" /><stop offset="1" stopColor="#07305f" />
      </linearGradient>
      <linearGradient id="automate-bright" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#62ecff" /><stop offset="1" stopColor="#0f86e6" />
      </linearGradient>
      <linearGradient id="automate-left" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1273c9" /><stop offset="1" stopColor="#07305f" />
      </linearGradient>
      <linearGradient id="automate-right" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0b5aa8" /><stop offset="1" stopColor="#041f42" />
      </linearGradient>
      <linearGradient id="automate-card" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1590e6" /><stop offset="1" stopColor="#084683" />
      </linearGradient>
      <linearGradient id="automate-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#c9f8ff" /><stop offset="1" stopColor="#35c9f5" />
      </linearGradient>
      <radialGradient id="automate-glow">
        <stop offset="0" stopColor="#00d9f0" stopOpacity=".55" />
        <stop offset="1" stopColor="#00d9f0" stopOpacity="0" />
      </radialGradient>
    </defs>

    <ellipse className="automate-floor-glow" cx="210" cy="170" rx="190" ry="110" fill="url(#automate-glow)" />

    {ROUTES.map(({ node, d }, index) =>
      <g key={node} className={`automate-route${node === active ? ' is-on' : ''}`} style={{ '--order': index } as CSSProperties}>
        <path className="automate-route__line" pathLength={1} d={d} />
        <path className="automate-route__comet" pathLength={1} d={d} />
      </g>
    )}

    <g className="automate-hub">
      <polygon className="automate-hub__ring" points={rhombus(210, 150, 70)} />
      <Block cx={210} cy={150} a={70} depth={16} top="url(#automate-top)" />
      <Block cx={210} cy={138} a={50} depth={8} top="url(#automate-bright)" />
      {[4, 3, 2, 1].map((layer) =>
        <g key={layer} transform={`translate(210 ${130 + layer * 1.5}) ${ISO}`}>
          <path className="automate-gear" d={GEAR} fillRule="evenodd" fill="#06386a" />
        </g>
      )}
      <g transform={`translate(210 130) ${ISO}`}>
        <path className="automate-gear" d={GEAR} fillRule="evenodd" fill="#e8fdff" />
      </g>
    </g>

    {ROUTES.map(({ node, end: [x, y] }) =>
      <circle key={node} className={`automate-joint${node === active ? ' is-on' : ''}`} cx={x} cy={y} r="3.4" />
    )}

    <Node id="people" active={active} order={0} depth={5} glow={[96, 62, 62]}>
      <Card x={96} y={62} tilt={0.1} width={72} height={62}>
        <g fill="none" stroke="#e8fdff" strokeWidth="3" strokeLinecap="round">
          <circle cx="-10" cy="-8" r="7" />
          <path d="M-24 16a14 13 0 0 1 28 0" />
          <circle cx="13" cy="-6" r="5.5" />
          <path d="M10 5a11 11 0 0 1 14 11" />
        </g>
      </Card>
    </Node>

    <Node id="check" active={active} order={1} depth={4} glow={[330, 46, 58]}>
      <Card x={330} y={46} tilt={-0.1} width={64} height={60}>
        <rect x="-18" y="-18" width="36" height="36" rx="7" fill="#ffffff1f" stroke="#e8fdff" strokeOpacity=".65" strokeWidth="2" />
        <path className="automate-check" pathLength={1} d="M-10 0l7 7 13-14" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </Card>
    </Node>

    <Node id="data" active={active} order={2} depth={6} glow={[70, 238, 66]}>
      <g className="automate-slab" style={{ '--slab': '0px' } as CSSProperties}><Block cx={70} cy={252} a={44} depth={9} top="url(#automate-top)" /></g>
      <g className="automate-slab" style={{ '--slab': '-3px' } as CSSProperties}><Block cx={70} cy={236} a={44} depth={9} top="url(#automate-top)" /></g>
      <g className="automate-slab" style={{ '--slab': '-6px' } as CSSProperties}>
        <Block cx={70} cy={220} a={44} depth={9} top="url(#automate-bright)" />
        <g transform={`translate(70 220) ${ISO}`} fill="#e8fdff" fillOpacity=".85">
          <rect x="-14" y="-14" width="28" height="4" rx="2" />
          <rect x="-14" y="-5" width="28" height="4" rx="2" />
          <rect x="-14" y="4" width="18" height="4" rx="2" />
        </g>
      </g>
    </Node>

    <Node id="chart" active={active} order={3} depth={5} glow={[352, 232, 66]}>
      <Card x={352} y={232} tilt={-0.1} width={72} height={80}>
        {[{ x: -24, height: 20 }, { x: -6, height: 36 }, { x: 12, height: 52 }].map(({ x, height }, index) =>
          <rect
            key={x}
            className="automate-bar"
            style={{ '--bar': index } as CSSProperties}
            x={x}
            y={30 - height}
            width="13"
            height={height}
            rx="2.5"
            fill="url(#automate-bar)"
          />
        )}
      </Card>
    </Node>
  </svg>
}
