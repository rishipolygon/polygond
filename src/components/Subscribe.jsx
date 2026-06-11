import { useState } from 'react'

// To activate email signup, create a free form endpoint (formspree.io or
// buttondown.com both have free tiers) and paste its URL here, e.g.
// 'https://formspree.io/f/abcdwxyz'. Until then the form points people
// at the RSS feed instead.
const SUBSCRIBE_ENDPOINT = ''

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done | soon | error

  async function onSubmit(e) {
    e.preventDefault()
    if (!SUBSCRIBE_ENDPOINT) {
      setStatus('soon')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="subscribe">
      <div className="subscribe-inner">
        <div className="subscribe-copy">
          <span className="kicker">SUBSCRIBE</span>
          <h2>Get the next note.</h2>
          <p>
            No spam, no schedule promises — just an email when something new
            is published.
          </p>
        </div>

        <div className="subscribe-action">
          {status === 'done' ? (
            <p className="subscribe-msg">You're on the list. Talk soon.</p>
          ) : (
            <form className="subscribe-form" onSubmit={onSubmit}>
              <input
                type="email"
                required
                placeholder="you@email.com"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'SENDING…' : 'SUBSCRIBE →'}
              </button>
            </form>
          )}
          {status === 'soon' && (
            <p className="subscribe-msg">
              Email signup is coming soon — for now, grab the RSS feed below.
            </p>
          )}
          {status === 'error' && (
            <p className="subscribe-msg">
              Something went wrong — try again, or use the RSS feed below.
            </p>
          )}
          <a className="subscribe-rss" href="/rss.xml">
            RSS FEED ↗
          </a>
        </div>
      </div>
    </section>
  )
}
