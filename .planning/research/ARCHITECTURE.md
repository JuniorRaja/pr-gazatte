# Architecture Patterns — The PR Gazette

**Domain:** Next.js 14 App Router single-page portfolio with MDX content
**Researched:** 2026-04-26
**Overall confidence:** HIGH — based on current official Next.js docs (version 16.2.4, last updated 2026-04-23)

---

## Recommended Architecture

A single-route App Router site (`app/page.tsx`) that statically renders all 11 sections on the server, with isolated Client Component islands for interactive features. Theme state lives in a single Client Component context provider wrapping the page body. MDX files live in a top-level `content/` directory and are imported directly as React components into their owning section components.

```
THE PR GAZETTE — Component Architecture

┌─────────────────────────────────────────────────┐
│  app/layout.tsx  (Server Component)             │
│  · <html> + <body>                              │
│  · next/font Google Font variables              │
│  · metadata export (title, OG, description)    │
│  · imports ThemeProvider                        │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │  ThemeProvider  (Client Component)       │   │
│  │  · reads localStorage on mount          │   │
│  │  · sets data-theme on <html> via ref    │   │
│  │  · exposes useTheme() context hook      │   │
│  │  · persists to localStorage             │   │
│  │                                          │   │
│  │  ┌────────────────────────────────────┐  │   │
│  │  │  app/page.tsx  (Server Component)  │  │   │
│  │  │  · assembles 11 section components │  │   │
│  │  │  · no data fetching needed here    │  │   │
│  │  │  · sections are async RSC imports  │  │   │
│  │  └────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## File / Folder Structure

```
pr-gazette/
├── app/
│   ├── layout.tsx              # Root layout: html+body, fonts, metadata, ThemeProvider
│   ├── page.tsx                # Single route: assembles all 11 sections
│   ├── globals.css             # CSS custom properties, reset, typography, animations
│   ├── favicon.ico
│   └── opengraph-image.png     # Static OG image (or opengraph-image.tsx to generate)
│
├── components/
│   ├── sections/               # One file per section — these are the 11 broadsheet pages
│   │   ├── Masthead.tsx        # Server Component (static content)
│   │   ├── OpEd.tsx            # Server Component
│   │   ├── TechDesk.tsx        # Server Component (imports skills MDX)
│   │   ├── BusinessPages.tsx   # Server Component (imports career MDX)
│   │   ├── LabReport.tsx       # Server Component (imports projects MDX)
│   │   ├── PhotoDesk.tsx       # Server Component (imports photo data MDX)
│   │   ├── BooksReview.tsx     # Server Component (imports books MDX)
│   │   ├── Travel.tsx          # Server Component (imports travel MDX)
│   │   ├── OffDuty.tsx         # Server Component (imports hobbies MDX)
│   │   ├── Classifieds.tsx     # Server Component
│   │   └── Footer.tsx          # Server Component
│   │
│   ├── ui/                     # Shared presentational atoms
│   │   ├── NpImage.tsx         # Wraps next/image with newspaper filter — Server Component
│   │   ├── SectionFlag.tsx     # Section header strip — Server Component
│   │   ├── SectionFiller.tsx   # Watermark/colophon filler — Server Component
│   │   ├── ColumnRule.tsx      # Renders or suppresses column borders — Server Component
│   │   └── DropCap.tsx         # Drop-cap paragraph — Server Component
│   │
│   ├── interactive/            # Client Component islands (all need 'use client')
│   │   ├── SkillsTicker.tsx    # Scrolling marquee animation
│   │   ├── TweaksPanel.tsx     # Panel: color mode, type scale, grain, rules
│   │   ├── MobileNav.tsx       # Hamburger menu overlay with useState
│   │   ├── AnimatedSection.tsx # Framer Motion scroll-trigger wrapper
│   │   └── ThemeProvider.tsx   # Context provider for theme state
│   │
│   └── mdx/                    # Custom MDX component overrides
│       └── mdx-components.tsx  # Passed to useMDXComponents() — maps h1, img, etc.
│
├── content/                    # MDX content files — NOT inside app/, imported directly
│   ├── skills.mdx              # Tech stack with proficiency levels for TechDesk
│   ├── career.mdx              # Work history entries for BusinessPages
│   ├── projects.mdx            # Lab/side-project entries for LabReport
│   ├── photos.mdx              # Gallery image URLs + captions for PhotoDesk
│   ├── books.mdx               # Reading list for BooksReview
│   ├── travel.mdx              # Destination entries for Travel
│   └── hobbies.mdx             # Off-duty interests for OffDuty
│
├── lib/
│   └── theme.ts                # Theme token maps (colorModes object), TypeScript types
│
├── public/
│   └── images/                 # Local static images only (grain texture SVG, etc.)
│
├── mdx-components.tsx          # REQUIRED by @next/mdx App Router — at project root
├── next.config.mjs             # withMDX wrapper, pageExtensions
└── tsconfig.json
```

**Why this structure:**
- `app/` contains only routing files. Non-route code is outside it (Next.js recommends this pattern for clean separation).
- `content/` at root keeps MDX files discoverable and separate from both routing and component code. They are imported as React components directly — no filesystem-traversal at build time needed.
- `components/` splits by function: `sections/` (the 11 pages), `ui/` (atoms), `interactive/` (client islands), `mdx/` (MDX overrides).
- `mdx-components.tsx` at project root is **required** by `@next/mdx` for App Router — it will not compile without it.

---

## MDX Content Strategy

### Approach: Direct Import (not filesystem query)

Since the 11 sections are fixed and known at build time, import MDX files directly rather than using `fs.readdir()` with dynamic slugs. This is simpler, type-safe at import time, and works with `output: 'export'`.

```typescript
// components/sections/TechDesk.tsx  (Server Component)
import SkillsContent from '@/content/skills.mdx'

export default function TechDesk() {
  return (
    <section id="tech">
      <SectionFlag title="Tech Desk" edition="Skills Report" />
      <SkillsContent />   {/* renders the MDX as JSX on the server */}
    </section>
  )
}
```

### MDX File Format

Use named exports for structured data alongside prose. `@next/mdx` supports exports natively — no `remark-frontmatter` plugin required.

```mdx
{/* content/books.mdx */}
export const books = [
  { title: "The Innovator's Dilemma", author: "Clayton Christensen", year: 2024 },
  { title: "Staff Engineer", author: "Will Larson", year: 2023 },
]

export const currentlyReading = "An Elegant Puzzle"

## This Season's Reads

A curated dispatch from the editorial shelf...
```

Consuming component:

```typescript
import BooksContent, { books, currentlyReading } from '@/content/books.mdx'

export default function BooksReview() {
  return (
    <>
      <BooksContent />
      {books.map(book => <BookCard key={book.title} {...book} />)}
    </>
  )
}
```

### next.config.mjs Setup

```javascript
import createMDX from '@next/mdx'

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: '*.githubusercontent.com' },
    ],
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
```

---

## Component Boundaries: Server vs Client

The critical rule: a component becomes Client only when it needs `useState`, `useEffect`, browser APIs (`localStorage`, `window`), or event handlers. Everything else stays Server.

| Component | Type | Reason |
|-----------|------|--------|
| `app/layout.tsx` | Server | Sets html/body, exports metadata, loads fonts |
| `app/page.tsx` | Server | Assembles sections, no interactivity |
| `Masthead.tsx` | Server | Static markup, MDX content |
| `OpEd.tsx` | Server | Static prose |
| `TechDesk.tsx` | Server | MDX import, static |
| `BusinessPages.tsx` | Server | MDX import, static |
| `LabReport.tsx` | Server | MDX import, static |
| `PhotoDesk.tsx` | Server | MDX import + NpImage |
| `BooksReview.tsx` | Server | MDX import, static |
| `Travel.tsx` | Server | MDX import, static |
| `OffDuty.tsx` | Server | MDX import, static |
| `Classifieds.tsx` | Server | Static markup |
| `Footer.tsx` | Server | Static markup |
| `NpImage.tsx` | Server | Wraps `next/image`, no interactivity |
| `SectionFlag.tsx` | Server | Pure display |
| `SectionFiller.tsx` | Server | Pure display |
| `DropCap.tsx` | Server | Pure display |
| `ColumnRule.tsx` | Server | Conditional display based on prop only |
| **`ThemeProvider.tsx`** | **Client** | `useState`, `useEffect`, `localStorage`, Context |
| **`TweaksPanel.tsx`** | **Client** | `useState`, panel open/close, change handlers |
| **`MobileNav.tsx`** | **Client** | `useState` for open/close |
| **`SkillsTicker.tsx`** | **Client** | CSS animation + hover pause via `useRef` or class toggle |
| **`AnimatedSection.tsx`** | **Client** | Framer Motion `useInView` / `motion.div` |

**Total Client Components: 5** — all others are Server Components. This keeps the client bundle small.

### The "Push Client Down" Pattern

Section components stay Server. They import and render `AnimatedSection` as a wrapper around their content. Because `AnimatedSection` is a Client Component that accepts `children`, the children (section content) can still be Server-rendered RSC and passed as a prop slot.

```typescript
// components/sections/OpEd.tsx  (Server Component)
import AnimatedSection from '@/components/interactive/AnimatedSection'

export default function OpEd() {
  return (
    <AnimatedSection id="op-ed">
      {/* All this static content is server-rendered RSC */}
      <SectionFlag title="Op-Ed" />
      <OpEdContent />
    </AnimatedSection>
  )
}
```

```typescript
// components/interactive/AnimatedSection.tsx  ('use client')
'use client'
import { motion } from 'framer-motion'

export default function AnimatedSection({ id, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}
```

This is the official Next.js pattern for "interleaving Server and Client Components" — pass server content as `children` into a client wrapper.

---

## CSS Variable Theming

### Strategy: data-theme attribute on html + CSS custom properties

This is the correct pattern for multi-theme support in App Router. The `ThemeProvider` client component sets a `data-theme` attribute on `document.documentElement` (the `<html>` element). All theme colors are CSS variables scoped to `[data-theme]` selectors in `globals.css`.

```css
/* app/globals.css */

/* Default theme (Newsprint) — applies to :root and data-theme="newsprint" */
:root,
[data-theme="newsprint"] {
  --bg:     #F4EFE6;
  --fg:     #0E0E0C;
  --accent: #C1272D;
  --sepia:  #B8A792;
  --flag-bg:  #0E0E0C;
  --flag-fg:  #F4EFE6;
}

[data-theme="ink"] {
  --bg:     #0E0E0C;
  --fg:     #F4EFE6;
  --accent: #C1272D;
  --sepia:  #8a7c6e;
  --flag-bg:  #1a1a18;
  --flag-fg:  #F4EFE6;
}

[data-theme="aged"] {
  --bg:     #E8DCC8;
  --fg:     #2a1f0e;
  --accent: #8B2020;
  --sepia:  #9c8060;
  --flag-bg:  #2a1f0e;
  --flag-fg:  #E8DCC8;
}

body {
  background-color: var(--bg);
  color: var(--fg);
}
```

```typescript
// components/interactive/ThemeProvider.tsx
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

type ColorMode = 'newsprint' | 'ink' | 'aged'

interface TweakState {
  colorMode: ColorMode
  typeScale: number      // 90 | 95 | 100 | 105 | 110 | 115
  showRules: boolean
  showGrain: boolean
}

const DEFAULTS: TweakState = {
  colorMode: 'newsprint',
  typeScale: 100,
  showRules: true,
  showGrain: true,
}

const ThemeContext = createContext<{
  tweaks: TweakState
  setTweaks: (t: Partial<TweakState>) => void
}>({ tweaks: DEFAULTS, setTweaks: () => {} })

export function useTheme() { return useContext(ThemeContext) }

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [tweaks, _setTweaks] = useState<TweakState>(() => {
    // Safe localStorage read — only runs on client
    try {
      const saved = JSON.parse(localStorage.getItem('prg-tweaks') || '{}')
      return { ...DEFAULTS, ...saved }
    } catch { return DEFAULTS }
  })

  const setTweaks = (patch: Partial<TweakState>) =>
    _setTweaks(prev => ({ ...prev, ...patch }))

  useEffect(() => {
    localStorage.setItem('prg-tweaks', JSON.stringify(tweaks))
    // Apply theme via data attribute — CSS variables do the rest
    document.documentElement.setAttribute('data-theme', tweaks.colorMode)
    // Type scale on :root font-size
    document.documentElement.style.setProperty('--type-scale', `${tweaks.typeScale}%`)
    document.documentElement.style.fontSize = `${tweaks.typeScale}%`
    // Grain opacity
    document.documentElement.style.setProperty('--grain-opacity', tweaks.showGrain ? '0.035' : '0')
  }, [tweaks])

  return (
    <ThemeContext.Provider value={{ tweaks, setTweaks }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

```typescript
// app/layout.tsx  (Server Component)
import ThemeProvider from '@/components/interactive/ThemeProvider'
import { playfair, sourceSerif, jetbrainsMono } from '@/lib/fonts'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="newsprint">  {/* default theme for SSR/static render */}
      <body className={`${playfair.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**Why this approach:**
- `data-theme="newsprint"` in the server-rendered HTML means the page always renders with the correct default theme on first paint — no flash of unstyled content.
- Subsequent `useEffect` in `ThemeProvider` overwrites the attribute with the user's persisted preference immediately after hydration. The window is tiny (one frame) and acceptable for a portfolio.
- All components reference only CSS variables (`var(--bg)`, `var(--fg)`, etc.) — no theme state is prop-drilled. Server Components use variables without needing any context access.
- `ColumnRule` toggling works the same way: add `data-rules="off"` to `<html>` when disabled, CSS handles `[data-rules="off"] .column-rule { display: none }`.

### Why Not React Context for Server Components

React context cannot be read in Server Components — only in Client Components. The CSS variable approach means Server Components never need to know about the active theme: they just render `var(--bg)` and the browser resolves it at paint time from the `data-theme` attribute.

---

## Build Output: Standard Vercel (Not `output: 'export'`)

**Recommendation: do NOT use `output: 'export'`.**

Use standard Next.js deployment to Vercel (the default, no `output` key needed).

| Factor | `output: 'export'` | Standard Vercel |
|--------|-------------------|-----------------|
| `next/image` optimization | Requires a custom loader — default optimizer is **unsupported** | Full `next/image` optimization works out of the box |
| Vercel deployment | Works but loses Image Optimization CDN | Full Vercel platform features |
| Build complexity | Extra config for image loader | Zero extra config |
| Server Components | Renders at build time only | Renders at build time (SSG) by default for this site |
| Future flexibility | Hard to add any dynamic routes later | Easy to add |
| Image CDN | Manual custom loader needed | Automatic via Vercel Image Optimization |

Since there is no backend, no API routes, and no dynamic content, Next.js will automatically statically generate (SSG) all pages at build time without needing `output: 'export'`. The result is a static site with full `next/image` support, deployed to Vercel's edge CDN.

The prototype has GitHub CDN images. `next/image` with standard Vercel deployment handles remote image optimization automatically once `remotePatterns` is configured in `next.config.mjs`.

---

## Data Flow

```
Content Layer (build time)              Component Layer             Client Layer
─────────────────────────              ─────────────────           ────────────
content/skills.mdx     ──import──►  TechDesk.tsx (RSC)
content/career.mdx     ──import──►  BusinessPages.tsx (RSC)
content/projects.mdx   ──import──►  LabReport.tsx (RSC)
content/photos.mdx     ──import──►  PhotoDesk.tsx (RSC)
content/books.mdx      ──import──►  BooksReview.tsx (RSC)        useTheme() hook
content/travel.mdx     ──import──►  Travel.tsx (RSC)                    │
content/hobbies.mdx    ──import──►  OffDuty.tsx (RSC)                   ▼
                                                               ThemeProvider (Client)
                                    page.tsx (RSC)                     │
                                        ├── Masthead ◄──── reads CSS vars
                                        ├── OpEd                       │
                                        ├── TechDesk                   │
                                        ├── ... (8 more sections)      │
                                        └── Footer                     │
                                                                        │
                                    Interactive Islands:                │
                                    SkillsTicker (Client) ─── CSS animation
                                    TweaksPanel (Client) ──── setTweaks()
                                    MobileNav (Client) ──── useState open
                                    AnimatedSection (Client) ─ Framer Motion
```

**Theme state does not flow down through props.** Server Components read CSS variables; Client Components call `useTheme()` when they need to react to theme changes (e.g. `TweaksPanel` to show current selection).

**No global state library needed.** A single React Context in `ThemeProvider` is sufficient. Zustand/Redux would be over-engineering for 5 values.

---

## Suggested Build Order

Build in this sequence to avoid dependency blocks:

**Phase 1 — Foundation (unblocks everything)**
1. `next.config.mjs` — MDX config, image domains, pageExtensions
2. `mdx-components.tsx` — required for @next/mdx; can be empty initially
3. `app/layout.tsx` — html/body shell, font variables, ThemeProvider import slot
4. `app/globals.css` — CSS custom properties for all three themes, typography reset, ticker animation keyframes, grain overlay
5. `lib/fonts.ts` — next/font definitions for Playfair Display, Source Serif 4, JetBrains Mono
6. `lib/theme.ts` — TypeScript types for TweakState, colorMode enum

**Phase 2 — Shared UI atoms (no content dependency)**
7. `NpImage.tsx` — next/image wrapper with newspaper filter CSS class
8. `SectionFlag.tsx` — section header bar
9. `SectionFiller.tsx` — watermark + colophon strip
10. `DropCap.tsx` — drop-cap paragraph component

**Phase 3 — Client islands**
11. `ThemeProvider.tsx` — localStorage read, data-theme setter, context
12. `TweaksPanel.tsx` — color mode, type scale, toggles
13. `MobileNav.tsx` — hamburger overlay
14. `AnimatedSection.tsx` — Framer Motion scroll wrapper
15. `SkillsTicker.tsx` — marquee animation

**Phase 4 — Content files (can be stubbed initially)**
16. All 7 `content/*.mdx` files — start with minimal data, expand later

**Phase 5 — Sections (one per sprint, any order)**
17. `Masthead.tsx` — most complex, builds the broadsheet header + nav
18. `TechDesk.tsx` — uses skills.mdx + SkillsTicker
19. `BusinessPages.tsx` — uses career.mdx
20. `LabReport.tsx` — uses projects.mdx
21. `PhotoDesk.tsx` — uses photos.mdx + NpImage gallery grid
22. `BooksReview.tsx` — uses books.mdx
23. `Travel.tsx` — uses travel.mdx, placeholder slots
24. `OffDuty.tsx` — uses hobbies.mdx
25. `OpEd.tsx` — prose-heavy, minimal MDX dependency
26. `Classifieds.tsx` — mostly static markup
27. `Footer.tsx` — static links

**Phase 6 — Assembly + polish**
28. `app/page.tsx` — compose all sections
29. SEO metadata in `app/layout.tsx`
30. `opengraph-image.tsx` or static PNG
31. Mobile responsive pass (media queries in globals.css)
32. Animation polish on all AnimatedSection wrappers

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Making Section Components Client Components
**What:** Adding `'use client'` to `TechDesk`, `BooksReview`, etc. to access theme context.
**Why bad:** Pulls the entire section — including MDX content — into the client bundle. Eliminates RSC benefits. Can double bundle size.
**Instead:** Section components read CSS variables (which require no context). Only `TweaksPanel` and `SkillsTicker` need `useTheme()`.

### Anti-Pattern 2: Prop-drilling tweaks through all 11 sections
**What:** The prototype passes `tweaks` as a prop to every component.
**Why bad:** Creates unnecessary re-renders across the entire tree when any tweak changes. All 11 sections re-render on type scale change.
**Instead:** CSS variables + `data-theme` on `<html>` means Server Components never re-render. Only the 5 client islands subscribe to theme context when needed.

### Anti-Pattern 3: Storing MDX in app/ directory
**What:** Placing `content/*.mdx` files inside `app/content/` and treating them as routes.
**Why bad:** `@next/mdx` can make `.mdx` files in `app/` into public routes if `pageExtensions` includes `mdx`. Content files would be directly accessible as URLs.
**Instead:** Keep `content/` at project root. Import them as modules, not pages.

### Anti-Pattern 4: Using `output: 'export'` to get "static" behavior
**What:** Adding `output: 'export'` because the site has no dynamic routes.
**Why bad:** Breaks the default `next/image` optimizer. Requires a custom image loader to restore CDN optimization for GitHub CDN photos.
**Instead:** Standard Vercel deployment already SSGs all pages at build time. No configuration needed.

### Anti-Pattern 5: Inline styles for all theming (prototype pattern)
**What:** Using `document.body.style.setProperty()` to set every color on every element.
**Why bad:** Cannot be serialized to HTML for SSR — causes flash of default styles on load. Hard to maintain across 11 sections.
**Instead:** CSS variables on `[data-theme]` applied to `<html>`. The server renders the default theme correctly; hydration applies the persisted preference in one attribute change.

### Anti-Pattern 6: Framer Motion on Server Components
**What:** Importing `motion` from `framer-motion` in a Server Component.
**Why bad:** Framer Motion requires browser APIs and `useState`. It will throw at build time in a Server Component.
**Instead:** Wrap sections with `AnimatedSection` (Client Component). Server content passes through as `children` — the RSC payload pattern.

---

## Scalability Considerations

| Concern | This site | If it grows |
|---------|-----------|-------------|
| Content editing | Edit MDX files directly, redeploy | Add Contentlayer or Velite for type-safe MDX schemas |
| More sections | Add section component + content file + entry in page.tsx | No architecture change needed |
| More images | Add GitHub CDN hostnames to remotePatterns | No architecture change needed |
| Blog / writing | Add `app/writing/[slug]/page.tsx` | Already compatible, no migration |
| Theme flicker | Acceptable for portfolio | Suppress with inline script in `<head>` to set data-theme before paint |

---

## Sources

- Next.js App Router Project Structure (official docs, v16.2.4, 2026-04-23): https://nextjs.org/docs/app/getting-started/project-structure
- Next.js MDX configuration (official docs, v16.2.4, 2026-04-23): https://nextjs.org/docs/app/guides/mdx
- Next.js Server and Client Components (official docs, v16.2.4, 2026-04-23): https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js Static Exports (official docs, v16.2.4, 2026-04-23): https://nextjs.org/docs/app/guides/static-exports
- Next.js Root Layout file convention (official docs, v16.2.4, 2026-04-23): https://nextjs.org/docs/app/api-reference/file-conventions/layout
- The PR Gazette prototype: E:/My Works/pr-gazette/FrontPage.html (reviewed for theming and tweaks patterns)
