// Per-post 1080x1920 "story" graphic (Instagram / Snapchat / TikTok stories),
// one PNG per blog post into public/story/<slug>.png. These are what the Share
// button on each post offers as a ready-to-post vertical graphic.
//
// Dark theme (matches the site's dark-first identity). Reuses each post's motif
// from the OG cards. Run: npm run stories. PNGs are committed (CI has no image
// tooling), same policy as public/og.

import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const fontDir = join(__dirname, 'og-assets', 'fonts')
const assetDir = join(__dirname, 'og-assets')
const postsDir = join(root, 'src', 'posts')
const outDir = join(root, 'public', 'story')

// Dark palette: ink background, paper foreground.
const BG = '#0B0C0E'
const FG = '#F5F4F1'
const MUTED = '#8e9095'
const DEEPSEEK_BLUE = '#4D6BFE'
const W = 1080
const H = 1920

// Motifs are authored in this region (matches build-og-images.mjs).
const REGION = { x: 700, y: 158, w: 436, h: 314 }

function parseFrontmatter(text) {
  const meta = {}
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)
  if (m) for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i === -1) continue
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["'](.*)["']$/, '$1')
  }
  return meta
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

function wrap(text, size, maxWidth, maxLines) {
  const maxChars = Math.floor(maxWidth / (size * 0.54))
  const words = String(text).split(/\s+/)
  const lines = []
  let cur = ''
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w
    if (next.length > maxChars && cur) { lines.push(cur); cur = w } else cur = next
  }
  if (cur) lines.push(cur)
  if (lines.length > maxLines) {
    lines.length = maxLines
    lines[maxLines - 1] = lines[maxLines - 1].replace(/[\s:,.]*$/, '') + '…'
  }
  return lines
}

function fmtDate(iso) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()
}

function hexMark(cx, cy, s) {
  const sc = s / 50
  const map = (px, py) => `${cx + (px - 50) * sc},${cy + (py - 50) * sc}`
  const outer = ['50,4', '89.8,27', '89.8,73', '50,96', '10.2,73', '10.2,27'].map((p) => map(...p.split(',').map(Number))).join(' ')
  const inner = ['50,26', '70.8,38', '70.8,62', '50,74', '29.2,62', '29.2,38'].map((p) => map(...p.split(',').map(Number))).join(' ')
  return `<polygon points="${outer}" fill="none" stroke="${FG}" stroke-width="${5.4 * sc}" stroke-linejoin="miter"/><polygon points="${inner}" fill="${FG}"/>`
}

// ——— per-post motifs (authored in REGION), foreground = FG ———
function artTokenEconomy() {
  const base = 430, bw = 46, gap = 24, x0 = 730
  let s = ''
  ;[210, 290, 370].forEach((y) => { s += `<line x1="726" y1="${y}" x2="1110" y2="${y}" stroke="${FG}" stroke-opacity="0.1"/>` })
  ;[{ h: 250, o: 0.9 }, { h: 96, o: 0.75 }, { h: 40, o: 0.6 }, { h: 18, o: 0.48 }, { h: 9, o: 0.38 }].forEach((b, i) => {
    s += `<rect x="${x0 + i * (bw + gap)}" y="${base - b.h}" width="${bw}" height="${b.h}" fill="${FG}" fill-opacity="${b.o}"/>`
  })
  s += `<polyline points="726,426 800,414 874,382 948,318 1022,236 1096,180" fill="none" stroke="${FG}" stroke-opacity="0.5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 8"/>`
  s += `<circle cx="1096" cy="180" r="5" fill="${FG}"/>`
  return s
}
function artMeasuringStick() {
  const ax = 726, ay = 440, bx = 1092, by = 210
  const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len
  let ticks = ''
  for (let i = 0; i <= 12; i++) {
    const t = i / 12, x = ax + dx * t, y = ay + dy * t, long = i % 4 === 0, l = long ? 20 : 11
    ticks += `<line x1="${x}" y1="${y}" x2="${x + nx * l}" y2="${y + ny * l}" stroke="${FG}" stroke-opacity="${long ? 0.85 : 0.5}" stroke-width="${long ? 2 : 1.4}"/>`
  }
  return `
    <polyline points="726,216 812,262 898,308 984,352 1076,436" fill="none" stroke="${FG}" stroke-opacity="0.38" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="1076" cy="436" r="6" fill="${FG}" fill-opacity="0.38"/>
    <line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="${FG}" stroke-opacity="0.9" stroke-width="2.6"/>${ticks}`
}
function artGigawatt() {
  const apexX = 918, apexY = 176, baseY = 452
  return `
    <g fill="${FG}"><rect x="712" y="238" width="96" height="20" fill-opacity="0.16"/><rect x="712" y="288" width="96" height="20" fill-opacity="0.16"/><rect x="712" y="338" width="150" height="20" fill-opacity="0.2"/></g>
    <g stroke="${FG}" stroke-opacity="0.3" fill="none" stroke-width="1.4"><path d="M712,248 Q820,240 862,282"/><path d="M712,298 Q828,300 862,318"/><path d="M712,348 Q810,372 884,352"/></g>
    <g stroke="${FG}" stroke-opacity="0.85" stroke-width="2.2" fill="none" stroke-linejoin="round">
      <path d="M848,${baseY} L${apexX},${apexY}"/><path d="M988,${baseY} L${apexX},${apexY}"/>
      <line x1="862" y1="398" x2="974" y2="398"/><line x1="878" y1="330" x2="958" y2="330"/><line x1="892" y1="278" x2="944" y2="278"/>
      <path d="M848,${baseY} L${apexX},398 L988,${baseY}" stroke-opacity="0.5"/><path d="M862,398 L${apexX},330 L974,398" stroke-opacity="0.5"/><path d="M878,330 L${apexX},278 L958,330" stroke-opacity="0.5"/>
      <line x1="832" y1="282" x2="1004" y2="282"/><line x1="848" y1="330" x2="988" y2="330"/></g>
    <g fill="${FG}"><circle cx="832" cy="296" r="3.4"/><circle cx="1004" cy="296" r="3.4"/><circle cx="${apexX}" cy="${apexY}" r="4"/></g>
    <line x1="712" y1="${baseY}" x2="1124" y2="${baseY}" stroke="${FG}" stroke-opacity="0.28" stroke-width="1.5"/>`
}
function artDeepseek() {
  const svgPath = join(assetDir, 'deepseek-logo.svg')
  if (!existsSync(svgPath)) return artDefault()
  const d = (/\sd="([^"]+)"/.exec(readFileSync(svgPath, 'utf8')) || [])[1]
  if (!d) return artDefault()
  const cx = REGION.x + REGION.w / 2, cy = REGION.y + REGION.h / 2
  const size = Math.min(REGION.w, REGION.h) - 96
  const scale = size / 24
  return `<g transform="translate(${cx - (24 * scale) / 2} ${cy - (24 * scale) / 2}) scale(${scale})"><path d="${d}" fill="${DEEPSEEK_BLUE}"/></g>`
}
function artBarrel() {
  const base = 440
  const bars = [
    { h: 230, o: 0.9 },
    { h: 108, o: 0.72 },
    { h: 24, o: 0.56 },
    { h: 13, o: 0.46 },
    { h: 8, o: 0.38 },
  ]
  const bw = 30, gap = 14, x0 = 726
  let s = ''
  ;[230, 335, 440].forEach((y) => {
    s += `<line x1="722" y1="${y}" x2="1124" y2="${y}" stroke="${FG}" stroke-opacity="0.1"/>`
  })
  bars.forEach((b, i) => {
    s += `<rect x="${x0 + i * (bw + gap)}" y="${base - b.h}" width="${bw}" height="${b.h}" fill="${FG}" fill-opacity="${b.o}"/>`
  })
  s += `<path d="M985,330 L985,424 A 55 16 0 0 0 1095,424 L1095,330 A 55 16 0 0 1 985,330 Z" fill="${FG}" fill-opacity="0.2"/>`
  s += `<ellipse cx="1040" cy="330" rx="55" ry="16" fill="${FG}" fill-opacity="0.28"/>`
  s += `<g stroke="${FG}" fill="none" stroke-width="2.4">
      <ellipse cx="1040" cy="216" rx="55" ry="16" stroke-opacity="0.9"/>
      <line x1="985" y1="216" x2="985" y2="424" stroke-opacity="0.9"/>
      <line x1="1095" y1="216" x2="1095" y2="424" stroke-opacity="0.9"/>
      <path d="M985,424 A 55 16 0 0 0 1095,424" stroke-opacity="0.9"/>
      <path d="M985,268 A 55 16 0 0 0 1095,268" stroke-opacity="0.45" stroke-width="1.8"/>
      <path d="M985,356 A 55 16 0 0 0 1095,356" stroke-opacity="0.45" stroke-width="1.8"/>
    </g>`
  return s
}
function artDefault() {
  return `<g stroke="${FG}" stroke-opacity="0.5" stroke-width="2.4" fill="none"><circle cx="918" cy="315" r="110"/><path d="M835,388 L918,200 L1001,388 Z" stroke-opacity="0.7"/></g>`
}
const ART = {
  'the-barrel-of-intelligence': artBarrel,
  'the-token-economy': artTokenEconomy,
  'the-measuring-stick': artMeasuringStick,
  'the-gigawatt-land-grab': artGigawatt,
  'the-deepseek-discount': artDeepseek,
}

function buildStory(post) {
  const art = ART[post.slug] || artDefault
  const kicker = post.tags.length ? `RESEARCH NOTE · ${post.tags[0].toUpperCase()}` : 'RESEARCH NOTE'

  // plate
  const px = 76, pw = 928, py = 300, ph = 600

  // title
  const titleStartY = 1050
  const tlh = 76
  const titleLines = wrap(post.title, 62, pw, 4)
  const titleSpans = titleLines.map((ln, i) => `<tspan x="${px}" y="${titleStartY + i * tlh}">${esc(ln)}</tspan>`).join('')
  const titleBottom = titleStartY + (titleLines.length - 1) * tlh

  // summary
  const sumStartY = titleBottom + 92
  const slh = 46
  const sumLines = wrap(post.summary, 31, pw, 3)
  const sumSpans = sumLines.map((ln, i) => `<tspan x="${px}" y="${sumStartY + i * slh}">${esc(ln)}</tspan>`).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect x="34" y="34" width="${W - 68}" height="${H - 68}" fill="none" stroke="${FG}" stroke-opacity="0.14"/>
  <!-- header -->
  ${hexMark(112, 150, 22)}
  <text x="152" y="163" font-family="Sora" font-size="40" font-weight="600" fill="${FG}">Polygon</text>
  <text x="318" y="163" font-family="IBM Plex Mono Medium" font-size="20" letter-spacing="4" fill="${MUTED}">DIGITAL</text>
  <text x="${W - 76}" y="163" text-anchor="end" font-family="IBM Plex Mono Medium" font-size="18" letter-spacing="4" fill="${MUTED}">${esc(kicker)}</text>
  <line x1="76" y1="214" x2="${W - 76}" y2="214" stroke="${FG}" stroke-opacity="0.14"/>
  <!-- art plate -->
  <rect x="${px}" y="${py}" width="${pw}" height="${ph}" fill="${FG}" fill-opacity="0.04" stroke="${FG}" stroke-opacity="0.12"/>
  <svg x="${px}" y="${py}" width="${pw}" height="${ph}" viewBox="${REGION.x} ${REGION.y} ${REGION.w} ${REGION.h}" preserveAspectRatio="xMidYMid meet">${art()}</svg>
  <!-- title + summary -->
  <text x="${px}" y="${py + ph + 78}" font-family="IBM Plex Mono Medium" font-size="20" letter-spacing="3" fill="${MUTED}">${esc(fmtDate(post.date))}</text>
  <text font-family="Sora" font-size="62" font-weight="500" fill="${FG}" letter-spacing="-1">${titleSpans}</text>
  <text font-family="Manrope" font-size="31" fill="${MUTED}">${sumSpans}</text>
  <!-- footer -->
  <line x1="76" y1="1690" x2="${W - 76}" y2="1690" stroke="${FG}" stroke-opacity="0.14"/>
  <text x="76" y="1752" font-family="IBM Plex Mono Medium" font-size="21" letter-spacing="3" fill="${MUTED}">READ THE FULL NOTE</text>
  <text x="76" y="1826" font-family="Sora" font-size="60" font-weight="600" fill="${FG}" letter-spacing="-1">polygond.com</text>
  <g stroke="${FG}" stroke-opacity="0.6" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <line x1="${W - 120}" y1="1808" x2="${W - 76}" y2="1808"/>
    <polyline points="${W - 96},1793 ${W - 76},1808 ${W - 96},1823"/>
  </g>
</svg>`
}

const fontFiles = [join(fontDir, 'Sora.ttf'), join(fontDir, 'PlexMono-500.ttf'), join(fontDir, 'PlexMono-400.ttf')]

function findManropeFont() {
  // Manrope isn't in og-assets; resvg falls back to Sora for the summary, which
  // is fine. Kept explicit so the intent is clear.
  return null
}
findManropeFont()

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const files = readdirSync(postsDir).filter((f) => f.endsWith('.md'))
for (const f of files) {
  const meta = parseFrontmatter(readFileSync(join(postsDir, f), 'utf8'))
  const slug = f.replace(/\.md$/, '')
  const post = {
    slug,
    title: meta.title || slug,
    summary: meta.summary || '',
    date: meta.date || '',
    tags: meta.tags ? meta.tags.split(',').map((t) => t.trim()) : [],
  }
  const svg = buildStory(post)
  const r = new Resvg(svg, {
    background: BG,
    fitTo: { mode: 'width', value: W },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Sora' },
  })
  writeFileSync(join(outDir, `${slug}.png`), r.render().asPng())
  console.log('wrote', `public/story/${slug}.png`)
}
