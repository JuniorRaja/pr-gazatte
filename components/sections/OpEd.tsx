import SectionFlag from '@/components/SectionFlag'
import SectionFiller from '@/components/SectionFiller'
import { getFormattedShortDate } from '@/utils/date'
import Image from 'next/image'

const tags = ['Career', 'Technology', 'Identity', 'First Person']
const coverage = [
  '→ Seven plus years of FinTech engineering',
  '→ Team leadership & project delivery',
  '→ Self-hosted infrastructure projects',
  '→ Photography across 9 countries',
  '→ A bookshelf that keeps growing',
  '→ Curiosities, collected obsessively',
]

export default function OpEd() {
  return (
    <section id="op-ed" style={{ borderBottom: '2px solid var(--fg)' }}>
      <SectionFlag pageLabel="Op-Ed · Page 2" subtitle="Opinion & Analysis" />

      {/* Responsive grid: 3-col desktop → single column mobile */}
      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', columnGap: 0 }}>
        
        {/* Left - Byline & Portrait */}
        <div className="section-padding-x section-padding-y" style={{ borderRight: '1px solid rgba(14,14,12,0.2)' }}>
          <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: '11px', fontStyle: 'italic', color: 'var(--sepia)', letterSpacing: '.05em', marginBottom: '8px' }}>by</div>
          <div style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(20px, 4vw, 22px)', fontWeight: 700, lineHeight: 1.2, color: 'var(--fg)' }}>
            Prasanna<br />Rajendran
          </div>
          <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', color: 'var(--accent)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '6px' }}>Editor-in-Chief</div>
          
          {/* Portrait - responsive height */}
          <div style={{ marginTop: '20px', height: 'clamp(300px, 50vh, 600px)', border: '1px solid rgba(14,14,12,0.2)', overflow: 'hidden', position: 'relative' }}>
            <Image src="/pr-oped-still.webp" alt="Prasanna Rajendran" fill style={{ objectFit: 'cover', filter: 'grayscale(0.9) sepia(0.45) contrast(1.1) brightness(0.85)' }} />
          </div>
        </div>

        {/* Centre - Main content */}
        <div className="section-padding-x section-padding-y" style={{ borderRight: '1px solid rgba(14,14,12,0.2)' }}>
          <h2 style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 20px', borderBottom: '2px solid var(--fg)', paddingBottom: '16px' }}>
            A Person,<br /><span style={{ color: 'var(--accent)' }}>Not a Résumé.</span>
          </h2>
          
          <blockquote style={{ margin: '0 0 24px', padding: 'clamp(16px, 3vw, 20px) clamp(18px, 3.5vw, 24px)', borderTop: '2px solid var(--accent)', borderBottom: '1px solid rgba(193,39,45,0.15)', background: 'rgba(193,39,45,0.04)' }}>
            <p style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(16px, 3.5vw, 26px)', fontStyle: 'italic', fontWeight: 700, lineHeight: 1.3, color: 'var(--fg)', margin: 0 }}>
              &ldquo;I build things, break things, and find the pattern in between.&rdquo;
            </p>
          </blockquote>
          
          {/* Body text - columns on desktop, single on mobile */}
          <div className="content-spacing" style={{ columns: 'auto', columnGap: '28px', columnRule: '1px solid rgba(14,14,12,0.15)' }}>
            <p className="drop-cap" style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(14px, 2.8vw, 15px)', lineHeight: 1.7, color: 'var(--fg)', margin: '0 0 16px' }}>
              Most portfolios are just résumés wearing better fonts. This one is a newspaper because a person is more than a list of skills.
            </p>
            <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(14px, 2.8vw, 15px)', lineHeight: 1.7, color: 'var(--fg)', margin: '0 0 16px' }}>
              It&apos;s the rhythm that matters. The tech beat clicks in keystrokes and caffeine. The lab beat smells like curiosity and the occasional burnt experiment. The production beat: that one you feel in your stomach at 4 a.m. when confidence meets reality.
            </p>
            <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(14px, 2.8vw, 15px)', lineHeight: 1.7, color: 'var(--fg)', margin: '0 0 16px' }}>
              My days layer like this: architecture in the morning, diplomacy in the afternoon, and midnight tinkering where the best ideas still happen unsupervised. None of these layers are clean. And I&apos;ve stopped pretending they should be.
            </p>
            <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(14px, 2.8vw, 15px)', lineHeight: 1.7, color: 'var(--fg)', margin: 0 }}>
              I&apos;ve spent seven-plus years in FinTech engineering, building systems, leading teams, and shipping infrastructure that has to work when it matters. Along the way I picked up photography across nine countries, a growing bookshelf that refuses to stay organized, and an unhealthy tolerance for unsolved problems. This isn&apos;t self-promotion. It&apos;s just the long version of me.
            </p>
          </div>
          
          <div style={{ marginTop: '20px', borderTop: '1px solid var(--fg)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontFamily: '"Barlow Condensed", sans-serif', fontSize: 'clamp(9px, 2vw, 10px)', color: 'var(--sepia)' }}>
            <span>{getFormattedShortDate()}</span>
            <span style={{ color: 'var(--accent)' }}>Continued on p. 3 →</span>
          </div>
        </div>

        {/* Right - Editor's Note */}
        <div className="section-padding-x section-padding-y">
          <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '14px' }}>The Editor&apos;s Note</div>
          
          <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(12px, 2.5vw, 13px)', fontStyle: 'italic', lineHeight: 1.65, color: 'var(--fg)', margin: '0 0 16px' }}>
            &ldquo;This is not a self-promotion. This is a record. Of someone who learned to code alone, then learned to lead, then decided both skills had to stay sharp at the same time.&rdquo;
          </p>
          <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', color: 'var(--sepia)' }}>P.R.</div>
          
          <div className="hide-mobile" style={{ marginTop: '24px', border: '1px solid rgba(14,14,12,0.2)', padding: '14px', background: 'rgba(184,167,146,0.08)' }}>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px' }}>Filed under</div>
            {tags.map(tag => (
              <div key={tag} style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(11px, 2.2vw, 12px)', color: 'var(--fg)', borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: '4px 0' }}>{tag}</div>
            ))}
          </div>
          
          <div className="hide-mobile" style={{ marginTop: '28px', borderTop: '1px solid rgba(14,14,12,0.15)', paddingTop: '16px' }}>
            <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 700, color: 'var(--fg)', marginBottom: '10px', letterSpacing: '.02em' }}>What This Paper Covers</div>
            {coverage.map((item, i) => (
              <div key={i} style={{ fontFamily: '"Source Serif 4", serif', fontSize: 'clamp(11px, 2.2vw, 12px)', lineHeight: 1.55, color: 'var(--fg)', padding: '4px 0', borderBottom: '1px dotted rgba(14,14,12,0.1)' }}>{item}</div>
            ))}
          </div>
        </div>
      </div>
      <SectionFiller watermark="OP · ED" footnote="Vol. PR · No. 1 · Op-Ed · Chennai" page="2" accent="#00AFEC" />

    </section>
  )
}
