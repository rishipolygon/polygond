// Refreshes public/market.json with free, keyless data sources:
//   - Equities + commodity futures: Yahoo Finance chart endpoint
//   - Crypto: CoinGecko markets endpoint (top 10 by market cap, stables excluded)
// Run with: npm run market
// The committed market.json acts as a fallback seed if any source is down.

import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'market.json')

// Alpha Vantage is the fallback for equities when Yahoo fails.
// Key comes from the ALPHAVANTAGE_KEY env var (GitHub Actions secret in CI)
// or from the gitignored .env.local file when running locally.
// NOTE: free AV keys allow ~25 requests/day, so it stays a fallback only.
function loadEnvLocal() {
  const file = join(ROOT, '.env.local')
  if (!existsSync(file)) return
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)\s*=\s*(.+)$/.exec(line.trim())
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
  }
}
loadEnvLocal()
const AV_KEY = process.env.ALPHAVANTAGE_KEY ?? ''

// Top 10 US-listed companies by market cap — edit freely.
const STOCKS = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'META', 'AVGO', 'TSLA', 'BRK-B', 'LLY']

const COMMODITIES = [
  ['CL=F', 'WTI'],
  ['BZ=F', 'BRENT'],
  ['NG=F', 'NATGAS'],
  ['GC=F', 'GOLD'],
  ['SI=F', 'SILVER'],
  ['HG=F', 'COPPER'],
  ['ZC=F', 'CORN'],
  ['ZW=F', 'WHEAT'],
]

// headline indices for the /markets snapshot (Yahoo, costs no AV budget)
const INDICES = [
  ['^GSPC', 'S&P 500'],
  ['^IXIC', 'NASDAQ'],
  ['^DJI', 'DOW'],
  ['^VIX', 'VIX'],
  ['DX-Y.NYB', 'DXY'],
]

const STABLECOINS = new Set(['usdt', 'usdc', 'dai', 'usds', 'usde', 'busd', 'tusd', 'fdusd', 'pyusd'])
// wrapped/staked duplicates and tokenized products that pollute the top-10
const EXCLUDED = new Set(['wbtc', 'weth', 'steth', 'wsteth', 'cbbtc', 'reth', 'figr_heloc'])

async function yahoo(symbol, label) {
  // range=1d so chartPreviousClose is the prior session's close (daily change)
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1d`
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (polygond.com market ticker)' } })
  if (!res.ok) throw new Error(`${symbol}: HTTP ${res.status}`)
  const meta = (await res.json())?.chart?.result?.[0]?.meta
  const price = meta?.regularMarketPrice
  const prev = meta?.chartPreviousClose ?? meta?.previousClose
  if (typeof price !== 'number' || typeof prev !== 'number' || prev === 0) {
    throw new Error(`${symbol}: missing price data`)
  }
  return { sym: label ?? symbol, price, chg: ((price - prev) / prev) * 100 }
}

// like yahoo() but keeps a month of daily closes for sparklines
async function yahooSeries(symbol, label) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1mo&interval=1d`
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (polygond.com market ticker)' } })
  if (!res.ok) throw new Error(`${symbol}: HTTP ${res.status}`)
  const result = (await res.json())?.chart?.result?.[0]
  const price = result?.meta?.regularMarketPrice
  const closes = (result?.indicators?.quote?.[0]?.close || []).filter((c) => typeof c === 'number')
  if (typeof price !== 'number' || closes.length < 2) throw new Error(`${symbol}: missing series`)
  const prev = closes[closes.length - 2]
  return {
    sym: label,
    price,
    chg: ((price - prev) / prev) * 100,
    spark: closes.slice(-22).map((c) => Math.round(c * 100) / 100),
  }
}

async function alphaVantage(symbol) {
  // AV uses dots where Yahoo uses dashes (BRK-B -> BRK.B)
  const avSymbol = symbol.replace('-', '.')
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(avSymbol)}&apikey=${AV_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${symbol}: AV HTTP ${res.status}`)
  const quote = (await res.json())['Global Quote']
  const price = parseFloat(quote?.['05. price'])
  const chg = parseFloat((quote?.['10. change percent'] ?? '').replace('%', ''))
  if (!Number.isFinite(price) || !Number.isFinite(chg)) {
    throw new Error(`${symbol}: no AV quote (rate limit?)`)
  }
  return { sym: symbol, price, chg }
}

async function stockQuote(symbol) {
  try {
    return await yahoo(symbol)
  } catch (err) {
    if (!AV_KEY) throw err
    console.warn(`  ${symbol}: Yahoo failed (${err.message}), trying Alpha Vantage`)
    return alphaVantage(symbol)
  }
}

async function fetchCrypto() {
  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=16&page=1'
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`coingecko: HTTP ${res.status}`)
  const coins = await res.json()
  return coins
    .filter((c) => {
      const s = c.symbol.toLowerCase()
      return !STABLECOINS.has(s) && !EXCLUDED.has(s) && /^[a-z0-9]{2,5}$/.test(s)
    })
    .slice(0, 10)
    .map((c) => ({
      sym: c.symbol.toUpperCase(),
      price: c.current_price,
      chg: c.price_change_percentage_24h ?? 0,
    }))
}

async function settle(promises) {
  const results = await Promise.allSettled(promises)
  for (const r of results) {
    if (r.status === 'rejected') console.warn('  skipped:', r.reason.message ?? r.reason)
  }
  return results.filter((r) => r.status === 'fulfilled').map((r) => r.value)
}

console.log('Fetching indices...')
const indices = await settle(INDICES.map(([s, label]) => yahooSeries(s, label)))
console.log('Fetching equities...')
const stocks = await settle(STOCKS.map((s) => stockQuote(s)))
console.log('Fetching commodities...')
const commodities = await settle(COMMODITIES.map(([s, label]) => yahoo(s, label)))
console.log('Fetching crypto...')
let crypto = []
try {
  crypto = await fetchCrypto()
} catch (e) {
  console.warn('  skipped:', e.message)
}

if (stocks.length === 0 && crypto.length === 0 && commodities.length === 0) {
  console.error('All sources failed — keeping existing market.json')
  process.exit(1)
}

const out = { updated: new Date().toISOString(), indices, stocks, crypto, commodities }
writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n')
console.log(
  `Wrote market.json — ${indices.length} indices, ${stocks.length} stocks, ${crypto.length} crypto, ${commodities.length} commodities`,
)
