import { type CSSProperties, type ReactNode } from 'react'
import { Bell, CalendarDays, Handshake, SquareCheckBig, Users, type LucideIcon } from 'lucide-react'
import { gearPath } from '@/components/home/gearPath'
import { Art, Glass } from '@/components/industries/SectorArt'

const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties

/* ---------- Hero: a turning glass gear with the work it connects ---------- */

const HERO_GEAR = gearPath(100, 100, 94, 72, 34, 10)
const GEAR_DEPTH = [5, 4, 3, 2, 1]

const HERO_TILES: { name: string; icon: LucideIcon }[] = [
  { name: 'people', icon: Users },
  { name: 'check', icon: SquareCheckBig },
  { name: 'bell', icon: Bell },
  { name: 'calendar', icon: CalendarDays },
]

const LINKS = ['M25 18H45V30', 'M104 14H85V26', 'M24 58H44V50', 'M106 60H86V52']

// Each layer of the gear turns as a finished picture, stacked with a small offset for thickness,
// so its glow is never redrawn and the thickness always falls the same way as it turns.
function HeroGear() {
  return <div className="auto-gear">
    {GEAR_DEPTH.map((offset) =>
      <div key={offset} className="auto-gear__layer auto-gear__layer--back" style={{ '--off': offset } as CSSProperties}>
        <svg viewBox="0 0 200 200"><path d={HERO_GEAR} fillRule="evenodd" fill="#0d86ad" stroke="#37dcf7" strokeWidth="1.2" /></svg>
      </div>
    )}
    <div className="auto-gear__layer">
      <svg viewBox="0 0 200 200"><path d={HERO_GEAR} fillRule="evenodd" fill="url(#auto-gear-face)" stroke="#b6f8ff" strokeWidth="2.4" strokeLinejoin="round" /></svg>
    </div>
  </div>
}

export function AutomationHeroArt() {
  return <div className="auto-art" aria-hidden="true">
    <svg width="0" height="0" className="auto-defs">
      <defs>
        <linearGradient id="auto-gear-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#45d8f6" />
          <stop offset=".55" stopColor="#1491c4" />
          <stop offset="1" stopColor="#0a5f8e" />
        </linearGradient>
      </defs>
    </svg>
    <div className="auto-art__glow" />
    <svg className="auto-links" viewBox="0 0 130 100">
      {LINKS.map((d, index) =>
        <g key={d}>
          <path className="auto-link" pathLength={44} d={d} />
          <path className="auto-link__pulse" pathLength={44} style={delay(index * 0.7)} d={d} />
        </g>
      )}
    </svg>
    <div className="auto-pedestal">
      <svg className="auto-pedestal__ripple" viewBox="0 0 240 100"><ellipse cx="120" cy="46" rx="112" ry="30" fill="none" stroke="#6ff0ff" strokeWidth="1.6" /></svg>
      <svg className="auto-pedestal__body" viewBox="0 0 240 100">
        <ellipse cx="120" cy="60" rx="112" ry="30" fill="#0a7396" stroke="#4febff" strokeWidth="2.6" />
        <rect x="8" y="46" width="224" height="14" fill="#0a7396" />
        <ellipse cx="120" cy="46" rx="112" ry="30" fill="#082c40" stroke="#a8f6ff" strokeWidth="1.8" />
        <ellipse cx="120" cy="46" rx="72" ry="18" fill="#0f6e93" stroke="#8df3ff" strokeWidth="1.4" />
      </svg>
    </div>
    <HeroGear />
    {HERO_TILES.map(({ name, icon: Icon }) =>
      <div key={name} className={`auto-tile auto-tile--${name}`}>
        <div className="auto-tile__float"><div className="auto-tile__glass"><Icon /></div></div>
      </div>
    )}
  </div>
}

/* ---------- Business areas ---------- */

// Hands shaking, with a spark as the deal lands.
export function HandshakeArt() {
  return <Art
    kind="handshake"
    base={<Handshake x="18" y="6" width="164" height="164" strokeWidth={1.25} stroke="#7ff0ff" fill="#0a7be02e" />}
    live={['M100 2v14', 'M64 10l8 12', 'M136 10l-8 12'].map((d, index) => <path key={d} className="auto-spark" style={delay(index * 0.1)} d={d} strokeWidth="4" />)}
  />
}

// A headset with a voice coming through it.
export function HeadsetArt() {
  return <Art
    kind="headset"
    base={<>
      <path d="M36 100V82a64 64 0 0 1 128 0v18" strokeWidth="7" />
      <Glass d="M26 92h20a4 4 0 0 1 4 4v42a4 4 0 0 1-4 4H26a10 10 0 0 1-10-10v-30a10 10 0 0 1 10-10z" />
      <Glass d="M174 92h-20a4 4 0 0 0-4 4v42a4 4 0 0 0 4 4h20a10 10 0 0 0 10-10v-30a10 10 0 0 0-10-10z" />
      <path d="M170 142c0 12-16 19-40 19" strokeWidth="4" />
      <rect x="106" y="154" width="26" height="14" rx="7" fill="#58e6fb" />
    </>}
    live={[{ x: 76, h: 26 }, { x: 90, h: 44 }, { x: 104, h: 34 }, { x: 118, h: 20 }].map(({ x, h }, index) =>
      <rect key={x} className="auto-voice" style={delay(index * 0.14)} x={x} y={112 - h / 2} width="7" height={h} rx="3.5" fill="#8ff4ff" stroke="none" />
    )}
  />
}

function Coin({ cx, y }: { cx: number; y: number }) {
  const rx = 36
  const ry = 12
  const height = 17
  return <>
    <path d={`M${cx - rx} ${y}v${-height}a${rx} ${ry} 0 0 0 ${rx * 2} 0v${height}a${rx} ${ry} 0 0 1 ${-rx * 2} 0z`} fill="url(#sector-side)" />
    <ellipse cx={cx} cy={y - height} rx={rx} ry={ry} fill="url(#sector-glass)" />
  </>
}

const stackOf = (cx: number, count: number) =>
  Array.from({ length: count }, (_, index) => <Coin key={index} cx={cx} y={150 - index * 18} />)

// Figures adding up: a coin drops onto the lower stack.
export function CoinsArt() {
  return <Art
    kind="coins"
    base={<>
      {stackOf(138, 6)}
      {stackOf(62, 3)}
    </>}
    live={<g className="auto-coin"><Coin cx={62} y={96} /></g>}
  />
}

// A solid block of operations, with light running along its edges and glowing from within.
export function CubeArt() {
  return <Art
    kind="cube"
    base={<>
      <path d="M38 50l62 32v76l-62-32z" fill="url(#sector-glass)" />
      <path d="M162 50l-62 32v76l62-32z" fill="url(#sector-side)" fillOpacity=".5" />
      <path d="M100 18l62 32-62 32-62-32z" fill="url(#sector-glass)" />
    </>}
    live={<>
      <circle className="auto-core" cx="100" cy="92" r="44" fill="url(#sector-core)" stroke="none" />
      <path className="auto-edge" pathLength={100} d="M38 50l62 32 62-32M100 82v76" strokeWidth="3.4" />
    </>}
  />
}

/* ---------- Connected workflow ---------- */

const SLAB = 'M88 98Q100 94 112 98L178 124Q188 130 178 136L112 162Q100 166 88 162L22 136Q12 130 22 124Z'
const SLAB_EDGE = 'M16 132Q18 134 22 136L88 162Q100 166 112 162L178 136Q182 134 184 132'
const SLAB_DEPTH = [9, 6, 3]
const DRAWING = { viewBox: '0 0 200 170', fill: 'none', stroke: 'url(#sector-rim)', strokeWidth: 2.4, strokeLinejoin: 'round', strokeLinecap: 'round' } as const

// The slab stays put while the icon above it lifts on its turn.
function StageArt({ icon, live }: { icon: ReactNode; live: ReactNode }) {
  return <div className="auto-stage-art" aria-hidden="true">
    <svg className="auto-slab" {...DRAWING}>
      {SLAB_DEPTH.map((step) => <path key={step} d={SLAB} transform={`translate(0 ${step})`} fill="#0a7396" stroke="none" />)}
      <path d={SLAB_EDGE} transform="translate(0 9)" stroke="#4febff" />
      <path d={SLAB} fill="#082c40" stroke="#8df3ff" strokeWidth="1.6" />
    </svg>
    <svg className="auto-slab-lit" {...DRAWING}><path d={SLAB_EDGE} transform="translate(0 9)" stroke="#d8fcff" strokeWidth="3.4" /></svg>
    <div className="auto-stage-art__icon">
      <svg className="auto-stage-art__glass" {...DRAWING}>{icon}</svg>
      <svg className="auto-stage-art__live" {...DRAWING}>{live}</svg>
    </div>
  </div>
}

// Details are written onto the page.
export function CaptureArt() {
  return <StageArt
    icon={<>
      <Glass d="M66 8h48l24 24v72a6 6 0 0 1-6 6H66a6 6 0 0 1-6-6V14a6 6 0 0 1 6-6z" />
      <path d="M114 8v24h24" />
    </>}
    live={[{ y: 50, w: 56 }, { y: 66, w: 56 }, { y: 82, w: 36 }].map(({ y, w }, index) =>
      <rect key={y} className="auto-doc-line" style={delay(index * 0.28)} x="72" y={y} width={w} height="5" rx="2.5" fill="#d8fcff" stroke="none" />
    )}
  />
}

// Someone picks it up: a badge pops on their shoulder.
export function AssignArt() {
  return <StageArt
    icon={<>
      <path d="M58 110c0-30 18-46 42-46s42 16 42 46z" fill="url(#sector-glass)" />
      <circle cx="100" cy="36" r="24" fill="url(#sector-glass)" />
    </>}
    live={<g className="auto-badge">
      <circle cx="140" cy="28" r="13" fill="#7feeff" stroke="none" />
      <path d="M134 28l4 4 8-9" stroke="#04131a" strokeWidth="3" />
    </g>}
  />
}

// The tick is drawn across the shield as it is signed off.
export function ApproveArt() {
  return <StageArt
    icon={<Glass d="M100 6l46 17v37c0 28-20 44-46 54-26-10-46-26-46-54V23z" />}
    live={<path className="auto-tick" pathLength={1} d="M78 58l16 16 30-34" stroke="#e6fdff" strokeWidth="8" />}
  />
}

// The bell rings out.
export function NotifyArt() {
  return <StageArt
    icon={<>
      <Glass d="M100 18a34 34 0 0 1 34 34v22l14 20H52l14-20V52a34 34 0 0 1 34-34z" />
      <path d="M91 14a9 9 0 0 1 18 0" strokeWidth="4" />
    </>}
    live={<>
      <path className="auto-clapper" d="M88 100a12 12 0 0 0 24 0" strokeWidth="5" />
      {['M46 34l-12-10', 'M154 34l12-10', 'M100 -6v-10', 'M36 64H22', 'M164 64h14'].map((d, index) =>
        <path key={d} className="auto-ray" style={delay(index * 0.05)} d={d} strokeWidth="4.5" />
      )}
    </>}
  />
}
