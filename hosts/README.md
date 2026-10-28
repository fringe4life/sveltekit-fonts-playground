# Hosts (one site, six flavors)

Canonical discussion URLs must load **logged-out** (incognito). Prefer production domains. Do not paste Vercel protection-bypass query strings or Netlify deploy-preview URLs into the Kit discussion.

| Adapter | Vendor | CLI | Token / secret | Public without a login wall |
| --- | --- | --- | --- | --- |
| `static` | GitHub Pages | `actions/upload-pages-artifact` + `actions/deploy-pages` | `GITHUB_TOKEN` (Actions) | Yes on this **public** repo |
| `cloudflare` | Cloudflare | `npx wrangler deploy` | `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` | Yes by default (leave Access off) |
| `vercel` | Vercel | `npx vercel --prod --yes` | `VERCEL_TOKEN` (+ org/project ids for CI) | CLI: `vercel project protection disable <project> --sso`. Share **production**, not preview |
| `netlify` | Netlify | `npx netlify deploy --prod --auth $NETLIFY_AUTH_TOKEN` | `NETLIFY_AUTH_TOKEN` + `NETLIFY_SITE_ID` | **No CLI for visibility.** Dashboard **Make public** after first production deploy |
| `node` | Railway | `railway up --service …` | `RAILWAY_TOKEN` | Public generated HTTP domain; generate it once |
| `bun` | Render | `render deploys create $SERVICE_ID --confirm` | `RENDER_API_KEY` + `RENDER_SERVICE_ID` | Public web service; cold start on free tier |

Secrets live in GitHub Actions (or a local env). They are **not** required for a green matrix: deploy steps skip when empty. Do not put them in the Kit monorepo.

| Once (Coinnich / dashboard) | Repeatable (CLI / Actions) |
| --- | --- |
| Enable Pages (Actions source) | `deploy-pages` |
| Cloudflare Worker/Pages project name | `wrangler deploy` |
| Vercel project exists; protection off | `vercel --prod` |
| Netlify **Make public** | `netlify deploy --prod` |
| Railway service + public domain | `railway up` |
| Render service + Bun runtime | `render deploys create` |

Details: [github-pages](./github-pages.md) · [cloudflare](./cloudflare.md) · [vercel](./vercel.md) · [netlify](./netlify.md) · [railway](./railway.md) · [render](./render.md)
