import { useEffect, useState } from 'react'

// Three stacked market tickers (equities / crypto / commodities) along the
// bottom of the hero. Data comes from public/market.json, refreshed by
// scripts/fetch-market.mjs (locally via `npm run market`, in production by
// the scheduled GitHub Actions build). Monochrome: losses show in muted ink.
const ROWS = [
  { key: 'stocks', label: 'EQUITIES' },
  { key: 'crypto', label: 'CRYPTO' },
  { key: 'commodities', label: 'COMMODITIES' },
]

function fmtPrice(p) {
  if (p >= 1000) return p.toLocaleString('en-US', { maximumFractionDigits: 0 })
  if (p >= 1) return p.toFixed(2)
  return p.toFixed(4)
}

function fmtChg(c) {
  return `${c < 0 ? '−' : '+'}${Math.abs(c).toFixed(2)}%`
}

export default function Ticker() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}market.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch(() => {})
  }, [])

  if (!data) return null

  return (
    <div className="tickers">
      {ROWS.map((row, ri) => {
        const items = data[row.key] || []
        if (items.length === 0) return null

        const track = (copy) => (
          <div className="ticker-track" aria-hidden={copy > 0}>
            {items.map((it, i) => (
              <span className="ticker-item" key={`${copy}-${i}`}>
                <span className="ticker-sym">{it.sym}</span>
                <span className="ticker-price">{fmtPrice(it.price)}</span>
                <span className={`ticker-chg${it.chg < 0 ? ' down' : ''}`}>
                  {fmtChg(it.chg)}
                </span>
              </span>
            ))}
          </div>
        )

        return (
          <div className="ticker-row" key={row.key} style={{ '--dur': `${48 + ri * 14}s` }}>
            <div className="ticker-move">
              {track(0)}
              {track(1)}
            </div>
            <span className="ticker-label">{row.label}</span>
          </div>
        )
      })}
    </div>
  )
}
