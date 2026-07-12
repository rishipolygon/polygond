// Bespoke monochrome cover art for each post — one abstracted "poster" per note,
// drawn inline with `currentColor` so it inherits the ink/paper theme and adapts
// to dark mode exactly like the in-article charts do.
//
// Add a new post's art here keyed by slug; posts without a match fall back to a
// neutral geometric mark so the layout never breaks.

const VIEWBOX = '0 0 800 450'

function Frame({ children }) {
  return (
    <svg
      viewBox={VIEWBOX}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* subtle tonal panel so the art reads as a plate on both themes */}
      <rect x="0" y="0" width="800" height="450" fill="currentColor" fillOpacity="0.035" />
      {children}
    </svg>
  )
}

const mono = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 15,
  letterSpacing: '0.22em',
  fontWeight: 500,
}

// ——— The token economy: cost collapsing (bars) while volume climbs (curve) ———
function TokenEconomy() {
  const bars = [
    { h: 292, o: 0.9 },
    { h: 116, o: 0.78 },
    { h: 46, o: 0.66 },
    { h: 20, o: 0.54 },
    { h: 11, o: 0.44 },
    { h: 7, o: 0.36 },
  ]
  const base = 372
  const bw = 74
  const x0 = 84
  const gap = 42
  return (
    <Frame>
      {/* faint field lines */}
      <g stroke="currentColor" strokeOpacity="0.1">
        <line x1="84" y1="80" x2="716" y2="80" />
        <line x1="84" y1="176" x2="716" y2="176" />
        <line x1="84" y1="272" x2="716" y2="272" />
        <line x1="84" y1="372" x2="716" y2="372" />
      </g>
      {/* cost: deflating bars */}
      {bars.map((b, i) => (
        <rect
          key={i}
          x={x0 + i * (bw + gap)}
          y={base - b.h}
          width={bw}
          height={b.h}
          fill="currentColor"
          fillOpacity={b.o}
        />
      ))}
      {/* volume: the opposing exponential climbing across the frame */}
      <polyline
        points="84,362 200,352 316,330 432,288 548,206 664,86 716,58"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 7"
      />
      <circle cx="716" cy="58" r="4.5" fill="currentColor" />
      <text x="84" y="42" fill="currentColor" fillOpacity="0.62" style={mono}>
        COST ↓
      </text>
      <text x="716" y="42" textAnchor="end" fill="currentColor" fillOpacity="0.62" style={mono}>
        VOLUME ↑
      </text>
    </Frame>
  )
}

// ——— The measuring stick: the dollar-ruler lengthening as oil falls ———
function MeasuringStick() {
  // the ruler rises left→right; ticks sit perpendicular to it
  const ax = 90
  const ay = 372
  const bx = 706
  const by = 96
  const ticks = []
  const N = 13
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const x = ax + (bx - ax) * t
    const y = ay + (by - ay) * t
    // perpendicular direction (normal to the ruler line)
    const dx = bx - ax
    const dy = by - ay
    const len = Math.hypot(dx, dy)
    const nx = -dy / len
    const ny = dx / len
    const long = i % 5 === 0
    const l = long ? 22 : 12
    ticks.push(
      <line
        key={i}
        x1={x}
        y1={y}
        x2={x + nx * l}
        y2={y + ny * l}
        stroke="currentColor"
        strokeOpacity={long ? 0.85 : 0.5}
        strokeWidth={long ? 2 : 1.4}
      />
    )
  }
  return (
    <Frame>
      {/* oil, priced in the ruler, falling as the ruler grows */}
      <polyline
        points="92,120 220,182 348,236 476,288 604,340 700,384"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="700" cy="384" r="6" fill="currentColor" fillOpacity="0.4" />
      {/* the measuring stick */}
      <line x1={ax} y1={ay} x2={bx} y2={by} stroke="currentColor" strokeOpacity="0.9" strokeWidth="2.5" />
      {ticks}
      {/* the unit at the head of the stick */}
      <text x={bx + 6} y={by - 14} textAnchor="end" fill="currentColor" style={{ ...mono, fontSize: 30, letterSpacing: 0 }}>
        $
      </text>
      <text x="92" y="42" fill="currentColor" fillOpacity="0.62" style={mono}>
        USD ▲
      </text>
      <text x="700" y="420" textAnchor="end" fill="currentColor" fillOpacity="0.62" style={mono}>
        OIL ▼
      </text>
    </Frame>
  )
}

// ——— The gigawatt land grab: a transmission pylon over the fleet's power bars ——
function GigawattLandGrab() {
  return (
    <Frame>
      {/* the fleet: 1 GW · 1 GW · ~5 GW power footprints, faint behind */}
      <g fill="currentColor">
        <rect x="70" y="150" width="120" height="26" fillOpacity="0.16" />
        <rect x="70" y="212" width="120" height="26" fillOpacity="0.16" />
        <rect x="70" y="274" width="470" height="26" fillOpacity="0.22" />
      </g>
      <g stroke="currentColor" strokeOpacity="0.1">
        <line x1="70" y1="120" x2="70" y2="340" />
      </g>
      {/* catenary wires sweeping in from the fleet toward the pylon arms */}
      <g stroke="currentColor" strokeOpacity="0.32" fill="none" strokeWidth="1.4">
        <path d="M70,163 Q320,150 486,196" />
        <path d="M70,225 Q330,232 486,248" />
        <path d="M70,287 Q300,320 512,300" />
      </g>
      {/* transmission pylon (lattice) */}
      <g stroke="currentColor" strokeOpacity="0.85" strokeWidth="2.2" fill="none" strokeLinejoin="round">
        {/* legs */}
        <path d="M486,404 L560,78" />
        <path d="M634,404 L560,78" />
        {/* horizontal members */}
        <line x1="503" y1="330" x2="617" y2="330" />
        <line x1="521" y1="256" x2="599" y2="256" />
        <line x1="536" y1="196" x2="584" y2="196" />
        <line x1="548" y1="140" x2="572" y2="140" />
        {/* lattice bracing */}
        <path d="M486,404 L560,330 L634,404" strokeOpacity="0.5" />
        <path d="M503,330 L560,256 L617,330" strokeOpacity="0.5" />
        <path d="M521,256 L560,196 L599,256" strokeOpacity="0.5" />
        {/* cross-arms */}
        <line x1="470" y1="196" x2="650" y2="196" />
        <line x1="486" y1="248" x2="634" y2="248" />
        {/* insulators + conductor points */}
        <line x1="470" y1="196" x2="470" y2="210" />
        <line x1="650" y1="196" x2="650" y2="210" />
        <line x1="486" y1="248" x2="486" y2="262" />
        <line x1="634" y1="248" x2="634" y2="262" />
      </g>
      <g fill="currentColor">
        <circle cx="470" cy="212" r="3" />
        <circle cx="650" cy="212" r="3" />
        <circle cx="486" cy="264" r="3" />
        <circle cx="634" cy="264" r="3" />
        <circle cx="560" cy="78" r="3.5" />
      </g>
      {/* ground line */}
      <line x1="70" y1="404" x2="730" y2="404" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <text x="70" y="130" fill="currentColor" fillOpacity="0.62" style={mono}>
        POWER ▸ 1GW
      </text>
      <text x="730" y="42" textAnchor="end" fill="currentColor" fillOpacity="0.62" style={mono}>
        ~5 GW
      </text>
    </Frame>
  )
}

function Fallback() {
  return (
    <Frame>
      <g stroke="currentColor" strokeOpacity="0.5" strokeWidth="2.2" fill="none">
        <circle cx="400" cy="225" r="120" />
        <path d="M310,300 L400,105 L490,300 Z" strokeOpacity="0.7" />
      </g>
    </Frame>
  )
}

const covers = {
  'the-token-economy': TokenEconomy,
  'the-measuring-stick': MeasuringStick,
  'the-gigawatt-land-grab': GigawattLandGrab,
}

export function hasCover(slug) {
  return Boolean(covers[slug])
}

export default function Cover({ slug }) {
  const Art = covers[slug] || Fallback
  return <Art />
}
