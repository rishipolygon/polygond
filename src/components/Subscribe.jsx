import { useState } from 'react'

// Email signup via Web3Forms (no account — get a free access key at
// https://web3forms.com by entering the address where you want to receive
// notifications, then paste the key below). The key is safe to commit: it
// only ever forwards mail to the address that registered it. Until it's set,
// the form points people at the RSS feed instead.
const WEB3FORMS_KEY = 'f90886ae-de67-46c4-9907-1f0851ef90a5'

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done | soon | error

  async function onSubmit(e) {
    e.preventDefault()
    if (!WEB3FORMS_KEY) {
      setStatus('soon')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          email,
          subject: 'New Polygon Digital subscriber',
          from_name: 'Polygon Digital',
        }),
      })
      const data = await res.json().catch(() => ({}))
      setStatus(res.ok && data.success ? 'done' : 'error')
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
