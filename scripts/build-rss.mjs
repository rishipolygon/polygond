// Generates public/rss.xml from the markdown posts in src/posts.
// Runs automatically as part of `npm run build`.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const POSTS = join(root, 'src', 'posts')
const OUT = join(root, 'public', 'rss.xml')
const SITE = 'https://polygond.com'

function parseFrontmatter(text) {
  const meta = {}
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)
  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const idx = line.indexOf(':')
      if (idx === -1) continue
      let value = line.slice(idx + 1).trim()
      value = value.replace(/^["'](.*)["']$/, '$1')
      meta[line.slice(0, idx).trim()] = value
    }
  }
  return meta
}

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const posts = readdirSync(POSTS)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const meta = parseFrontmatter(readFileSync(join(POSTS, f), 'utf8'))
    return { slug: f.replace(/\.md$/, ''), ...meta }
  })
  .filter((p) => p.date)
  .sort((a, b) => b.date.localeCompare(a.date))

const items = posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title || p.slug)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date + 'T12:00:00Z').toUTCString()}</pubDate>
      <description>${esc(p.summary || '')}</description>
    </item>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Polygon Digital</title>
    <link>${SITE}</link>
    <description>Market analysis with conviction. We tell you what we think is happening and why it matters.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`

writeFileSync(OUT, xml)
console.log(`Wrote rss.xml — ${posts.length} posts`)
