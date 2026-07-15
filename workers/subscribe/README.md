# Subscribe pipeline — keep the mailing list in GitHub

When someone subscribes on the site, this pipeline records their email in
`subscribers.csv` **in this repo** and sends you a notification. No third-party
list, no database — the distribution list lives in git.

## How it flows

```
subscribe form  →  Cloudflare Worker  →  GitHub repository_dispatch
   (browser)        (holds the token)          │
                                               ▼
                              .github/workflows/new-subscriber.yml
                                   ├─ append email → subscribers.csv (commit)
                                   └─ open an issue → GitHub emails you
```

The Worker exists only because a static GitHub Pages site can't safely hold a
GitHub token. It validates the email and forwards it; all storage + notification
happens inside GitHub Actions.

## One-time setup (things only you can do)

1. **Create a fine-grained Personal Access Token**
   GitHub → Settings → Developer settings → Fine-grained tokens → *Generate new*.
   - Repository access: **only** `rishipolygon/polygond`
   - Permissions: **Contents → Read and write**, **Metadata → Read**
     (Contents:write is what allows `repository_dispatch`.)
   - Copy the token (starts with `github_pat_…`).

2. **Deploy the Worker** (free Cloudflare account)
   ```bash
   npm i -g wrangler
   cd workers/subscribe
   wrangler login
   wrangler secret put GH_TOKEN     # paste the token from step 1
   wrangler deploy
   ```
   Wrangler prints the Worker URL, e.g. `https://polygond-subscribe.<you>.workers.dev`.

3. **Point the site at the Worker**
   In `src/components/Subscribe.jsx`, set:
   ```js
   const SUBSCRIBE_STORE_ENDPOINT = 'https://polygond-subscribe.<you>.workers.dev'
   ```
   Commit + push. Done.

## After setup

- Every signup appends a row to [`subscribers.csv`](../../subscribers.csv) and
  opens a `subscriber`-labelled issue (you get the email via GitHub notifications).
- Duplicates are ignored automatically.
- To export the list: it's just a CSV in the repo — download or `git pull`.

## Notes

- The token lives **only** as a Cloudflare secret, never in the repo.
- The Worker restricts calls to the origins in `wrangler.toml → ALLOWED_ORIGINS`.
- The existing Web3Forms key in `Subscribe.jsx` still sends an instant email on
  signup, so you're notified even before this Worker is deployed. Once the Worker
  is live you also get the durable GitHub record. Remove either path if you want
  just one.
