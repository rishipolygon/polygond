// Pre-publish checks for a blog post. Usage:
//   npm run check:post -- the-key-man        (one post)
//   npm run check:post                       (newest post by date)
// Exits non-zero on any error so it can gate a commit.

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const POSTS = join(ROOT, 'src/posts')

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return null
  const meta = {}
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i < 0) continue
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, '$1')
  }
  return meta
}

let slug = process.argv[2]
if (!slug) {
  slug = readdirSync(POSTS)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ f, d: parseFrontmatter(readFileSync(join(POSTS, f), 'utf8'))?.date || '' }))
    .sort((a, b) => b.d.localeCompare(a.d))[0].f.replace(/\.md$/, '')
}

const file = join(POSTS, `${slug}.md`)
const errors = []
const warns = []
if (!existsSync(file)) {
  console.error(`no such post: src/posts/${slug}.md`)
  process.exit(1)
}
const text = readFileSync(file, 'utf8')
const meta = parseFrontmatter(text)

if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) errors.push('slug must be lowercase-kebab-case')
if (!meta) errors.push('missing --- front matter block')
else {
  for (const k of ['title', 'date', 'summary', 'tags']) if (!meta[k]) errors.push(`front matter missing "${k}"`)
  if (meta.date && !/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) errors.push('date must be YYYY-MM-DD')
}

// house style
if (text.includes('—')) errors.push(`em dash found (${text.split('—').length - 1}x); house style uses none`)
for (const cls of ['article-dek', 'lead', 'takeaways', 'refs', 'disclaimer'])
  if (!text.includes(`class="${cls}"`)) warns.push(`no class="${cls}" block (house layout)`)

// footnotes: every cite has a reference, every reference is cited
const cites = new Set([...text.matchAll(/href="#(fn\d+)"/g)].map((m) => m[1]))
const refs = new Set([...text.matchAll(/<li id="(fn\d+)"/g)].map((m) => m[1]))
for (const c of cites) if (!refs.has(c)) errors.push(`cite #${c} has no matching <li id="${c}">`)
for (const r of refs) if (!cites.has(r)) warns.push(`reference ${r} is never cited`)

// art
const covers = readFileSync(join(ROOT, 'src/lib/covers.jsx'), 'utf8')
if (!covers.includes(`'${slug}':`)) errors.push(`no cover art registered for '${slug}' in src/lib/covers.jsx`)
const og = readFileSync(join(ROOT, 'scripts/build-og-images.mjs'), 'utf8')
if (!og.includes(`'${slug}':`)) warns.push(`no OG art in scripts/build-og-images.mjs (share card will use default art)`)
if (!existsSync(join(ROOT, `public/og/${slug}.png`))) errors.push(`public/og/${slug}.png missing; run npm run og`)

const rss = readFileSync(join(ROOT, 'public/rss.xml'), 'utf8')
if (!rss.includes(`/blog/${slug}`)) errors.push('post not in public/rss.xml; run npm run rss')

for (const w of warns) console.log(`warn  ${w}`)
for (const e of errors) console.log(`ERROR ${e}`)
console.log(errors.length ? `\n${slug}: ${errors.length} error(s)` : `\n${slug}: ok`)
process.exit(errors.length ? 1 : 0)
