# Render (`ADAPTER=bun`)

- **Vendor:** Render
- **CLI:** Service must exist first (dashboard or Blueprint). Then `render deploys create $RENDER_SERVICE_ID --confirm`
- **Token:** `RENDER_API_KEY`, `RENDER_SERVICE_ID`
- **Build / start:** `ADAPTER=bun bun run --bun vite build` then `bun ./build`. Bun ≥ 1.4.
- **Public check:** Public Web Service, no Render auth / IP allowlist. Free tier **sleeps** (~15 min idle → ~1 min wake) — mention cold start in the discussion; it is not a login wall.
