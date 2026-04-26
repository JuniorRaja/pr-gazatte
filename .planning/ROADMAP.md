# Roadmap: The PR Gazette

**Milestone:** v1 — Initial Launch
**Granularity:** Standard (5 phases)
**Created:** 2026-04-26
**Coverage:** 35/35 v1 requirements mapped

---

## Phases

- [ ] **Phase 1: Foundation** — Scaffold the Next.js 15 project with all build-time infrastructure before any UI work begins
- [ ] **Phase 2: Shared Component Library** — Build all shared UI atoms and client islands that every section depends on
- [ ] **Phase 3: Sections & Content** — Port all 11 sections to Next.js TypeScript components, wired to MDX content files, fully mobile-responsive
- [ ] **Phase 4: Animations, SEO & Accessibility** — Add scroll-triggered entrance animations, wire OG image, structured data, sitemap, and verify WCAG AA on all three color modes
- [ ] **Phase 5: Deployment & QA** — Ship to Vercel, verify OG previews, pass real-device mobile test, zero TypeScript build errors

---

## Phase Details

### Phase 1: Foundation
**Goal**: The Next.js 15 project compiles cleanly, serves a blank page, and every build-time infrastructure piece (MDX pipeline, font loading, theme initialization, CSS variables) is in place before any UI is written.
**Depends on**: Nothing
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05
**Success Criteria** (what must be TRUE):
  1. Running `next dev` serves a page with no console errors and no layout flash on first load
  2. All three `[data-theme]` CSS variable sets (newsprint, ink, aged) are defined and switchable by changing the `data-theme` attribute on `<html>` — visible in DevTools
  3. Google Fonts (Playfair Display, Source Serif 4, JetBrains Mono) load via `next/font` with no CDN link tags in the HTML source
  4. An `.mdx` file placed in `content/` renders without error — the MDX pipeline is live
  5. `next build` completes with zero TypeScript errors and zero warnings from `next.config.mjs`
**Plans**: TBD

### Phase 2: Shared Component Library
**Goal**: Every shared UI primitive — image wrapper, section header, animation container, theme controls, ticker, mobile nav — exists as a tested, standalone component ready to be composed into sections.
**Depends on**: Phase 1
**Requirements**: ATOM-01, ATOM-02, ATOM-03, ATOM-04, ATOM-05, ATOM-06, ATOM-07
**Success Criteria** (what must be TRUE):
  1. Dropping `<NpImage>` anywhere renders an image with the newspaper filter (grayscale + sepia + contrast + brightness) — no raw `<img>` tags appear in the DOM
  2. The `TweaksPanel` switches between all three color modes and the chosen mode persists across a hard page reload (localStorage verified in DevTools)
  3. The `SkillsTicker` marquee scrolls continuously, pauses on hover, and stops moving when `prefers-reduced-motion` is active
  4. The `MobileNav` hamburger opens a full-screen overlay at viewport widths below 768 px and closes on nav link click
  5. Wrapping any block in `<AnimatedSection>` produces a scroll-triggered entrance; the animation is skipped entirely when `prefers-reduced-motion` is active
**Plans**: TBD
**UI hint**: yes

### Phase 3: Sections & Content
**Goal**: All 11 newspaper sections are rendered from MDX content files in a single scrolling page, are fully mobile-responsive, and faithfully reproduce the visual language of the HTML prototype.
**Depends on**: Phase 2
**Requirements**: SECT-01, SECT-02, SECT-03, SECT-04, SECT-05, SECT-06, SECT-07, SECT-08, SECT-09, SECT-10, SECT-11, CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07
**Success Criteria** (what must be TRUE):
  1. A visitor scrolling the page encounters all 11 sections in order (Masthead through Footer) with no blank or broken sections
  2. The Masthead availability badge, OpEd drop cap, TechDesk ticker, and Classifieds "POSITIONS WANTED" copy are all visible without any hardcoded content — each reads from its MDX file
  3. On a 375 px wide viewport the layout stacks to a single column with no horizontal overflow, no overlapping elements, and the hamburger nav is reachable
  4. Photo Desk displays real GitHub CDN images with the newspaper filter applied; Travel and Off Duty show styled placeholder slots with no broken-image icons
  5. Editing a value in any `content/*.mdx` file and saving causes the corresponding section to reflect the change on next render (content is not hardcoded in components)
**Plans**: TBD
**UI hint**: yes

### Phase 4: Animations, SEO & Accessibility
**Goal**: Sections animate in on scroll, all three color modes pass WCAG AA contrast, and the site exposes correct Open Graph metadata, JSON-LD structured data, sitemap, and robots directives to search engines and social platforms.
**Depends on**: Phase 3
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05
**Success Criteria** (what must be TRUE):
  1. Pasting the deployed URL into the LinkedIn / Slack link preview tool shows the newspaper-masthead OG image at 1200×630 with the correct title and description
  2. The Chrome Accessibility audit (axe or Lighthouse) reports zero contrast failures across all three color modes (newsprint, ink, aged)
  3. `https://<domain>/sitemap.xml` returns a valid XML sitemap and `https://<domain>/robots.txt` returns correct crawl directives
  4. Pasting the deployed URL into Google's Rich Results Test returns a valid Person + ProfilePage structured data entity with no errors
  5. Scrolling down the page from the top causes each section's content to animate into view; sections already in view on load appear immediately without re-animating
**Plans**: TBD
**UI hint**: yes

### Phase 5: Deployment & QA
**Goal**: The site is live on Vercel, `next build` is clean, OG previews are verified, and the site passes a real-device mobile test.
**Depends on**: Phase 4
**Requirements**: DEPLOY-01, DEPLOY-02, DEPLOY-03
**Success Criteria** (what must be TRUE):
  1. `next build` completes with zero TypeScript errors and `ignoreBuildErrors` is absent from `next.config.mjs`
  2. The Vercel deployment URL is live and `NEXT_PUBLIC_SITE_URL` is set in the Vercel environment — the canonical URL in page metadata matches the live domain
  3. Opening the live URL on a physical mobile device (or verified BrowserStack session) at 375 px shows no layout breakage, the hamburger nav works, and images load with the newspaper filter
**Plans**: TBD

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/? | Not started | - |
| 2. Shared Component Library | 0/? | Not started | - |
| 3. Sections & Content | 0/? | Not started | - |
| 4. Animations, SEO & Accessibility | 0/? | Not started | - |
| 5. Deployment & QA | 0/? | Not started | - |

---

## Requirement Coverage

| Category | Requirements | Phase |
|----------|-------------|-------|
| Foundation | FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05 | 1 |
| Shared Components | ATOM-01, ATOM-02, ATOM-03, ATOM-04, ATOM-05, ATOM-06, ATOM-07 | 2 |
| Sections | SECT-01 through SECT-11 | 3 |
| Content (MDX) | CONT-01 through CONT-07 | 3 |
| SEO & Accessibility | SEO-01, SEO-02, SEO-03, SEO-04, SEO-05 | 4 |
| Deployment | DEPLOY-01, DEPLOY-02, DEPLOY-03 | 5 |

**Total: 35/35 v1 requirements mapped. No orphans.**

---
*Roadmap created: 2026-04-26*
*Last updated: 2026-04-26 after initial creation*
