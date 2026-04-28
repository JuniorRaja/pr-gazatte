import Image from 'next/image'
import SectionFiller from '@/components/SectionFiller'
import MobileNav from '@/components/MobileNav'
import WeatherWidget from '@/components/WeatherWidget'
import { getMonthYear } from '@/utils/date'

const DAYS = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']
const MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']

const navItems = ['Op-Ed', 'Tech', 'Career', 'Lab', 'Photos', 'Books', 'Travel', 'Hobbies', 'Contact']

const headlines = [
  "Builds Systems. Scales Teams. Ships Products.",
  "Debugs Code. Debugs Teams. Debugs Everything.",
  "Firefighter. Code Writer. Team Builder.",
  "Five Years Coding. Two Years Leading. Forever Learning.",
  "Trainee to PM. Coder to Leader. Maker to Manager."
]

const quickFacts = [
  ['Role', 'Proj Manager + Engineer'],
  ['Location', 'Chennai, India'],
  ['Experience', '7 years'],
  ['Team', '8 direct reports'],
]

const index = [
  { p: '2', t: 'Op-Ed: A Person, Not a Resume' },
  { p: '3', t: 'Tech Desk: The Stack Report' },
  { p: '4', t: 'Career Beat: seven + Years' },
  { p: '5', t: 'Lab Report: Self-Hosting & Servers' },
  { p: '6', t: 'Photo Desk: Patterns & Doors' },
  { p: '7', t: "Books: This Week's Reads" },
  { p: '8', t: 'Travel: Stamps in the Passport' },
  { p: '9', t: 'Off-Duty: Cabinet of Curiosities' },
  { p: '10', t: 'Classifieds: Hire · Wanted · Lost' },
]

export default function Masthead() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  const dateStr = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`
  
  // Randomly select a headline on each render
  const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)]
  const headlineParts = randomHeadline.split('. ')
  const lastPart = headlineParts.pop()
  const firstParts = headlineParts.join('. ') + (headlineParts.length > 0 ? '.' : '')

  return (
    <header style={{ borderBottom: '3px solid var(--fg)' }}>
      {/* Top nav strip */}
      <div style={{ borderBottom: '1px solid var(--fg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 32px', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg)' }}>
        <span style={{ color: 'var(--accent)', fontWeight: 700 }}>★ FIRST EDITION</span>
        <nav className="hidden md:flex" style={{ gap: '20px' }}>
          {navItems.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ textDecoration: 'none', color: 'var(--fg)' }}>{item}</a>
          ))}
        </nav>
        <span className="hidden md:flex">hello@prasannar.com</span>
        <span className="md:hidden"><MobileNav /></span>
      </div>

      {/* Date / Vol / Title strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '10px 32px 8px', borderBottom: '1px solid rgba(14,14,12,0.25)' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.05em', color: 'var(--fg)' }}>
          <div style={{ fontWeight: 700 }}>{dateStr}</div>
          <div style={{ marginTop: 2 }}>Vol. PR · No. 69 · </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(52px, 9vw, 110px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.02em', color: 'var(--fg)', userSelect: 'none' }}>
            THE PR GAZETTE
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '0.25em', color: 'var(--fg)', marginTop: '6px', textTransform: 'uppercase' }}>
            ◆ &nbsp; Independent · Opinionated · Occasionally Correct &nbsp; ◆
          </div>
        </div>
        <WeatherWidget />
      </div>

      {/* Red + black rule */}
      <div style={{ height: '3px', background: 'var(--accent)', margin: '0' }} />
      <div style={{ height: '1px', background: 'var(--fg)', margin: '0' }} />

      {/* Lead 3-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(300px, 2fr) minmax(250px, 1fr)', columnGap: 0, borderBottom: '2px solid var(--fg)' }} className="responsive-grid">
        {/* Left */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: 'clamp(16px, 3vw, 24px) clamp(16px, 3vw, 28px)' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>Today&apos;s Index</div>
          {index.map(({ p, t }) => (
            <div key={p} style={{ display: 'flex', gap: 'clamp(6px, 1.5vw, 10px)', borderBottom: '1px dotted rgba(14,14,12,0.2)', padding: 'clamp(4px, 1vw, 6px) 0', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 'clamp(8px, 1.5vw, 9px)', color: 'var(--accent)', fontWeight: 700, minWidth: 'clamp(16px, 3vw, 20px)', flexShrink: 0 }}>p.{p}</span>
              <span style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(10px, 2vw, 12px)', color: 'var(--fg)', lineHeight: 1.4, wordBreak: 'break-word' }}>{t}</span>
            </div>
          ))}
          {/* Quick Facts */}
          <div style={{ marginTop: '20px', borderTop: '1px solid rgba(14,14,12,0.2)', paddingTop: '14px' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--sepia)', marginBottom: '8px' }}>Quick Facts</div>
            {quickFacts.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: 'clamp(3px, 1vw, 4px) 0', fontFamily: '"JetBrains Mono", monospace', fontSize: 'clamp(8px, 1.5vw, 10px)', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.05em', wordBreak: 'break-word' }}>{k}</span>
                <span style={{ color: 'var(--fg)', fontWeight: 700, wordBreak: 'break-word' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Centre */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: 'clamp(20px, 4vw, 28px) clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 4.5vw, 54px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 16px', borderBottom: '2px solid var(--fg)', paddingBottom: '16px' }}>
              {firstParts && (
                <>
                  {firstParts.split('.').map((part, index) => (
                    <span key={index}>
                      {part.trim()}.
                      {index < firstParts.split('.').length - 2 && <br />}
                    </span>
                  ))}
                  <br />
                </>
              )}
              <span style={{ color: 'var(--accent)' }}>{lastPart}</span>
            </h1>
            <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(12px, 2.5vw, 15px)', fontStyle: 'italic', lineHeight: 1.5, color: 'var(--fg)', margin: '0 0 clamp(12px, 2vw, 18px)', borderBottom: '1px solid rgba(14,14,12,0.15)', paddingBottom: 'clamp(12px, 2vw, 16px)', wordBreak: 'break-word' }}>
              PR leads an eight-person FinTech team by day, ships POCs by night, and reverse-engineers perfumes on the weekend.
            </p>
            <p className="drop-cap" style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(11px, 2.2vw, 14px)', lineHeight: 1.7, color: 'var(--fg)', margin: 0, columns: 'auto', columnGap: 'clamp(15px, 3vw, 20px)', columnRule: '1px solid rgba(14,14,12,0.15)', wordBreak: 'break-word' }}>
              Prasanna Rajendran has spent seven + years inside the machinery of non-banking finance — writing the code, then leading the team that writes the code, then fighting the fires that break out when code meets production. This is his front page.
            </p>
          </div>
          <div style={{ marginTop: 'clamp(16px, 3vw, 20px)', borderTop: '1px solid var(--fg)', paddingTop: 'clamp(6px, 1.5vw, 8px)', fontFamily: '"JetBrains Mono", monospace', fontSize: 'clamp(8px, 1.5vw, 10px)', color: 'var(--accent)', fontStyle: 'italic', wordBreak: 'break-word' }}>
            Continued on Op-Ed, p. 2 →
          </div>
        </div>

        {/* Right */}
        <div style={{ padding: 'clamp(16px, 3vw, 24px) clamp(16px, 3vw, 28px)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 'clamp(8px, 1.5vw, 9px)', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: 'clamp(8px, 2vw, 12px)', wordBreak: 'break-word' }}>About the Editor</div>
          <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(10px, 2vw, 13px)', lineHeight: 1.65, color: 'var(--fg)', margin: 0, wordBreak: 'break-word' }}>
            Prasanna Rajendran has spent the better part of a decade inside the circuitry of non-banking finance—first writing code, then shaping the systems around it, and eventually taking responsibility for what happens when those systems meet the real world. 
            {/* He operates at the intersection of engineering and execution, where decisions carry weight and timelines are rarely forgiving. */}
          </p>
          {/* Portrait */}
          <div style={{ marginTop: 'clamp(16px, 3vw, 24px)', flex: 1, minHeight: 'clamp(150px, 25vw, 200px)', maxHeight: 'clamp(200px, 35vw, 300px)', border: '1px solid rgba(14,14,12,0.2)', overflow: 'hidden', position: 'relative' }}>
            <Image src="/pr-masthead-still.png" alt="Prasanna Rajendran" fill style={{ objectFit: 'cover', filter: 'grayscale(0.9) sepia(0.45) contrast(1.1) brightness(0.85)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(14,14,12,0.6))', padding: '12px 8px 6px' }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'rgba(244,239,230,0.8)', letterSpacing: '.08em' }}>Chennai · 2024</span>
            </div>
          </div>
        </div>

      </div>
      <SectionFiller watermark="GAZETTE" footnote={`Vol. PR · No. 69 · Chennai Edition · ${getMonthYear()}`} page="1" />
    </header>
  )
}
