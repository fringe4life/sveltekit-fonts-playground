# Cloudflare (`ADAPTER=cloudflare`)

- **Vendor:** Cloudflare Workers (Static Assets) via `wrangler.jsonc`
- **CLI:** `ADAPTER=cloudflare pnpm build` then `npx wrangler deploy`
- **Token:** `CLOUDFLARE_API_TOKEN` (Workers edit) and `CLOUDFLARE_ACCOUNT_ID`
- **Public check:** Production `*.workers.dev` / custom domain in a logged-out window. Leave Cloudflare Access / Zero Trust **off**. Preview URLs are public unless Access is enabled — still share production.
