# Railway (`ADAPTER=node`)

- **Vendor:** Railway
- **CLI:** `railway up --service <service>`. `railway.toml` sets `buildCommand = "ADAPTER=node pnpm build"` so Nixpacks does not default to `adapter-static` (which has no `node build` entry). Start command remains `node build`.
- **Token:** `RAILWAY_TOKEN`. Optional `RAILWAY_SERVICE` / project id for non-interactive CI.
- **Public check:** Generate a **public HTTP domain** once. Do not enable private networking. Sleep/credit pause can 502 — that is not an auth wall.
- Runtime: Node 22+, `PORT` from the platform (`node build`). This host is **adapter-node**. Render’s Blueprint `runtime: node` is a different thing (Node native image for **adapter-bun**).
