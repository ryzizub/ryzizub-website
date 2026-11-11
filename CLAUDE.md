# ryzizub.com

Dominik Šimoník's personal site: one static page. Astro 7, React 19 islands
for the two interactive parts (the `/build` palette and the apps launcher),
TypeScript strict everywhere, CSS Modules for React components and scoped
`<style>` in Astro ones, tokens in `src/styles/global.css`. Node 24.
Production runs the Docker image: `Dockerfile` builds the site, nginx serves
it with `nginx.conf`.

CLAUDE.md stays short and always true. Setup and commands: [README.md](README.md).
Anything that matters only when touching certain files is a path-scoped rule in
`.claude/rules/`: [content](.claude/rules/content.md), [design](.claude/rules/design.md).

## Done means `npm run verify` passes

`astro check`, the cognitive-complexity lint, `literals` (no site fact typed
outside the config), the build and the axe audit at desktop and phone width.
CI (`.github/workflows/verify.yml`) runs the same on every PR and push to
`main`, then builds the Docker image, runs it and probes the page, the 404,
caching and the security headers. Say which check you skipped and why.

## The repo is public

No client names beyond the ones the content rule allows, no private links,
no personal data beyond what the site itself shows.

## Agent worktrees

Claude Code keeps worktrees under `.claude/worktrees/` inside the main
checkout, and Vite also reads the main checkout's `tsconfig.json` when it loads
`astro.config.ts`. That is why `tsconfig.json` has no `extends` (see its
comment). If a worktree build fails with "Tsconfig not found", the main
checkout is on an older commit: build in a copy outside it, or update `main`.
