# Alex Cuesta — Portfolio

Astro 7 + TypeScript strict, static output. Design spec and hi-fi prototypes live in `handoff/` (read `handoff/README.md` before changing layout, tokens, or copy).

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server |
| `npm run build` | Type-checks, then builds to `./dist/` |
| `npm run preview` | Serve the production build locally |
| `npx astro check` | Type-check only |
| `npm run test` | Vitest unit tests (`tests/unit/`) |
| `npm run test:e2e` | Playwright E2E suite (`tests/e2e/`) — builds and serves `dist/` on port 4331 |

## Production configuration

Copy `.env.example` to your hosting provider's environment variables and replace the example
Formspree URL with the real endpoint:

```text
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

Only HTTPS endpoints under `formspree.io/f/` are accepted. If the variable is missing or
invalid, the Services page safely shows the public email address instead of a broken form.

## Structure

- `src/data/*.ts` — all site copy, typed. Edit these to change text; no layout code lives here.
- `src/data/config.ts` — real-world links (email, LinkedIn, GitHub, résumé PDF, Briefline demo/repo and evidence docs) plus the build-time Formspree configuration. See PROGRESS.md for unresolved values.
- `src/layouts/BaseLayout.astro`, `src/components/{Header,Footer,ThemeToggle}.astro` — shared shell used by all three pages.
- `src/pages/index.astro`, `src/pages/work/briefline.astro`, `src/pages/services.astro` — the three routes.
- `src/scripts/{theme,reveal,carousel}.ts` — client-side logic, kept separate from markup so the carousel math is unit-testable.
- `tests/e2e/` — Playwright; `tests/unit/` — Vitest.

See `PROGRESS.md` for what's done, what's pending, and the placeholders that need real values before launch.
