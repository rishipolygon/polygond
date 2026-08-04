// Generates the social-share (Open Graph) preview images — one 1200x630 PNG per
// blog post plus a default card — into public/og/. These are the images LinkedIn,
// X, Slack, etc. show when a link is pasted. Run locally with `npm run og`; the
// PNGs are committed so CI needs no image tooling.
//
// The cards reuse each post's on-page cover motif, baked to a light-theme raster
// with the real Sora / IBM Plex Mono type (LinkedIn can't render inline SVG).

import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const fontDir = join(__dirname, 'og-assets', 'fonts')
const postsDir = join(root, 'src', 'posts')
const outDir = join(root, 'public', 'og')

const INK = '#0B0C0E'
const PAPER = '#F5F4F1'
const MUTED = '#6f6e69'
const W = 1200
const H = 630

// ——— frontmatter (mirrors src/lib/posts.js) ———
function parseFrontmatter(text) {
  const meta = {}
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)
  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const idx = line.indexOf(':')
      if (idx === -1) continue
      let value = line.slice(idx + 1).trim().replace(/^["'](.*)["']$/, '$1')
      meta[line.slice(0, idx).trim()] = value
    }
  }
  return meta
}

function loadPosts() {
  return readdirSync(postsDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const meta = parseFrontmatter(readFileSync(join(postsDir, f), 'utf8'))
      return {
        slug: f.replace(/\.md$/, ''),
        title: meta.title || f,
        tags: meta.tags ? meta.tags.split(',').map((t) => t.trim()) : [],
      }
    })
}

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

// greedy word-wrap tuned to Sora's average advance at the given size
function wrapTitle(title, size, maxWidth, maxLines) {
  const perChar = size * 0.54
  const maxChars = Math.floor(maxWidth / perChar)
  const words = title.split(/\s+/)
  const lines = []
  let cur = ''
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w
    if (next.length > maxChars && cur) {
      lines.push(cur)
      cur = w
    } else {
      cur = next
    }
  }
  if (cur) lines.push(cur)
  if (lines.length > maxLines) {
    lines.length = maxLines
    lines[maxLines - 1] = lines[maxLines - 1].replace(/[\s—:,.]*$/, '') + '…'
  }
  return lines
}

// ——— the Polygon Digital hexagon mark (geometry from src/components/Mark.jsx) ———
function hexMark(cx, cy, s) {
  // s = radius in the 100-unit master; scale points
  const sc = s / 50
  const map = (px, py) => `${cx + (px - 50) * sc},${cy + (py - 50) * sc}`
  const outer = ['50,4', '89.8,27', '89.8,73', '50,96', '10.2,73', '10.2,27']
    .map((p) => map(...p.split(',').map(Number)))
    .join(' ')
  const inner = ['50,26', '70.8,38', '70.8,62', '50,74', '29.2,62', '29.2,38']
    .map((p) => map(...p.split(',').map(Number)))
    .join(' ')
  return `<polygon points="${outer}" fill="none" stroke="${INK}" stroke-width="${5.4 * sc}" stroke-linejoin="miter"/>
    <polygon points="${inner}" fill="${INK}"/>`
}

// ——— per-post art motifs, fitted to the plate at (700,158) size 436x314 ———
const PLATE = { x: 700, y: 158, w: 436, h: 314 }

function artTokenEconomy() {
  const base = 430
  const bars = [
    { h: 250, o: 0.9 },
    { h: 96, o: 0.75 },
    { h: 40, o: 0.6 },
    { h: 18, o: 0.48 },
    { h: 9, o: 0.38 },
  ]
  const bw = 46
  const gap = 24
  const x0 = 730
  let s = ''
  ;[210, 290, 370].forEach((y) => {
    s += `<line x1="726" y1="${y}" x2="1110" y2="${y}" stroke="${INK}" stroke-opacity="0.1"/>`
  })
  bars.forEach((b, i) => {
    s += `<rect x="${x0 + i * (bw + gap)}" y="${base - b.h}" width="${bw}" height="${b.h}" fill="${INK}" fill-opacity="${b.o}"/>`
  })
  s += `<polyline points="726,426 800,414 874,382 948,318 1022,236 1096,180" fill="none" stroke="${INK}" stroke-opacity="0.5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 8"/>`
  s += `<circle cx="1096" cy="180" r="5" fill="${INK}"/>`
  return s
}

function artMeasuringStick() {
  const ax = 726, ay = 440, bx = 1104, by = 196
  const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy)
  const nx = -dy / len, ny = dx / len
  let ticks = ''
  const N = 12
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const x = ax + dx * t, y = ay + dy * t
    const long = i % 4 === 0
    const l = long ? 20 : 11
    ticks += `<line x1="${x}" y1="${y}" x2="${x + nx * l}" y2="${y + ny * l}" stroke="${INK}" stroke-opacity="${long ? 0.85 : 0.5}" stroke-width="${long ? 2 : 1.4}"/>`
  }
  return `
    <polyline points="726,210 820,258 914,306 1008,352 1096,438" fill="none" stroke="${INK}" stroke-opacity="0.38" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="1096" cy="438" r="6" fill="${INK}" fill-opacity="0.38"/>
    <line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="${INK}" stroke-opacity="0.9" stroke-width="2.6"/>
    ${ticks}
    <text x="${bx + 20}" y="${by + 4}" font-family="Sora" font-size="40" fill="${INK}">$</text>`
}

function artGigawatt() {
  const apexX = 918, apexY = 176, baseY = 452
  return `
    <g fill="${INK}">
      <rect x="712" y="238" width="96" height="20" fill-opacity="0.16"/>
      <rect x="712" y="288" width="96" height="20" fill-opacity="0.16"/>
      <rect x="712" y="338" width="150" height="20" fill-opacity="0.2"/>
    </g>
    <g stroke="${INK}" stroke-opacity="0.3" fill="none" stroke-width="1.4">
      <path d="M712,248 Q820,240 862,282"/>
      <path d="M712,298 Q828,300 862,318"/>
      <path d="M712,348 Q810,372 884,352"/>
    </g>
    <g stroke="${INK}" stroke-opacity="0.85" stroke-width="2.2" fill="none" stroke-linejoin="round">
      <path d="M848,${baseY} L${apexX},${apexY}"/>
      <path d="M988,${baseY} L${apexX},${apexY}"/>
      <line x1="862" y1="398" x2="974" y2="398"/>
      <line x1="878" y1="330" x2="958" y2="330"/>
      <line x1="892" y1="278" x2="944" y2="278"/>
      <path d="M848,${baseY} L${apexX},398 L988,${baseY}" stroke-opacity="0.5"/>
      <path d="M862,398 L${apexX},330 L974,398" stroke-opacity="0.5"/>
      <path d="M878,330 L${apexX},278 L958,330" stroke-opacity="0.5"/>
      <line x1="832" y1="282" x2="1004" y2="282"/>
      <line x1="848" y1="330" x2="988" y2="330"/>
    </g>
    <g fill="${INK}">
      <circle cx="832" cy="296" r="3.4"/>
      <circle cx="1004" cy="296" r="3.4"/>
      <circle cx="${apexX}" cy="${apexY}" r="4"/>
    </g>
    <line x1="712" y1="${baseY}" x2="1124" y2="${baseY}" stroke="${INK}" stroke-opacity="0.28" stroke-width="1.5"/>`
}

// ——— DeepSeek card: composite the OFFICIAL logo the user supplies ———
// Drop the real brand asset at scripts/og-assets/deepseek-logo.png (transparent
// PNG preferred) or .svg. We only embed a file that exists on disk — we never
// trace or recreate the trademarked mark. If it's absent, the card falls back
// to the default motif so the build never breaks.
const assetDir = join(__dirname, 'og-assets')
const DEEPSEEK_BLUE = '#4D6BFE'

// Composite the OFFICIAL DeepSeek mark from scripts/og-assets/deepseek-logo.svg
// (a single-path 24×24 brand glyph). We extract its vector path and draw it
// NATIVELY into the card so resvg renders it crisply — no raster embedding.
// If the asset is missing we fall back to the default motif so the build holds.
function artDeepseek() {
  const svgPath = join(assetDir, 'deepseek-logo.svg')
  if (!existsSync(svgPath)) {
    console.warn('  ! no deepseek-logo.svg in scripts/og-assets — using default motif')
    return artDefault()
  }
  const d = (/\sd="([^"]+)"/.exec(readFileSync(svgPath, 'utf8')) || [])[1]
  if (!d) {
    console.warn('  ! deepseek-logo.svg has no <path d> — using default motif')
    return artDefault()
  }
  const cx = PLATE.x + PLATE.w / 2
  const cy = PLATE.y + PLATE.h / 2
  const size = Math.min(PLATE.w, PLATE.h) - 96 // contain within the plate
  const scale = size / 24 // brand glyph is a 24-unit square
  const tx = cx - (24 * scale) / 2
  const ty = cy - (24 * scale) / 2
  return `<g transform="translate(${tx} ${ty}) scale(${scale})"><path d="${d}" fill="${DEEPSEEK_BLUE}"/></g>`
}

// Composite the OFFICIAL Moonshot AI mark from scripts/og-assets/moonshot-logo.svg
// (a single-path 24×24 brand glyph). The mark is monochrome, so we render it in
// ink natively into the card. Falls back to the default motif if the asset is
// missing so the build never breaks.
function artMoonshot() {
  const svgPath = join(assetDir, 'moonshot-logo.svg')
  if (!existsSync(svgPath)) {
    console.warn('  ! no moonshot-logo.svg in scripts/og-assets — using default motif')
    return artDefault()
  }
  const d = (/\sd="([^"]+)"/.exec(readFileSync(svgPath, 'utf8')) || [])[1]
  if (!d) {
    console.warn('  ! moonshot-logo.svg has no <path d> — using default motif')
    return artDefault()
  }
  const cx = PLATE.x + PLATE.w / 2
  const cy = PLATE.y + PLATE.h / 2
  const size = Math.min(PLATE.w, PLATE.h) - 116 // contain within the plate
  const scale = size / 24 // brand glyph is a 24-unit square
  const tx = cx - (24 * scale) / 2
  const ty = cy - (24 * scale) / 2
  return `<g transform="translate(${tx} ${ty}) scale(${scale})"><path d="${d}" fill="${INK}"/></g>`
}

// The barrel of intelligence: the price ladder collapsing into an open barrel.
function artBarrel() {
  const base = 440
  const bars = [
    { h: 230, o: 0.9 },
    { h: 108, o: 0.72 },
    { h: 24, o: 0.56 },
    { h: 13, o: 0.46 },
    { h: 8, o: 0.38 },
  ]
  const bw = 30
  const gap = 14
  const x0 = 726
  let s = ''
  ;[230, 335, 440].forEach((y) => {
    s += `<line x1="722" y1="${y}" x2="1124" y2="${y}" stroke="${INK}" stroke-opacity="0.1"/>`
  })
  bars.forEach((b, i) => {
    s += `<rect x="${x0 + i * (bw + gap)}" y="${base - b.h}" width="${bw}" height="${b.h}" fill="${INK}" fill-opacity="${b.o}"/>`
  })
  // the barrel, open at the top, with a fill level
  s += `<path d="M985,330 L985,424 A 55 16 0 0 0 1095,424 L1095,330 A 55 16 0 0 1 985,330 Z" fill="${INK}" fill-opacity="0.2"/>`
  s += `<ellipse cx="1040" cy="330" rx="55" ry="16" fill="${INK}" fill-opacity="0.28"/>`
  s += `<g stroke="${INK}" fill="none" stroke-width="2.4">
      <ellipse cx="1040" cy="216" rx="55" ry="16" stroke-opacity="0.9"/>
      <line x1="985" y1="216" x2="985" y2="424" stroke-opacity="0.9"/>
      <line x1="1095" y1="216" x2="1095" y2="424" stroke-opacity="0.9"/>
      <path d="M985,424 A 55 16 0 0 0 1095,424" stroke-opacity="0.9"/>
      <path d="M985,268 A 55 16 0 0 0 1095,268" stroke-opacity="0.45" stroke-width="1.8"/>
      <path d="M985,356 A 55 16 0 0 0 1095,356" stroke-opacity="0.45" stroke-width="1.8"/>
    </g>`
  return s
}

// The margin call: the levered climb, then the stepped cascade of the unwind.
// Mirrors the in-article cover art in src/lib/covers.jsx.
function artMarginCall() {
  const rungs = [
    { x: 982, y: 262 },
    { x: 1024, y: 316 },
    { x: 1066, y: 368 },
    { x: 1108, y: 418 },
  ]
  let s = ''
  ;[200, 315, 430].forEach((y) => {
    s += `<line x1="722" y1="${y}" x2="1124" y2="${y}" stroke="${INK}" stroke-opacity="0.1"/>`
  })
  s += `<polyline points="726,428 780,415 834,388 888,320 940,208" fill="none" stroke="${INK}" stroke-opacity="0.85" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`
  s += `<circle cx="940" cy="208" r="6" fill="${INK}"/>`
  rungs.forEach((r, i) => {
    const p = i === 0 ? { x: 940, y: 208 } : rungs[i - 1]
    s += `<line x1="${p.x}" y1="${p.y}" x2="${r.x}" y2="${r.y}" stroke="${INK}" stroke-opacity="${(0.6 - i * 0.08).toFixed(2)}" stroke-width="2.6" stroke-linecap="round"/>`
    s += `<rect x="${r.x - 3}" y="${r.y}" width="6" height="${452 - r.y}" fill="${INK}" fill-opacity="${(0.16 - i * 0.025).toFixed(3)}"/>`
  })
  return s
}

// The forced seller: the run, the drop, the single block, then the bounce the
// seller no longer owned. Mirrors the in-article cover art in src/lib/covers.jsx.
function artForcedSeller() {
  const bounce = [
    { x: 976, h: 62 },
    { x: 1006, h: 61 },
    { x: 1036, h: 59 },
    { x: 1066, h: 56 },
    { x: 1096, h: 47 },
  ]
  const base = 452
  let s = ''
  ;[200, 315, 430].forEach((y) => {
    s += `<line x1="722" y1="${y}" x2="1124" y2="${y}" stroke="${INK}" stroke-opacity="0.1"/>`
  })
  s += `<polyline points="726,436 770,420 814,388 858,322 900,206" fill="none" stroke="${INK}" stroke-opacity="0.85" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`
  s += `<circle cx="900" cy="206" r="6" fill="${INK}"/>`
  s += `<line x1="900" y1="206" x2="936" y2="${base}" stroke="${INK}" stroke-opacity="0.55" stroke-width="2.6" stroke-linecap="round"/>`
  s += `<rect x="936" y="${base - 34}" width="22" height="34" fill="${INK}" fill-opacity="0.9"/>`
  bounce.forEach((b, i) => {
    s += `<rect x="${b.x}" y="${base - b.h}" width="22" height="${b.h}" fill="${INK}" fill-opacity="${(0.34 - i * 0.04).toFixed(2)}"/>`
  })
  return s
}

const ART = {
  'the-token-economy': artTokenEconomy,
  'the-margin-call': artMarginCall,
  'the-forced-seller': artForcedSeller,
  'the-measuring-stick': artMeasuringStick,
  'the-gigawatt-land-grab': artGigawatt,
  'the-deepseek-discount': artDeepseek,
  'the-kimi-shock': artMoonshot,
  'the-barrel-of-intelligence': artBarrel,
}

function artDefault() {
  return `
    <g stroke="${INK}" stroke-opacity="0.5" stroke-width="2.4" fill="none">
      <circle cx="918" cy="315" r="110"/>
      <path d="M835,388 L918,200 L1001,388 Z" stroke-opacity="0.7"/>
    </g>`
}

function buildCard({ title, kicker, art }) {
  const lines = wrapTitle(title, 50, 590, 4)
  const lineH = 62
  const titleStartY = 300 - ((lines.length - 1) * lineH) / 2 + 18
  const tspans = lines
    .map((ln, i) => `<tspan x="64" y="${titleStartY + i * lineH}">${esc(ln)}</tspan>`)
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="${INK}" stroke-opacity="0.12"/>
  <!-- header -->
  ${hexMark(80, 78, 15)}
  <text x="106" y="86" font-family="Sora" font-size="26" font-weight="600" fill="${INK}">Polygon</text>
  <text x="214" y="86" font-family="IBM Plex Mono Medium" font-size="15" letter-spacing="3" fill="${MUTED}">DIGITAL</text>
  <text x="${W - 64}" y="86" text-anchor="end" font-family="IBM Plex Mono Medium" font-size="14" letter-spacing="4" fill="${MUTED}">${esc(kicker)}</text>
  <line x1="64" y1="118" x2="${W - 64}" y2="118" stroke="${INK}" stroke-opacity="0.1"/>
  <!-- art plate -->
  <rect x="${PLATE.x - 8}" y="${PLATE.y - 8}" width="${PLATE.w + 16}" height="${PLATE.h + 16}" fill="${INK}" fill-opacity="0.035" stroke="${INK}" stroke-opacity="0.12"/>
  ${art()}
  <!-- title -->
  <text font-family="Sora" font-size="50" font-weight="500" fill="${INK}" letter-spacing="-0.5">${tspans}</text>
  <!-- footer -->
  <line x1="64" y1="540" x2="${W - 64}" y2="540" stroke="${INK}" stroke-opacity="0.1"/>
  <text x="64" y="576" font-family="IBM Plex Mono Medium" font-size="15" letter-spacing="2" fill="${INK}">polygond.com</text>
  <text x="${W - 64}" y="576" text-anchor="end" font-family="IBM Plex Mono Medium" font-size="14" letter-spacing="3" fill="${MUTED}">MARKET ANALYSIS · WITH CONVICTION</text>
</svg>`
}

// ——— render ———
const fontFiles = [
  join(fontDir, 'Sora.ttf'),
  join(fontDir, 'PlexMono-500.ttf'),
  join(fontDir, 'PlexMono-400.ttf'),
]

function rasterize(svg, outPath) {
  const r = new Resvg(svg, {
    background: PAPER,
    fitTo: { mode: 'width', value: W },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Sora' },
  })
  writeFileSync(outPath, r.render().asPng())
}

const posts = loadPosts()
for (const post of posts) {
  const art = ART[post.slug] || artDefault
  const kicker = post.tags.length ? `RESEARCH NOTE · ${post.tags[0].toUpperCase()}` : 'RESEARCH NOTE'
  const svg = buildCard({ title: post.title, kicker, art })
  rasterize(svg, join(outDir, `${post.slug}.png`))
  console.log('wrote', `public/og/${post.slug}.png`)
}

// default homepage card
const defaultSvg = buildCard({
  title: 'Market analysis with conviction.',
  kicker: 'RESEARCH NOTES',
  art: artDefault,
})
rasterize(defaultSvg, join(outDir, 'default.png'))
console.log('wrote', 'public/og/default.png')
