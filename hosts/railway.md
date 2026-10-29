# Railway leftover (`ADAPTER=node`, optional)

Canonical **adapter-node** demo is the second Render Web Service (`hosts/render-node.md`). Railway is leftover only.

- **Vendor:** Railway (optional)
- **CLI:** `railway up --service <service>`. `railway.toml` sets `buildCommand = "ADAPTER=node pnpm build"` so Nixpacks does not default to `adapter-static`. Start command remains `node build`.
- **Token:** `RAILWAY_TOKEN`. Optional `RAILWAY_SERVICE` / project id for non-interactive CI. Missing secrets skip the Actions job.
- **Public check:** Generate a **public HTTP domain** once. Do not enable private networking. Sleep/credit pause can 502 — that is not an auth wall.
- Runtime: Node 22+, `PORT` from the platform (`node build`). Do not treat this as the discussion URL if the Render node service is live.
