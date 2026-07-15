import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Ticker from '../components/Ticker.jsx'
import Subscribe from '../components/Subscribe.jsx'
import { posts, formatDate } from '../lib/posts.js'
import Cover from '../lib/covers.jsx'

// Striking landing: the hexagon mark, one line, two doors, a ticker.
// The outer hexagon draws itself on load and tilts gently toward the cursor.
export default function Home() {
  const heroRef = useRef(null)
  const markRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const mark = markRef.current
    if (!hero || !mark) return

    function onMove(e) {
      const r = hero.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      mark.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`
    }
    function onLeave() {
      mark.style.transform = 'rotateY(0deg) rotateX(0deg)'
    }
    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
    <section className="hero" ref={heroRef}>
      <div className="hero-bg" aria-hidden="true" />
      <svg className="hero-watermark" viewBox="0 0 100 100" aria-hidden="true">
        <polygon
          points="50,4 89.8,27 89.8,73 50,96 10.2,73 10.2,27"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
        />
        <polygon
          points="50,26 70.8,38 70.8,62 50,74 29.2,62 29.2,38"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
        />
      </svg>
      <span className="hero-corner hero-corner-tr">EST. 2025</span>

      <div className="hero-mark" ref={markRef}>
        <svg viewBox="0 0 100 100" width="88" height="88" aria-hidden="true">
          <polygon
            className="hero-hex-outer"
            points="50,4 89.8,27 89.8,73 50,96 10.2,73 10.2,27"
            fill="none"
            stroke="currentColor"
            strokeWidth="5.4"
            strokeLinejoin="miter"
          />
          <polygon
            className="hero-hex-inner"
            points="50,26 70.8,38 70.8,62 50,74 29.2,62 29.2,38"
            fill="currentColor"
          />
        </svg>
      </div>

      <h1 className="hero-title">
        Market analysis with conviction.
      </h1>

      <p className="hero-sub">
        We tell you what we think is happening, and why it matters.
      </p>

      <div className="hero-links">
        <Link to="/blog" className="hero-link">
          Read the blog <span className="arrow">→</span>
        </Link>
        <Link to="/about" className="hero-link hero-link-quiet">
          About <span className="arrow">→</span>
        </Link>
      </div>

      <Ticker />
    </section>

    {posts.length > 0 && (
      <section className="home-latest">
        <div className="home-latest-head">
          <span className="kicker">LATEST NOTES</span>
          <Link to="/blog" className="home-latest-all">
            All notes <span className="arrow">→</span>
          </Link>
        </div>
        <div className="post-list">
          {posts.slice(0, 3).map((post, i) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="post-row">
              <span className="post-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="post-cover" aria-hidden="true">
                <Cover slug={post.slug} />
              </span>
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
    )}

    <Subscribe />
    </>
  )
}
