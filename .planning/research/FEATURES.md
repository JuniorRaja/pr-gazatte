# Feature Landscape: Developer Portfolio Website

**Domain:** Personal developer portfolio — themed single-page site
**Project:** The PR Gazette (Prasanna Rajendran)
**Researched:** 2026-04-26
**Confidence:** HIGH (training + verified Next.js official docs, dated 2026-04-23)

---

## Table Stakes

Features visitors expect. Missing = product feels broken or amateurish; visitors leave.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear identity above the fold | Who are you, what do you do — in 5 seconds | Low | Masthead section delivers this; must include name, title/role, and a one-line pitch |
| Contact information | Recruiters and clients have one job: reach you | Low | Email + LinkedIn minimum; GitHub expected for a dev portfolio |
| Mobile-responsive layout | 60-70% of portfolio viewers are on mobile (phone lookup after meeting) | Medium | Single-column stack at <768px; no horizontal overflow; hamburger nav |
| Reasonable load time | >3s on 3G → 50% abandonment | Medium | `next/image` lazy loading + SSG covers this; avoid unoptimized CDN fonts |
| Visible skills list | First thing a technical screener looks for | Low | "Can this person do what we need?" must be answerable in <10s |
| Work history / career timeline | Validates credibility; expected by any hiring party | Low | Business Pages section; years + titles + company names minimum |
| Project showcase | "What have you actually built?" — portfolio without projects is a resume | Medium | Lab Report section; each project needs: name, what it does, stack used, link |
| Consistent navigation | Visitors need to jump to sections without scrolling the whole page | Low | Sticky/fixed masthead nav with section anchors; smooth scroll |
| Favicon and page title | Browser tab identity; missing favicon signals "unfinished" | Low | `app/favicon.ico` + `<title>` via Next.js metadata API |
| HTTPS / secure domain | HTTP = browser warning = instant trust loss | Low | Vercel handles this automatically on custom domains |
| No broken images or links | Broken assets signal abandoned project | Low | Placeholder slots required for Travel/Off Duty before real images exist |
| About / bio section | Personality and context behind the skills | Low | Op-Ed section; humanizes the resume |

---

## Differentiators

Features that make a portfolio memorable. Visitors don't expect these — but they create the "I have to tell someone about this" effect that gets referrals.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Cohesive visual theme with personality | Stands out from the 10,000 Bootstrap-grid portfolios; becomes a talking point in interviews | High | The newspaper metaphor IS the differentiator — every section must reinforce it |
| Theme / color mode switcher | Shows technical range; thoughtful UX detail that visitors actually use | Medium | Tweaks panel: Newsprint / Ink / Aged — persisted to localStorage |
| Scroll-triggered entrance animations | Feels alive; signals front-end craft; expected on 2024-2025 portfolios but done poorly on most | Medium | Framer Motion `whileInView` with `once: true`; stagger children on section entry |
| Skills ticker / scrolling marquee | Visually engaging; the newspaper metaphor extends naturally to a wire ticker | Low-Medium | CSS or Framer Motion marquee; show skill + level indicator |
| Newspaper image filter on all photos | Reinforces the theme at the pixel level; immediately memorable | Low | Shared `NpImage` component: `grayscale(30%) sepia(40%) contrast(1.1) brightness(0.95)` |
| Paper texture / grain overlay | Tactile quality; differentiates from "flat card on white" portfolios | Low | CSS `background-image: url(noise.png)` with `opacity: 0.04` overlay on `<body>` |
| Type scale slider | Shows obsession with typography; useful for accessibility | Medium | Tweaks panel CSS custom property `--type-scale` applied globally |
| Drop caps + column rules | Authentic broadsheet styling that most "newspaper" themes fake or skip | Low | CSS `::first-letter` + `border-right` column dividers |
| Hobbies / Off-duty section | Makes you a human being, not a skill inventory; interviewers remember it | Low | Off Duty section exists; keep it lightweight and genuine |
| Books / reading list | Signals intellectual curiosity; rare in dev portfolios | Low | Books Review section; format: cover + title + one-line take |
| Travel section | Personality depth; signals worldliness and life outside code | Low | Travel section; styled placeholder cards are fine until real images arrive |
| Classifieds as availability signal | Creative framing of "hire me" that fits the theme and avoids desperation | Low | See "Available for Work" section below |
| Themed OG image | When shared on LinkedIn/Slack/WhatsApp, the newspaper masthead appears — extends the metaphor off-site | Medium | `next/og` ImageResponse: newspaper masthead layout at 1200×630 |
| Section date-stamps | "Edition date" on each section header reinforces broadsheet authenticity | Low | Pure cosmetic; renders as `VOL. X, NO. Y · EDITION DATE` |

---

## "Available for Work" Signal — Best Practices

This is a distinct feature cluster because it has specific UX requirements for a job-seeking developer.

**What works (HIGH confidence — observed across many portfolios):**

1. **Status badge in the masthead/nav** — a small pill or tag reading "Available for work" or "Open to opportunities" near your name. This is the single highest-value placement because it's visible on load without scrolling. Style it as a classified ad tag to fit the newspaper theme.

2. **Classifieds section as the CTA** — framing contact/availability as a "POSITIONS WANTED" classified ad is on-theme and memorable. Include: availability date or "Immediately available", preferred engagement type (full-time / contract / freelance), location preference (remote / Chennai / hybrid), and the contact email as the "ad rate."

3. **Contact copy that signals specificity** — "I'm looking for senior/lead roles in FinTech or product-led companies" converts better than "open to anything." Prasanna has 6.5 years + Deputy PM experience — lean into that seniority.

4. **One-click contact** — mailto link for email opens immediately; don't hide it behind a form (forms break on static sites anyway, and the project explicitly avoids backend). LinkedIn direct link, not a LinkedIn badge widget.

5. **Availability freshness** — static "available" signals can become stale. Note in the MDX content that the availability copy will need manual updating when status changes. No automation needed (backend is out of scope).

**What does NOT work:**

- Contact forms on static sites (no backend; avoid broken form states)
- "Send me a message" with no fallback email shown
- Availability hidden below the fold with no top-of-page hint
- "Currently employed but open to opportunities" phrasing — too hedged for a portfolio with clear availability intent

---

## Interactions and Animations (2024-2025 Standard)

What visitors have been conditioned to expect from polished 2024-2025 portfolios.

| Interaction | Expected Level | Implementation Note | Complexity |
|-------------|---------------|---------------------|------------|
| Scroll-triggered section reveal | Expected on any polished portfolio | Framer Motion `whileInView={{ opacity: 1, y: 0 }}` with `initial={{ opacity: 0, y: 30 }}` and `once: true` | Medium |
| Staggered children on section entry | Differentiating but becoming common | `staggerChildren: 0.08` on the section container variant | Low-Medium |
| Hover state on project cards | Expected | `whileHover={{ y: -2 }}` + CSS `box-shadow` transition | Low |
| Hover state on nav links | Expected | CSS `color` + `border-bottom` transition, 150ms | Low |
| Smooth scroll to section anchors | Expected | `scroll-behavior: smooth` on `html` or Next.js Link with hash | Low |
| Skills ticker continuous scroll | Differentiating; on-theme | CSS `@keyframes marquee` or Framer Motion `animate={{ x: [0, -50%] }}` with `repeat: Infinity` | Low-Medium |
| Theme switcher transition | Nice-to-have | CSS `transition: background-color 300ms, color 300ms` on `:root` | Low |
| Image hover — slight sepia lift | Subtle; on-theme | CSS filter transition on hover: reduce sepia slightly | Low |
| Reduced-motion respect | Required for accessibility; not optional | `@media (prefers-reduced-motion: reduce)` disables all transitions + Framer Motion `useReducedMotion()` hook gates animations | Low |

**What to avoid:**

- Page-load splash screens / loaders — killing perceived performance for aesthetics
- Parallax scrolling on text — causes motion sickness; especially bad on a long scroll page
- Autoplay audio — will never be appropriate for a portfolio
- Cursor replacement effects — clever in 2019, dated in 2025, inaccessible
- Physics-spring animations on nav links — distracting at the nav level
- Animated backgrounds (moving particles, canvas effects) — destroys performance on mobile

---

## Common Portfolio Sections and Content Requirements

Mapped to the PR Gazette's actual section plan.

| Section | PR Gazette Name | Minimum Content | What Makes It Strong |
|---------|----------------|-----------------|---------------------|
| Header / Masthead | Masthead | Name, tagline/title, nav anchors | Add availability badge, edition date, publication-style deck ("Deputy PM & FinTech Engineer") |
| About / Bio | Op-Ed | 2-3 paragraphs: who you are, what drives you, current focus | Write as an editorial voice, not a resume bullet. First-person. Mention Chennai + FinTech context. |
| Skills | Tech Desk | Tech stack with groupings | Ticker format; show skill level (Expert / Intermediate / Learning) — Prasanna's own categorization from PROJECT.md is already right |
| Career / Work history | Business Pages | Company, role, dates, 1-2 bullet impact points per role | At least 6.5 years of history. Most important: quantified outcomes ("reduced X by Y%") not just duties |
| Projects | Lab Report | Name, what it does (one line), stack, status, link | 4-8 projects. Include GitHub links and live demo links where possible. Stack chips/badges. |
| Photography / Gallery | Photo Desk | Images with captions | Grid layout; newspaper filter applied; lightbox optional but nice |
| Books | Books Review | Cover image, title, author, 1-sentence take or rating | 6-12 books; recently read weighted higher |
| Travel | Travel | Destination, date, 1-2 photos or placeholder | Cards format; placeholder slots until real images |
| Hobbies | Off Duty | 3-5 hobbies with icon/image and brief descriptor | Keep it light and genuine; avoid "I enjoy hiking and reading" clichés |
| Contact / Hire | Classifieds | Email (clickable), LinkedIn, GitHub, availability status | Frame as classified ad copy; clear CTA |
| Footer | Footer | Copyright year, social links, "built with" attribution if desired | Keep minimal; doesn't need to repeat nav |

---

## SEO Requirements

Based on verified Next.js App Router metadata API (docs dated 2026-04-23, version 16.2.4).

### Must-Have (Table Stakes for Discoverability)

| Requirement | Implementation | Notes |
|-------------|---------------|-------|
| `<title>` tag | `metadata.title` in `app/layout.tsx` | Use template: `"Prasanna Rajendran — FinTech Engineer & Deputy PM"` |
| Meta description | `metadata.description` | 150-160 chars; include name + key skills + location |
| `metadataBase` | `new URL('https://prasannar.com')` in root layout | Required for all relative OG/Twitter image URLs to resolve correctly |
| OG title | `metadata.openGraph.title` | Can match page title or be more social-friendly |
| OG description | `metadata.openGraph.description` | Same as meta description or slightly more conversational |
| OG image | `app/opengraph-image.tsx` using `ImageResponse` | 1200×630px PNG; newspaper masthead design using Playfair Display; statically generated at build time |
| OG type | `metadata.openGraph.type: 'website'` | Always 'website' for a portfolio |
| OG URL | `metadata.openGraph.url` | Canonical URL |
| Twitter card | `metadata.twitter.card: 'summary_large_image'` | Makes the OG image appear full-width in Twitter/X link previews |
| Twitter image | Inherits from OG image or separate `app/twitter-image.tsx` | Same 1200×630 works for both |
| Canonical URL | `metadata.alternates.canonical` | Prevents duplicate-content penalties if accessed via www vs non-www |
| Favicon | `app/favicon.ico` + `app/icon.png` | File-based convention auto-detected; include 180×180 apple-touch-icon |
| `robots.txt` | `app/robots.ts` exporting `MetadataRoute.Robots` | `index: true, follow: true` for all pages; allow Googlebot |
| `sitemap.xml` | `app/sitemap.ts` exporting `MetadataRoute.Sitemap` | Single-page site = single URL entry; priority: 1.0; changeFrequency: 'monthly' |

### Nice-to-Have (Differentiating for SEO)

| Requirement | Implementation | Notes |
|-------------|---------------|-------|
| JSON-LD structured data (Person schema) | `<script type="application/ld+json">` in root layout | Schema.org Person: name, jobTitle, url, sameAs (LinkedIn, GitHub); LOW complexity, HIGH SEO value |
| JSON-LD structured data (ProfilePage schema) | Nest inside root layout script tag | `@type: ProfilePage` wrapping the `mainEntity: Person` — used by Google's people knowledge panels |
| Image sitemap | Add `images` array to sitemap entries | Gallery images from GitHub CDN; helps photo content surface in Google Images |
| `theme-color` viewport meta | `generateViewport()` in root layout | Match Newsprint cream `#F4EFE6`; changes mobile browser chrome color |
| Author meta | `metadata.authors: [{ name: 'Prasanna Rajendran', url: '...' }]` | Minor signal but costs nothing |

### JSON-LD Person Schema (exact shape for PR Gazette)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Prasanna Rajendran",
    "jobTitle": "FinTech Engineer & Deputy PM",
    "url": "https://prasannar.com",
    "email": "hello@prasannar.com",
    "sameAs": [
      "https://linkedin.com/in/rajendranprasanna",
      "https://github.com/JuniorRaja",
      "https://instagram.com/prasanna.it.seems"
    ],
    "knowsAbout": ["React", "TypeScript", "C#", ".NET", "Azure", "FinTech"]
  }
}
```

---

## Accessibility Requirements — Commonly Missed

Categorized by how commonly they fail on portfolio sites specifically.

### Critical (Fail = site is unusable for some users)

| Requirement | WCAG Criterion | Commonly Missed Because | Prevention |
|-------------|---------------|-------------------------|------------|
| Color contrast 4.5:1 for normal text | 1.4.3 AA | Sepia/cream palettes often fail; aged theme worst offender | Test all three color modes with a contrast checker; `#B8A792` sepia on `#F4EFE6` cream is approximately 1.8:1 — FAILS. Never use as text color. |
| Color contrast 3:1 for large text / UI | 1.4.3 AA | Section headings in decorative display weights | Verify Playfair Display headlines; large = 18pt+ regular or 14pt+ bold |
| Alt text on all images | 1.1.1 A | `next/image` without `alt` prop silently fails | The `NpImage` component must enforce a required `alt` prop; placeholder slots need descriptive alt or `alt=""` if purely decorative |
| Keyboard navigable | 2.1.1 A | Interactive elements styled to hide focus rings | Never `outline: none` without a custom focus style replacement |
| Visible focus indicator | 2.4.7 AA | `outline: none` in CSS resets — extremely common | Use `:focus-visible` not `:focus`; style with `outline: 2px solid var(--color-red)` offset 2px |
| Hamburger nav accessible | 4.1.2 A | Missing `aria-expanded`, `aria-controls`, `aria-label` on toggle button | Pattern: `<button aria-label="Open navigation" aria-expanded={isOpen} aria-controls="nav-menu">` |
| Skip navigation link | 2.4.1 A | Never included on portfolios | Add `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>` as first focusable element |

### Moderate (Common failures that degrade experience for significant user groups)

| Requirement | WCAG Criterion | Issue | Prevention |
|-------------|---------------|-------|------------|
| Respect prefers-reduced-motion | 2.3.3 AAA / general best practice | All Framer Motion animations run regardless of OS setting | `const shouldAnimate = !useReducedMotion()` — gate all entrance animations and the ticker |
| ARIA landmark regions | 1.3.6 AAA / 4.1.2 A | Sections identified only visually by heading; screen readers can't jump between regions | Wrap each major section in semantic HTML: `<header>`, `<main>`, `<nav>`, `<section aria-labelledby="section-heading-id">`, `<footer>` |
| Heading hierarchy | 1.3.1 A | Single-page sites often have `<h2>` section headings but no `<h1>`, or use heading levels for visual sizing | One `<h1>` (name in masthead); section titles `<h2>`; project/book/skill titles `<h3>` |
| Scrolling ticker accessible | 2.2.2 A | Marquee content is not reachable by keyboard; moves without user control | Provide `aria-label` on ticker container; optionally pause on hover/focus; or duplicate content in a visually hidden static list |
| Link purpose clear from text | 2.4.4 A | "GitHub" or "View" links with no context | Use `aria-label="View Prasanna's GitHub profile"` or descriptive text; avoid bare icon links |
| Decorative images marked correctly | 1.1.1 A | Paper texture, grain overlay, column rule images passed with alt text (noise) | Pure decorative: `alt=""` or CSS `background-image` (preferred — no DOM element) |

### Minor (Polish-level; affects edge cases)

| Requirement | Note |
|-------------|------|
| `lang` attribute on `<html>` | `<html lang="en">` — Next.js App Router sets this via `app/layout.tsx`; don't forget it |
| `prefers-color-scheme` vs manual toggle | The Tweaks panel overrides color mode manually; this is fine, but the default Newsprint mode should pass contrast on its own without user interaction |
| Font loading FOUT | `next/font` with `display: 'swap'` is correct; Playfair Display bold weight causes large layout shift if not sized correctly — set explicit fallback font metrics |
| Ticker pause on hover | Not a hard requirement but significantly improves usability for cognitive accessibility |

---

## Feature Dependencies

```
Color mode switcher → LocalStorage persistence
Color mode switcher → CSS custom properties (--color-bg, --color-fg, --color-accent)
Type scale slider → CSS custom property (--type-scale)
Type scale slider → All font sizes expressed as rem/em relative to root scale

Scroll animations → Framer Motion installed
Scroll animations → reduced-motion check (useReducedMotion hook)
Skills ticker → reduced-motion check (pause/static fallback)

NpImage component → next/image
NpImage component → newspaper filter CSS class
NpImage component → required alt prop

OG image (themed) → next/og ImageResponse
OG image (themed) → Playfair Display font loaded as buffer (not next/font — OG images use Node.js fs)
OG image (themed) → metadataBase set in root layout

Classifieds availability signal → Status badge in masthead (shared availability state or duplicated MDX field)

JSON-LD structured data → root layout.tsx (server component — correct placement)
Sitemap → canonical domain known (NEXT_PUBLIC_SITE_URL env var)
robots.txt → same env var
```

---

## MVP Recommendation

Given this is a portfolio conversion (HTML prototype already exists), MVP is the full site — but with a clear priority order for the feature work:

**Must ship in Phase 1 (blocking visibility):**
1. All 11 sections rendered with real content from MDX
2. Mobile-responsive layout (hamburger nav, single-column stack)
3. OG metadata + themed OG image (sharing before this = broken previews)
4. Classifieds availability signal + status badge in masthead
5. Favicon + sitemap + robots.txt

**Phase 2 (polish that makes it memorable):**
6. Tweaks panel (color modes + type scale + toggles) with localStorage persistence
7. Scroll-triggered entrance animations with reduced-motion gating
8. Skills ticker animation
9. Hover micro-interactions on cards and nav

**Phase 3 (SEO completeness + accessibility audit):**
10. JSON-LD Person + ProfilePage structured data
11. Accessibility audit: contrast all three color modes, heading hierarchy, ARIA landmarks, focus styles, skip nav
12. Image sitemap with gallery URLs
13. Performance: font fallback metrics, image size verification

**Defer indefinitely (out of scope per PROJECT.md):**
- Contact form (no backend)
- CMS admin UI
- Real-time availability webhook
- Video content

---

## Anti-Features

Features to explicitly NOT build on this project.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Contact form | No backend; broken form = worse than no form | mailto link + LinkedIn direct link in Classifieds |
| Loading screen / splash animation | Kills perceived performance; visitors with slow connections see a blank screen, not the site | Let Next.js SSG serve immediately; use Suspense boundaries only where needed |
| Cursor replacement (custom CSS cursor) | Dated aesthetic (peaked 2018-2020); inaccessible; breaks on touch | Use hover state animations on elements instead |
| Parallax text scrolling | Motion sickness trigger; bad on mobile; complex to implement correctly | Scroll-triggered fade/slide entrance covers the "alive" feeling without parallax |
| Dark mode auto-detection tied to OS preference | The Tweaks panel is the intentional UX — fighting between OS preference and panel state causes confusion | Keep panel as the only source of truth; default is Newsprint (cream) regardless of OS |
| Infinite scroll / lazy loaded sections | Single-page layout with 11 sections fits entirely in one load; lazy loading sections breaks anchor navigation | Eager-render all sections; lazy-load only images via `next/image` |
| Third-party analytics scripts that block rendering | Google Analytics / similar loaded synchronously destroy LCP | If analytics wanted later: use Vercel Analytics (zero-bundle) or add `<Script strategy="afterInteractive">` |
| Animated background canvas / particles | CPU/GPU intensive; breaks on low-end devices; fights the newspaper aesthetic | Paper grain CSS texture is the correct analog — static, performant, on-theme |
| CMS integration | Explicitly out of scope; MDX is the editing interface | MDX files in repo |
| Social media feed embeds | Twitter/Instagram embeds load third-party JS, break layout, often go stale | Static content with links to profiles |

---

## Sources

- Next.js `generateMetadata` API reference (nextjs.org, version 16.2.4, dated 2026-04-23) — HIGH confidence
- Next.js `opengraph-image` file convention (nextjs.org, version 16.2.4, dated 2026-04-23) — HIGH confidence
- Next.js `sitemap.xml` file convention (nextjs.org, version 16.2.4, dated 2026-04-23) — HIGH confidence
- WCAG 2.1 AA criteria (W3C specification) — HIGH confidence (stable standard, unchanged)
- Framer Motion `useReducedMotion`, `whileInView`, `animate` — MEDIUM confidence (training knowledge, August 2025; API stable since v7)
- Portfolio best practices (table stakes, differentiators, interaction expectations) — MEDIUM confidence (synthesized from training knowledge of 2023-2025 portfolio ecosystem; WebSearch unavailable for this session)
- Schema.org Person / ProfilePage structured data — HIGH confidence (stable vocabulary)
