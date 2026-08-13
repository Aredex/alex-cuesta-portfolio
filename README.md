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

## Structure

- `src/data/*.ts` — all site copy, typed. Edit these to change text; no layout code lives here.
- `src/data/config.ts` — every real-world link (email, LinkedIn, GitHub, résumé PDF, Briefline demo/repo, evidence docs, Formspree endpoint). Each unresolved one is a `TODO_*` placeholder — see PROGRESS.md for the full list.
- `src/layouts/BaseLayout.astro`, `src/components/{Header,Footer,ThemeToggle}.astro` — shared shell used by all three pages.
- `src/pages/index.astro`, `src/pages/work/briefline.astro`, `src/pages/services.astro` — the three routes.
- `src/scripts/{theme,reveal,carousel}.ts` — client-side logic, kept separate from markup so the carousel math is unit-testable.
- `tests/e2e/` — Playwright; `tests/unit/` — Vitest.

See `PROGRESS.md` for what's done, what's pending, and the placeholders that need real values before launch.
