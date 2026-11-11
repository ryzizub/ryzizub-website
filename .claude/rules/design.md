---
paths:
  - "src/components/**"
  - "src/layouts/**"
  - "src/pages/**"
  - "src/styles/**"
  - "src/assets/**"
---

# Design: the dark command palette

The visual reference is the board "Final · F Split palette" on the design
canvas https://claude.ai/artifact/4MecvEgduHsGkLnJfq2zHJ. Change the site
first and the board after, or ask; never let them drift silently.

- Tokens only, from `:root` in `src/styles/global.css`. A value the tokens
  lack goes there, not into a component.
- One accent (`--acc`), for commands, the caret, the speaking tile and the
  main buttons. Supporting labels, icons and arrows stay neutral.
- Monospace (`--mono`) only for what reads as a command or data: the palette,
  section commands, labels, dates, stack. Names and prose use the sans.
- Section headings carry their command inline (`/apps Shipped apps.`). No
  label or eyebrow above a heading.
- Logos sit on the same dark chip; logos drawn for light backgrounds are shown
  in white (`mono` in the JSON).
- Layout and type size from the page container (`.pg`, container queries and
  `cqw`), checked at 1280, 1024, 600 and 390 px wide.
- Interactive parts are React islands (`.tsx` + `.module.css`) hydrated where
  they are used; everything else stays an Astro component and ships no
  JavaScript. Static use of a React component (icons) needs no `client:`.
- Motion: the palette types once and rests; nothing loops that is not a
  drawing. Everything stops under `prefers-reduced-motion`.
- Touch targets at least 44 px, visible focus, text contrast 4.5:1.
  `npm run a11y` must report no violations.
