import { useEffect, useState } from 'react'

// Markets dashboard fed by public/avdata.json (Alpha Vantage, refreshed by
// the scheduled build — see scripts/fetch-av.mjs).

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
  // AV format: YYYYMMDDTHHMMSS
  if (!t || t.length < 8) return ''
  const d = new Date(`${t.slice(0, 4)}-${t.slice(4, 6)}-${t.slice(6, 8)}T${t.slice(9, 11) || '00'}:${t.slice(11, 13) || '00'}:00Z`)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function MoverList({ title, items, showVolume = false }) {
  return (
    <div className="mover-col">
      <span className="kicker">{title}</span>
      <ul>
        {items.map((m) => (
          <li key={m.sym}>
            <span className="mover-sym">{m.sym}</span>
            <span className="mover-price">
              {showVolume ? fmtVolume(m.volume) : fmtPrice(m.price)}
            </span>
            <span className={`mover-chg${(m.chg ?? 0) < 0 ? ' down' : ''}`}>{fmtChg(m.chg)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Markets() {
  const [data, setData] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}avdata.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
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

  if (!data) return <section className="page" />

  const updated = new Date(data.updated)
  const updatedLabel = updated.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <section className="page">
      <header className="page-head">
        <span className="kicker">MARKETS · AS OF {updatedLabel.toUpperCase()}</span>
        <h1>Market dashboard</h1>
        <p className="page-lede">
          Rates, movers, and what the tape is talking about. Refreshed through
          the trading day.
        </p>
      </header>

      {data.macro.length > 0 && (
        <div className="macro-strip">
          {data.macro.map((m) => (
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
      )}

      {data.movers && (
        <div className="dash-section">
          <h2>Today's movers</h2>
          <div className="movers-grid">
            <MoverList title="TOP GAINERS" items={data.movers.gainers} />
            <MoverList title="TOP LOSERS" items={data.movers.losers} />
            <MoverList title="MOST ACTIVE · VOL" items={data.movers.active} showVolume />
          </div>
        </div>
      )}

      {data.news.length > 0 && (
        <div className="dash-section">
          <h2>What the tape is reading</h2>
          <ul className="news-list">
            {data.news.map((n) => (
              <li key={n.url}>
                <a href={n.url} target="_blank" rel="noopener noreferrer">
                  <span className={`news-tag${/bearish/i.test(n.label) ? ' down' : ''}`}>
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

      <p className="dash-disclaimer">
        Data via Alpha Vantage; may be delayed. Nothing here is investment
        advice.
      </p>
    </section>
  )
}
