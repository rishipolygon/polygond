import Mark from '../components/Mark.jsx'

export default function About() {
  return (
    <section className="page page-narrow">
      <header className="page-head">
        <span className="kicker">ABOUT</span>
        <h1>Polygon Digital</h1>
      </header>

      <div className="article about-body">
        <p>
          Polygon Digital is an independent research platform covering
          equities, macro, energy, crypto, and AI.
        </p>
        <p>
          It started as a project to build real financial acumen in public
          and help people understand what is actually moving in the markets.
          Most coverage tells you what happened. Polygon tells you what is
          happening, why it matters, and where the trade goes next.
        </p>
        <p>
          The early work broke down what other coverage assumes you already
          know. How prices get set. What moves them. Why a number on a
          screen means something different to the people trading against it.
        </p>
        <p>
          That project became a research platform. The lens does not change
          across sectors. Every piece carries a position, names the trade,
          and shows the reasoning. No bank owns the view. No desk needs the
          call to land a certain way.
        </p>
        <blockquote>
          Understand the flow and the price makes sense. That is the
          arbitrage.
        </blockquote>
      </div>

      <div className="about-bio">
        <img
          className="about-bio-photo"
          src="/rishi-headshot.png"
          alt="Rishi B."
          width="128"
          height="128"
          loading="lazy"
        />
        <div className="about-bio-text">
          <h2>Rishi B.</h2>
          <blockquote className="about-bio-quote">
            “I started Polygon to do one thing well. Read the market honestly
            and say what I actually think. No desk, no house view to protect:
            just the reasoning, the position, and why it matters. I cover
            equities, macro, energy, and AI, and I care most about the questions
            the headlines skip.”
          </blockquote>
          <div className="about-bio-links">
            <a
              className="connect-btn"
              href="https://www.linkedin.com/in/rishabhbalakrishnan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
              Connect on LinkedIn
            </a>
            <a className="connect-btn" href="mailto:rishabh.yyc@gmail.com">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              Email me
            </a>
          </div>
        </div>
      </div>

      <div className="about-mark">
        <Mark size={48} />
      </div>
    </section>
  )
}
