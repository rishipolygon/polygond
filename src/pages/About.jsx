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

      <div className="about-mark">
        <Mark size={48} />
      </div>
    </section>
  )
}
