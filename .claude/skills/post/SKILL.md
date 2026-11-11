---
name: post
description: Research, write and publish a new Polygon Digital research note to polygond.com. Use when the user asks to "make a post", "write a post on X and post it", "publish a note about X", or types /post <topic>.
---

# /post: research, write, publish

Argument: a topic, e.g. `/post the latest Nvidia scandal`. If no topic is given, ask for one.

The site deploys automatically when a commit lands on `main` (`.github/workflows/deploy.yml`). Nothing is public until it reaches `main`.

## 1. Research (current events, never from memory)

- Use WebSearch in `extended` mode, several queries in one turn: the core event, the primary statement or filing, the market reaction (exact % moves and dates), the legal or regulatory angle, and what comes next.
- Try WebFetch on primary sources. If hosts are blocked in the sandbox, work from search results and say so in the final report.
- Write down every number with its source URL. If two outlets disagree, use the conservative figure and note the disagreement in the disclaimer.
- Anything about a real person's conduct must be attributed ("according to...", "reportedly"), framed as alleged unless adjudicated, and paired with the denials or responses. Keep personal detail to what the market story needs.

## 2. Find the angle

The reader works in physical commodity marketing. Find the mechanism: flows, who is forced to act, what is actually being priced versus what the headlines say. One thesis sentence. Where it helps, use a trading analogy (netbacks, basis, counterparty concentration, optionality).

## 3. Write `src/posts/<slug>.md`

- Slug: `the-<two-or-three-words>`, matching the house naming ("the key man", "the forced seller").
- Use `src/posts/the-key-man.md` as the layout template, in order:
  - front matter: `title` (quoted, "The X: claim"), `date` (today, YYYY-MM-DD), `summary` (2 to 4 sentences), `tags`
  - `<p class="article-dek">`, then `<p class="lead">` beginning "Our thesis in one sentence:"
  - `<div class="stat-band">` with 3 to 4 stats, each cited
  - `## What happened, in order` with bold dates
  - at least one `<figure class="fig">` with an inline SVG chart (`currentColor` only, `viewBox="0 0 700 H"`, an `aria-label` describing the data)
  - analysis sections, then `## What to watch`
  - `<div class="takeaways">` with five points
  - `## References` as `<ol class="refs">` with `<li id="fnN">`, cited inline as `<sup class="cite"><a href="#fnN">N</a></sup>`
  - `<p class="disclaimer">`
- House style: **no em dashes** (use commas, colons, or full stops), Canadian/British spelling where it occurs (licence, centre), 1,800 to 3,000 words, no hype.

## 4. Art

- Cover: add a monochrome component to `src/lib/covers.jsx` (follow `KeyMan` or `BorrowedHand`) and register it in the `covers` map under the slug.
- Share card: add an `art<Name>()` function to `scripts/build-og-images.mjs` (follow `artKeyMan`) and register it in its `ART` map.
- Run `npm run og` and `npm run rss`.

## 5. Verify, gating the commit

```
npm run check:post -- <slug>   # must print "<slug>: ok"
npm run build                  # must succeed
```

Then `npx vite preview --port 4173` in the background and screenshot `/blog/<slug>` at 1280px and 390px with Playwright. Look at both: cover visible, chart legible, `document.documentElement.scrollWidth` equal to the viewport width. Fix anything wrong, then stop the preview server.

## 6. Commit and publish

- Stage only the post, the art files, `public/rss.xml`, and `public/og/<slug>.png`. Commit message: `Post: <short title>`.
- Push to the session's working branch (`git push -u origin <branch>`).
- Publishing means getting the commit onto `main`:
  - If the user asked to post or publish, open a PR from the branch to `main` with the GitHub MCP tools and merge it (squash), or push to `main` directly if the session allows it. Their request to post is the go-ahead; don't ask again.
  - If they only asked for a draft, stop at the branch push and say so.
- If any push returns 403 or "doesn't have GitHub access", stop retrying. Tell the user to reconnect GitHub at https://claude.ai/connect-github and make sure the Claude GitHub App is installed on `rishipolygon/polygond`. The commit stays local until then.

## 7. Report

Tell the user: the URL `polygond.com/blog/<slug>`, whether it is live, on a branch, or only local, the thesis in one line, and any sourcing gaps (blocked hosts, figures that came only from search summaries, disputed numbers).
