// Loads every .md file in src/posts at build time.
// A post looks like:
//
// ---
// title: My post title
// date: 2026-06-11
// summary: One-sentence teaser shown in the blog list.
// tags: energy, quant
// ---
//
// Markdown body...
//
// The filename becomes the URL slug: my-post.md -> /blog/my-post

const files = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseFrontmatter(text) {
  const meta = {}
  let body = text
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)
  if (match) {
    body = text.slice(match[0].length)
    for (const line of match[1].split(/\r?\n/)) {
      const idx = line.indexOf(':')
      if (idx === -1) continue
      let value = line.slice(idx + 1).trim()
      // allow optional quoting: title: "Has: a colon"
      value = value.replace(/^["'](.*)["']$/, '$1')
      meta[line.slice(0, idx).trim()] = value
    }
  }
  return { meta, body }
}

export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '')
    const { meta, body } = parseFrontmatter(raw)
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || '',
      summary: meta.summary || '',
      tags: meta.tags ? meta.tags.split(',').map((t) => t.trim()) : [],
      body,
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
