# The PR Gazette

## What This Is

A Next.js + TypeScript portfolio website for Prasanna Rajendran styled as a vintage digital newspaper. The site tells Prasanna's professional story — engineering, career, projects, photography, books, travel, and hobbies — through the language and layout of a broadsheet, including section flags, column rules, drop caps, a scrolling ticker, and a paper grain texture. A classifieds section doubles as an availability-for-work signal.

## Core Value

A memorable first impression: visitors instantly understand who Prasanna is, what he builds, and how to reach him — without it looking like every other developer portfolio.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Port all 11 sections from the HTML prototype to Next.js + TypeScript: Masthead, Op-Ed, Tech Desk, Business Pages, Lab Report, Photo Desk, Books Review, Travel, Off Duty, Classifieds, Footer
- [ ] Content managed via MDX files — each section's data (projects, books, travel entries, skills) lives in `.mdx` files, not hardcoded in components
- [ ] Tweaks panel with three color modes (Newsprint/cream, Ink/dark, Aged/yellowed), type scale slider, column rules toggle, paper grain toggle — persisted to localStorage
- [ ] Sepia/newspaper image filter (`grayscale + sepia + contrast + brightness`) applied to all images site-wide via a shared `NpImage` component wrapping `next/image`
- [ ] Photo Desk gallery wired to real GitHub CDN image URLs
- [ ] Travel and Off Duty sections use styled placeholder slots (no broken images)
- [ ] Scroll-triggered entrance animations for section content (Framer Motion or CSS)
- [ ] Polished hover states and micro-interactions throughout
- [ ] Mobile-responsive: hamburger overlay nav, single-column stacking, no layout gaps on small screens
- [ ] Structural layout gaps in the prototype fixed — columns and grids fill their space with content or intentional newspaper-style negative space
- [ ] Classifieds section prominently communicates availability for work and projects
- [ ] Deployed to Vercel with custom domain support
- [ ] `next/image` with lazy loading and size optimization for all images
- [ ] Open Graph and basic SEO meta tags (title, description, OG image)
- [ ] Skills ticker animation preserved (scrolling marquee of tech stack with level indicators)

### Out of Scope

- Headless CMS / admin dashboard — MDX files are the editing interface
- Backend API routes — fully static / SSG site
- Authentication or protected pages
- Blog with posting/editing UI — portfolio is read-only
- Video content — images only
- Real-time availability status integration

## Context

The existing prototype (`FrontPage.html` + `components/*.jsx`) is a single-page React app loaded via CDN Babel — no build step, no routing. It establishes the full visual language and section structure but uses dummy images and has structural layout gaps. The Next.js build will convert these components to TypeScript, move content to MDX, and add the missing polish (animations, mobile, performance).

**Person:** Prasanna Rajendran — FinTech engineer and Deputy PM, 6.5 years experience. Based in Chennai.
**Skills:** React, TypeScript, C#, .NET 8, MSSQL, Azure (Expert) · Node, Python, Docker, GraphQL (Intermediate) · Kubernetes, Go, Rust, Kafka (Learning)
**Contact:** hello@prasannar.com · LinkedIn: /in/rajendranprasanna · GitHub: @JuniorRaja · Instagram: @prasanna.it.seems

**Design tokens:**
- Colors: cream `#F4EFE6`, ink `#0E0E0C`, red `#C1272D`, sepia `#B8A792`
- Fonts: Playfair Display (headlines), Source Serif 4 (body), JetBrains Mono (labels/meta)
- Color modes: Newsprint (default), Ink (dark), Aged (`#E8DCC8` bg / `#2a1f0e` fg / `#8B2020` accent)

**Images:** Gallery photos hosted on GitHub CDN. Travel and Off Duty use placeholder slots until real images are provided.

## Constraints

- **Stack**: Next.js 14+ App Router, TypeScript — no CRA, no Vite
- **Images**: `next/image` only — no raw `<img>` tags; all images get the newspaper filter via a shared component
- **Fonts**: Google Fonts via `next/font` (not CDN link tags)
- **Deployment**: Vercel — build must pass `next build` cleanly
- **No backend**: All data from MDX/static files; no database, no API routes required

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router (not Pages Router) | Current standard; better for RSC and metadata API | — Pending |
| MDX for content | Editable without touching component code; supports rich formatting if needed | — Pending |
| Framer Motion for animations | Best-in-class scroll animation DX in React ecosystem | — Pending |
| Single-page layout (no multi-page routing) | Matches the newspaper metaphor — one long broadsheet you scroll through | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-26 after initialization*
