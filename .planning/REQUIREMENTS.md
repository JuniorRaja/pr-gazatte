# Requirements: The PR Gazette

**Defined:** 2026-04-26
**Core Value:** A memorable first impression — visitors instantly understand who Prasanna is, what he builds, and how to reach him, without it looking like every other developer portfolio.

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Next.js 15 App Router project scaffolded with TypeScript and Tailwind v4
- [ ] **FOUND-02**: `next.config.mjs` configured with `@next/mdx` and GitHub CDN `remotePatterns` (`**.githubusercontent.com`)
- [ ] **FOUND-03**: `app/layout.tsx` with Google Fonts via `next/font`, paper grain CSS, and inline blocking `<script>` for FOUC-free theme initialization
- [ ] **FOUND-04**: `globals.css` defines all three `[data-theme]` CSS variable sets (newsprint, ink, aged)
- [ ] **FOUND-05**: `mdx-components.tsx` at project root mapping `img` → `NpImage`

### Shared Components

- [ ] **ATOM-01**: `NpImage` wrapping `next/image` with newspaper filter (grayscale + sepia + contrast + brightness)
- [ ] **ATOM-02**: `SectionFlag` component for section header bars with title and subtitle slots
- [ ] **ATOM-03**: `AnimatedSection` client wrapper for Framer Motion scroll-triggered entrance animations with `useReducedMotion()` gate
- [ ] **ATOM-04**: `ThemeProvider` client component managing `data-theme` on `<html>` from localStorage
- [ ] **ATOM-05**: `SkillsTicker` CSS `@keyframes` marquee (no Framer Motion) with pause-on-hover and `useReducedMotion()` support
- [ ] **ATOM-06**: `TweaksPanel` with color mode (3 options), type scale slider, column rules toggle, grain toggle — persisted to localStorage
- [ ] **ATOM-07**: `MobileNav` hamburger overlay with full-screen newspaper-style nav

### Sections

- [ ] **SECT-01**: Masthead — date strip, newspaper title, nav bar, Vol/Edition metadata, availability badge visible without scrolling
- [ ] **SECT-02**: OpEd — About section with byline, drop cap, 3-column layout
- [ ] **SECT-03**: TechDesk — Skills section with `SkillsTicker` marquee and level indicators (Expert / Intermediate / Learning)
- [ ] **SECT-04**: BusinessPages — Career and work experience section
- [ ] **SECT-05**: LabReport — Projects section with project entries from MDX
- [ ] **SECT-06**: PhotoDesk — Gallery wired to real GitHub CDN image URLs from MDX, newspaper filter applied to all images
- [ ] **SECT-07**: BooksReview — Reading list from MDX
- [ ] **SECT-08**: Travel — Travel entries with styled placeholder image slots
- [ ] **SECT-09**: OffDuty — Hobbies with styled placeholder image slots
- [ ] **SECT-10**: Classifieds — "POSITIONS WANTED" availability ads + all contact links (email, LinkedIn, GitHub, Instagram)
- [ ] **SECT-11**: Footer — credits and links

### Content (MDX)

- [ ] **CONT-01**: `content/skills.mdx` — full skills list with Expert / Intermediate / Learning levels
- [ ] **CONT-02**: `content/projects.mdx` — Lab Report project entries
- [ ] **CONT-03**: `content/books.mdx` — Books Review reading list
- [ ] **CONT-04**: `content/career.mdx` — Business Pages work history
- [ ] **CONT-05**: `content/photos.mdx` — Photo Desk GitHub CDN image URLs
- [ ] **CONT-06**: `content/travel.mdx` — Travel entries (placeholder images)
- [ ] **CONT-07**: `content/hobbies.mdx` — Off Duty entries

### SEO & Accessibility

- [ ] **SEO-01**: `metadata` export in `app/layout.tsx` with title, description, and canonical URL
- [ ] **SEO-02**: Themed OG image via `app/opengraph-image.tsx` — newspaper masthead at 1200×630
- [ ] **SEO-03**: `app/sitemap.ts` and `app/robots.ts`
- [ ] **SEO-04**: JSON-LD Person + ProfilePage structured data in root layout
- [ ] **SEO-05**: WCAG AA contrast verified on all three color modes (sepia token never used as body text color)

### Deployment

- [ ] **DEPLOY-01**: Clean `next build` with zero TypeScript errors (no `ignoreBuildErrors`)
- [ ] **DEPLOY-02**: Deployed to Vercel with `NEXT_PUBLIC_SITE_URL` environment variable set
- [ ] **DEPLOY-03**: OG image preview verified, real-device mobile test passed

## v2 Requirements

### Enhancements

- **ENH-01**: Photo Desk lightbox — full-screen image view with newspaper filter maintained
- **ENH-02**: Contact form with email delivery (currently email link only)
- **ENH-03**: System dark-mode auto-detection (OS preference synced to color mode)
- **ENH-04**: Analytics integration (Vercel Analytics or Plausible)
- **ENH-05**: Travel and Off Duty real images (when available)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Headless CMS / admin dashboard | MDX files are the editing interface — no dashboard needed for a personal portfolio |
| Backend API routes | Fully static site; no server-side data fetching needed |
| Authentication or protected pages | Public portfolio only |
| Video content | Images only; video adds bandwidth cost and complexity |
| Multi-page routing | Single scrolling broadsheet is the newspaper metaphor |
| Real-time availability status | Static "available" signal in Classifieds is sufficient |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Pending |
| ATOM-01 | Phase 2 | Pending |
| ATOM-02 | Phase 2 | Pending |
| ATOM-03 | Phase 2 | Pending |
| ATOM-04 | Phase 2 | Pending |
| ATOM-05 | Phase 2 | Pending |
| ATOM-06 | Phase 2 | Pending |
| ATOM-07 | Phase 2 | Pending |
| SECT-01 | Phase 3 | Pending |
| SECT-02 | Phase 3 | Pending |
| SECT-03 | Phase 3 | Pending |
| SECT-04 | Phase 3 | Pending |
| SECT-05 | Phase 3 | Pending |
| SECT-06 | Phase 3 | Pending |
| SECT-07 | Phase 3 | Pending |
| SECT-08 | Phase 3 | Pending |
| SECT-09 | Phase 3 | Pending |
| SECT-10 | Phase 3 | Pending |
| SECT-11 | Phase 3 | Pending |
| CONT-01 | Phase 3 | Pending |
| CONT-02 | Phase 3 | Pending |
| CONT-03 | Phase 3 | Pending |
| CONT-04 | Phase 3 | Pending |
| CONT-05 | Phase 3 | Pending |
| CONT-06 | Phase 3 | Pending |
| CONT-07 | Phase 3 | Pending |
| SEO-01 | Phase 4 | Pending |
| SEO-02 | Phase 4 | Pending |
| SEO-03 | Phase 4 | Pending |
| SEO-04 | Phase 4 | Pending |
| SEO-05 | Phase 4 | Pending |
| DEPLOY-01 | Phase 5 | Pending |
| DEPLOY-02 | Phase 5 | Pending |
| DEPLOY-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 35 total
- Mapped to phases: 35
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-26*
*Last updated: 2026-04-26 after initial definition*
