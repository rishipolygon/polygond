import { Link } from 'react-router-dom'
import { posts, formatDate } from '../lib/posts.js'

export default function Blog() {
  if (posts.length === 0) {
    return (
      <section className="page">
        <div className="coming-soon">
          <span className="kicker">RESEARCH NOTES</span>
          <h1>Coming soon</h1>
          <p className="page-lede">
            Breakdowns, deep dives, and research notes are on the way. The first
            notes publish here shortly.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="page">
      <header className="page-head">
        <span className="kicker">RESEARCH NOTES</span>
        <h1>The blog</h1>
        <p className="page-lede">
          Breakdowns, deep dives, and research notes — told with conviction.
        </p>
      </header>

      <div className="post-list">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="post-row"
          >
            <span className="post-num">{String(i + 1).padStart(2, '0')}</span>
            <div className="post-row-main">
              <h2>{post.title}</h2>
              {post.summary && <p>{post.summary}</p>}
            </div>
            <span className="post-row-meta">
              <span>{formatDate(post.date)}</span>
              {post.tags.length > 0 && <span>{post.tags[0]}</span>}
            </span>
            <span className="post-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
