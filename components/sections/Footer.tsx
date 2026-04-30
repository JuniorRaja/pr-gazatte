'use client'

import { getMonthYear } from '@/utils/date'
import { useEffect, useState, useRef } from 'react'

const colophonCols = [
  { heading: 'Published By',    lines: ['Prasanna Rajendran', 'Editor, Engineer, PM', 'Chennai, India'] },
  { heading: 'Technical Stack', lines: ['Next.js 15 · React 19', 'TypeScript · Tailwind v4', 'Cloudflare Pages'] },
  { heading: 'Colophon',        lines: ['An independent publication.', 'All opinions are those of the Editor.', 'Printed on recycled electrons.'] },
  { heading: 'Edition',         lines: ['Vol. I, No. 1', getMonthYear(), 'All rights reserved'] },
]

const TAGLINE = 'Engineer by habit. Person by design.'

function useTypewriter(text: string, speed = 45) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    indexRef.current = 0
    setDisplayed('')
    setDone(false)

    const tick = () => {
      if (indexRef.current < text.length) {
        indexRef.current++
        setDisplayed(text.slice(0, indexRef.current))
        rafRef.current = setTimeout(tick, speed)
      } else {
        setDone(true)
      }
    }

    // Small initial delay so it starts after the footer scrolls into view
    rafRef.current = setTimeout(tick, 600)
    return () => { if (rafRef.current) clearTimeout(rafRef.current) }
  }, [text, speed])

  return { displayed, done }
}

export default function Footer() {
  const { displayed, done } = useTypewriter(TAGLINE)

  return (
    <footer id="footer" style={{ background: 'var(--fg)', color: 'var(--bg)' }}>
      <style>{`
        .ft-colophon {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          column-gap: 0;
          padding: 0 32px;
          border-bottom: 1px solid rgba(244,239,230,0.1);
        }
        .ft-col-item {
          padding: 20px 28px;
          border-right: 1px solid rgba(244,239,230,0.12);
        }
        .ft-col-item:first-child { padding-left: 0; }
        .ft-col-item:last-child { padding-right: 0; border-right: none; }
        .ft-bottom-bar {
          border-top: 1px solid rgba(244,239,230,0.12);
          padding: 10px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ft-nav-links { display: flex; gap: 20px; }
        @media (max-width: 767px) {
          .ft-col-tech { display: none; }
          .ft-col-edition { display: none; }
          .ft-colophon { grid-template-columns: 1fr 1fr; padding: 0 16px; }
          .ft-col-item { padding: 14px 8px; }
          .ft-col-item:first-child { padding-left: 0; }
          .ft-col-item:last-child { padding-right: 0; border-right: none; }
          .ft-col-heading { font-size: 7px !important; letter-spacing: .08em !important; margin-bottom: 6px !important; }
          .ft-col-line { font-size: 10px !important; line-height: 1.6 !important; }
          .ft-bottom-bar { padding: 10px 16px; flex-direction: column; gap: 10px; text-align: center; }
          .ft-nav-links { flex-wrap: wrap; gap: 12px; justify-content: center; }
        }
        @media (min-width: 640px) and (max-width: 767px) {
          .ft-colophon { padding: 0 24px; }
          .ft-bottom-bar { padding: 10px 24px; }
        }
      `}</style>

      {/* 4-column colophon */}
      <div className="ft-colophon">
        {colophonCols.map((col) => (
          <div key={col.heading} className={`ft-col-item${col.heading === 'Technical Stack' ? ' ft-col-tech' : col.heading === 'Edition' ? ' ft-col-edition' : ''}`}>
            <div className="ft-col-heading" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: '10px', borderBottom: '1px solid rgba(139,34,35,0.4)', paddingBottom: '6px' }}>{col.heading}</div>
            {col.lines.map(line => (
              <div key={line} className="ft-col-line" style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', color: 'rgba(244,239,230,0.75)', lineHeight: 1.8 }}>{line}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Mega display name */}
      <div style={{ padding: '40px 24px 0', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.04em', color: 'var(--bg)', fontSize: 'clamp(48px, 11vw, 120px)', opacity: 0.12, userSelect: 'none', whiteSpace: 'nowrap' }}>
          PRASANNA
        </div>
        <div style={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.04em', color: 'var(--bg)', fontSize: 'clamp(48px, 11vw, 120px)', opacity: 0.12, userSelect: 'none', whiteSpace: 'nowrap', marginBottom: '8px' }}>
          RAJENDRAN
        </div>
      </div>

      {/* Tagline with typewriter effect */}
      <div style={{ textAlign: 'center', padding: '0 32px 32px', marginTop: '-60px', position: 'relative' }}>
        <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(16px, 2.5vw, 26px)', fontStyle: 'italic', color: 'rgba(244,239,230,0.75)', lineHeight: 1.4, maxWidth: '600px', margin: '0 auto', minHeight: '1.4em' }}>
          &ldquo;{displayed}
          <span style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            background: 'rgba(244,239,230,0.75)',
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
            animation: done ? 'cursorBlink 1s step-end infinite' : 'none',
            opacity: done ? undefined : 1,
          }} />
          {done && <>&rdquo;</>}
        </div>
      </div>

      {/* Rule */}
      <div style={{ borderTop: '1px solid rgba(244,239,230,0.2)', margin: '0 32px' }} />

      {/* Bottom bar */}
      <div className="ft-bottom-bar">
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'rgba(244,239,230,0.35)', letterSpacing: '.1em' }}>THE PR GAZETTE · EST. 1998</span>
        <div className="ft-nav-links">
          {[
            { label: 'Op-Ed',    href: '#op-ed'   },
            { label: 'Tech',     href: '#tech'     },
            { label: 'Career',   href: '#career'   },
            { label: 'Lab',      href: '#lab'      },
            { label: 'Photos',   href: '#photos'   },
            { label: 'Books',    href: '#books'    },
            { label: 'Travel',   href: '#travel'   },
            { label: 'Off Duty', href: '#hobbies'  },
            { label: 'Contact',  href: '#contact'  },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'rgba(244,239,230,0.3)', letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(244,239,230,0.75)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,239,230,0.3)')}
            >{label}</a>
          ))}
        </div>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'rgba(244,239,230,0.35)', letterSpacing: '.1em' }}>VOL. I · NO. 1</span>
      </div>
    </footer>
  )
}
