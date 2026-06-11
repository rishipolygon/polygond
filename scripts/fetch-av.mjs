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

// AV economic series arrive newest-first; return chronological [{date, value}]
const seriesOf = (json, keep) =>
  (json.data || [])
    .filter((d) => d.value !== '.')
    .slice(0, keep)
    .map((d) => ({ date: d.date, value: num(d.value) }))
    .reverse()

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

// — macro — each entry keeps its full series so the page can chart it
const MACRO_CALLS = [
  ['10Y TREASURY', { function: 'TREASURY_YIELD', interval: 'daily', maturity: '10year' }, '%', 380],
  ['2Y TREASURY', { function: 'TREASURY_YIELD', interval: 'daily', maturity: '2year' }, '%', 380],
  ['FED FUNDS', { function: 'FEDERAL_FUNDS_RATE', interval: 'daily' }, '%', 380],
  ['UNEMPLOYMENT', { function: 'UNEMPLOYMENT' }, '%', 48],
]

const macroRaw = {}
for (const [label, params, unit, keep] of MACRO_CALLS) {
  try {
    console.log(`Fetching ${label}...`)
    const series = seriesOf(await av(params), keep)
    if (series.length > 0) {
      const last = series[series.length - 1]
      macroRaw[label] = series
      out.macro.push({ label, value: last.value, unit, date: last.date, series })
    }
  } catch (e) {
    console.warn(`  ${label} failed:`, e.message)
  }
}

// CPI: year-over-year % series computed from the monthly index
try {
  console.log('Fetching CPI...')
  const rows = seriesOf(await av({ function: 'CPI', interval: 'monthly' }), 600)
  const yoySeries = []
  for (let i = 12; i < rows.length; i++) {
    yoySeries.push({
      date: rows[i].date,
      value: Math.round((rows[i].value / rows[i - 12].value - 1) * 10000) / 100,
    })
  }
  const series = yoySeries.slice(-48)
  if (series.length > 0) {
    const last = series[series.length - 1]
    out.macro.push({ label: 'CPI YOY', value: last.value, unit: '%', date: last.date, series })
  }
} catch (e) {
  console.warn('  CPI failed:', e.message)
}

// 2s10s spread series, derived — the recession-watch number
if (macroRaw['10Y TREASURY'] && macroRaw['2Y TREASURY']) {
  const twos = new Map(macroRaw['2Y TREASURY'].map((p) => [p.date, p.value]))
  const series = macroRaw['10Y TREASURY']
    .filter((p) => twos.has(p.date))
    .map((p) => ({ date: p.date, value: Math.round((p.value - twos.get(p.date)) * 100) }))
  if (series.length > 0) {
    const last = series[series.length - 1]
    out.macro.splice(2, 0, { label: '2S10S SPREAD', value: last.value, unit: 'bp', date: last.date, series })
  }
}

// — news sentiment —
try {
  console.log('Fetching news sentiment...')
  const j = await av({ function: 'NEWS_SENTIMENT', topics: 'financial_markets', sort: 'LATEST', limit: '50' })
  out.news = (j.feed || []).slice(0, 18).map((a) => ({
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
