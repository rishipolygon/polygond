import { createElement } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { marked } from 'marked'
import { posts, formatDate } from '../lib/posts.js'
import Cover from '../lib/covers.jsx'
import Share from '../components/Share.jsx'
import { charts, CHART_TOKEN } from '../components/charts/index.js'

marked.setOptions({ gfm: true })

// Splits a body on `[[chart:key]]` lines into an array of markdown strings and
// chart keys, so interactive figures can be React while the prose stays markdown.
function splitBody(body) {
  const parts = []
  let last = 0
  CHART_TOKEN.lastIndex = 0
  let m
  while ((m = CHART_TOKEN.exec(body)) !== null) {
    parts.push({ md: body.slice(last, m.index) })
    parts.push({ chart: m[1] })
    last = m.index + m[0].length
  }
  parts.push({ md: body.slice(last) })
  return parts.filter((p) => (p.chart ? charts[p.chart] : p.md.trim()))
}

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

      <div className="article-cover" aria-hidden="true">
        <Cover slug={post.slug} />
      </div>

      <header className="article-head">
        <span className="kicker">
          {formatDate(post.date)} · RISHI B.
          {post.tags.length > 0 && <> · {post.tags.join(' · ').toUpperCase()}</>}
        </span>
        <h1>{post.title}</h1>
      </header>

      <article className="article">
        {splitBody(post.body).map((part, i) =>
          part.chart ? (
            createElement(charts[part.chart], { key: i })
          ) : (
            <div key={i} dangerouslySetInnerHTML={{ __html: marked.parse(part.md) }} />
          )
        )}
      </article>

      <Share slug={post.slug} title={post.title} />

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
