import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Mark from './Mark.jsx'

function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('pd-theme', theme)
  }, [theme])

  const dark = theme === 'dark'
  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Paper' : 'Ink'}
    >
      {/* outline hexagon = light mode, solid hexagon = dark mode */}
      <svg viewBox="0 0 100 100" width="16" height="16" aria-hidden="true">
        <polygon
          points="50,6 88,28 88,72 50,94 12,72 12,28"
          fill={dark ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="8"
        />
      </svg>
    </button>
  )
}

export default function Nav() {
  return (
    <header className="nav">
      <Link to="/" className="nav-brand">
        <Mark size={26} />
        <span className="nav-wordmark">
          Polygon<span className="nav-sub">DIGITAL</span>
        </span>
      </Link>
      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/about">About</NavLink>
        <ThemeToggle />
      </nav>
    </header>
  )
}
