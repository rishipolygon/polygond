import { useState, useEffect } from 'react'

// Markets dashboard ("The Polygon Index"). Structure runs hot -> cold:
//   1. Snapshot   — indices + VIX + DXY, click any card to chart it
//   2. Rates      — macro stats, click any cell to chart its history
//   3. Movers     — S&P 500 marquee + tabbed gainers / losers / most active
//   4. The tape   — sentiment-filterable headlines, scrollable

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

// ——— interactive chart (hover crosshair, no libraries) ———

const W = 600
const H = 200

function Chart({ dates, values, unit }) {
  const [hi, setHi] = useState(null)
  if (!values || values.length < 2) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const x = (i) => (i / (values.length - 1)) * W
  const y = (v) => H - 8 - ((v - min) / range) * (H - 20)
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const fmtV = (v) => `${v >= 1000 ? v.toLocaleString('en-US', { maximumFractionDigits: 0 }) : v}${unit || ''}`
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const i = Math.round(((e.clientX - r.left) / r.width) * (values.length - 1))
    setHi(Math.max(0, Math.min(values.length - 1, i)))
  }

  return (
    <div className="chart-wrap">
      <div className="chart-readout">
        {hi != null
          ? `${dates[hi]} · ${fmtV(values[hi])}`
          : `HIGH ${fmtV(max)} · LOW ${fmtV(min)}`}
      </div>
      <svg
        className="chart-svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        onMouseMove={onMove}
        onMouseLeave={() => setHi(null)}
      >
        <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {hi != null && (
          <line
            x1={x(hi)}
            x2={x(hi)}
            y1="0"
            y2={H}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
      <div className="chart-axis">
        <span>{dates[0]}</span>
        <span>{dates[dates.length - 1]}</span>
      </div>
    </div>
  )
}

const RANGES = [
  { key: '1M', points: 22 },
  { key: '6M', points: 126 },
  { key: '1Y', points: 252 },
]

function ChartDrawer({ sel, onClose }) {
  const [range, setRange] = useState('6M')
  const daily = sel.values.length > 60 // monthly series get no range toggle
  const n = daily ? (RANGES.find((r) => r.key === range)?.points ?? sel.values.length) : sel.values.length
  const values = sel.values.slice(-n)
  const dates = sel.dates.slice(-n)

  return (
    <div className="chart-drawer">
      <div className="chart-head">
        <span className="kicker">{sel.label}</span>
        <div className="chart-controls">
          {daily &&
            RANGES.map((r) => (
              <button
                key={r.key}
                className={`tab-btn${range === r.key ? ' active' : ''}`}
                onClick={() => setRange(r.key)}
              >
                {r.key}
              </button>
            ))}
          <button className="tab-btn chart-close" onClick={onClose} aria-label="Close chart">
            ✕
          </button>
        </div>
      </div>
      <Chart dates={dates} values={values} unit={sel.unit} />
    </div>
  )
}

// ——— sections ———

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
  const [snap, setSnap] = useState(null)
  const [dash, setDash] = useState(null)
  const [failed, setFailed] = useState(false)
  const [tab, setTab] = useState('gainers')
  const [newsFilter, setNewsFilter] = useState('all')
  const [sel, setSel] = useState(null) // { kind, label, unit, dates, values }

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
  const sp500 = snap?.sp500 || []

  const toggleIndex = (ix) => {
    if (!ix.series) return
    setSel(
      sel?.kind === 'index' && sel.label === ix.sym
        ? null
        : { kind: 'index', label: ix.sym, unit: '', dates: ix.series.dates, values: ix.series.values },
    )
  }

  const toggleMacro = (m) => {
    if (!m.series) return
    setSel(
      sel?.kind === 'macro' && sel.label === m.label
        ? null
        : {
            kind: 'macro',
            label: m.label,
            unit: m.unit,
            dates: m.series.map((p) => p.date),
            values: m.series.map((p) => p.value),
          },
    )
  }

  const spTrack = (copy) => (
    <div className="ticker-track" aria-hidden={copy > 0}>
      {sp500.map((s) => (
        <span className="ticker-item" key={`${copy}-${s.sym}`}>
          <span className="ticker-sym">{s.sym}</span>
          <span className="ticker-price">{fmtPrice(s.price)}</span>
          <span className={`ticker-chg${s.chg < 0 ? ' down' : ''}`}>{fmtChg(s.chg)}</span>
        </span>
      ))}
    </div>
  )

  return (
    <section className="page">
      <header className="page-head">
        <span className="kicker">MARKETS · AS OF {updatedLabel}</span>
        <h1>Market dashboard</h1>
        <p className="page-lede">
          Welcome to the Polygon Index — the day on one page. Where markets
          sit, what rates are saying, what's moving, and what the tape is
          trading on. Click any card to chart it.
        </p>
      </header>

      {snap?.indices?.length > 0 && (
        <div className="dash-section">
          <div className="snapshot-grid">
            {snap.indices.map((ix) => (
              <button
                className={`snap-card clickable${sel?.kind === 'index' && sel.label === ix.sym ? ' active' : ''}`}
                key={ix.sym}
                onClick={() => toggleIndex(ix)}
              >
                <span className="kicker">{ix.sym}</span>
                <span className="snap-price">{fmtPrice(ix.price)}</span>
                <span className={`snap-chg${ix.chg < 0 ? ' down' : ''}`}>{fmtChg(ix.chg)}</span>
                <Sparkline data={ix.series ? ix.series.values.slice(-22) : null} />
                <span className="snap-range">1 MONTH</span>
              </button>
            ))}
          </div>
          {sel?.kind === 'index' && <ChartDrawer key={sel.label} sel={sel} onClose={() => setSel(null)} />}
        </div>
      )}

      {dash?.macro?.length > 0 && (
        <div className="dash-section">
          <h2>Rates &amp; macro</h2>
          <div className="macro-strip">
            {dash.macro.map((m) => (
              <button
                className={`macro-stat${m.series ? ' clickable' : ''}${sel?.kind === 'macro' && sel.label === m.label ? ' active' : ''}`}
                key={m.label}
                onClick={() => toggleMacro(m)}
              >
                <span className="kicker">{m.label}</span>
                <span className="macro-value">
                  {m.unit === 'bp' && m.value > 0 ? '+' : ''}
                  {m.value}
                  <span className="macro-unit">{m.unit}</span>
                </span>
                <span className="macro-date">{m.date}</span>
              </button>
            ))}
          </div>
          {sel?.kind === 'macro' && <ChartDrawer key={sel.label} sel={sel} onClose={() => setSel(null)} />}
        </div>
      )}

      {dash?.movers && (
        <div className="dash-section">
          <h2>Today's movers</h2>
          {sp500.length > 0 && (
            <div className="ticker-row sp-row" style={{ '--dur': '60s' }}>
              <div className="ticker-move">
                {spTrack(0)}
                {spTrack(1)}
              </div>
              <span className="ticker-label">S&amp;P 500</span>
            </div>
          )}
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
