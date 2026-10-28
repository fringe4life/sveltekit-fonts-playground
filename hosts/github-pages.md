# GitHub Pages (`ADAPTER=static`)

- **Vendor:** GitHub Pages
- **CLI:** GitHub Actions `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages` (or `gh` to inspect). Local: `ADAPTER=static BASE_PATH=/sveltekit-fonts-playground pnpm build`
- **Token:** `GITHUB_TOKEN` (automatic in Actions). No extra secret.
- **Public check:** Open `https://fringe4life.github.io/sveltekit-fonts-playground/` logged-out. Public repo + public Pages = no login wall. `static/.nojekyll` is committed. `paths.base` comes from `BASE_PATH` (CI: `configure-pages`). Nav uses `resolve()` from `$app/paths`.
