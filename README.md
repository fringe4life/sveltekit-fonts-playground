# sveltekit-fonts-playground

Public **one-site** demo for experimental [`@sveltejs/enhanced-fonts`](./packages/enhanced-fonts). Routes and font DX are synced from [`fringe4life/kit`](https://github.com/fringe4life/kit/tree/experimental-fonts/playgrounds/fonts) (`experimental-fonts`, `playgrounds/fonts`). The Kit monorepo is **not** copied here — only this app plus a workspace copy of the unpublished package.

One app. Adapter is a **build flavor** (`ADAPTER=static|cloudflare|vercel|netlify|node|bun`), not six apps.

## Run

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Production-shaped output (default adapter is GitHub Pages / `adapter-static`):

```bash
ADAPTER=static pnpm build
pnpm preview
```

`build` downloads Inter, Fraunces, and Lora from Google (via unifont) and copies the Fontsource barcode woff2 into hashed client assets. Visitors never hit `fonts.googleapis.com` / `fonts.gstatic.com`.

## Adapter flavors

| `ADAPTER=` | Package | Host | Notes |
| --- | --- | --- | --- |
| `static` (default) | `@sveltejs/adapter-static` | GitHub Pages | CI sets `BASE_PATH` via `actions/configure-pages` |
| `cloudflare` | `@sveltejs/adapter-cloudflare` | Cloudflare Workers | `wrangler.jsonc` + `npx wrangler deploy` |
| `vercel` | `@sveltejs/adapter-vercel` | Vercel | Prebuilt `vercel deploy --prebuilt` (do not remote-rebuild without `ADAPTER`) |
| `netlify` | `@sveltejs/adapter-netlify` | Netlify | Human **Make public** after first prod deploy |
| `node` | `@sveltejs/adapter-node` | Render (second free Web Service) | **adapter-node only.** Blueprint service `sveltekit-fonts-playground-node`: `ADAPTER=node pnpm build`, start **`node build`**. Do not pin Bun or start `bun ./build` here. Railway (`railway.toml`) is leftover/optional. |
| `bun` | `@sveltejs/adapter-bun` | Render (existing free Web Service) | Blueprint **`runtime: node`** (`runtime: bun` is invalid). Bun is in Render’s Node native image (`🟢 bun`). Pin `BUN_VERSION` / `.bun-version` ≥ 1.4 (no `bun.lock` here, so omit the pin and Render skips Bun). Build `ADAPTER=bun bunx --bun vite build` (not `bun run vite` — that looks for a script named `vite`). Start **`bun ./build`**, not `node build`. |


```bash
ADAPTER=cloudflare pnpm build
ADAPTER=vercel pnpm build
ADAPTER=netlify pnpm build
ADAPTER=node pnpm build
ADAPTER=bun bunx --bun vite build
```

**Two Render apps, two adapters — do not collapse them.** Both Blueprints use `runtime: node` (the host image). The **bun** service (`sveltekit-fonts-playground`) starts `bun ./build`. The **node** service (`sveltekit-fonts-playground-node`) starts `node build`. Each free instance sleeps on its own (~15 min idle → ~1 min wake) — two cold starts, not a login wall. Railway is leftover only.


Jobs must not write two adapters into the same `build/` on one runner (the Actions matrix isolates this).

Per-host CLI, tokens, and **logged-out public** checks: [`hosts/`](./hosts/README.md).

## Fonts DX

Astro-style `enhancedFonts({ families })` in `vite.config.js`. Default **preload off**. Styling is Svelte `<style>` blocks and `var(--font-*)` only.

| | `/` | `/about` | `/display` |
| --- | --- | --- | --- |
| CSS Inter `--font-inter` | yes | yes | yes |
| `<link rel=preload as=font>` Inter | **yes** | **no** | **no** |
| CSS Fraunces `--font-home` | yes | no | no |
| preload Fraunces | **never** | never | never |
| CSS Lora `--font-serif` | no | yes | no |
| preload Lora | never | **never** | never |
| CSS Libre Barcode `--font-display` | no | no | yes |
| preload barcode | never | never | **never** |

Assert **HTML** (`@font-face` / preload links), not “the network downloaded it.” Do not move Inter’s preload into root `+layout.svelte` / `app.html`.

## GitHub Actions

[`.github/workflows/fonts-matrix.yml`](./.github/workflows/fonts-matrix.yml) builds every adapter. Deploys run only when the matching secret exists; missing tokens skip that host (the job still passes). Pages uses `GITHUB_TOKEN`.

Render deploys are **two jobs**: bun (`RENDER_API_KEY` + `RENDER_SERVICE_ID`) and node (`RENDER_API_KEY` + `RENDER_NODE_SERVICE_ID`). Create the second free Web Service once (Blueprint or dashboard), then add `RENDER_NODE_SERVICE_ID` in repo Actions secrets. Do not point both jobs at the same service id.

## Takedown

This playground self-hosts Google and Fontsource files for a public experiment. There is **no legal sign-off**. If a provider complains, **take the demos down** and remove the family from `vite.config.js`.
