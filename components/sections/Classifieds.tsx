import Image from 'next/image'
import SectionFiller from '@/components/SectionFiller'

const contacts = [
  { label: 'Email',     value: 'hello@prasannar.com',           href: 'mailto:hello@prasannar.com',                primary: true },
  { label: 'LinkedIn',  value: '/in/rajendranprasanna',         href: 'https://linkedin.com/in/rajendranprasanna', primary: false },
  { label: 'GitHub',    value: '@JuniorRaja',                   href: 'https://github.com/JuniorRaja',             primary: false },
  { label: 'Instagram', value: '@prasanna.it.seems',            href: 'https://instagram.com/prasanna.it.seems',  primary: false },
]

const status = [
  ['Location',   'Chennai, India'],
  ['Role',       'Dy. PM + Engineer'],
  ['Years',      '7+ in FinTech Solutions'],
  ['Open to',    'Interesting offers'],
]

export default function Classifieds() {
  return (
    <section id="contact" style={{ borderBottom: '3px solid var(--fg)' }}>
      <div style={{ background: 'var(--fg)', color: '#F4EFE6', padding: '5px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Contact · Page 10</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>DON&apos;T BE A STRANGER</span>
      </div>

      <div style={{ padding: '40px 32px 36px' }}>
        {/* 4-col: editorial | divider | reach+status | divider | photo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1px 1fr 1px 1fr 1px 1.2fr', gap: 0, marginBottom: '36px' }}>

          {/* Col 1 — Editor's note */}
          <div style={{ paddingRight: '28px' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.18em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>Say Hello.</div>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 20px' }}>
              Drop a line.<br /><span style={{ color: 'var(--accent)' }}>Make contact.</span>
            </h3>
            <blockquote style={{ margin: '0', padding: '14px 16px', borderLeft: '3px solid var(--accent)', background: 'rgba(193,39,45,0.04)' }}>
              <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13.5px', lineHeight: 1.72, fontStyle: 'italic', color: 'var(--fg)', margin: '0 0 10px' }}>
                &ldquo;Prasanna Rajendran does not have a dramatic origin story. No garage startup, no dropout mythology. Just a man in Chennai who got very good at one thing, then quietly got good at several others.&rdquo;
              </p>
              <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13.5px', lineHeight: 1.72, fontStyle: 'italic', color: 'var(--fg)', margin: 0 }}>
                &ldquo;The code still compiles. The curiosity never shipped a bug.&rdquo;
              </p>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.12em', marginTop: '10px' }}>— The Editor</div>
            </blockquote>
          </div>

          {/* Divider */}
          <div style={{ background: 'rgba(14,14,12,0.15)' }} />

          {/* Col 2 — Reach Me */}
          <div style={{ padding: '0 20px' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.18em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>Reach Me</div>
            {contacts.map(({ label, value, href, primary }) => (
              primary
                ? <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-link" style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid rgba(14,14,12,0.1)', padding: '8px 0', textDecoration: 'none', gap: '2px' }}>
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{label}</span>
                    <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '13px', fontWeight: 700, color: 'var(--accent)' }}>{value}</span>
                  </a>
                : <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link">
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{label}</span>
                    <span className="social-value" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--fg)', transition: 'color 0.15s' }}>
                      {value}<span className="social-arrow">↗</span>
                    </span>
                  </a>
            ))}
          </div>

          {/* Divider */}
          <div style={{ background: 'rgba(14,14,12,0.15)' }} />

          {/* Col 3 — Current Status */}
          <div style={{ padding: '0 20px' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.18em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>Current Status</div>
            {status.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: '8px 0', gap: '2px' }}>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{k}</span>
                <span style={{ fontFamily: '"Source Serif 4", serif', fontSize: '12px', color: 'var(--fg)', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2a7a3b', flexShrink: 0 }} />
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: '#2a7a3b', fontWeight: 700, letterSpacing: '.06em' }}>AVAILABLE</div>
            </div>
            <a href="mailto:hello@prasannar.com" className="cta-btn" style={{ display: 'block', marginTop: '16px', fontFamily: '"Playfair Display", serif', fontSize: '13px', fontWeight: 700, color: '#F4EFE6', padding: '10px 16px', textDecoration: 'none', letterSpacing: '.02em', textAlign: 'center' }}>
              Write to the Editor →
            </a>
          </div>

          {/* Divider */}
          <div style={{ background: 'rgba(14,14,12,0.15)' }} />

          {/* Col 4 — Photo */}
          <div style={{ position: 'relative', minHeight: '320px', overflow: 'hidden', border: '1px solid rgba(14,14,12,0.15)' }}>
            <Image
              src="/pr-contact-still.png"
              alt="Prasanna Rajendran"
              fill
              style={{ objectFit: 'cover', filter: 'grayscale(0.85) sepia(0.4) contrast(1.1) brightness(0.88)' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(14,14,12,0.7))', padding: '24px 10px 8px' }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'rgba(244,239,230,0.75)', letterSpacing: '.08em' }}>Prasanna R. · Chennai</span>
            </div>
          </div>

        </div>

        {/* Bottom colophon bar */}
        <div style={{ borderTop: '2px solid var(--fg)', paddingTop: '20px' }}>
          <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: '12px', fontStyle: 'italic', color: 'var(--sepia)', lineHeight: 1.6 }}>
            The PR Gazette · Chennai · Est. 1998 · Vol. PR · No. 69
          </div>
        </div>
      </div>

      <SectionFiller watermark="CONTACT" footnote="Classifieds · p. 10 · hello@prasannar.com · Chennai · Est. 1998" page="10" />
    </section>
  )
}
