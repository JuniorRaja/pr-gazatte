'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import NpImage from '@/components/NpImage'
import SectionFiller from '@/components/SectionFiller'
import { countries, upcomingCountries } from '@/content/travel'

const mono = '"JetBrains Mono", monospace'
const serif = '"Source Serif 4", serif'
const display = '"Playfair Display", serif'

export default function Travel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % countries.length)
  }, [])

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(advance, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused, advance])

  const handleDotClick = (i: number) => {
    setActiveIndex(i)
    setPaused(true)
  }

  const active = countries[activeIndex]

  const countryImages: Record<string, { src: string; caption: string }> = {
    LK: { src: '/pr-lanka-sigiriya.webp', caption: 'Sigiriya Rock Fortress — Sri Lanka, 2022' },
    SG: { src: '/pr-sg-changi.webp', caption: 'Changi Airport — Singapore, 2022' },
    PL: { src: '/pr-poland-krakow.webp', caption: 'Krakow Old Town — Poland, 2023' },
    AT: { src: '/pr-austria.webp', caption: 'Vienna — Austria, 2023' },
    HU: { src: '/pr-hungary.webp', caption: 'Budapest — Hungary, 2023' },
    SK: { src: '/pr-slovakia.webp', caption: 'Bratislava — Slovakia, 2023' },
  }
  const fallbackImage = { src: 'https://picsum.photos/seed/prague-old-town/800/400', caption: 'Old Town, Prague — Central Europe, 2023' }
  const activeImage = countryImages[active.code] ?? fallbackImage

  return (
    <section id="travel" style={{ borderBottom: '2px solid var(--fg)' }}>
      <style>{`
        /* ── Layout ── */
        .tv-header { display: flex; justify-content: space-between; align-items: center; }
        .tv-headline-zone {
          display: grid;
          grid-template-columns: 6fr 2fr;
          gap: 28px;
          align-items: center;
        }
        .tv-row1 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 0;
        }
        .tv-row2 {
          display: grid;
          grid-template-columns: 3fr 1fr;
          gap: 0;
        }
        .tv-col-rule { border-right: 1px solid rgba(14,14,12,0.18); }
        .tv-hr { border: none; border-top: 1px solid rgba(14,14,12,0.18); margin: 0; }
        .tv-hr-strong { border: none; border-top: 1px solid rgba(14,14,12,0.35); margin: 0; }

        /* ── Timeline (vintage) ── */
        .tv-timeline-container { position: relative; margin: 20px 0 0; padding: 0 12px; }

        /* Main horizontal rail — cuts through dots */
        .tv-timeline-rail {
          position: absolute;
          top: 9px; /* vertically center on the 18px dot */
          left: 0;
          right: 0;
          height: 0;
          border-top: 1.5px solid var(--fg);
          z-index: 0;
        }
        /* Double-line effect below */
        .tv-timeline-rail::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 0;
          right: 0;
          height: 0;
          border-top: 0.5px solid rgba(14,14,12,0.2);
        }

        /* Decorative curls at each end */
        .tv-timeline-curl-left,
        .tv-timeline-curl-right {
          position: absolute;
          top: -4px;
          width: 20px;
          height: 14px;
          z-index: 1;
        }
        .tv-timeline-curl-left { left: -6px; }
        .tv-timeline-curl-right { right: -6px; }

        /* Tick marks between dots */
        .tv-timeline-ticks {
          position: absolute;
          top: 5px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          z-index: 0;
          pointer-events: none;
        }
        .tv-timeline-tick {
          width: 1px;
          height: 8px;
          background: rgba(14,14,12,0.12);
        }

        .tv-timeline {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 0;
          z-index: 2;
        }
        .tv-dot-wrap {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          padding: 0 4px;
          background: transparent;
          border: none;
          flex: 1;
        }
        .tv-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid var(--fg);
          background: var(--bg);
          transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
          position: relative;
          box-shadow: 0 0 0 3px var(--bg);
        }
        /* Inner pip for inactive dots */
        .tv-dot::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--fg);
          transform: translate(-50%, -50%);
          opacity: 0.3;
          transition: opacity 0.2s;
        }
        .tv-dot.active {
          background: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px var(--accent);
        }
        .tv-dot.active::after { opacity: 0; }
        .tv-dot-label {
          font-family: ${mono};
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: .08em;
          color: var(--fg);
          margin-top: 8px;
          white-space: nowrap;
        }
        .tv-dot-year {
          font-family: ${mono};
          font-size: 7px;
          color: var(--sepia);
          margin-top: 1px;
        }
        .tv-dot-wrap:hover .tv-dot:not(.active) {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px rgba(139,34,35,0.2);
        }
        .tv-dot-wrap:hover .tv-dot:not(.active)::after { opacity: 0.6; }


        /* ── Planned badge ── */
        .tv-planned-badge {
          font-family: ${mono};
          font-size: 7px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--accent);
          border: 1.5px solid var(--accent);
          padding: 2px 6px;
          transform: rotate(4deg);
          display: inline-block;
          background: rgba(139,34,35,0.06);
        }

        /* ── Upcoming card ── */
        .tv-upcoming-card {
          border: 1px solid rgba(14,14,12,0.25);
          padding: 16px;
          background: rgba(184,167,146,0.06);
          position: relative;
          margin-bottom: 16px;
        }

        /* ── Portrait placeholder ── */
        .tv-portrait {
          width: 100%;
          height: 100%;
          min-height: 320px;
          background: var(--sepia);
          opacity: 0.15;
          position: relative;
          overflow: hidden;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .tv-row1 { grid-template-columns: 1fr 1fr; }
          .tv-row1-portrait { display: none; }
          .tv-row2 { grid-template-columns: 1fr; }
          .tv-row2-sidebar { border-left: none !important; border-top: 1px solid rgba(14,14,12,0.18); }
        }
        @media (max-width: 639px) {
          .tv-headline-zone { grid-template-columns: 1fr; }
          .tv-headline-quote { display: none; }
          .tv-row1 { grid-template-columns: 1fr; }
          .tv-row1 > div { border-right: none !important; border-bottom: 1px solid rgba(14,14,12,0.18); }
          .tv-row1 > div:last-child { border-bottom: none; }
          .tv-row1-method { display: none; }
          .tv-row2 { grid-template-columns: 1fr; }
          .tv-row2 > div { min-width: 0; overflow-wrap: break-word; word-break: break-word; }
          .tv-row2-sidebar { border-left: none !important; border-top: 1px solid rgba(14,14,12,0.18); }
          .tv-upcoming-card { overflow-wrap: break-word; word-break: break-word; }
          .tv-timeline-container { display: none; }
          .tv-dot-label { font-size: 7px; letter-spacing: .04em; }
          .tv-dot { width: 14px; height: 14px; }
          .tv-dot::after { width: 3px; height: 3px; }
          .tv-timeline-rail { top: 7px; }
          .tv-timeline-curl-left, .tv-timeline-curl-right { top: -6px; }
        }
      `}</style>

      {/* ═══ Section Header ═══ */}
      <hr className="tv-hr-strong" />
      <div className="tv-header section-padding-x" style={{ padding: '6px 16px', background: 'var(--fg)', color: 'var(--bg)' }}>
        <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 700 }}>
          Trails &amp; Borders · The Travel Record
        </span>
        <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '.1em' }}>
          Page 8
        </span>
      </div>
      <hr className="tv-hr-strong" />

      {/* ═══ Headline Zone ═══ */}
      <div className="tv-headline-zone section-padding-x" style={{ padding: '28px 16px 24px' }}>
        <div>
          <h2 style={{
            fontFamily: display,
            fontSize: 'clamp(30px, 5vw, 52px)',
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            color: 'var(--fg)',
            margin: '0 0 14px',
          }}>
            A Man in Motion.<br />
            <span style={{ color: 'var(--accent)' }}>Across Lands, Carrying Stories Forward.</span>
          </h2>
        </div>

        {/* Headline byline — right side */}
        <p className="tv-headline-quote" style={{
          fontFamily: serif,
          fontSize: '14px',
          fontStyle: 'italic',
          lineHeight: 1.65,
          color: 'var(--fg)',
          margin: 0,
          opacity: 0.8,
          borderLeft: '3px solid var(--accent)',
          paddingLeft: '16px',
        }}>
          He plans the flight. The rest, he figures out on arrival. Seven countries in, the method hasn&apos;t failed him yet — it&apos;s just produced better stories than any guidebook could have written.
        </p>
      </div>

      {/* ── Stats quote strip ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(14,14,12,0.03)', borderTop: '1px solid rgba(14,14,12,0.15)', borderBottom: '1px solid rgba(14,14,12,0.15)', padding: '12px 16px' }}>
        <span style={{ fontFamily: mono, fontSize: '20px', color: 'var(--accent)', lineHeight: 1, flexShrink: 0 }}>&ldquo;</span>
        <p style={{ fontFamily: serif, fontSize: '13px', fontStyle: 'italic', lineHeight: 1.6, color: 'var(--fg)', margin: 0, opacity: 0.85 }}>
          Seven countries across four continents — two more on the horizon for 2026. The count is not the point. But it keeps growing anyway.
        </p>
        <span style={{ fontFamily: mono, fontSize: '20px', color: 'var(--accent)', lineHeight: 1, flexShrink: 0, alignSelf: 'flex-end' }}>&rdquo;</span>
      </div>

      {/* ═══ Row 1 — Three Columns ═══ */}
      <div className="tv-row1">

        {/* Col 1 — Portrait Photo */}
        <div className="tv-col-rule tv-row1-portrait" style={{ padding: '20px 16px' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '460px', overflow: 'hidden', border: '1px solid rgba(14,14,12,0.15)' }}>
            <NpImage
              src="/pr-travel-still.webp"
              alt="Somewhere between borders — Europe, 2023"
              fill
              sizes="(max-width: 960px) 100vw, 33vw"
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(14,14,12,0.65))', padding: '24px 10px 8px' }}>
              <span style={{ fontFamily: mono, fontSize: '8px', color: 'rgba(244,239,230,0.8)', letterSpacing: '.08em' }}>Somewhere between borders — Europe, 2023</span>
            </div>
          </div>
        </div>

        {/* Col 2 — The Traveller */}
        <div className="tv-col-rule" style={{ padding: '20px 20px' }}>
          <div style={{
            fontFamily: mono,
            fontSize: '9px',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            borderBottom: '1px solid rgba(14,14,12,0.2)',
            paddingBottom: '4px',
            marginBottom: '14px',
          }}>The Traveller</div>

          <p className="drop-cap" style={{
            fontFamily: serif,
            fontSize: '13px',
            lineHeight: 1.72,
            color: 'var(--fg)',
            margin: '0 0 12px',
            textAlign: 'justify',
          }}>
            He travels alone. Not out of preference for solitude — though he&apos;ll admit he doesn&apos;t mind it — but because solo travel is the only format that forces genuine decisions. Every wrong turn is his. Every right one too. The discomfort of not knowing the language, not knowing the exit, not knowing what that dish actually is — that&apos;s not a bug in the experience. That&apos;s the experience.
          </p>
          <p style={{
            fontFamily: serif,
            fontSize: '13px',
            lineHeight: 1.72,
            color: 'var(--fg)',
            margin: '0 0 16px',
            textAlign: 'justify',
          }}>
            Seven countries across three years. The pace is not frantic. He&apos;s not chasing a number. But the number keeps growing anyway, quietly, the way good habits do.
          </p>

          {/* Pull quote */}
          <div style={{ borderTop: '1.5px solid var(--accent)', borderBottom: '1.5px solid var(--accent)', padding: '10px 0', marginTop: '16px' }}>
            <p style={{
              fontFamily: serif,
              fontSize: '13px',
              fontStyle: 'italic',
              lineHeight: 1.55,
              color: 'var(--accent)',
              margin: 0,
              textAlign: 'center',
            }}>
              &ldquo;The passport fills up the same way the bookshelf does — one deliberate choice at a time.&rdquo;
            </p>
          </div>
        </div>

        {/* Col 3 — The Method */}
        <div className="tv-col-rule tv-row1-method" style={{ padding: '20px 20px' }}>
          <div style={{
            fontFamily: mono,
            fontSize: '9px',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            borderBottom: '1px solid rgba(14,14,12,0.2)',
            paddingBottom: '4px',
            marginBottom: '14px',
          }}>The Method</div>

          <p style={{
            fontFamily: serif,
            fontSize: '13px',
            lineHeight: 1.72,
            color: 'var(--fg)',
            margin: '0 0 12px',
            textAlign: 'justify',
          }}>
            The approach is mid-range and curious. Not backpacker-spartan, not resort-comfortable. He books a decent place to sleep, leaves the days open, and lets the city decide what happens next. Street food over restaurant menus. Public transit over taxis. Conversations over itineraries.
          </p>
          <p style={{
            fontFamily: serif,
            fontSize: '13px',
            lineHeight: 1.72,
            color: 'var(--fg)',
            margin: '0 0 12px',
            textAlign: 'justify',
          }}>
            Europe came in a single sweep — five countries, one route, one summer. Asia arrived in fragments: Singapore first, crisp and efficient; Sri Lanka next, slower, louder, warmer in every sense of the word.
          </p>
          <p style={{
            fontFamily: serif,
            fontSize: '13px',
            lineHeight: 1.72,
            color: 'var(--fg)',
            margin: 0,
            textAlign: 'justify',
          }}>
            Each country left something behind. Not souvenirs. Something less packable — a reference point, a new unit of measurement for what normal can look like.
          </p>
        </div>

        {/* Col 4 — Dispatches Filed */}
        <div style={{ padding: '20px 20px' }}>
          <div style={{
            fontFamily: mono,
            fontSize: '9px',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            borderBottom: '1px solid rgba(14,14,12,0.2)',
            paddingBottom: '4px',
          }}>
            Dispatches Filed
          </div>

          {countries.map((c, i) => (
            <div key={c.code} style={{ borderBottom: '1px solid rgba(14,14,12,0.1)', padding: '12px 0', display: 'flex', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                <span style={{ fontFamily: mono, fontSize: '11px', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <img 
                  src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w80/${c.code.toLowerCase()}.png 2x`}
                  width="40"
                  height="30"
                  alt={`${c.name} flag`}
                  style={{ flexShrink: 0, border: '0.5px solid rgba(14,14,12,0.15)', filter: 'sepia(0.15) opacity(0.9)' }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{ fontFamily: display, fontSize: '14px', fontWeight: 700, lineHeight: 1.2, color: 'var(--fg)' }}>
                    {c.name}
                  </span>
                  <span style={{ fontFamily: mono, fontSize: '10px', fontWeight: 600, color: 'var(--fg)', letterSpacing: '.04em', flexShrink: 0 }}>
                    {c.year}
                  </span>
                </div>
                <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--sepia)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                  {c.region}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="tv-hr" style={{ marginLeft: '16px', marginRight: '16px' }} />

      {/* ═══ Row 2 — Two Columns ═══ */}
      <div className="tv-row2">

        {/* Left — Landscape photo + Timeline */}
        <div className="tv-col-rule" style={{ padding: '20px 20px' }}>

          {/* Landscape photo — updates with selected country */}
          <div style={{ position: 'relative', width: '100%', height: '320px', overflow: 'hidden', border: '1px solid rgba(14,14,12,0.15)', marginBottom: '6px' }}>
            <NpImage
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.caption}
              fill
              sizes="(max-width: 960px) 100vw, 700px"
            />
          </div>
          <div style={{
            fontFamily: serif,
            fontSize: '10px',
            fontStyle: 'italic',
            color: 'var(--sepia)',
            marginBottom: '16px',
          }}>
            {activeImage.caption}
          </div>

          {/* Timeline label */}
          <div style={{
            fontFamily: mono,
            fontSize: '9px',
            letterSpacing: '.15em',
            textTransform: 'uppercase',
            color: 'var(--sepia)',
            marginBottom: '4px',
          }}>
            Travel Record · 2022 – 2023 · Tap any country to read
          </div>

          {/* Interactive timeline */}
          <div className="tv-timeline-container">
            {/* Decorative rail that cuts through dots */}
            <div className="tv-timeline-rail" aria-hidden="true" />

            {/* Left curl ornament */}
            <svg className="tv-timeline-curl-left" viewBox="0 0 20 14" fill="none" aria-hidden="true">
              <path d="M18 7 C14 7, 12 2, 8 2 C4 2, 2 7, 2 7 C2 7, 4 12, 8 12 C10 12, 11 10, 11 9" stroke="var(--fg)" strokeWidth="1.2" fill="none" />
              <circle cx="18" cy="7" r="1.5" fill="var(--fg)" />
            </svg>

            {/* Right curl ornament */}
            <svg className="tv-timeline-curl-right" viewBox="0 0 20 14" fill="none" aria-hidden="true">
              <path d="M2 7 C6 7, 8 2, 12 2 C16 2, 18 7, 18 7 C18 7, 16 12, 12 12 C10 12, 9 10, 9 9" stroke="var(--fg)" strokeWidth="1.2" fill="none" />
              <circle cx="2" cy="7" r="1.5" fill="var(--fg)" />
            </svg>

            <div className="tv-timeline" role="tablist" aria-label="Travel timeline">
              {countries.map((c, i) => (
                <button
                  key={c.code}
                  className="tv-dot-wrap"
                  onClick={() => handleDotClick(i)}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`${c.name}, ${c.year}`}
                >
                  <div className={`tv-dot${i === activeIndex ? ' active' : ''}`} />
                  <div className="tv-dot-label" style={{ color: i === activeIndex ? 'var(--accent)' : 'var(--fg)', fontWeight: i === activeIndex ? 700 : 400 }}>
                    {c.name}
                  </div>
                  <div className="tv-dot-year">{c.year}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Active country write-up */}
          <div role="tabpanel" style={{ marginTop: '20px', minHeight: '120px' }}>
            <h3 style={{
              fontFamily: display,
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: 'var(--fg)',
              margin: '0 0 4px',
            }}>
              {active.name}
            </h3>
            <div style={{
              fontFamily: mono,
              fontSize: '9px',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--sepia)',
              marginBottom: '10px',
            }}>
              {active.year} · {active.region}
            </div>
            <p style={{
              fontFamily: serif,
              fontSize: '13px',
              lineHeight: 1.72,
              color: 'var(--fg)',
              margin: '0 0 10px',
            }}>
              {active.body}
            </p>
            <div style={{
              fontFamily: serif,
              fontSize: '10px',
              fontStyle: 'italic',
              color: 'var(--sepia)',
              textAlign: 'right',
            }}>
              — tap another country on the timeline
            </div>
          </div>
        </div>

        {/* Right — Upcoming Sidebar */}
        <div className="tv-row2-sidebar" style={{ padding: '20px 20px', borderLeft: '1px solid rgba(14,14,12,0.18)' }}>

          <div style={{
            fontFamily: mono,
            fontSize: '9px',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            borderBottom: '1px solid rgba(14,14,12,0.2)',
            paddingBottom: '4px',
            marginBottom: '14px',
          }}>
            Next Departures · 2026
          </div>

          <p style={{
            fontFamily: serif,
            fontSize: '12px',
            fontStyle: 'italic',
            lineHeight: 1.6,
            color: 'var(--fg)',
            margin: '0 0 16px',
          }}>
            Two countries confirmed in his mind. The tickets may not exist yet. The intent does.
          </p>

          {/* Upcoming country cards */}
          {upcomingCountries.map(c => (
            <div key={c.name} className="tv-upcoming-card">
              <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <span className="tv-planned-badge">Planned</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <img 
                  src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
                  width="20"
                  height="15"
                  alt={`${c.name} flag`}
                  style={{ flexShrink: 0, border: '0.5px solid rgba(14,14,12,0.15)', filter: 'sepia(0.15) opacity(0.9)' }}
                />
                <h4 style={{
                  fontFamily: display,
                  fontSize: '18px',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  color: 'var(--fg)',
                  margin: 0,
                }}>
                  {c.name}
                </h4>
              </div>
              <div style={{
                fontFamily: mono,
                fontSize: '8px',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '8px',
              }}>
                {c.year} · {c.region}
              </div>
              <p style={{
                fontFamily: serif,
                fontSize: '12px',
                lineHeight: 1.6,
                color: 'var(--fg)',
                margin: 0,
              }}>
                {c.body}
              </p>
            </div>
          ))}

          {/* After That */}
          <div style={{ marginTop: '8px' }}>
            <div style={{
              fontFamily: mono,
              fontSize: '9px',
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              borderBottom: '1px solid rgba(14,14,12,0.2)',
              paddingBottom: '4px',
              marginBottom: '10px',
            }}>
              After That
            </div>
            <p style={{
              fontFamily: serif,
              fontSize: '12px',
              fontStyle: 'italic',
              lineHeight: 1.6,
              color: 'var(--fg)',
              margin: 0,
            }}>
              The list after these two is unwritten. He prefers it that way. A blank itinerary is the most honest kind.
            </p>
          </div>
        </div>
      </div>

      <SectionFiller watermark="TRAVEL" footnote="Trails & Borders · 7 countries dispatched · 2 planned · Annual Review" page="8" />
    </section>
  )
}
