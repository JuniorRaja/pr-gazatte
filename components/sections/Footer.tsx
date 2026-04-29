'use client'

import { getMonthYear } from '@/utils/date'
import { useEffect, useState, useRef } from 'react'

const colophonCols = [
  { heading: 'Published By',    lines: ['Prasanna Rajendran', 'Editor, Engineer, PM', 'Chennai, India'] },
  { heading: 'Technical Stack', lines: ['Next.js 15 · React 19', 'TypeScript · Tailwind v4', 'Cloudflare Pages'] },
  { heading: 'Design',          lines: ['Playfair Display', 'Source Serif 4 · JetBrains Mono', 'Newsprint palette'] },
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
      {/* CMYK registration dots */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 20px 4px', gap: '6px', borderBottom: '1px solid rgba(244,239,230,0.1)' }}>
        {[['#00AFEC', 'C'], ['#EC008C', 'M'], ['#FFF200', 'Y'], ['#000000', 'K']].map(([color, label]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, border: '1px solid rgba(244,239,230,0.2)', flexShrink: 0 }} />
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', color: 'rgba(244,239,230,0.4)', letterSpacing: '.05em' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* 4-column colophon */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 0, padding: '0 32px', borderBottom: '1px solid rgba(244,239,230,0.1)' }}>
        {colophonCols.map((col, i) => (
          <div key={col.heading} style={{ borderRight: i < 3 ? '1px solid rgba(244,239,230,0.12)' : 'none', padding: '20px 0', paddingRight: i < 3 ? '28px' : 0, paddingLeft: i > 0 ? '28px' : 0 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: '10px', borderBottom: '1px solid rgba(139,34,35,0.4)', paddingBottom: '6px' }}>{col.heading}</div>
            {col.lines.map(line => (
              <div key={line} style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', color: 'rgba(244,239,230,0.75)', lineHeight: 1.8 }}>{line}</div>
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
      <div style={{ borderTop: '1px solid rgba(244,239,230,0.12)', padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'rgba(244,239,230,0.35)', letterSpacing: '.1em' }}>THE PR GAZETTE · EST. 1998</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['Op-Ed', 'Tech', 'Career', 'Lab', 'Photos', 'Books', 'Travel', 'Off Duty', 'Contact'].map(link => (
            <span key={link} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'rgba(244,239,230,0.3)', letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer' }}>{link}</span>
          ))}
        </div>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'rgba(244,239,230,0.35)', letterSpacing: '.1em' }}>VOL. I · NO. 1</span>
      </div>
    </footer>
  )
}
