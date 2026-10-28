# Vercel (`ADAPTER=vercel`)

- **Vendor:** Vercel
- **CLI:** `ADAPTER=vercel pnpm build` then `npx vercel --prod --yes` (token: `--token $VERCEL_TOKEN`). CI may also need `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`.
- **Public:** After the first production project exists:

  ```bash
  vercel project protection disable <project> --sso
  ```

  Confirm in a **logged-out** browser, not while signed into Vercel.

- **Share the production URL**, not a preview / hashed `*.vercel.app` deployment URL.
- Do **not** paste `?x-vercel-protection-bypass=` (or `vercel curl` bypass secrets) into the Kit discussion. Those are for agents/tests, not maintainers.
