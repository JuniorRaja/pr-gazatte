# The PR Gazette — Project Guide

## What This Project Is

A Next.js 15 App Router + TypeScript portfolio website for Prasanna Rajendran, styled as a vintage digital broadsheet newspaper. Single scrolling page with 11 sections. Content managed via MDX files.

## GSD Workflow

This project uses the Get Shit Done (GSD) planning system. Planning artifacts live in `.planning/`.

### Current State

See `.planning/STATE.md` for current phase and progress.
See `.planning/ROADMAP.md` for the full phase plan.

### Phase Commands

```bash
/gsd-discuss-phase <N>   # Gather context before planning
/gsd-plan-phase <N>      # Create detailed plan for a phase
/gsd-execute-phase <N>   # Execute a planned phase
/gsd-progress            # Check current progress
```

## Architecture Decisions

- **Single `app/page.tsx`** — All 11 sections on one scrolling page (newspaper broadsheet metaphor)
- **Server Components by default** — Only 5 client islands: `ThemeProvider`, `TweaksPanel`, `MobileNav`, `AnimatedSection`, `SkillsTicker`
- **`@next/mdx`** — Content in `content/*.mdx` files (NOT contentlayer — it's unmaintained)
- **`motion` v12** — Import from `motion/react`, NOT `framer-motion`. Every `motion.*` usage requires `'use client'`
- **CSS ticker** — `SkillsTicker` uses CSS `@keyframes`, NOT Framer Motion (performance on mobile)
- **`data-theme` on `<html>`** — Color modes via CSS custom properties, NOT inline styles or React state props
- **Inline blocking `<script>` in `<head>`** — Reads localStorage and sets `data-theme` before first paint to prevent FOUC
- **`next/font/google`** — Fonts loaded at build time, NOT CDN link tags
- **Standard Vercel deploy** — Do NOT use `output: 'export'` (breaks `next/image` optimizer)

## Critical Rules

1. **No `motion.*` in Server Components** — Build crashes. Always wrap with `AnimatedSection` or add `'use client'`
2. **No raw `<img>` tags** — Use `NpImage` (wraps `next/image` with newspaper filter) everywhere
3. **`mdx-components.tsx` must exist at project root** — Missing it causes cryptic build failures
4. **`next.config.mjs` not `.js`** — remark plugins are ESM-only
5. **Playfair Display needs explicit weights** — `weight: ['400', '600', '700', '800', '900']` (not a variable font)
6. **GitHub CDN remotePatterns** — Use `**.githubusercontent.com` wildcard

## Design Tokens

```css
/* Newsprint (default) */
--bg: #F4EFE6;  --fg: #0E0E0C;  --accent: #C1272D;  --sepia: #B8A792;

/* Ink (dark) */
--bg: #0E0E0C;  --fg: #F4EFE6;  --accent: #C1272D;  --sepia: #8a7c6e;

/* Aged */
--bg: #E8DCC8;  --fg: #2a1f0e;  --accent: #8B2020;  --sepia: #9c8060;
```

**--sepia is never used as body text** (fails WCAG AA contrast).

## Fonts

- **Playfair Display** — Headlines, bylines, newspaper title
- **Source Serif 4** — Body text (variable font)
- **JetBrains Mono** — Labels, meta, section flags, monospace UI
