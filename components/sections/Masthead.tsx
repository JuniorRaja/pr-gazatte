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
  ['Role', 'Project Manager + Engineer'],
  ['Location', 'Chennai, India'],
  ['Experience', '7+ years in FinTech'],
  ['Focus', 'Reliable systems & calmer teams'],
  ['Curiosities', 'Photography, books, rabbit holes'],
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
  const firstParts = headlineParts.length > 0 ? headlineParts.join('. ') + '.' : ''

  return (
    <header style={{ borderBottom: '3px solid var(--fg)' }}>
      {/* Top nav strip - responsive padding */}
      <div className="section-padding-x" style={{ borderBottom: '1px solid var(--fg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px', paddingBottom: '6px', fontSize: 'clamp(9px, 2vw, 10px)', fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg)' }}>
        <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 'clamp(9px, 2vw, 10px)' }}>★ FIRST EDITION</span>
        <nav className="hidden md:flex" style={{ gap: '20px' }}>
          {navItems.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ textDecoration: 'none', color: 'var(--fg)' }}>{item}</a>
          ))}
        </nav>
        <span className="hidden md:flex">hello@prasannar.com</span>
        <span className="md:hidden"><MobileNav /></span>
      </div>

      {/* Date / Vol / Title strip - stack on mobile */}
      <div className="section-padding-x" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '10px', paddingBottom: '8px', borderBottom: '1px solid rgba(14,14,12,0.25)', gap: '12px' }}>
        {/* Desktop: title center, date left + weather right below */}
        <div className="hidden md:block" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(52px, 9vw, 110px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.02em', color: 'var(--fg)', userSelect: 'none' }}>
              THE PR GAZETTE
            </div>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', letterSpacing: '0.25em', color: 'var(--fg)', marginTop: '6px', textTransform: 'uppercase' }}>
              ◆ &nbsp; Independent · Opinionated · Occasionally Correct &nbsp; ◆
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '8px' }}>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '10px', letterSpacing: '.05em', color: 'var(--fg)' }}>
              <div style={{ fontWeight: 700 }}>{dateStr}</div>
              <div style={{ marginTop: 2 }}>Vol. PR · No. 1</div>
            </div>
            <WeatherWidget />
          </div>
        </div>
        
        {/* Mobile: title, then date left + weather right below */}
        <div className="md:hidden" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(38px, 12vw, 72px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.02em', color: 'var(--fg)', userSelect: 'none' }}>
              THE PR GAZETTE
            </div>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 'clamp(7px, 2vw, 9px)', letterSpacing: '0.2em', color: 'var(--fg)', marginTop: '8px', textTransform: 'uppercase' }}>
              ◆ Independent · Opinionated ◆
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '8px' }}>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', letterSpacing: '.05em', color: 'var(--fg)' }}>
              <div style={{ fontWeight: 700 }}>{dateStr}</div>
              <div style={{ marginTop: 2 }}>Vol. PR · No. 1</div>
            </div>
            <WeatherWidget />
          </div>
        </div>
      </div>

      {/* Red + black rule */}
      <div style={{ height: '3px', background: 'var(--accent)', margin: '0' }} />
      <div style={{ height: '1px', background: 'var(--fg)', margin: '0' }} />

      {/* Lead 3-column grid - responsive */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(300px, 2fr) minmax(250px, 1fr)', columnGap: 0, borderBottom: '2px solid var(--fg)' }} className="responsive-grid">
        {/* Left - Today's Index */}
        <div className="section-padding-x section-padding-y" style={{ borderRight: '1px solid rgba(14,14,12,0.2)' }}>
          <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>Today&apos;s Index</div>
          {index.map(({ p, t }) => (
            <div key={p} style={{ display: 'flex', gap: '8px', borderBottom: '1px dotted rgba(14,14,12,0.2)', padding: '6px 0', alignItems: 'baseline' }}>
              <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 'clamp(9px, 2vw, 10px)', color: 'var(--accent)', fontWeight: 700, minWidth: '22px', flexShrink: 0 }}>p.{p}</span>
              <span style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(12px, 2.5vw, 13px)', color: 'var(--fg)', lineHeight: 1.4 }}>{t}</span>
            </div>
          ))}
          
          {/* Featured Inside */}
          <div style={{ marginTop: '24px', borderTop: '2px solid var(--fg)', paddingTop: '14px' }}>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '14px' }}>Featured Inside</div>
            
            {/* Tech Feature */}
            <div>
              <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 'clamp(9px, 2vw, 10px)', color: 'var(--accent)', fontWeight: 700, marginBottom: '4px' }}>p.3 · Tech</div>
              <h3 style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 700, lineHeight: 1.2, color: 'var(--fg)', margin: '0 0 6px' }}>The Stack Report.</h3>
              <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(11px, 2.3vw, 12px)', lineHeight: 1.5, color: 'var(--fg)', margin: '0 0 6px' }}>.NET, gRPC, Redis, YARP. Built by a man who ships first and documents when the fire is out.</p>
              <a href="#tech" style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', color: 'var(--accent)', textDecoration: 'none', fontStyle: 'italic' }}>Continue reading → p.3</a>
            </div>
          </div>
          
          {/* Quick Facts - hidden on mobile */}
          <div className="hidden md:block" style={{ marginTop: '20px', borderTop: '1px solid rgba(14,14,12,0.2)', paddingTop: '14px' }}>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--sepia)', marginBottom: '8px' }}>Quick Facts</div>
            {quickFacts.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: '5px 0', fontFamily: '"Barlow Condensed", sans-serif', fontSize: 'clamp(9px, 2vw, 10px)' }}>
                <span style={{ color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{k}</span>
                <span style={{ color: 'var(--fg)', fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Centre - Main headline */}
        <div className="section-padding-x section-padding-y" style={{ borderRight: '1px solid rgba(14,14,12,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(24px, 5.5vw, 54px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 16px', borderBottom: '2px solid var(--fg)', paddingBottom: '16px' }}>
              {firstParts && (
                <>
                  {firstParts}
                  <br />
                </>
              )}
              <span style={{ color: 'var(--accent)' }}>{lastPart}</span>
            </h1>
            <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(13px, 3vw, 16px)', fontStyle: 'italic', lineHeight: 1.5, color: 'var(--fg)', margin: '0 0 16px', borderBottom: '1px solid rgba(14,14,12,0.15)', paddingBottom: '16px' }}>
              By day, I lead a FinTech engineering team that moves real money. By night, I ship experiments. On weekends, I chase whatever rabbit hole looks interesting. Same operating system, different tabs.
            </p>
            <p className="drop-cap" style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(13px, 2.8vw, 15px)', lineHeight: 1.7, color: 'var(--fg)', margin: '0 0 16px' }}>
              Prasanna Rajendran has spent seven years inside the machinery of non-banking finance: writing the code, then leading the team that writes it, then calmly putting out the fires when that code meets reality at 3 a.m. He&apos;s the kind of person who fixes the bug before filing the ticket. The one reading RFCs on a Sunday not because anyone asked, but because something felt unfinished. Somewhere around year four, he learned that panic is the least efficient response when things break.
            </p>
            <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(13px, 2.8vw, 15px)', lineHeight: 1.7, color: 'var(--fg)', margin: '0' }}>
              He keeps a bookshelf that has opinions. He drinks coffee that he has also researched. He has certifications in things most people have not heard of and is quietly working on a few more. None of this is the résumé. All of it is the person.
            </p>
            
            {/* Highlighted Quote */}
            <blockquote style={{ margin: '24px 0 0', padding: '20px', background: 'rgba(139, 34, 35, 0.06)', borderTop: '2px solid var(--accent)', borderBottom: '1px solid rgba(139, 34, 35, 0.2)' }}>
              <p style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(15px, 3.2vw, 18px)', fontStyle: 'italic', lineHeight: 1.6, color: 'var(--fg)', margin: '0 0 12px', fontWeight: 600 }}>
                &quot;Learning something new has never felt optional to me. Curiosity isn&apos;t a hobby; it&apos;s how I stay useful and alive.&quot;
              </p>
              <footer style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 'clamp(9px, 2vw, 10px)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                Prasanna Rajendran · Editor-in-Chief
              </footer>
            </blockquote>
          </div>
          <div style={{ marginTop: '20px', borderTop: '1px solid var(--fg)', paddingTop: '8px', fontFamily: '"Barlow Condensed", sans-serif', fontSize: 'clamp(9px, 2vw, 10px)', color: 'var(--accent)', fontStyle: 'italic' }}>
            (Continued on Op-Ed, p. 2)
          </div>
        </div>

        {/* Right - About the Editor */}
        <div className="section-padding-x section-padding-y" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 'clamp(8px, 1.8vw, 9px)', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px' }}>About the Editor</div>
          <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(12px, 2.5vw, 14px)', lineHeight: 1.65, color: 'var(--fg)', margin: 0 }}>
            Prasanna Rajendran has spent the better part of a decade inside the circuitry of non-banking finance (first writing code, then shaping the systems around it, and eventually taking responsibility for what happens when those systems meet the real world). 
          </p>
          {/* Portrait */}
          <div style={{ marginTop: '20px', flex: 1, minHeight: '400px', maxHeight: '400px', border: '1px solid rgba(14,14,12,0.2)', overflow: 'hidden', position: 'relative' }} className="md:min-h-[150px] md:max-h-[300px]">
            <Image src="/pr-masthead-still-profes.webp" alt="Prasanna Rajendran" fill style={{ objectFit: 'cover', objectPosition: 'center 20%', filter: 'grayscale(0.9) sepia(0.45) contrast(1.1) brightness(0.85)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(14,14,12,0.6))', padding: '12px 8px 6px' }}>
              <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '8px', color: 'rgba(244,239,230,0.8)', letterSpacing: '.08em' }}>Chennai · 2024</span>
            </div>
          </div>
          
          {/* Featured Inside */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '2px solid var(--fg)' }}>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '14px' }}>Featured Inside</div>
            
            {/* Books Feature */}
            <div>
              <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 'clamp(9px, 2vw, 10px)', color: 'var(--accent)', fontWeight: 700, marginBottom: '4px' }}>p.7 · Books</div>
              <h3 style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 700, lineHeight: 1.2, color: 'var(--fg)', margin: '0 0 6px' }}>The Bookshelf Speaks First.</h3>
              <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(11px, 2.3vw, 12px)', lineHeight: 1.5, color: 'var(--fg)', margin: '0 0 6px' }}>47 books and counting. Three open right now. The shelf is not a display; it is a working document.</p>
              <a href="#books" style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', color: 'var(--accent)', textDecoration: 'none', fontStyle: 'italic' }}>Continue reading → p.7</a>
            </div>
          </div>
        </div>

      </div>
      <SectionFiller watermark="GAZETTE" footnote={`Vol. PR · No. 1 · Chennai Edition · ${getMonthYear()}`} page="1" />
    </header>
  )
}
