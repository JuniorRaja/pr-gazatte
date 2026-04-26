# Domain Pitfalls — The PR Gazette

**Project:** The PR Gazette (Next.js 14 App Router + TypeScript + MDX + Framer Motion)
**Researched:** 2026-04-26
**Source confidence:** HIGH — all findings verified against official Next.js docs (v16.2.4, last updated 2026-04-23) and official Framer Motion documentation where accessible. Framer Motion RSC findings from official Next.js third-party component guidance + known API constraints.

---

## Critical Pitfalls

Mistakes that cause build failures, hydration crashes, or rewrites.

---

### Pitfall 1: Framer Motion components used directly in Server Components

**What goes wrong:** Any Framer Motion component (`motion.div`, `AnimatePresence`, `useScroll`, `useMotionValue`, etc.) uses browser APIs and React state internally. If you import and render them in a Server Component (any file in `app/` that does NOT have `'use client'` at the top), Next.js throws a build error or a runtime hydration crash because the component tries to access `window` or call hooks on the server.

**Why it happens:** Next.js App Router defaults every file in `app/` to a Server Component. Framer Motion's package does not ship `'use client'` directives in all its exports, so it cannot be tree-shaken cleanly on the server. The prototype was CDN React (no SSR), so every component was implicitly a client component — that contract no longer holds.

**Consequences:**
- Build error: `You're importing a component that needs X. It only works in a Client Component but none of its parents are marked with "use client".`
- Silent hydration mismatch: server renders static HTML, client re-renders with animation state, React throws `Hydration failed because the initial UI does not match what was rendered on the server`.
- `window is not defined` crashes during SSR if motion values are initialised at module level.

**Prevention:**
1. Create a thin wrapper file for every animated component and put `'use client'` at the top. Do not add the directive to the Server Component parent — it pollutes the boundary.
2. Good pattern: `components/animated/SectionReveal.tsx` with `'use client'` imports `motion` and exports the wrapper. The Server Component page imports `SectionReveal` and passes static content as `children`.
3. The "children as slot" pattern keeps Server Components as parents:
   ```tsx
   // components/animated/SectionReveal.tsx
   'use client'
   import { motion } from 'framer-motion'
   export function SectionReveal({ children }: { children: React.ReactNode }) {
     return (
       <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
         {children}
       </motion.div>
     )
   }
   ```
   ```tsx
   // app/page.tsx  (Server Component — no 'use client')
   import { SectionReveal } from '@/components/animated/SectionReveal'
   export default function Page() {
     return <SectionReveal><HeavyStaticContent /></SectionReveal>
   }
   ```
4. Keep animation wrappers as small and leaf-level as possible to minimise the client bundle they pull in.

**Warning signs:**
- Build output contains `Error: Event handlers cannot be passed to Client Component props`
- Console shows `Hydration failed` on first load
- `ReferenceError: window is not defined` in server logs

**Phase:** Phase 1 (project scaffold) — establish the boundary pattern before porting any section. Fix the architecture upfront, not per component.

---

### Pitfall 2: MDX `mdx-components.tsx` file missing

**What goes wrong:** `@next/mdx` with App Router silently fails or throws a confusing build error if the `mdx-components.tsx` (or `.js`) file is absent from the project root. The error message does not always point directly at the missing file.

**Why it happens:** In App Router, `mdx-components.tsx` is a required file convention — it is not optional like it is in the Pages Router. Next.js looks for it at the root (same level as `app/` and `package.json`). The file must export a `useMDXComponents` function.

**Consequences:**
- `next build` fails with a cryptic error.
- MDX files render without any custom component mappings — raw `<img>` tags bypass `next/image`, headings have no Playfair Display styling, etc.

**Prevention:**
1. Create `mdx-components.tsx` at the project root immediately when setting up MDX. Minimum viable file:
   ```tsx
   import type { MDXComponents } from 'mdx/types'
   import Image, { ImageProps } from 'next/image'

   export function useMDXComponents(components: MDXComponents): MDXComponents {
     return {
       img: (props) => (
         <Image
           sizes="100vw"
           style={{ width: '100%', height: 'auto' }}
           {...(props as ImageProps)}
         />
       ),
       ...components,
     }
   }
   ```
2. Map `img` to `NpImage` (the newspaper-filter wrapper) here — this ensures every image in every MDX file automatically gets the sepia treatment without per-file work.
3. Map headings to Playfair Display-styled equivalents here.

**Warning signs:**
- Build error mentioning `mdx-components` or `useMDXComponents`
- Images in MDX rendering as raw `<img>` tags (visible in DevTools)
- No custom styles applied to MDX-rendered headings

**Phase:** Phase 1 (scaffold) — create alongside `next.config.mjs` setup.

---

### Pitfall 3: Frontmatter in MDX files requires an explicit plugin — `@next/mdx` does not parse it by default

**What goes wrong:** Writing YAML frontmatter (`---` blocks) in `.mdx` files and trying to read `metadata.title` etc. produces `undefined`. The frontmatter is either silently ignored or rendered as literal text in the output.

**Why it happens:** `@next/mdx` has no built-in frontmatter support. The official docs explicitly state: "`@next/mdx` does not support frontmatter by default."

**Consequences:**
- Section titles, dates, and metadata embedded in MDX frontmatter are not available to components.
- Frontmatter `---` block may render as visible text on the page.

**Prevention:**
Two patterns, pick one and stick to it:

**Option A — Export named constants from MDX (recommended for this project):**
```mdx
export const meta = { title: 'Lab Report', date: '2024-01' }
# Lab Report
...content...
```
Then in the page: `import LabReport, { meta } from '@/content/lab.mdx'`

**Option B — Add `remark-frontmatter` + `remark-mdx-frontmatter` plugins:**
```js
// next.config.mjs
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  },
})
```
Note: remark/rehype plugins are ESM-only, so `next.config.mjs` (not `.js`) is required.

**Warning signs:**
- `---` text visible in the rendered page
- `meta` or `frontmatter` imports returning `undefined`

**Phase:** Phase 2 (MDX content pipeline) — decide on Option A or B before writing any content files. Retrofitting is tedious.

---

### Pitfall 4: `next/image` with GitHub CDN URLs — `remotePatterns` misconfiguration causes 400 errors

**What goes wrong:** Using `<Image src="https://raw.githubusercontent.com/...">` or `<Image src="https://user-images.githubusercontent.com/...">` without adding the correct `remotePatterns` entry in `next.config.js` causes a `400 Bad Request` from the image optimisation API at runtime.

**Why it happens:** Next.js blocks all external image URLs by default for security. The `remotePatterns` array in `next.config.js` must explicitly allow each hostname. GitHub CDN images come from multiple distinct hostnames depending on how they are served.

**GitHub CDN hostnames to whitelist:**
| URL pattern | Hostname |
|---|---|
| `raw.githubusercontent.com` | Raw file content from repos |
| `user-images.githubusercontent.com` | Images uploaded via GitHub Issues/PRs |
| `avatars.githubusercontent.com` | Profile avatars |
| `objects.githubusercontent.com` | GitHub LFS / release assets |
| `camo.githubusercontent.com` | GitHub's image proxy (used when images are embedded via markdown) |

**Prevention:**
```js
// next.config.mjs
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'raw.githubusercontent.com',
      pathname: '/JuniorRaja/**',   // scope to your own repo
    },
    {
      protocol: 'https',
      hostname: '**.githubusercontent.com',  // ** matches subdomains
    },
  ],
},
```
The `**` wildcard at the start of a hostname matches any subdomain depth, covering all GitHub CDN variants. Scope with `pathname` to your GitHub username prefix for tighter security.

**Additional gotcha — query strings:** GitHub CDN URLs sometimes append cache-busting query strings. If `search` is set to an empty string in `remotePatterns`, query strings are blocked. Omit the `search` field entirely to allow any query string, or set it to a wildcard.

**Additional gotcha — static exports and image optimisation:** If you use `output: 'export'` (for a fully static site), the default `next/image` optimisation loader does NOT work. You must either provide a custom loader, use `unoptimized: true`, or keep Vercel's default Node.js deployment (which runs the image API server). Since the project deploys to Vercel (not static export), this is not an issue — but do NOT add `output: 'export'` to `next.config.js` unless prepared to handle this.

**Warning signs:**
- Browser network tab shows `/_next/image?url=...` returning 400
- Console error: `Invalid src prop on next/image, hostname "raw.githubusercontent.com" is not configured under images in your next.config.js`

**Phase:** Phase 1 (scaffold) — add remotePatterns before writing `NpImage` component. Phase 3 (Photo Desk) — verify all specific GitHub URLs are covered.

---

### Pitfall 5: CSS variables + localStorage theming cause Flash of Unstyled Content (FOUC) on SSR

**What goes wrong:** The Tweaks panel persists the selected color mode (Newsprint/Ink/Aged) to `localStorage`. On page load, the server renders HTML with the default Newsprint theme (CSS variables baked in). The client then reads `localStorage` and switches to the user's saved theme — but this happens after the HTML has already painted. The result is a visible flash from cream to dark/aged colors every time the page loads with a non-default theme.

**Why it happens:** `localStorage` is a browser API. Server Components cannot read it. Any logic that conditionally applies CSS variables based on `localStorage` can only run after hydration, which is after first paint.

**Consequences:**
- Visible color flash on every page load for non-default theme users.
- Particularly harsh on a vintage newspaper design where the background color is prominent.

**Prevention — inline script approach (most reliable):**
Inject a tiny `<script>` tag into `<head>` that runs synchronously before any paint. This is the only way to prevent FOUC:
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('pr-gazette-theme') || 'newsprint';
              document.documentElement.setAttribute('data-theme', theme);
            } catch(e) {}
          })();
        `}} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```
Then drive all colors off `[data-theme="ink"]` CSS attribute selectors applied to `:root` or `html`.

**Prevention — CSS variables + data-attribute pattern:**
Define all three themes as CSS variable sets scoped to `[data-theme]` attributes on `<html>`. The synchronous script above sets the attribute before React renders. No FOUC.

**Do NOT do:**
- `useEffect` to read localStorage and `setState` for theme — always causes FOUC because `useEffect` runs after paint.
- Server cookies for theme persistence (adds server complexity; the project is explicitly no-backend).

**Warning signs:**
- White flash before dark theme appears on reload
- Chrome DevTools shows a repaint event immediately after hydration

**Phase:** Phase 1 (scaffold) — establish the `data-theme` + inline script pattern in `app/layout.tsx` before building any section components. Retrofitting theme switching after sections are built is painful.

---

## Moderate Pitfalls

Mistakes that cause visible bugs, performance regressions, or wasted build time.

---

### Pitfall 6: Framer Motion scroll animations cause Cumulative Layout Shift (CLS) on mobile

**What goes wrong:** Using `initial={{ y: 40, opacity: 0 }}` on section wrappers means those sections start life 40px below their final position. On slow mobile connections, the scroll-triggered animation fires after the user has already seen the section at its final scroll position — creating a jarring jump. More critically, `initial` state affects the element's position in the document flow, which can cause CLS measured by Lighthouse.

**Why it happens:** `motion.div` with a `y` translate in `initial` physically displaces the element. If the animation fires mid-scroll on a slow device, the content "jumps" into place rather than revealing smoothly.

**Prevention:**
1. Only animate `opacity` in `initial` state. Use `y` as a `transform` (not affecting layout flow) with care:
   ```tsx
   // Safe: opacity + transform, not layout-affecting
   initial={{ opacity: 0, y: 20 }}
   whileInView={{ opacity: 1, y: 0 }}
   viewport={{ once: true, margin: '-50px' }}
   ```
2. Keep `y` values small (max 20-30px). Large translate values are noticeably wrong when content is already visible.
3. Always set `viewport={{ once: true }}` — re-triggering the animation every time the user scrolls back up is annoying and wastes GPU.
4. Wrap scroll animation components with `will-change: transform` CSS — signals to the browser to promote the layer and avoids repaints.
5. Test on throttled mobile in Chrome DevTools (CPU 4x slowdown, slow 3G) before shipping.

**Warning signs:**
- Lighthouse CLS score > 0.1
- Content visibly jumping into position on slow networks
- Chrome Performance tab shows layout events during animation

**Phase:** Phase 4 (animations) — establish animation constants (durations, easings, translate values) in a single shared `lib/animations.ts` file so all sections are consistent.

---

### Pitfall 7: `next/font` — non-variable Google Fonts require explicit `weight` and break without it

**What goes wrong:** Importing `Playfair_Display` from `next/font/google` without specifying `weight` causes a build error because Playfair Display is not a variable font. The error message `"Weight is required for non-variable font"` appears at build time.

**Why it happens:** `next/font` requires `weight` for non-variable fonts. It's optional only for variable fonts (those that ship a single `.woff2` with a weight range).

**For The PR Gazette's fonts:**
- `Playfair_Display` — NOT a variable font on Google Fonts. Must specify weights explicitly.
- `Source_Serif_4` — IS a variable font. `weight` is optional (use `'200 900'` range for flexibility).
- `JetBrains_Mono` — IS a variable font. `weight` is optional.

**Correct setup:**
```ts
// lib/fonts.ts
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google'

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],  // required — not variable
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: '200 900',   // variable font — range string
  variable: '--font-source-serif',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: '100 800',   // variable font — range string
  variable: '--font-jetbrains',
  display: 'swap',
})
```

**Additional gotcha — font names use underscores:** Font names with spaces must use `_` in the import. `Playfair Display` → `Playfair_Display`. Getting this wrong causes a module-not-found error.

**Additional gotcha — apply variables to `<html>`, use in CSS:** Apply all three `variable` class names to `<html>` in `layout.tsx`, then use `var(--font-playfair)` etc. in CSS. Do NOT pass `.className` from multiple fonts to `<html>` — only one `className` survives; use `variable` + CSS instead.

**Warning signs:**
- `Error: 'weight' is required when using a non-variable font`
- Font rendering as system serif instead of Playfair Display
- Build warnings about missing subsets

**Phase:** Phase 1 (scaffold) — set up `lib/fonts.ts` and apply to `layout.tsx` in the first commit.

---

### Pitfall 8: `remark-gfm` and other MDX plugins require `next.config.mjs` (ESM), not `next.config.js` (CJS)

**What goes wrong:** Adding `remark-gfm`, `remark-frontmatter`, or any modern remark/rehype plugin to `next.config.js` (CommonJS) throws `require() of ES Module` errors at startup because these packages are ESM-only.

**Why it happens:** The remark/rehype ecosystem migrated to ESM-only in 2022. CommonJS `require()` cannot load ESM modules. `next.config.js` defaults to CommonJS unless the project has `"type": "module"` in `package.json`.

**Prevention:**
1. Name the config file `next.config.mjs` (ES module syntax with `import`/`export`).
2. Correct pattern:
   ```js
   // next.config.mjs — note the .mjs extension
   import createMDX from '@next/mdx'
   import remarkGfm from 'remark-gfm'

   const withMDX = createMDX({
     options: {
       remarkPlugins: [remarkGfm],
       rehypePlugins: [],
     },
   })

   export default withMDX({ pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'] })
   ```
3. Do not mix `require()` and `import` in the same config file.

**Warning signs:**
- `Error [ERR_REQUIRE_ESM]: require() of ES Module` on `next dev` start
- Plugins listed in `remarkPlugins` array but having no effect

**Phase:** Phase 1 (scaffold) — use `.mjs` from the beginning. Renaming from `.js` to `.mjs` after content exists risks breaking existing imports.

---

### Pitfall 9: Marquee/ticker animation using Framer Motion causes jank — CSS approach is better

**What goes wrong:** Implementing the skills ticker as a Framer Motion `motion.div` with `animate={{ x: [0, -100%] }}` and `transition={{ repeat: Infinity, duration: 20 }}` results in janky animation on mobile because Framer Motion's JS-driven animation does not always achieve 60fps on low-end devices. Furthermore, percentage-based `x` values do not work in Framer Motion's `animate` prop (only pixel values work).

**Why it happens:** Continuous, infinite loop animations are better handled by CSS `@keyframes` than JS animation loops. CSS animations run on the compositor thread and are not blocked by JS execution. Framer Motion's spring/tween system is optimised for one-shot and gesture-driven animations, not infinite loops.

**Prevention:**
Use a CSS `@keyframes` marquee for the ticker:
```css
@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }  /* -50% because content is doubled */
}
.ticker-track {
  animation: ticker-scroll 30s linear infinite;
}
.ticker-track:hover {
  animation-play-state: paused;
}
```
Double the content inside the ticker to create a seamless loop. This is the standard newspaper ticker technique and does not require any JS.

Reserve Framer Motion for gesture-based and viewport-triggered animations (scroll reveals, hover states) where its spring physics actually help.

**Warning signs:**
- Ticker skips or stutters on mobile
- Chrome Performance tab shows long JS tasks during ticker animation
- `x: '-100%'` in Framer Motion `animate` has no effect

**Phase:** Phase 4 (animations) — implement the ticker as CSS before considering Framer Motion.

---

### Pitfall 10: Applying `filter: grayscale sepia` inside `next/image` wrapper conflicts with `fill` mode sizing

**What goes wrong:** The `NpImage` wrapper applies a CSS filter (`grayscale(100%) sepia(40%) contrast(110%) brightness(95%)`) to create the newspaper photo effect. When `next/image` is used in `fill` mode (for responsive gallery images), the parent container `position: relative` requirement interacts badly with the filter wrapper's own positioning — the filter wrapper needs `position: relative` but the Image `fill` prop assumes the parent is the sizing context.

**Why it happens:** `next/image` with `fill` positions the `<img>` as `position: absolute` and fills its nearest `position: relative` parent. If `NpImage` adds an intermediate `<div>` with `position: relative` for the filter, the sizing context shifts and the image may not fill correctly.

**Prevention:**
Apply the filter directly to the `<img>` element via the `style` prop on `next/image`, not via a wrapper div:
```tsx
// components/NpImage.tsx
'use client'  // only needed if using onLoad callback; otherwise can be Server Component
import Image, { ImageProps } from 'next/image'

const NEWSPAPER_FILTER = 'grayscale(100%) sepia(40%) contrast(110%) brightness(95%)'

export function NpImage(props: ImageProps) {
  return (
    <Image
      {...props}
      style={{
        ...props.style,
        filter: NEWSPAPER_FILTER,
      }}
    />
  )
}
```
This avoids any intermediate wrapper that would break `fill` mode sizing.

**Warning signs:**
- Gallery images not filling their grid cells
- Filter visible but image partially cropped or misaligned
- `object-fit: cover` not working as expected

**Phase:** Phase 2 (core components) — get `NpImage` right before building Photo Desk.

---

## Minor Pitfalls

Mistakes that cause warnings, minor visual glitches, or developer friction.

---

### Pitfall 11: `next-env.d.ts` edited manually — changes are overwritten

**What goes wrong:** Adding custom type declarations to `next-env.d.ts` (the auto-generated TypeScript reference file). On the next `next dev` or `next build`, the file is regenerated and all custom types are lost.

**Prevention:** Create `types/global.d.ts` (or any non-auto-generated `.d.ts` file) and reference it in `tsconfig.json`'s `include` array. Never edit `next-env.d.ts` directly.

**Phase:** Phase 1 (scaffold).

---

### Pitfall 12: TypeScript `async` Server Components require TypeScript 5.1.3+ and `@types/react` 18.2.8+

**What goes wrong:** Using `async function Page()` as a Server Component causes a TypeScript error `'Promise<Element>' is not a valid JSX element` on older TypeScript versions. This does not block the build but pollutes the IDE with false errors.

**Prevention:** Ensure `tsconfig.json` targets TypeScript 5.x and `@types/react` is at least `18.2.8`. `create-next-app` sets this up correctly; manual port from prototype needs explicit version checks.

**Phase:** Phase 1 (scaffold) — verify with `npx tsc --version`.

---

### Pitfall 13: `pageExtensions` missing `.md` causes MDX files with `.md` extension to not compile

**What goes wrong:** Adding `pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx']` to `next.config.mjs` but omitting `'md'` means any content file named `content.md` is not processed by the MDX compiler and is served as raw text.

**Prevention:** Always include both `'md'` and `'mdx'` in `pageExtensions`. Also set the `extension` regex in `createMDX` to handle both:
```js
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})
```

**Phase:** Phase 1 (scaffold).

---

### Pitfall 14: `next/image` `sizes` prop missing on responsive gallery images tanks LCP

**What goes wrong:** Omitting the `sizes` prop on gallery images that span partial-width columns causes Next.js to generate only a 1x/2x `srcset` (suitable for fixed-size images) instead of a full width-based `srcset`. The browser then downloads a full-viewport-width image for every grid cell, bloating page weight and wrecking Lighthouse Performance.

**Why it happens:** Next.js only generates responsive `srcset` variants (640w, 750w, etc.) when a `sizes` prop is present. Without it, it assumes the image is displayed at full viewport width.

**Prevention:** For the Photo Desk gallery grid, always provide `sizes`:
```tsx
<NpImage
  src={photo.url}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt={photo.caption}
/>
```

**Phase:** Phase 3 (Photo Desk / gallery implementation).

---

### Pitfall 15: Vercel deployment — `next build` must pass cleanly; `ignoreBuildErrors` is a trap

**What goes wrong:** Setting `typescript.ignoreBuildErrors: true` in `next.config.ts` to silence TypeScript errors during development means the Vercel build also silently ignores those errors. Type errors that would have been caught become runtime bugs in production.

**Prevention:** Never set `ignoreBuildErrors: true` except as a last-resort temporary workaround with a TODO comment. Fix TypeScript errors before pushing to Vercel. The project should have zero type errors on every push — the CI build is the contract.

**Additional Vercel gotcha:** Environment variables prefixed with `NEXT_PUBLIC_` are inlined into the client bundle at build time. Any env var without that prefix is empty string on the client. For this project (no secrets, fully static content), this should not be an issue — but if the OG image URL or contact links are ever driven by env vars, they must be `NEXT_PUBLIC_`.

**Phase:** All phases — enforce clean builds from day one.

---

### Pitfall 16: Scroll-triggered animation sections not visible in Lighthouse audit (headless browser)

**What goes wrong:** Sections with `whileInView` animations that start as `opacity: 0` are invisible to Lighthouse's headless Chromium crawler. Lighthouse measures Largest Contentful Paint against what is visually rendered — if a major text block or hero image is hidden behind a Framer Motion `opacity: 0` initial state and the headless browser does not scroll, the LCP element may never become visible, causing a falsely low LCP score.

**Prevention:**
1. Never hide above-the-fold content with `opacity: 0` in `initial` state. Only animate elements that start below the fold.
2. For the Masthead and Op-Ed sections (above fold), use CSS transitions on hover/focus rather than scroll-triggered entry animations.
3. Use `viewport={{ once: true, margin: '0px 0px -100px 0px' }}` to trigger slightly before the element enters view — this also helps on slow devices where the viewport trigger fires late.

**Phase:** Phase 4 (animations) — review all `whileInView` placements against above-fold sections.

---

## Phase-Specific Warning Matrix

| Phase | Topic | Most Likely Pitfall | Mitigation |
|-------|-------|--------------------|----|
| 1 — Scaffold | App Router setup | Framer Motion in Server Components (Pitfall 1) | Establish client boundary wrappers before any component work |
| 1 — Scaffold | MDX config | Missing `mdx-components.tsx` (Pitfall 2), wrong config file format (Pitfall 8) | Create file and use `.mjs` from the start |
| 1 — Scaffold | Fonts | Non-variable Playfair Display without weight (Pitfall 7) | Use `lib/fonts.ts` with explicit weights |
| 1 — Scaffold | Theming | FOUC from localStorage theme (Pitfall 5) | Inline blocking script in `<head>` before any components |
| 2 — MDX pipeline | Content files | Frontmatter not parsed (Pitfall 3) | Choose export-const pattern or install plugins |
| 2 — Core components | NpImage | Filter conflicting with fill mode (Pitfall 10) | Apply filter via `style` prop, not wrapper div |
| 3 — Photo Desk | GitHub images | remotePatterns misconfiguration (Pitfall 4) | Whitelist `**.githubusercontent.com` with pathname scoping |
| 3 — Photo Desk | Performance | Missing `sizes` prop on gallery images (Pitfall 14) | Add `sizes` to every gallery `NpImage` |
| 4 — Animations | Ticker | JS-driven marquee jank (Pitfall 9) | Use CSS `@keyframes`, not Framer Motion |
| 4 — Animations | Scroll reveals | CLS from large y-offset (Pitfall 6) | Max 20px translate, `once: true`, above-fold exclusions |
| 4 — Animations | Lighthouse | Hidden above-fold content (Pitfall 16) | Audit after animations are wired; check LCP element visibility |
| 5 — Deployment | Vercel | IgnoreBuildErrors mask (Pitfall 15) | Zero type errors policy from day one |

---

## Sources

All documentation verified against current official sources as of 2026-04-26.

- Next.js App Router MDX guide: https://nextjs.org/docs/app/guides/mdx (v16.2.4, updated 2026-04-23)
- Next.js Image component / remotePatterns: https://nextjs.org/docs/app/api-reference/components/image (v16.2.4)
- Next.js Font module: https://nextjs.org/docs/app/api-reference/components/font (v16.2.4)
- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components (v16.2.4)
- Next.js Static Exports: https://nextjs.org/docs/app/guides/static-exports (v16.2.4)
- Next.js TypeScript configuration: https://nextjs.org/docs/app/api-reference/config/typescript (v16.2.4)
- Framer Motion / third-party in App Router: inferred from Next.js official "third-party components" pattern in Server/Client Components doc (HIGH confidence for boundary requirements)
- Framer Motion RSC constraints: HIGH confidence — based on Framer Motion's documented need for browser APIs and React state hooks, which cannot run in Server Components
