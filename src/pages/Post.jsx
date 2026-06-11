import { useParams, Link, Navigate } from 'react-router-dom'
import { marked } from 'marked'
import { posts, formatDate } from '../lib/posts.js'

marked.setOptions({ gfm: true })

export default function Post() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  const idx = posts.indexOf(post)
  const newer = posts[idx - 1]
  const older = posts[idx + 1]

  return (
    <section className="page page-narrow">
      <Link to="/blog" className="back-link">← All notes</Link>

      <header className="article-head">
        <span className="kicker">
          {formatDate(post.date)} · RISHI B.
          {post.tags.length > 0 && <> · {post.tags.join(' · ').toUpperCase()}</>}
        </span>
        <h1>{post.title}</h1>
      </header>

      <article
        className="article"
        dangerouslySetInnerHTML={{ __html: marked.parse(post.body) }}
      />

      <nav className="post-nav">
        {older ? (
          <Link to={`/blog/${older.slug}`} className="post-nav-link">
            <span className="kicker">← OLDER</span>
            {older.title}
          </Link>
        ) : <span />}
        {newer ? (
          <Link to={`/blog/${newer.slug}`} className="post-nav-link post-nav-next">
            <span className="kicker">NEWER →</span>
            {newer.title}
          </Link>
        ) : <span />}
      </nav>
    </section>
  )
}
