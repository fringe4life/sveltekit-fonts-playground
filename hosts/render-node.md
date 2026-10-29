# Render node (`ADAPTER=node`)

- **Vendor:** Render (second free Web Service, **not** the bun service)
- **CLI:** Service must exist first (dashboard or Blueprint). Then `render deploys create $RENDER_NODE_SERVICE_ID --confirm`
- **Token:** `RENDER_API_KEY` (shared) + `RENDER_NODE_SERVICE_ID` (this service only). Do **not** reuse `RENDER_SERVICE_ID` — that id is adapter-bun.
- **Build / start:** Blueprint `runtime: node` (host image). Install with `npx --yes pnpm@12.14.0 install --frozen-lockfile` (do not `corepack enable`). Build `ADAPTER=node pnpm build`. Start **`node build`**. Do **not** pin `BUN_VERSION` or start `bun ./build` here — that is the bun service.
- **Not adapter-bun:** This service proves `@sveltejs/adapter-node` on Render. Keep `sveltekit-fonts-playground` on `ADAPTER=bun` / `bun ./build`.
- **Public check:** Public Web Service, no Render auth / IP allowlist. Free tier **sleeps** (~15 min idle → ~1 min wake) independently of the bun service — mention **two** cold starts in the discussion; neither is a login wall.
- **Railway leftover:** `railway.toml` / `RAILWAY_TOKEN` remain optional. Canonical adapter-node demo is this Render service.
