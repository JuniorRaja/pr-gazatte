import SectionFiller from '@/components/SectionFiller'
import { getFormattedShortDate } from '@/utils/date'
import Image from 'next/image'

const tags = ['Career', 'Technology', 'Identity', 'First Person']
const coverage = [
  '→ Six years of FinTech engineering',
  '→ Team leadership & project delivery',
  '→ Self-hosted infrastructure projects',
  '→ Photography across 9 countries',
  '→ A bookshelf that keeps growing',
  '→ Curiosities, collected obsessively',
]

export default function OpEd() {
  return (
    <section id="op-ed" style={{ borderBottom: '2px solid var(--fg)' }}>
      <div style={{ background: 'var(--fg)', color: 'var(--bg)', padding: '5px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Op-Ed · Page 2</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.1em' }}>Opinion &amp; Analysis</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', columnGap: 0 }}>
        {/* Left */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '32px 28px' }}>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '11px', fontStyle: 'italic', color: 'var(--sepia)', letterSpacing: '.05em', marginBottom: '8px' }}>by</div>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 700, lineHeight: 1.2, color: 'var(--fg)' }}>Prasanna<br />Rajendran</div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '6px' }}>Editor-in-Chief</div>
          {/* Portrait */}
          <div style={{ marginTop: '20px', height: '65vh', border: '1px solid rgba(14,14,12,0.2)', overflow: 'hidden', position: 'relative' }}>
            <Image src="/pr-oped-still.png" alt="Prasanna Rajendran" fill style={{ objectFit: 'cover', filter: 'grayscale(0.9) sepia(0.45) contrast(1.1) brightness(0.85)' }} />
          </div>
        </div>

        {/* Centre */}
        <div style={{ padding: '32px 32px', borderRight: '1px solid rgba(14,14,12,0.2)' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 20px', borderBottom: '2px solid var(--fg)', paddingBottom: '16px' }}>
            A Person,<br /><span style={{ color: 'var(--accent)' }}>Not a Résumé.</span>
          </h2>
          <blockquote style={{ margin: '0 0 24px', padding: '20px 24px', borderLeft: '4px solid var(--accent)', background: 'rgba(193,39,45,0.04)' }}>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(18px, 2.5vw, 26px)', fontStyle: 'italic', fontWeight: 700, lineHeight: 1.3, color: 'var(--fg)', margin: 0 }}>
              &ldquo;I build things, break things, and find the pattern in between.&rdquo;
            </p>
          </blockquote>
          <div style={{ columns: 2, columnGap: '28px', columnRule: '1px solid rgba(14,14,12,0.15)' }}>
            <p className="drop-cap" style={{ fontFamily: '"Source Serif 4", serif', fontSize: '14.5px', lineHeight: 1.72, color: 'var(--fg)', margin: '0 0 16px' }}>
              Most portfolios are résumés with better fonts — the same story, just wearing nicer shoes. This one is a newspaper because a person is not a list of skills — a person is a beat. The tech beat clicks in keystrokes and caffeine. The lab beat smells like curiosity (and the occasional burnt experiment). The senses beat notices what others scroll past. The trails beat wanders where documentation politely stops. Turn the page — there's always more than fits above the fold.
            </p>
            <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '14.5px', lineHeight: 1.72, color: 'var(--fg)', margin: 0 }}>
              The work happens in layers: architecture at 10 a.m., careful and optimistic; pull request diplomacy at 2; production chaos at 4, where confidence meets reality; and midnight tinkering, where ideas roam unsupervised. None of these layers are separable — and frankly, they wouldn't behave if you tried. This paper doesn't pretend otherwise.
            </p>
          </div>
          <div style={{ marginTop: '20px', borderTop: '1px solid var(--fg)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--sepia)' }}>
            <span>{getFormattedShortDate()}</span>
            <span style={{ color: 'var(--accent)' }}>Continued on p. 3 →</span>
          </div>
        </div>

        {/* Right */}
        <div style={{ padding: '32px 28px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '14px' }}>The Editor&apos;s Note</div>
          <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', fontStyle: 'italic', lineHeight: 1.65, color: 'var(--fg)', margin: '0 0 16px' }}>
            &ldquo;This is not a self-promotion. This is a record. The record of someone who learned to code alone, then learned to lead, then decided to keep both skills sharp simultaneously.&rdquo;
          </p>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--sepia)' }}>— P.R., Editor</div>
          
          <div style={{ marginTop: '24px', border: '1px solid rgba(14,14,12,0.2)', padding: '14px', background: 'rgba(184,167,146,0.08)' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px' }}>Filed under</div>
            {tags.map(tag => (
              <div key={tag} style={{ fontFamily: '"Source Serif 4", serif', fontSize: '12px', color: 'var(--fg)', borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: '4px 0' }}>{tag}</div>
            ))}
          </div>
          
          <div style={{ marginTop: '28px', borderTop: '1px solid rgba(14,14,12,0.15)', paddingTop: '16px' }}>
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '13px', fontWeight: 700, color: 'var(--fg)', marginBottom: '10px', letterSpacing: '.02em' }}>What This Paper Covers</div>
            {coverage.map((item, i) => (
              <div key={i} style={{ fontFamily: '"Source Serif 4", serif', fontSize: '12px', lineHeight: 1.55, color: 'var(--fg)', padding: '4px 0', borderBottom: '1px dotted rgba(14,14,12,0.1)' }}>{item}</div>
            ))}
          </div>
        </div>
      </div>
      <SectionFiller watermark="OPINION" footnote="Op-Ed · p. 2 · All opinions are those of the Editor" page="2" />
    </section>
  )
}
