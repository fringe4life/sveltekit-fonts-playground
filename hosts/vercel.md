# Vercel (`ADAPTER=vercel`)

- **Vendor:** Vercel
- **CLI:** Keep the local `ADAPTER=vercel` output with a prebuilt deploy (token: `--token $VERCEL_TOKEN`). CI needs `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` after the first `vercel link`:

  ```bash
  ADAPTER=vercel pnpm exec vercel pull --yes --environment=production --token "$VERCEL_TOKEN"
  ADAPTER=vercel pnpm exec vercel build --prod --token "$VERCEL_TOKEN"
  pnpm exec vercel deploy --prebuilt --prod --yes --token "$VERCEL_TOKEN"
  ```

  Do not run `vercel --prod` against source: the remote build has no `ADAPTER` and falls back to `adapter-static`.
- **Public:** After the first production project exists:

  ```bash
  vercel project protection disable <project> --sso
  ```

  Confirm in a **logged-out** browser, not while signed into Vercel.

- **Share the production URL**, not a preview / hashed `*.vercel.app` deployment URL.
- Do **not** paste `?x-vercel-protection-bypass=` (or `vercel curl` bypass secrets) into the Kit discussion. Those are for agents/tests, not maintainers.
