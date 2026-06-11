import { Link } from 'react-router-dom'
import { posts, formatDate } from '../lib/posts.js'

export default function Blog() {
  return (
    <section className="page">
      <header className="page-head">
        <span className="kicker">INDEX · {String(posts.length).padStart(2, '0')} NOTES</span>
        <h1>Research notes</h1>
        <p className="page-lede">
          Breakdowns, deep dives, and research notes on whatever I'm
          digging into.
        </p>
      </header>

      <div className="post-list">
        {posts.map((p, i) => (
          <Link to={`/blog/${p.slug}`} className="post-row" key={p.slug}>
            <span className="post-num">{String(posts.length - i).padStart(2, '0')}</span>
            <div className="post-row-main">
              <h2>{p.title}</h2>
              {p.summary && <p>{p.summary}</p>}
            </div>
            <div className="post-row-meta">
              <span className="post-date">{formatDate(p.date)}</span>
              {p.tags.length > 0 && (
                <span className="post-tags">{p.tags.join(' · ')}</span>
              )}
            </div>
            <span className="post-arrow">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
