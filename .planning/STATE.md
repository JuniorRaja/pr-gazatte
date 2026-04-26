# Project State: The PR Gazette

*Single source of truth for project memory. Updated at phase transitions and plan completions.*

---

## Project Reference

**Core Value**: A memorable first impression — visitors instantly understand who Prasanna is, what he builds, and how to reach him, without it looking like every other developer portfolio.
**Stack**: Next.js 15 App Router, TypeScript, Tailwind v4, MDX, Framer Motion, Vercel
**Milestone**: v1 — Initial Launch

---

## Current Position

**Phase**: 1 — Foundation
**Plan**: None started
**Status**: Not started

### Progress Bar

```
Phase 1 [Foundation]          [ ] Not started
Phase 2 [Shared Components]   [ ] Not started
Phase 3 [Sections & Content]  [ ] Not started
Phase 4 [Animations/SEO/A11y] [ ] Not started
Phase 5 [Deployment & QA]     [ ] Not started

Overall: 0/5 phases complete
```

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Phases total | 5 |
| Phases complete | 0 |
| Requirements total | 35 |
| Requirements complete | 0 |
| Plans written | 0 |
| Plans complete | 0 |

---

## Key Decisions

| Decision | Rationale | Phase Decided |
|----------|-----------|---------------|
| Next.js App Router (not Pages) | Current standard; better for RSC and metadata API | Pre-phase |
| MDX for content | Editable without touching component code | Pre-phase |
| Framer Motion for animations | Best-in-class scroll animation DX in React | Pre-phase |
| Single-page layout | Matches the newspaper metaphor — one long broadsheet | Pre-phase |
| CSS `@keyframes` for ticker (not Framer Motion) | Ticker is a pure CSS concern; avoids JS animation overhead | Pre-phase |

---

## Accumulated Context

### Architectural Notes

- The existing prototype is a CDN Babel React SPA — it establishes visual language but has no build step, no routing, and uses dummy images.
- The Next.js port is a full rewrite into App Router TypeScript components; the prototype is a reference, not code to migrate directly.
- Theme initialization uses an inline blocking `<script>` in `app/layout.tsx` to read localStorage before React hydrates — this prevents FOUC on color mode.
- `NpImage` wraps `next/image` and applies a CSS filter (`grayscale(100%) sepia(40%) contrast(1.1) brightness(0.9)`) — all images site-wide go through this component; raw `<img>` tags are banned.
- `SkillsTicker` uses CSS `@keyframes` (not Framer Motion) so it can run without a JS bundle cost.
- Photo Desk images are real GitHub CDN URLs. Travel and Off Duty use styled placeholder slots until real images are provided by Prasanna.
- `NEXT_PUBLIC_SITE_URL` is the canonical base URL — set in Vercel env for production.

### Content Notes

- Skills: React/TS/C#/.NET/Azure/MSSQL (Expert) · Node/Python/Docker/GraphQL (Intermediate) · Kubernetes/Go/Rust/Kafka (Learning)
- Contact: hello@prasannar.com · LinkedIn /in/rajendranprasanna · GitHub @JuniorRaja · Instagram @prasanna.it.seems
- Classifieds section is the primary "available for work" signal — should be prominent and include all contact channels.

### Design Tokens

| Token | Value |
|-------|-------|
| Cream | `#F4EFE6` |
| Ink | `#0E0E0C` |
| Red | `#C1272D` |
| Sepia | `#B8A792` |
| Aged BG | `#E8DCC8` |
| Aged FG | `#2a1f0e` |
| Aged Accent | `#8B2020` |

### Active Todos

- (None yet — project not started)

### Blockers

- (None)

---

## Session Continuity

**Last session**: 2026-04-26 — Project initialized, ROADMAP.md and STATE.md created.
**Resumption prompt**: Start Phase 1 Foundation with `/gsd-plan-phase 1`.

---
*State initialized: 2026-04-26*
*Last updated: 2026-04-26 after roadmap creation*
