import { useEffect, useState } from 'react'

// Markets dashboard. Structure runs hot -> cold:
//   1. Snapshot   — indices + VIX + DXY with sparklines (market.json / Yahoo)
//   2. Rates      — treasuries, 2s10s, fed funds, CPI, unemployment (avdata.json / AV)
//   3. Movers     — tabbed gainers / losers / most active (avdata.json / AV)
//   4. The tape   — sentiment-filterable headlines (avdata.json / AV)

function fmtPrice(p) {
  if (p == null) return '—'
  if (p >= 1000) return p.toLocaleString('en-US', { maximumFractionDigits: 0 })
  if (p >= 1) return p.toFixed(2)
  return p.toFixed(4)
}

const fmtChg = (c) => (c == null ? '—' : `${c < 0 ? '−' : '+'}${Math.abs(c).toFixed(2)}%`)

function fmtVolume(v) {
  if (v == null) return '—'
  if (v >= 1e9) return (v / 1e9).toFixed(1) + 'B'
  if (v >= 1e6) return (v / 1e6).toFixed(1) + 'M'
  if (v >= 1e3) return (v / 1e3).toFixed(0) + 'K'
  return String(v)
}

function fmtNewsTime(t) {
  if (!t || t.length < 8) return ''
  const d = new Date(
    `${t.slice(0, 4)}-${t.slice(4, 6)}-${t.slice(6, 8)}T${t.slice(9, 11) || '00'}:${t.slice(11, 13) || '00'}:00Z`,
  )
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function Sparkline({ data }) {
  if (!data || data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data
    .map((v, i) => `${((i / (data.length - 1)) * 100).toFixed(2)},${(30 - ((v - min) / range) * 26).toFixed(2)}`)
    .join(' ')
  return (
    <svg className="spark" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

const MOVER_TABS = [
  { key: 'gainers', label: 'GAINERS' },
  { key: 'losers', label: 'LOSERS' },
  { key: 'active', label: 'MOST ACTIVE' },
]

const NEWS_FILTERS = [
  { key: 'all', label: 'ALL' },
  { key: 'bullish', label: 'BULLISH' },
  { key: 'bearish', label: 'BEARISH' },
  { key: 'neutral', label: 'NEUTRAL' },
]

const sentimentGroup = (label) => {
  if (/bearish/i.test(label || '')) return 'bearish'
  if (/bullish/i.test(label || '')) return 'bullish'
  return 'neutral'
}

export default function Markets() {
  const [snap, setSnap] = useState(null) // market.json (indices)
  const [dash, setDash] = useState(null) // avdata.json (macro/movers/news)
  const [failed, setFailed] = useState(false)
  const [tab, setTab] = useState('gainers')
  const [newsFilter, setNewsFilter] = useState('all')

  useEffect(() => {
    const base = import.meta.env.BASE_URL
    Promise.all([
      fetch(`${base}market.json`).then((r) => (r.ok ? r.json() : null)),
      fetch(`${base}avdata.json`).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([m, a]) => {
        setSnap(m)
        setDash(a)
        if (!m && !a) setFailed(true)
      })
      .catch(() => setFailed(true))
  }, [])

  if (failed) {
    return (
      <section className="page">
        <header className="page-head">
          <span className="kicker">MARKETS</span>
          <h1>Market dashboard</h1>
          <p className="page-lede">Dashboard data isn't available right now — check back shortly.</p>
        </header>
      </section>
    )
  }

  if (!snap && !dash) return <section className="page" />

  const updated = new Date((dash || snap).updated)
  const updatedLabel = updated
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase()

  const movers = dash?.movers?.[tab] || []
  const news = (dash?.news || []).filter(
    (n) => newsFilter === 'all' || sentimentGroup(n.label) === newsFilter,
  )

  return (
    <section className="page">
      <header className="page-head">
        <span className="kicker">MARKETS · AS OF {updatedLabel}</span>
        <h1>Market dashboard</h1>
        <p className="page-lede">
          Welcome to the Polygon Index — the day on one page. Where markets
          sit, what rates are saying, what's moving, and what the tape is
          trading on.
        </p>
      </header>

      {snap?.indices?.length > 0 && (
        <div className="dash-section">
          <div className="snapshot-grid">
            {snap.indices.map((ix) => (
              <div className="snap-card" key={ix.sym}>
                <span className="kicker">{ix.sym}</span>
                <span className="snap-price">{fmtPrice(ix.price)}</span>
                <span className={`snap-chg${ix.chg < 0 ? ' down' : ''}`}>{fmtChg(ix.chg)}</span>
                <Sparkline data={ix.spark} />
                <span className="snap-range">1 MONTH</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {dash?.macro?.length > 0 && (
        <div className="dash-section">
          <h2>Rates &amp; macro</h2>
          <div className="macro-strip">
            {dash.macro.map((m) => (
              <div className="macro-stat" key={m.label}>
                <span className="kicker">{m.label}</span>
                <span className="macro-value">
                  {m.unit === 'bp' && m.value > 0 ? '+' : ''}
                  {m.value}
                  <span className="macro-unit">{m.unit}</span>
                </span>
                <span className="macro-date">{m.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {dash?.movers && (
        <div className="dash-section">
          <h2>Today's movers</h2>
          <div className="tab-row" role="tablist">
            {MOVER_TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                className={`tab-btn${tab === t.key ? ' active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <ul className="mover-list">
            {movers.map((m, i) => (
              <li key={m.sym}>
                <span className="mover-rank">{String(i + 1).padStart(2, '0')}</span>
                <span className="mover-sym">{m.sym}</span>
                <span className="mover-price">
                  {tab === 'active' ? `${fmtVolume(m.volume)} SHRS` : fmtPrice(m.price)}
                </span>
                <span className={`mover-chg${(m.chg ?? 0) < 0 ? ' down' : ''}`}>{fmtChg(m.chg)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {dash?.news?.length > 0 && (
        <div className="dash-section">
          <h2>What's trending on the tape</h2>
          <div className="tab-row tab-row-small">
            {NEWS_FILTERS.map((f) => (
              <button
                key={f.key}
                className={`tab-btn${newsFilter === f.key ? ' active' : ''}`}
                onClick={() => setNewsFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          {news.length === 0 ? (
            <p className="news-empty">Nothing {newsFilter} on the tape right now.</p>
          ) : (
            <div className="news-scroll">
              <ul className="news-list">
                {news.map((n) => (
                  <li key={n.url}>
                    <a href={n.url} target="_blank" rel="noopener noreferrer">
                      <span className={`news-tag${sentimentGroup(n.label) === 'bearish' ? ' down' : ''}`}>
                        {(n.label || 'NEUTRAL').toUpperCase().replace('SOMEWHAT-', '~')}
                      </span>
                      <span className="news-title">{n.title}</span>
                      <span className="news-meta">
                        {n.source} · {fmtNewsTime(n.time)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <p className="dash-disclaimer">
        Indices via Yahoo Finance · macro, movers &amp; news via Alpha Vantage ·
        may be delayed · not investment advice
      </p>
    </section>
  )
}
