// Refreshes public/market.json with free, keyless data sources:
//   - Equities + commodity futures: Yahoo Finance chart endpoint
//   - Crypto: CoinGecko markets endpoint (top 10 by market cap, stables excluded)
// Run with: npm run market
// The committed market.json acts as a fallback seed if any source is down.

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'market.json')

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

console.log('Fetching equities...')
const stocks = await settle(STOCKS.map((s) => yahoo(s)))
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

const out = { updated: new Date().toISOString(), stocks, crypto, commodities }
writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n')
console.log(
  `Wrote market.json — ${stocks.length} stocks, ${crypto.length} crypto, ${commodities.length} commodities`,
)
