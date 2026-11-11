# ryzizub.com

Personal site of Dominik Šimoník. Astro, static output, one page. React islands
for the two interactive parts, TypeScript everywhere.

## Commands

| Command            | Action                                                        |
| :----------------- | :------------------------------------------------------------ |
| `npm ci`           | Install dependencies (Node 24, see .nvmrc)                    |
| `npm run dev`      | Dev server at `localhost:4321`                                |
| `npm run build`    | Production build to `./dist/`                                 |
| `npm run check`    | `astro check` (types in `.astro`, `.ts`, `.tsx`)              |
| `npm run lint`     | Cognitive-complexity gate (ESLint + sonarjs)                  |
| `npm run literals` | Fails on a site fact typed outside `src/site.config.ts`       |
| `npm run a11y`     | axe on `dist/` at desktop and phone width (build first)       |
| `npm run verify`   | All of the above, in that order                               |

`npm run a11y` uses Playwright's Chromium (`npx playwright install chromium`) or, without it, the Chrome installed on the machine.

## Where things live

- `src/site.config.ts`: facts the site states more than once (name, role, links, nav, section titles, speaking).
- `src/content/*.json`: the lists. `builds` (the `/build` palette), `credentials`, `apps`, `quests`, `talks`, `logos`. Schemas in `src/content.config.ts`.
- `src/assets/`: `logos/` and `apps/` (looked up by file name from the JSON, see `src/lib/assets.ts`), `profile.jpeg`.
- `src/styles/global.css`: tokens, reset and the shared pieces (palette window, buttons, chips, status dots).
- `src/components/`:
  - React islands with CSS Modules: `BuildPalette` (hydrated on load) and `AppLauncher` (hydrated when visible). `Icon` and `AppIcon` are React too and render without JavaScript where Astro uses them.
  - Astro sections with scoped styles: `Header`, `Palette`, `Dock`, `Logos`, `Apps`, `SideQuests` (with `RefraneArt`, `CompassArt`), `Talks`, `Contact`, `Footer`.
- `src/pages/`: `/` and `404`.
- `scripts/`: `literals.ts`, `a11y.ts` (run by Node directly).

Rules for agents (and people): `CLAUDE.md` and `.claude/rules/`.

## CI

`.github/workflows/verify.yml` runs the checks on every PR and push to `main`, then builds the Docker image, runs it and probes the page, the 404 page, caching and headers. Dependabot (`.github/dependabot.yml`) groups weekly npm, Actions and base-image updates.

## Deploy

`Dockerfile` builds the site (`npm ci`, `npm run build`) and serves `dist/` with nginx (`nginx.conf`: the 404 page, security headers, a year of caching for `/_astro/`). `docker-compose.yml` exposes it on port 8480:

```bash
docker compose up --build
```
