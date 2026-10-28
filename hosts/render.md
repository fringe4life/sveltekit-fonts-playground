# Render (`ADAPTER=bun`)

- **Vendor:** Render
- **CLI:** Service must exist first (dashboard or Blueprint). Then `render deploys create $RENDER_SERVICE_ID --confirm`
- **Token:** `RENDER_API_KEY`, `RENDER_SERVICE_ID`
- **Build / start:** Blueprint `runtime: node` — Bun is included in Render’s Node native runtime; `runtime: bun` is invalid YAML. Pin `BUN_VERSION` (Blueprint) and `.bun-version` ≥ 1.4 so Render actually installs Bun (this repo has `pnpm-lock.yaml`, no `bun.lock`). Install with `npx --yes pnpm@12.14.0 install --frozen-lockfile` (do not `corepack enable` — EROFS on Render’s Node 24 image). Build `ADAPTER=bun bun run --bun vite build`. Start **`bun ./build`**. Do **not** `node build` — that is Railway / `adapter-node`.
- **Not adapter-node:** Render `runtime: node` is the host image, not `@sveltejs/adapter-node`. The bun flavor is the proof that this host runs adapter-bun.
- **Public check:** Public Web Service, no Render auth / IP allowlist. Free tier **sleeps** (~15 min idle → ~1 min wake) — mention cold start in the discussion; it is not a login wall.
