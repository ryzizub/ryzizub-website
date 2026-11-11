---
paths:
  - "src/content/**"
  - "src/site.config.ts"
  - "src/components/**"
  - "src/pages/**"
---

# Content: every fact comes from the Identity page

The source of truth for anything said in Dominik's name is his Identity page
in Notion: https://app.notion.com/p/ryzizub/Identity-411241c2436b812b93b4f17d92264043.
Read it before changing copy. A fact marked unconfirmed there does not ship.

- Facts live in `src/site.config.ts` (said more than once) and
  `src/content/*.json` (the lists). Components read them; `npm run literals`
  fails on a fact typed into a component or page.
- English only. First person in his voice: short, direct, no marketing words.
- Never invent a number, date, title, client or claim. Talks are "50+", never
  an exact count.
- Never present him as available for hire: no "hire me", "open to freelance",
  "services" or anything like it.
- The only Very Good Ventures clients the site may name are Dutch Bros and
  Divine. Other client work stays "client apps, under NDA".
- Credit collaborators. ai-printer-brr is Denis Valášek's build; Dominik only
  gave the talk about it with him, so it is never listed as his project.
- Lists are ordered on purpose: apps newest first by start year, talks and
  articles newest first. Keep `order` in the JSON in step.
