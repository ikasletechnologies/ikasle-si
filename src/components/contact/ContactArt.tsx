const TAILED = 'M30 12h150a24 24 0 0 1 24 24v92a24 24 0 0 1-24 24H70l-38 28 6-28h-8a24 24 0 0 1-24-24V36a24 24 0 0 1 24-24z'
const PLAIN = 'M30 12h150a24 24 0 0 1 24 24v92a24 24 0 0 1-24 24H30a24 24 0 0 1-24-24V36a24 24 0 0 1 24-24z'
const SLAB = 'M146 9 Q160 4 174 9 L300 50 Q314 56 300 62 L174 103 Q160 108 146 103 L20 62 Q6 56 20 50 Z'
const SLAB_FRONT_EDGE = 'M9 58 Q12 60 20 62 L146 103 Q160 108 174 103 L300 62 Q308 60 311 58'
const DEPTH_STEPS = [18, 15, 12, 9, 6, 3]
const SLAB_DEPTH = [18, 15, 12, 9, 6, 3]

// Hidden with zero size rather than display:none, which would stop the gradients resolving.
export function ContactArtDefs() {
  return <svg className="contact-defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="contact-face" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#25c6ee" stopOpacity=".95" />
        <stop offset=".55" stopColor="#0d7fb4" stopOpacity=".86" />
        <stop offset="1" stopColor="#0a4f7e" stopOpacity=".82" />
      </linearGradient>
      <linearGradient id="contact-side" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#38d4f2" />
        <stop offset="1" stopColor="#0b6e9e" />
      </linearGradient>
      <linearGradient id="contact-rim" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e6fdff" />
        <stop offset=".6" stopColor="#6ff0ff" />
        <stop offset="1" stopColor="#a8f6ff" />
      </linearGradient>
      <radialGradient id="contact-shine" cx=".2" cy=".15" r=".65">
        <stop offset="0" stopColor="#fff" stopOpacity=".42" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="contact-slab" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#08283a" />
        <stop offset="1" stopColor="#0c4f6b" />
      </linearGradient>
    </defs>
  </svg>
}

function Bubble({ kind, path, dots = false }: { kind: 'front' | 'back'; path: string; dots?: boolean }) {
  return <div className={`contact-bubble contact-bubble--${kind}`}>
    <div className="contact-bubble__float">
      <div className="contact-bubble__tilt">
        <svg viewBox="0 0 230 190">
          {DEPTH_STEPS.map((step) => <path key={step} d={path} transform={`translate(${step} ${-step / 5})`} fill="url(#contact-side)" />)}
          <path d={path} fill="url(#contact-face)" stroke="url(#contact-rim)" strokeWidth="2" />
          <path d={path} fill="url(#contact-shine)" />
        </svg>
        {dots && <div className="contact-bubble__dots"><i /><i /><i /></div>}
      </div>
    </div>
  </div>
}

function Slab() {
  return <div className="contact-slab">
    <svg className="contact-slab__ripple" viewBox="0 0 320 130"><path d={SLAB} fill="none" stroke="#6ff0ff" strokeWidth="2" /></svg>
    <svg className="contact-slab__body" viewBox="0 0 320 130">
      {SLAB_DEPTH.map((step) => <path key={step} d={SLAB} transform={`translate(0 ${step})`} fill="#0a7396" />)}
      <path d={SLAB_FRONT_EDGE} transform="translate(0 18)" fill="none" stroke="#4febff" strokeWidth="3" strokeLinecap="round" />
      <path d={SLAB} fill="url(#contact-slab)" stroke="#8df3ff" strokeWidth="1.6" />
    </svg>
    <svg className="contact-slab__pulse" viewBox="0 0 320 130"><path d={SLAB_FRONT_EDGE} transform="translate(0 18)" fill="none" stroke="#d8fcff" strokeWidth="3.5" strokeLinecap="round" /></svg>
  </div>
}

// Each moving part is its own layer, so animating it moves a finished picture instead of
// redrawing the glow every frame, which is what dragged earlier sections down to 8fps.
export function ContactArt({ variant }: { variant: 'hero' | 'card' }) {
  return <div className={`contact-art contact-art--${variant}`} aria-hidden="true">
    <div className="contact-art__glow" />
    {variant === 'hero' && <Slab />}
    <Bubble kind="back" path={PLAIN} />
    <Bubble kind="front" path={TAILED} dots />
  </div>
}
