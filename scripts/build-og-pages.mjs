// Post-build step: emit a static HTML shell for every real route in the app.
//
// The site is a client-side SPA, but social crawlers (LinkedIn, X, Slack, iMessage)
// do NOT run JavaScript, they read Open Graph tags from the raw HTML at the URL.
// So we clone the built index.html (which already carries the correct hashed asset
// tags, so the React app still boots for humans) and swap the <title>, description
// and <!-- og:start -->...<!-- og:end --> block for per-page values.
//
// Two things depend on these files existing:
//
//   1. Crawlers get real per-page metadata instead of the generic site card.
//   2. GitHub Pages returns 200 instead of falling through to 404.html. Only genuinely
//      unknown URLs should 404. A 404 status on /markets or /about keeps the page out
//      of the back/forward cache, tells crawlers the page does not exist, and makes
//      browsers apply heuristic caching to the document.
//
// Each page is written twice, as <route>.html and <route>/index.html, because those
// resolve differently on static hosts. Emitting both means /markets, /markets/ and
// /blog/<slug> all answer 200 directly, with no redirect hop to a trailing slash.
//
// Runs as part of `npm run build`, after `vite build`.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const distDir = join(root, 'dist')
const postsDir = join(root, 'src', 'posts')
const SITE = 'https://polygond.com'

const indexPath = join(distDir, 'index.html')
if (!existsSync(indexPath)) {
  console.error('build-og-pages: dist/index.html not found — run vite build first')
  process.exit(1)
}
const template = readFileSync(indexPath, 'utf8')

function parseFrontmatter(text) {
  const meta = {}
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)
  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const idx = line.indexOf(':')
      if (idx === -1) continue
      let value = line.slice(idx + 1).trim().replace(/^["'](.*)["']$/, '$1')
      meta[line.slice(0, idx).trim()] = value
    }
  }
  return meta
}

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

function ogBlock({ title, description, url, image, type }) {
  return `<!-- og:start -->
    <meta property="og:type" content="${esc(type)}" />
    <meta property="og:site_name" content="Polygon Digital" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:image" content="${esc(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${esc(image)}" />
    <!-- og:end -->`
}

const posts = readdirSync(postsDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ slug: f.replace(/\.md$/, ''), meta: parseFrontmatter(readFileSync(join(postsDir, f), 'utf8')) }))

// Builds one page from the index.html shell.
function render({ title, description, url, image, type }) {
  return template
    .replace(/<!-- og:start -->[\s\S]*?<!-- og:end -->/, ogBlock({ title, description, url, image, type }))
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(
      /<meta name="description" content="[\s\S]*?" \/>/,
      `<meta name="description" content="${esc(description)}" />`
    )
}

// Writes the page at both <route>.html and <route>/index.html so the URL resolves
// without a redirect whichever form the host prefers. `route` has no leading slash.
function writeRoute(route, html) {
  writeFileSync(join(distDir, `${route}.html`), html)
  const dir = join(distDir, route)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

let count = 0

// —— the static routes ——
const ROUTES = [
  {
    route: 'blog',
    title: 'Research notes · Polygon Digital',
    description:
      'Every Polygon Digital note. Market analysis with conviction, on energy, compute and the money moving between them.',
  },
  {
    route: 'markets',
    title: 'Market dashboard · Polygon Digital',
    description:
      'The Polygon Index. Where markets sit, what rates are saying, what is moving and what the tape is trading on, the day on one page.',
  },
  {
    route: 'about',
    title: 'About · Polygon Digital',
    description:
      'Polygon Digital is market analysis with conviction. We tell you what we think is happening and why it matters.',
  },
]

for (const { route, title, description } of ROUTES) {
  writeRoute(
    route,
    render({
      title,
      description,
      url: `${SITE}/${route}`,
      image: `${SITE}/og/default.png`,
      type: 'website',
    })
  )
  count++
  console.log('wrote', `dist/${route}.html + dist/${route}/index.html`)
}

// —— one page per post ——
for (const { slug, meta } of posts) {
  const title = meta.title || slug
  const description = meta.summary || ''
  const image = `${SITE}/og/${slug}.png`

  const html = render({
    title: `${title} · Polygon Digital`,
    description,
    url: `${SITE}/blog/${slug}`,
    image,
    type: 'article',
  })

  if (!html.includes(image)) {
    console.warn(`build-og-pages: WARNING og block not injected for ${slug}`)
  }

  writeRoute(join('blog', slug), html)
  count++
  console.log('wrote', `dist/blog/${slug}.html + dist/blog/${slug}/index.html`)
}

console.log(`build-og-pages: ${count} page(s) generated`)
