# Deployment

Production hosting: https://nameforge-bhk.pages.dev/

Cloudflare Pages is the production host. The project is connected to the GitHub repository `GLLR-Spirit/NameForge` through the Cloudflare Workers & Pages GitHub App. The intended production branch is `main`; pull-request branches use Cloudflare preview deployments.

## Cloudflare Pages build settings

| Setting | Value |
|---|---|
| Project name | `nameforge` |
| Git provider | GitHub |
| Repository | `GLLR-Spirit/NameForge` |
| Production branch | `main` |
| Root directory | `/` (repository root; leave blank if Cloudflare uses the repository root by default) |
| Framework preset | Vite, or None with the explicit settings below |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `22` |
| Required build-time secrets | None identified for the current static application |

These are the intended settings derived from the checked-in package scripts and Vite configuration. Confirm the actual values in the Cloudflare dashboard before changing repository visibility.

## GitHub access requirements

Cloudflare's GitHub integration supports private repositories. The Cloudflare Workers & Pages GitHub App must remain installed on the GitHub account that owns this repository, and the app's repository access must include `GLLR-Spirit/NameForge`. The user who manages the Pages project must also have authorized the GitHub app. Installation and user authorization are separate permissions.

Before making the repository private:
1. In GitHub, open Settings → Applications → Installed GitHub Apps → Cloudflare Workers & Pages → Configure.
2. Confirm that repository access is set to either all repositories or explicitly includes `GLLR-Spirit/NameForge`.
3. In Cloudflare, open Workers & Pages → `nameforge` → Settings → Builds → Git repository / Manage. Confirm the connected GitHub account and repository.
4. In Settings → Builds → Branch control, confirm production branch `main`; configure preview branches as desired.
5. After the visibility change, trigger a harmless commit on a non-production preview branch and confirm Cloudflare creates a successful preview deployment. Then verify the production deployment remains available.

Do not remove/reinstall the Cloudflare GitHub App unless the existing connection is actually broken.

## CI validation

`.github/workflows/deploy-pages.yml` validates pull requests and pushes to `main`. It performs dependency auditing, type-checking, regression tests, localization audit, Vite production build, Playwright browser QA and Lighthouse checks against a local production preview.

The workflow intentionally does **not** publish to GitHub Pages. Cloudflare's Git integration is responsible for preview and production deployment. This avoids competing production hosts and ensures that GitHub Actions does not publish a second copy under a different origin.

## Local validation

~~~bash
npm ci
npm run lint
npm test
npm run audit:i18n
npm run build
npm run test:browser
npm run audit:lighthouse
~~~

Vite uses relative asset paths so the static application can be served from the Cloudflare Pages project root and preview environments.

No application secrets or runtime API keys are required by the current static application. Do not add secrets to frontend source code.

The service worker provides limited caching for content-hashed same-origin assets and a previously loaded navigation response. It is not a guarantee of complete offline operation.

Generated SEO output contains localized generator landing pages plus the home page in the sitemap. Recalculate counts after changing generator or SEO language registries.
