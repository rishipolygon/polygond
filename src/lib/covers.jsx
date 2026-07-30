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

// ——— The DeepSeek discount: the official whale mark over a price-gap motif ———
// The logo path is the genuine DeepSeek brand mark (Simple Icons, 24×24 viewBox),
// rendered in brand blue. Behind it, two bars restate the article: a tall
// "frontier price" vs a sliver "DeepSeek price" — nearly-as-good, a fraction the cost.
const DEEPSEEK_LOGO_PATH =
  'M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136 9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588M11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615zm1.001-6.44a.306.306 0 0 1 .415-.287.3.3 0 0 1 .113.074.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307m3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078.253.253 0 0 1-.114-.358 1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45'

const DEEPSEEK_BLUE = '#4D6BFE'

function DeepseekDiscount() {
  const base = 372
  return (
    <Frame>
      {/* faint field lines */}
      <g stroke="currentColor" strokeOpacity="0.1">
        <line x1="84" y1="120" x2="716" y2="120" />
        <line x1="84" y1="246" x2="716" y2="246" />
        <line x1="84" y1="372" x2="716" y2="372" />
      </g>
      {/* the price gap: frontier vs DeepSeek */}
      <rect x="112" y={base - 300} width="86" height="300" fill="currentColor" fillOpacity="0.16" />
      <rect x="238" y={base - 22} width="86" height="22" fill="currentColor" fillOpacity="0.5" />
      <text x="155" y="42" textAnchor="middle" fill="currentColor" fillOpacity="0.6" style={mono}>
        FRONTIER
      </text>
      <text x="281" y="42" textAnchor="middle" fill="currentColor" fillOpacity="0.6" style={mono}>
        1/10 PRICE
      </text>
      {/* the official DeepSeek whale mark, brand blue, over the plate */}
      <g transform="translate(468 108) scale(9.6)">
        <path d={DEEPSEEK_LOGO_PATH} fill={DEEPSEEK_BLUE} />
      </g>
    </Frame>
  )
}

// ——— The Kimi shock: the official Moonshot AI mark over a price-gap motif ———
// The logo path is the genuine Moonshot AI brand mark (Simple Icons, 24×24
// viewBox). It is monochrome by design, so we draw it in `currentColor` and it
// inherits the ink/paper theme exactly like the charts. Behind it, two bars
// restate the article: a tall "frontier price" vs a short "Kimi price" — top-four
// capability at a fraction of the cost, with the weights open.
const MOONSHOT_LOGO_PATH =
  'm1.053 16.91 9.538 2.55a21 20.981 0 0 0 .06 2.031l5.956 1.592a12 11.99 0 0 1-15.554-6.172m-1.02-5.79 11.352 3.035a21 20.981 0 0 0-.469 2.01l10.817 2.89a12 11.99 0 0 1-1.845 2.004L.658 15.918a12 11.99 0 0 1-.625-4.796m1.593-5.146L13.573 9.17a21 20.981 0 0 0-1.01 1.874l11.297 3.02a21 20.981 0 0 1-.67 2.362l-11.55-3.087L.125 10.26a12 11.99 0 0 1 1.499-4.285ZM6.067 1.58l11.285 3.016a21 20.981 0 0 0-1.688 1.719l7.824 2.091a21 20.981 0 0 1 .513 2.664L2.107 5.218a12 11.99 0 0 1 3.96-3.638M21.68 4.866 7.222 1.003A12 11.99 0 0 1 21.68 4.866'

function KimiShock() {
  const base = 372
  return (
    <Frame>
      {/* faint field lines */}
      <g stroke="currentColor" strokeOpacity="0.1">
        <line x1="84" y1="120" x2="716" y2="120" />
        <line x1="84" y1="246" x2="716" y2="246" />
        <line x1="84" y1="372" x2="716" y2="372" />
      </g>
      {/* the price gap: closed frontier vs Kimi K3 */}
      <rect x="112" y={base - 300} width="86" height="300" fill="currentColor" fillOpacity="0.16" />
      <rect x="238" y={base - 150} width="86" height="150" fill="currentColor" fillOpacity="0.5" />
      <text x="155" y="42" textAnchor="middle" fill="currentColor" fillOpacity="0.6" style={mono}>
        FRONTIER
      </text>
      <text x="281" y="42" textAnchor="middle" fill="currentColor" fillOpacity="0.6" style={mono}>
        OPEN · ½ PRICE
      </text>
      {/* the official Moonshot AI mark, monochrome, over the plate */}
      <g transform="translate(452 96) scale(10.5)">
        <path d={MOONSHOT_LOGO_PATH} fill="currentColor" fillOpacity="0.9" />
      </g>
    </Frame>
  )
}

// ——— The barrel of intelligence: the price ladder collapsing into an open barrel ——
// Left: the hundredfold spread Chamath drew on air, from the $56 barrel down to the
// 50 cent one. Right: the barrel itself, drawn open at the top, because the real
// deflation arrived as published weights rather than as a price cut.
function BarrelOfIntelligence() {
  const base = 372
  const bars = [
    { h: 300, o: 0.9 },
    { h: 140, o: 0.72 },
    { h: 30, o: 0.56 },
    { h: 16, o: 0.46 },
    { h: 10, o: 0.4 },
    { h: 6, o: 0.34 },
  ]
  const bw = 44
  const gap = 22
  const x0 = 84
  return (
    <Frame>
      {/* faint field lines */}
      <g stroke="currentColor" strokeOpacity="0.1">
        <line x1="84" y1="96" x2="716" y2="96" />
        <line x1="84" y1="234" x2="716" y2="234" />
        <line x1="84" y1="372" x2="716" y2="372" />
      </g>
      {/* the price ladder, collapsing left to right */}
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
      {/* the barrel, open at the top */}
      <g stroke="currentColor" fill="none" strokeWidth="2.4">
        <ellipse cx="560" cy="112" rx="75" ry="22" strokeOpacity="0.9" />
        <path d="M485,112 L485,338" strokeOpacity="0.9" />
        <path d="M635,112 L635,338" strokeOpacity="0.9" />
        <path d="M485,338 A 75 22 0 0 0 635,338" strokeOpacity="0.9" />
        {/* hoops */}
        <path d="M485,178 A 75 22 0 0 0 635,178" strokeOpacity="0.45" strokeWidth="1.8" />
        <path d="M485,272 A 75 22 0 0 0 635,272" strokeOpacity="0.45" strokeWidth="1.8" />
      </g>
      {/* the fill: what is actually in the barrel */}
      <path
        d="M485,238 L485,338 A 75 22 0 0 0 635,338 L635,238 A 75 22 0 0 1 485,238 Z"
        fill="currentColor"
        fillOpacity="0.22"
      />
      <ellipse cx="560" cy="238" rx="75" ry="22" fill="currentColor" fillOpacity="0.3" />
      <text x="84" y="42" fill="currentColor" fillOpacity="0.62" style={mono}>
        $56 ▼ $0.50
      </text>
      <text x="716" y="42" textAnchor="end" fill="currentColor" fillOpacity="0.62" style={mono}>
        1 BARREL = 1M TOKENS
      </text>
    </Frame>
  )
}

// ——— The margin call: a levered climb, then the vertical break ———
function MarginCallCover() {
  // the run-up is drawn solid; the unwind falls away as a stepped cascade
  const rungs = [
    { x: 470, y: 108 },
    { x: 520, y: 170 },
    { x: 570, y: 232 },
    { x: 620, y: 294 },
    { x: 670, y: 352 },
  ]
  return (
    <Frame>
      <g stroke="currentColor" strokeOpacity="0.1">
        <line x1="84" y1="108" x2="716" y2="108" />
        <line x1="84" y1="236" x2="716" y2="236" />
        <line x1="84" y1="364" x2="716" y2="364" />
      </g>
      {/* the doubling */}
      <polyline
        points="84,362 168,340 252,300 336,236 420,150 462,96"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.85"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="462" cy="96" r="5" fill="currentColor" />
      {/* the unwind, each step a tier of collateral failing */}
      {rungs.map((r, i) => (
        <g key={i}>
          <line
            x1={i === 0 ? 462 : rungs[i - 1].x}
            y1={i === 0 ? 96 : rungs[i - 1].y}
            x2={r.x}
            y2={r.y}
            stroke="currentColor"
            strokeOpacity={0.6 - i * 0.08}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <rect
            x={r.x - 3}
            y={r.y}
            width="6"
            height={396 - r.y}
            fill="currentColor"
            fillOpacity={0.16 - i * 0.02}
          />
        </g>
      ))}
      <text x="84" y="42" fill="currentColor" fillOpacity="0.62" style={mono}>
        9,385.59 ▼ 5,593.56
      </text>
      <text x="716" y="42" textAnchor="end" fill="currentColor" fillOpacity="0.62" style={mono}>
        1.2M CALLED
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
  'the-deepseek-discount': DeepseekDiscount,
  'the-kimi-shock': KimiShock,
  'the-barrel-of-intelligence': BarrelOfIntelligence,
  'the-margin-call': MarginCallCover,
}

export function hasCover(slug) {
  return Boolean(covers[slug])
}

export default function Cover({ slug }) {
  const Art = covers[slug] || Fallback
  return <Art />
}
