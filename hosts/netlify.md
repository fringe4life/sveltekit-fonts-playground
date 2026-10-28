# Netlify (`ADAPTER=netlify`)

- **Vendor:** Netlify
- **CLI:** `ADAPTER=netlify pnpm build` then `npx netlify deploy --prod --dir=build --auth $NETLIFY_AUTH_TOKEN --site $NETLIFY_SITE_ID`
- **Token:** `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`
- **Visibility: no CLI.** Netlify documents no public API/MCP to flip Project visibility. After the **first production deploy**, a human (Coinnich) must:

  1. Dashboard → Project configuration → General → Visitor access → **Public** → Save
  2. Optional: team default **Public for new projects**
  3. Incognito / logged-out check of the production URL

- `--allow-anonymous` is a claimable draft, not a discussion URL. Do not share Deploy Previews unless preview visibility is also public.
