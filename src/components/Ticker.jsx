import { Link } from 'react-router-dom'
import { posts, formatDate } from '../lib/posts.js'

const STANDING_ITEMS = [
  'POLYGON DIGITAL',
  'INDEPENDENT RESEARCH',
  'ONE NOTE · EVERY WEEK',
  'CALGARY · 51.04°N 114.07°W',
]

// Infinite marquee along the bottom of the hero. Latest notes are
// clickable; the track is duplicated so the loop is seamless.
export default function Ticker() {
  const items = [
    ...posts.slice(0, 5).map((p) => ({
      text: `${formatDate(p.date)} — ${p.title}`,
      to: `/blog/${p.slug}`,
    })),
    ...STANDING_ITEMS.map((text) => ({ text })),
  ]

  const track = (copy) => (
    <div className="ticker-track" aria-hidden={copy > 0}>
      {items.map((it, i) => (
        <span className="ticker-item" key={`${copy}-${i}`}>
          {it.to ? <Link to={it.to} tabIndex={copy > 0 ? -1 : 0}>{it.text}</Link> : it.text}
          <span className="ticker-sep">·</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="ticker">
      <div className="ticker-move">
        {track(0)}
        {track(1)}
      </div>
    </div>
  )
}
