---
target: pr-gazette whole site
total_score: 29
p0_count: 0
p1_count: 3
p2_count: 2
timestamp: 2026-05-26T02-18-49Z
slug: pr-gazette-whole-site
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No active section highlight in nav as you scroll |
| 2 | Match System / Real World | 4 | Newspaper metaphor thorough and committed |
| 3 | User Control and Freedom | 3 | No back-to-top in an 11-section single-page doc |
| 4 | Consistency and Standards | 3 | TechDesk body text still clamp(14-15px) vs site-wide 13px |
| 5 | Error Prevention | 3 | Form validates on blur; no textarea char limit shown |
| 6 | Recognition Rather Than Recall | 3 | Nav uses journalism jargon (Op-Ed, Lab) without context |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts; no resume download or PDF export |
| 8 | Aesthetic and Minimalist Design | 3 | SectionFiller watermark pattern repetitive across 11 sections |
| 9 | Error Recovery | 2 | mailto: form silently fails on unconfigured mail clients |
| 10 | Help and Documentation | 3 | Self-documenting via editorial metaphors |
| Total | | 29/40 | Good |

## Anti-Patterns Verdict

Not AI-generated in the conventional sense. Stock-exchange-as-skills-page is the most memorable design decision. Three-font hierarchy disciplined. Three themes feel considered. Structural formula (flag + grid + SectionFiller) repeated 11 times is the main sameness risk.

CLI detector: Unavailable (bundled binary missing). Browser visualization: Skipped (no active browser session).

## Priority Issues

[P1] No active nav state: StickyNav shows 9 links with no active section highlight. SectionTracker exists but does not feed back into nav styling.

[P1] TechDesk body text at clamp(14-15px): TechDesk.tsx lines 247 and 252 not standardised to 13px.

[P1] Contact form mailto: fails silently: Classifieds.tsx:52-56 opens mailto: which silently fails on unconfigured mail clients. Shows READY TO SEND regardless.

[P2] No back-to-top in 11-section doc: No visible control to return to Masthead from Footer.

[P2] Green #2a7a3b fails WCAG AA in ink mode: Contrast ratio approx 3.8:1 against ink background #0E0E0C, below 4.5:1 threshold.

## Persona Red Flags

Morgan (Recruiting Manager): Quick Facts hidden on mobile; no above-fold CTA to contact; no resume download; TechDesk metaphor adds interpretation overhead for non-technical recruiters.

Jordan (First-Timer): PR Gazette not immediately recognizable as a portfolio; Op-Ed is jargon; 11 sections with no progress indicator; scissors coupon form charming but surprising.

Riley (Stress Tester): RandomHeadline uses Math.random() during SSR causing potential hydration mismatch on client; mailto: shows success state but may send nothing; stock ticker interval runs in background even when tab is not visible.

## Minor Observations

- globals.css:452 responsive-grid border hardcodes rgba(14,14,12,0.2) not var(--rule), will not adapt in ink theme
- Masthead portrait: mobile container is 400px tall, desktop is 150-300px (mobile should be smaller)
- SectionFiller accent colors are hardcoded hex values, not theme-aware
- Dual scroll: globals.css scroll-behavior: smooth plus Lenis SmoothScroll component may conflict on anchor clicks
- Career Beat index entry reads "seven + Years" with awkward space before +
- No aria-current on active nav item (related to active state issue)
