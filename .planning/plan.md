Action Plan — PR Gazette
                                                                                                                                                                                                                                      
  Phase 1 · Foundation + Blank Running Page                                                                                                                                                                                         

  Goal: next dev serves a blank page with fonts and themes loaded. Build passes.

  Work:
  - npx create-next-app with TypeScript + Tailwind v4
  - next.config.mjs — @next/mdx, GitHub CDN remotePatterns
  - app/layout.tsx — next/font (Playfair, Source Serif 4, JetBrains Mono), inline <script> for theme FOUC prevention
  - globals.css — all 3 [data-theme] variable sets (newsprint / ink / aged)
  - mdx-components.tsx at project root (even if minimal)
  - app/page.tsx — empty shell, no sections yet

  ---
  Phase 2 · All 11 Sections + Content (the prototype, in Next.js)

  Goal: The full page looks like the HTML prototype, all content from MDX files.

  Work:
  - Port all 11 sections from the HTML prototype to Next.js + TypeScript: Masthead, Op-Ed, Tech Desk, Business Pages, Lab Report, Photo Desk, Books Review, Travel, Off Duty, Classifieds, Footer
  - NpImage (wraps next/image, newspaper filter)
  - SectionFlag (section headers)
  - All 11 sections as Server Components: Masthead, OpEd, TechDesk, BusinessPages, LabReport, PhotoDesk, BooksReview, Travel, OffDuty, Classifieds, Footer
  - All content/*.mdx files (skills, projects, books, career, photos, travel, hobbies)
  - app/page.tsx — all 11 sections wired up, single scrolling page

  You see: The full site — identical to the prototype, mobile-responsive, real content.

  ---
  Phase 3 · Client Islands + Theme Switching

  Goal: Interactive bits work — theme switcher, ticker, mobile nav.

  Work:
  - ThemeProvider + TweaksPanel (3 color modes + toggles, persisted to localStorage)
  - SkillsTicker CSS marquee (pause on hover, reduced-motion aware)
  - MobileNav hamburger overlay
  - AnimatedSection stub (no-op for now — just renders children)

  You see: Theme switching, mobile hamburger, marquee ticker all functional.

  ---
  Phase 4 · Animations + SEO + A11y

  Goal: Scroll animations, OG preview, search-engine-ready.

  Work:
  - AnimatedSection with Framer Motion scroll-triggered entrance
  - metadata export, OG image (app/opengraph-image.tsx — masthead at 1200×630)
  - app/sitemap.ts, app/robots.ts
  - JSON-LD Person + ProfilePage
  - WCAG AA contrast check (all 3 modes)

  You see: Sections animate in on scroll. Paste URL into Slack → newspaper masthead preview.

  ---
  Phase 5 · Deploy + QA

  Goal: Live on Vercel, next build clean, real-device verified.

  Work:
  - next build — zero TypeScript errors
  - Deploy to Vercel, set NEXT_PUBLIC_SITE_URL
  - OG preview verified
  - Mobile device test (375px)