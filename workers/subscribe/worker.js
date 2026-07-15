// Polygon Digital — subscribe proxy (Cloudflare Worker, free tier).
//
// Why this exists: the site is a static GitHub Pages build, so it can't safely
// hold a GitHub token. This tiny Worker holds the token as a secret and does one
// thing: validate an email, then fire a GitHub `repository_dispatch` so the
// `new-subscriber` Action can record it in subscribers.csv and notify you.
//
// Deploy: see README.md in this folder.

const DEFAULT_ALLOWED = ['https://polygond.com', 'https://www.polygond.com']

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const allowed = (env.ALLOWED_ORIGINS
      ? env.ALLOWED_ORIGINS.split(',').map((s) => s.trim())
      : DEFAULT_ALLOWED)
    const allowOrigin = allowed.includes(origin) ? origin : allowed[0]

    if (request.method === 'OPTIONS') return cors(new Response(null, { status: 204 }), allowOrigin)
    if (request.method !== 'POST') return cors(json({ error: 'method not allowed' }, 405), allowOrigin)

    let email
    try {
      ;({ email } = await request.json())
    } catch {
      return cors(json({ error: 'bad request' }, 400), allowOrigin)
    }
    email = String(email || '').trim().toLowerCase()
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return cors(json({ error: 'invalid email' }, 400), allowOrigin)
    }

    const res = await fetch(`https://api.github.com/repos/${env.GH_REPO}/dispatches`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GH_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'polygond-subscribe-worker',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event_type: 'new-subscriber', client_payload: { email } }),
    })

    if (!res.ok) {
      return cors(json({ error: 'could not record signup' }, 502), allowOrigin)
    }
    return cors(json({ ok: true }), allowOrigin)
  },
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function cors(res, origin) {
  res.headers.set('Access-Control-Allow-Origin', origin)
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  res.headers.set('Vary', 'Origin')
  return res
}
