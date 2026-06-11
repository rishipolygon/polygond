// Builds public/avdata.json for the /markets page using Alpha Vantage.
// 7 requests per run; the free tier allows ~25/day and 5/minute, so calls
// are spaced ~13s apart and the deploy cron runs 3x/day. Run manually with:
//   npm run avdata
// Requires ALPHAVANTAGE_KEY in the environment or in .env.local.

import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'avdata.json')

function loadEnvLocal() {
  const file = join(ROOT, '.env.local')
  if (!existsSync(file)) return
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)\s*=\s*(.+)$/.exec(line.trim())
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
  }
}
loadEnvLocal()
const KEY = process.env.ALPHAVANTAGE_KEY
if (!KEY) {
  console.error('ALPHAVANTAGE_KEY not set — skipping AV dashboard refresh')
  process.exit(1)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let firstCall = true

async function av(params) {
  if (!firstCall) await sleep(13000) // stay under 5 requests/minute
  firstCall = false
  const url = 'https://www.alphavantage.co/query?' + new URLSearchParams({ ...params, apikey: KEY })
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  const note = json.Note || json.Information || json['Error Message']
  if (note) throw new Error(String(note).slice(0, 120))
  return json
}

const num = (v) => {
  const n = parseFloat(String(v).replace('%', ''))
  return Number.isFinite(n) ? n : null
}

// most recent non-missing value in an AV economic data series
const latest = (json) => {
  const row = (json.data || []).find((d) => d.value !== '.')
  return row ? { value: num(row.value), date: row.date } : null
}

const out = { updated: new Date().toISOString(), movers: null, macro: [], news: [] }

// — movers —
try {
  console.log('Fetching top gainers/losers...')
  const j = await av({ function: 'TOP_GAINERS_LOSERS' })
  const map = (list) =>
    (list || []).slice(0, 5).map((x) => ({
      sym: x.ticker,
      price: num(x.price),
      chg: num(x.change_percentage),
      volume: num(x.volume),
    }))
  out.movers = {
    asOf: j.last_updated || '',
    gainers: map(j.top_gainers),
    losers: map(j.top_losers),
    active: map(j.most_actively_traded),
  }
} catch (e) {
  console.warn('  movers failed:', e.message)
}

// — macro —
const MACRO_CALLS = [
  ['10Y TREASURY', { function: 'TREASURY_YIELD', interval: 'daily', maturity: '10year' }, '%'],
  ['2Y TREASURY', { function: 'TREASURY_YIELD', interval: 'daily', maturity: '2year' }, '%'],
  ['FED FUNDS', { function: 'FEDERAL_FUNDS_RATE', interval: 'daily' }, '%'],
  ['UNEMPLOYMENT', { function: 'UNEMPLOYMENT' }, '%'],
]

const macroRaw = {}
for (const [label, params, unit] of MACRO_CALLS) {
  try {
    console.log(`Fetching ${label}...`)
    const point = latest(await av(params))
    if (point) {
      macroRaw[label] = point
      out.macro.push({ label, value: point.value, unit, date: point.date })
    }
  } catch (e) {
    console.warn(`  ${label} failed:`, e.message)
  }
}

// CPI: compute year-over-year % from the monthly index
try {
  console.log('Fetching CPI...')
  const j = await av({ function: 'CPI', interval: 'monthly' })
  const rows = (j.data || []).filter((d) => d.value !== '.')
  if (rows.length > 12) {
    const yoy = (num(rows[0].value) / num(rows[12].value) - 1) * 100
    out.macro.push({ label: 'CPI YOY', value: Math.round(yoy * 100) / 100, unit: '%', date: rows[0].date })
  }
} catch (e) {
  console.warn('  CPI failed:', e.message)
}

// 2s10s spread, derived — the recession-watch number
if (macroRaw['10Y TREASURY'] && macroRaw['2Y TREASURY']) {
  const spread = (macroRaw['10Y TREASURY'].value - macroRaw['2Y TREASURY'].value) * 100
  out.macro.splice(2, 0, {
    label: '2S10S SPREAD',
    value: Math.round(spread),
    unit: 'bp',
    date: macroRaw['10Y TREASURY'].date,
  })
}

// — news sentiment —
try {
  console.log('Fetching news sentiment...')
  const j = await av({ function: 'NEWS_SENTIMENT', topics: 'financial_markets', sort: 'LATEST', limit: '20' })
  out.news = (j.feed || []).slice(0, 6).map((a) => ({
    title: a.title,
    url: a.url,
    source: a.source,
    time: a.time_published, // YYYYMMDDTHHMMSS
    label: a.overall_sentiment_label,
    score: num(a.overall_sentiment_score),
  }))
} catch (e) {
  console.warn('  news failed:', e.message)
}

if (!out.movers && out.macro.length === 0 && out.news.length === 0) {
  console.error('All Alpha Vantage calls failed — keeping existing avdata.json')
  process.exit(1)
}

writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n')
console.log(
  `Wrote avdata.json — movers: ${out.movers ? 'yes' : 'no'}, macro: ${out.macro.length}, news: ${out.news.length}`,
)
