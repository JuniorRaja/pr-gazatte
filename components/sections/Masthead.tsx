import SectionFiller from '@/components/SectionFiller'
import MobileNav from '@/components/MobileNav'
import WeatherWidget from '@/components/WeatherWidget'
import { getMonthYear } from '@/utils/date'

const DAYS = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']
const MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']

const navItems = ['Op-Ed', 'Tech', 'Career', 'Lab', 'Photos', 'Books', 'Travel', 'Hobbies', 'Contact']

const quickFacts = [
  ['Role', 'Deputy PM + Engineer'],
  ['Location', 'Chennai, India'],
  ['Experience', '6.5 years'],
  ['Team', '8 direct reports'],
]

const index = [
  { p: '2', t: 'Op-Ed: A Person, Not a Resume' },
  { p: '3', t: 'Tech Desk: The Stack Report' },
  { p: '4', t: 'Career Beat: Six and a Half Years' },
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
          <div style={{ marginTop: 2 }}>Vol. PR · No. 27 · Chennai Edition</div>
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
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 5fr 4fr', columnGap: 0, borderBottom: '2px solid var(--fg)' }}>
        {/* Left */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '24px 28px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px' }}>About the Editor</div>
          <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', lineHeight: 1.65, color: 'var(--fg)', margin: 0 }}>
            Prasanna Rajendran has spent six and a half years inside the machinery of non-banking finance — writing the code, then leading the team that writes the code, then fighting the fires that break out when code meets production.
          </p>
          <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', lineHeight: 1.65, color: 'var(--fg)', margin: '12px 0 0' }}>This is his front page.</p>
          <div style={{ marginTop: '24px', borderTop: '1px solid rgba(14,14,12,0.2)', paddingTop: '14px' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--sepia)', marginBottom: '8px' }}>Quick Facts</div>
            {quickFacts.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: '4px 0', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>
                <span style={{ color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{k}</span>
                <span style={{ color: 'var(--fg)', fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Centre */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(38px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 16px', borderBottom: '2px solid var(--fg)', paddingBottom: '16px' }}>
              Writes Code.<br />Leads Teams.<br /><span style={{ color: 'var(--accent)' }}>Makes Things Ship.</span>
            </h1>
            <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '15px', fontStyle: 'italic', lineHeight: 1.5, color: 'var(--fg)', margin: '0 0 18px', borderBottom: '1px solid rgba(14,14,12,0.15)', paddingBottom: '16px' }}>
              PR leads an eight-person FinTech team by day, ships POCs by night, and reverse-engineers perfumes on the weekend.
            </p>
            <p className="drop-cap" style={{ fontFamily: '"Source Serif 4", serif', fontSize: '14px', lineHeight: 1.7, color: 'var(--fg)', margin: 0, columns: 2, columnGap: '20px', columnRule: '1px solid rgba(14,14,12,0.15)' }}>
              Prasanna Rajendran has spent six and a half years inside the machinery of non-banking finance — writing the code, then leading the team that writes the code, then fighting the fires that break out when code meets production. This is his front page.
            </p>
          </div>
          <div style={{ marginTop: '20px', borderTop: '1px solid var(--fg)', paddingTop: '8px', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--accent)', fontStyle: 'italic' }}>
            Continued on Op-Ed, p. 2 →
          </div>
        </div>

        {/* Right */}
        <div style={{ padding: '24px 28px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>Today&apos;s Index</div>
          {index.map(({ p, t }) => (
            <div key={p} style={{ display: 'flex', gap: '10px', borderBottom: '1px dotted rgba(14,14,12,0.2)', padding: '6px 0', alignItems: 'baseline' }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', fontWeight: 700, minWidth: '20px' }}>p.{p}</span>
              <span style={{ fontFamily: '"Source Serif 4", serif', fontSize: '12px', color: 'var(--fg)', lineHeight: 1.4 }}>{t}</span>
            </div>
          ))}
          {/* Portrait placeholder */}
          <div style={{ marginTop: '20px', height: '160px', border: '1px solid rgba(14,14,12,0.2)', overflow: 'hidden', position: 'relative', background: 'rgba(184,167,146,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'var(--sepia)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Portrait · Chennai 2024</span>
          </div>
        </div>
      </div>
      <SectionFiller watermark="GAZETTE" footnote={`Vol. PR · No. 27 · Chennai Edition · ${getMonthYear()}`} page="1" />
    </header>
  )
}
