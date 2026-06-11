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
          Polygon Digital is a personal research log. I post breakdowns of
          whatever I'm digging into — markets, technology, and the systems
          that make them tick.
        </p>
        <p>
          The work sits at the intersection of physical commodity markets and
          computation: term structure and storage economics, basis and
          differentials, and the tooling that turns market data into
          decisions. No paywall, no sponsorship, no positions talked.
        </p>

        <hr />

        <h2>The author</h2>
        <p>
          Written by <strong>Rishi B.</strong>, an energy analyst based in
          Calgary, Canada. The views here are personal research notes, not
          investment advice and not the views of any employer.
        </p>

        <hr />

        <h2>Colophon</h2>
        <p>
          Set in Sora, Manrope, and IBM Plex Mono. Two colours: ink and
          paper. Built with React, published from plain Markdown files —
          one file per note.
        </p>
      </div>

      <div className="about-mark">
        <Mark size={48} />
      </div>
    </section>
  )
}
