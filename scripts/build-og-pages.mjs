// Post-build step: emit a static HTML file per blog post at dist/blog/<slug>/index.html.
//
// The site is a client-side SPA, but social crawlers (LinkedIn, X, Slack, iMessage)
// do NOT run JavaScript — they read Open Graph tags from the raw HTML at the URL.
// GitHub Pages serves dist/blog/<slug>/index.html for /blog/<slug>, so we clone the
// built index.html (which already has the correct hashed asset tags, so the React app
// still boots for humans) and swap the <title>, description and <!-- og:start -->…<!-- og:end -->
// block for per-post values. og:image points at the committed public/og/<slug>.png card.
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

function ogBlock({ title, description, url, image }) {
  return `<!-- og:start -->
    <meta property="og:type" content="article" />
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

let count = 0
for (const { slug, meta } of posts) {
  const title = meta.title || slug
  const description = meta.summary || ''
  const url = `${SITE}/blog/${slug}`
  const image = `${SITE}/og/${slug}.png`

  let html = template
    .replace(/<!-- og:start -->[\s\S]*?<!-- og:end -->/, ogBlock({ title, description, url, image }))
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)} — Polygon Digital</title>`)
    .replace(
      /<meta name="description" content="[\s\S]*?" \/>/,
      `<meta name="description" content="${esc(description)}" />`
    )

  if (!html.includes(image)) {
    console.warn(`build-og-pages: WARNING og block not injected for ${slug}`)
  }

  const outDir = join(distDir, 'blog', slug)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  count++
  console.log('wrote', `dist/blog/${slug}/index.html`)
}
console.log(`build-og-pages: ${count} post page(s) generated`)
