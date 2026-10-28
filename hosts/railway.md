# Railway (`ADAPTER=node`)

- **Vendor:** Railway
- **CLI:** `ADAPTER=node pnpm build` then `railway up --service <service>` (or `node build` behind Railway’s start command)
- **Token:** `RAILWAY_TOKEN`. Optional `RAILWAY_SERVICE` / project id for non-interactive CI.
- **Public check:** Generate a **public HTTP domain** once. Do not enable private networking. Sleep/credit pause can 502 — that is not an auth wall.
- Runtime: Node 22+, `PORT` from the platform (`node build`).
