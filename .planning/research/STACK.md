# Technology Stack

**Project:** The PR Gazette
**Researched:** 2026-04-26
**Sources:** Next.js official docs v16.2.4 (last updated 2026-04-23), Tailwind CSS v4 upgrade guide, motion.dev docs

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x (latest stable) | Framework, routing, SSG, image optimization | App Router is the current standard; SSG output (`output: 'export'` optional) fits a fully-static portfolio; Vercel-native |
| TypeScript | 5.x | Type safety | Required by project constraints |
| React | 19.x (bundled with Next.js 15) | UI rendering | Peer dependency |

### MDX Content Layer

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@next/mdx` | latest (matches Next.js version) | Compile `.mdx` files as React components | Official Vercel-maintained package; native App Router support; Server Component compatible; no daemon process; no separate build step |
| `@mdx-js/loader` | latest | Webpack MDX loader (required peer) | Required by `@next/mdx` |
| `@mdx-js/react` | latest | MDX React integration (required peer) | Required by `@next/mdx` |
| `@types/mdx` | latest | TypeScript types for MDX imports | Required for `.mdx` import types |
| `remark-gfm` | latest | GitHub Flavored Markdown in MDX | Tables, strikethrough, task lists |
| `remark-frontmatter` | latest | YAML frontmatter parsing | For per-file metadata in content MDX |
| `remark-mdx-frontmatter` | latest | Expose frontmatter as MDX exports | Makes `export const metadata` work from YAML |
| `gray-matter` | 4.x | Parse frontmatter when iterating files with `fs` | For building index lists in Server Components |

**Install:**
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
npm install remark-gfm remark-frontmatter remark-mdx-frontmatter gray-matter
```

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `motion` | 12.x (formerly `framer-motion`) | Scroll-triggered animations, marquee ticker, micro-interactions | Industry standard for React animation; `useInView`, `useScroll`, `useTransform` cover all required use cases |

**Install:**
```bash
npm install motion
```

> Note on package name: Framer Motion became independent and the package was renamed to `motion` starting with v11. The import path changed from `framer-motion` to `motion/react`. Both packages currently coexist on npm but `motion` is the forward-looking canonical package. Use `motion/react` imports throughout.

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x | Utility classes for layout, spacing, responsive design | Next.js official recommendation; v4 ships with native CSS variable theming via `@theme` — perfect for the three color modes |
| `@tailwindcss/postcss` | 4.x | PostCSS integration for Tailwind v4 | Required peer for Tailwind v4 in Next.js |
| CSS Modules (built-in) | — | Newspaper-specific scoped styles (paper grain texture, column rules, drop caps, sepia filter) | Tailwind utilities don't cover decorative print effects; `.module.css` keeps them scoped |
| CSS custom properties (built-in) | — | Color mode switching (newsprint/ink/aged), type scale slider, design tokens | Zero runtime; changed by toggling a `data-theme` attribute on `<html>` |

**Install:**
```bash
npm install -D tailwindcss @tailwindcss/postcss
```

### Fonts

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/font/google` (built-in) | bundled with Next.js | Playfair Display, Source Serif 4, JetBrains Mono | Self-hosted at build time; zero external requests; zero layout shift; no CDN `<link>` tags needed |

### Images

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/image` (built-in) | bundled with Next.js | All images site-wide | Automatic WebP/AVIF conversion, lazy loading, `srcset` generation, LCP optimization |

---

## Decision Rationale for Each Research Question

### 1. `@next/mdx` vs contentlayer vs velite

**Use `@next/mdx`. Do not use contentlayer or velite.**

- **contentlayer** is effectively unmaintained as of 2024. The project stalled, has unresolved App Router compatibility issues, and its repository has seen no significant commits. Do not use it.
- **velite** is an active successor to contentlayer but is still pre-1.0. It adds a separate build pipeline and file-watching daemon that runs outside Next.js. For a portfolio with ~10 MDX files of structured data, this complexity is unjustified.
- **`@next/mdx`** is the official Vercel-maintained package. As of Next.js 16 docs (verified 2026-04-23), it is the documented, recommended approach. It compiles MDX as Server Components by default in App Router, requires no external daemon, and integrates directly into the webpack/Turbopack pipeline. Frontmatter not natively supported but solved trivially with `remark-frontmatter` + `remark-mdx-frontmatter` (or using MDX `export const` syntax, which `@next/mdx` supports natively). For portfolio-scale content (skills list, project cards, book entries, travel entries), `@next/mdx` with direct imports is the correct tool.

**Content file strategy for this project:** Each section's content lives in `/content/<section>/` as `.mdx` files. The Server Component for each section imports them directly via `import Content from '@/content/projects/slug.mdx'` or iterates via `fs.readdir` + `gray-matter` for index-style sections (Lab Report, Books Review, Travel).

### 2. Framer Motion / Motion with App Router

**Use `motion` package (v12), with `'use client'` on all animated components.**

The core constraint: all Motion APIs (`<motion.div>`, `useScroll`, `useInView`, `useTransform`, `useAnimation`) are client-side. They use browser APIs (scroll position, IntersectionObserver, DOM refs). They cannot run in Server Components.

**Correct pattern:**
```tsx
// components/SectionReveal.tsx
'use client'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

export function SectionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

**Architecture rule:** Keep Server Components as data-fetching shells. Pass rendered content as `children` into Client Component wrappers for animation. This preserves RSC benefits (no JS shipped for static content) while enabling motion.

**For the Tech Desk marquee ticker:** Use CSS `animation: marquee linear infinite` instead of Motion. A pure-CSS scrolling marquee has zero JS overhead and is more performant for a continuously looping animation. Motion is overkill here.

**APIs to use:**
- `useInView` — scroll-triggered entrance animations for section content
- `useScroll` + `useTransform` — parallax or opacity effects on the masthead
- `AnimatePresence` — for the tweaks panel open/close transition
- `motion.div` with `whileHover` — hover micro-interactions on cards

### 3. `next/font` for Google Fonts

**Use `next/font/google` with the CSS variable method. Define all three fonts in a single `app/fonts.ts` file.**

Correct approach (verified from official docs, 2026-04-23):

```ts
// app/fonts.ts
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google'

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic'],
})

export const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
  weight: ['300', '400', '600'],
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500'],
})
```

```tsx
// app/layout.tsx
import { playfair, sourceSerif, jetbrainsMono } from './fonts'

export default function RootLayout({ children }) {
  return (
    <html className={`${playfair.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

The CSS variables (`--font-playfair`, `--font-source-serif`, `--font-jetbrains`) are then referenced in `globals.css` and the Tailwind theme. This is the correct approach because:
- Fonts are self-hosted at build time — no Google requests from the browser
- CSS variables allow fonts to be used anywhere without re-importing
- No layout shift (`display: 'swap'` with fallback metrics)
- Load once at root layout, preloaded for all routes

**Do not use** `<link>` tags to Google Fonts CDN. This sends user IP to Google on every page load and misses build-time optimization.

Note: Multi-word font names use underscores in the import: `Playfair_Display`, `Source_Serif_4`, `JetBrains_Mono`.

### 4. CSS Variables + Tailwind vs Plain CSS for Theming

**Use CSS variables for theming, with Tailwind v4 for layout utilities and CSS Modules for decorative print styles.**

Tailwind v4 is production-ready and is what Next.js 15 scaffolds by default. Its `@theme` directive makes it the right choice here:

```css
/* app/globals.css */
@import "tailwindcss";

/* Base design tokens */
@theme {
  --font-headline: var(--font-playfair);
  --font-body: var(--font-source-serif);
  --font-mono: var(--font-jetbrains);
}

/* Newsprint theme (default) */
:root {
  --color-bg: #F4EFE6;
  --color-ink: #0E0E0C;
  --color-accent: #C1272D;
  --color-sepia: #B8A792;
}

/* Ink / dark theme */
[data-theme="ink"] {
  --color-bg: #0E0E0C;
  --color-ink: #F4EFE6;
  --color-accent: #C1272D;
  --color-sepia: #B8A792;
}

/* Aged theme */
[data-theme="aged"] {
  --color-bg: #E8DCC8;
  --color-ink: #2a1f0e;
  --color-accent: #8B2020;
  --color-sepia: #8B7355;
}
```

Theme switching is done in a `'use client'` `ThemeProvider` that reads/writes `localStorage` and sets `document.documentElement.dataset.theme`. No third-party theming library needed.

**Plain CSS Modules for:** paper grain texture overlay, column rules (`border-right: 1px solid var(--color-ink)`), drop caps (`:first-letter` pseudo-element), sepia filter on `NpImage`, newspaper section flags, masthead rule lines. These are too specific and decorative for utility classes.

**Do not use** styled-components, Emotion, or any CSS-in-JS library. They add runtime overhead, complicate the Server Component boundary, and are anti-recommended by Next.js docs.

### 5. `next/image` with GitHub CDN URLs

**Configure `remotePatterns` for both GitHub CDN hostnames. Use `unoptimized={false}` (default).**

GitHub CDN images for user uploads (e.g. gallery photos in Issues or the raw CDN) come from these hostnames:
- `raw.githubusercontent.com` — raw file content
- `user-images.githubusercontent.com` — images uploaded to GitHub Issues/PRs
- `camo.githubusercontent.com` — GitHub's image proxy

```js
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/JuniorRaja/**',
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'camo.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
}
```

Important nuance from official docs (verified 2026-04-23): When `pathname` is omitted, `**` is implied but this "is not recommended because it may allow malicious actors to optimize urls you did not intend." Always specify `pathname`. For `raw.githubusercontent.com`, scoping to the account (`/JuniorRaja/**`) is the correct security posture.

**`NpImage` component** wraps `next/image` and applies the newspaper filter via `style` prop:
```tsx
// components/NpImage.tsx — Server Component safe (no event handlers)
import Image, { ImageProps } from 'next/image'

const NEWSPAPER_FILTER =
  'grayscale(100%) sepia(20%) contrast(1.1) brightness(0.95)'

export function NpImage(props: ImageProps) {
  return (
    <Image
      {...props}
      style={{ ...props.style, filter: NEWSPAPER_FILTER }}
    />
  )
}
```

Note: `next/image` `priority` prop is deprecated in Next.js 16 — use `preload={true}` on the masthead/hero image instead.

### 6. Single Page vs Route-Per-Section

**Use `app/page.tsx` as a single page. This is the correct architecture.**

The newspaper metaphor requires a continuous scroll through one long document — exactly what a single `app/page.tsx` delivers. Route-per-section would mean:
- Each section becomes a separate URL (`/about`, `/projects`, etc.)
- Navigation triggers full page transitions instead of smooth scrolling
- The newspaper metaphor breaks — it becomes a regular multi-page site
- Anchor-based in-page navigation (`href="#section-id"`) is more complex across routes

**Single-page architecture:**
```
app/
  layout.tsx          — root layout: fonts, ThemeProvider, metadata
  page.tsx            — single page, renders all 11 section components
  globals.css         — design tokens, color modes, base styles
content/
  skills/             — skills.mdx
  projects/           — *.mdx (one per project)
  books/              — *.mdx (one per book)
  travel/             — *.mdx (one per destination)
components/
  sections/           — Masthead.tsx, OpEd.tsx, TechDesk.tsx, etc.
  ui/                 — NpImage.tsx, SectionReveal.tsx, Ticker.tsx
  providers/          — ThemeProvider.tsx ('use client')
```

`app/page.tsx` is a Server Component that imports all section components. Sections that need animations are wrapped in `'use client'` components internally. The page itself stays server-rendered for optimal SSG output and metadata generation.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| MDX | `@next/mdx` | contentlayer | Unmaintained, App Router compatibility broken |
| MDX | `@next/mdx` | velite | Pre-1.0, adds separate daemon process, over-engineered for ~10 MDX files |
| MDX | `@next/mdx` | `next-mdx-remote` | Adds complexity for remote MDX loading; not needed for local files |
| Animation | `motion` (v12) | `@react-spring/web` | Motion has better scroll animation DX; `useInView` and `useScroll` cover all needs |
| Animation | `motion` (v12) | CSS-only transitions | Not sufficient for scroll-triggered orchestrated entrance animations |
| Styling | Tailwind v4 + CSS vars | styled-components | CSS-in-JS adds runtime cost, complicates RSC boundaries, anti-recommended by Next.js |
| Styling | Tailwind v4 + CSS vars | Tailwind v3 | v4 is production-ready, ships with Next.js 15 scaffold, native CSS var theming |
| Fonts | `next/font/google` | `<link>` to Google CDN | CDN link sends user IPs to Google, no build-time optimization, layout shift risk |
| Ticker | CSS animation | `motion` marquee | Pure CSS is more performant for a continuous loop; no JS overhead |
| Color modes | CSS custom properties + `data-theme` | `next-themes` | `next-themes` adds a dependency for behavior achievable in ~30 lines of plain code |

---

## Installation Summary

```bash
# Core
npm install next@latest react@latest react-dom@latest typescript@latest

# MDX
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
npm install remark-gfm remark-frontmatter remark-mdx-frontmatter gray-matter

# Animation
npm install motion

# Dev / styling
npm install -D tailwindcss @tailwindcss/postcss
```

No additional packages are needed for:
- Fonts (`next/font/google` is built-in)
- Images (`next/image` is built-in)
- Color mode switching (plain CSS custom properties + `localStorage`)
- Routing (App Router is built-in)

---

## Key Configuration Files

### `next.config.mjs`
```js
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/JuniorRaja/**',
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
  },
})

export default withMDX(nextConfig)
```

### `postcss.config.mjs`
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### `mdx-components.tsx` (required for App Router)
```tsx
import type { MDXComponents } from 'mdx/types'
import { NpImage, type NpImageProps } from '@/components/ui/NpImage'

export function useMDXComponents(): MDXComponents {
  return {
    img: (props) => <NpImage {...(props as NpImageProps)} />,
  }
}
```

---

## Confidence Assessment

| Decision | Confidence | Source |
|----------|------------|--------|
| `@next/mdx` as MDX solution | HIGH | Official Next.js docs v16.2.4, 2026-04-23 |
| contentlayer deprecation | HIGH | Known community fact; Next.js docs do not mention it |
| `motion` for animations | HIGH | motion.dev official package; training knowledge confirmed by known rebranding |
| `motion/react` import path | HIGH | Documented rebranding from framer-motion to motion |
| `next/font/google` approach | HIGH | Official Next.js docs v16.2.4, 2026-04-23 |
| Tailwind v4 production-ready | HIGH | Official Tailwind upgrade guide |
| `remotePatterns` config syntax | HIGH | Official Next.js docs v16.2.4, 2026-04-23 |
| `priority` prop deprecated | HIGH | Stated explicitly in official docs: "deprecated in Next.js 16, use `preload`" |
| Single `app/page.tsx` architecture | HIGH | Correct for single-page scrolling portfolio; no routing benefit from splitting |
| velite pre-1.0 status | MEDIUM | Known from training data; direct verification blocked by tool restrictions |
| GitHub CDN hostname list | MEDIUM | `raw.githubusercontent.com` and `user-images.githubusercontent.com` are well-known; `camo.githubusercontent.com` may also be needed depending on how photos are hosted |

---

## Sources

- Next.js official docs, v16.2.4, last updated 2026-04-23: https://nextjs.org/docs/app/guides/mdx
- Next.js Font docs, v16.2.4, last updated 2026-04-23: https://nextjs.org/docs/app/api-reference/components/font
- Next.js Image docs, v16.2.4, last updated 2026-04-23: https://nextjs.org/docs/app/api-reference/components/image
- Next.js CSS docs, v16.2.4, last updated 2026-04-23: https://nextjs.org/docs/app/getting-started/css
- Tailwind CSS v4 upgrade guide: https://tailwindcss.com/docs/upgrade-guide
- Motion (formerly Framer Motion): https://motion.dev
