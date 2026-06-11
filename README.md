# Polygon Digital — polygond.com

Minimal black-and-white research site. React + Vite, posts in plain Markdown, deployed to GitHub Pages with a custom domain.

## Posting a new blog (the whole workflow)

1. Create a new file in `src/posts/`, e.g. `src/posts/my-new-note.md`.
   The filename becomes the URL: `polygond.com/blog/my-new-note`.
2. Start it with this header, then write normal Markdown below:

   ```markdown
   ---
   title: My new note
   date: 2026-06-18
   summary: One sentence shown in the blog list.
   tags: energy, quant
   ---

   Body of the post in **Markdown**. Tables, code blocks,
   blockquotes, and images all work.
   ```

3. Commit and push:

   ```
   git add .
   git commit -m "Post: my new note"
   git push
   ```

   GitHub Actions rebuilds and deploys automatically (~1 minute).

Posts are sorted by `date` (newest first). Drafts: just don't push the file until it's ready.

## Market ticker

The home page shows three scrolling tickers (equities / crypto / commodities) fed by `public/market.json`. Refresh it any time with:

```
npm run market
```

Sources are free and keyless: Yahoo Finance (stocks + futures) and CoinGecko (crypto). In production, the deploy workflow re-fetches on every push **and every 6 hours** via cron, so the live site stays current with zero paid APIs. If a fetch fails, the last committed `market.json` ships instead.

To change the instruments, edit the `STOCKS` and `COMMODITIES` lists at the top of `scripts/fetch-market.mjs`.

**Alpha Vantage fallback:** if Yahoo fails for an equity, the script retries via Alpha Vantage. The key lives in `.env.local` (gitignored — never commit it):

```
ALPHAVANTAGE_KEY=your-key-here
```

For deploys, add the same key as a repository secret named `ALPHAVANTAGE_KEY` (GitHub repo → Settings → Secrets and variables → Actions). Free AV keys allow ~25 requests/day, which is why it's a fallback rather than the primary source.

## Markets dashboard (/markets)

The Markets page shows treasury yields (with the derived 2s10s spread), Fed funds, CPI YoY, unemployment, today's top gainers/losers/most-active stocks, and sentiment-tagged market headlines — all from Alpha Vantage via `public/avdata.json`. Refresh manually with:

```
npm run avdata
```

Each run costs 7 of the ~25 free daily AV requests (calls are auto-spaced for the 5/min limit, so it takes ~90 seconds). The deploy cron runs 3×/day to stay under the cap. If a run fails, the previous data ships.

## Local development

```
npm install     # first time only
npm run dev     # http://localhost:5173
npm run build   # production build to dist/
```

## First-time deploy checklist

1. Create a GitHub repo and push this folder to `main`.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Repo → Settings → Pages → Custom domain: `polygond.com`
   (the `public/CNAME` file keeps it set across deploys).
4. At your domain registrar, point DNS at GitHub Pages:
   - `A` records for `polygond.com` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `<your-github-username>.github.io`
5. Back in Pages settings, tick **Enforce HTTPS** once the cert is issued.

## Structure

```
src/posts/        ← your blog posts, one .md file each
src/pages/        ← Home, Blog, Post, About
src/components/   ← Nav, Footer, hexagon Mark
src/styles.css    ← the entire design system (ink/paper themes)
public/           ← favicons + CNAME
_legacy/          ← the old static Polygond site (pre-June 2026), kept for reference
```

Brand: Ink `#0B0C0E` · Paper `#F5F4F1` · Sora / Manrope / IBM Plex Mono.
