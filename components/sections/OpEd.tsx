import SectionFiller from '@/components/SectionFiller'
import { getFormattedShortDate } from '@/utils/date'
import { AdTender } from '@/components/VintageAds'

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
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '11px', fontStyle: 'italic', color: 'var(--sepia)', letterSpacing: '.05em', marginBottom: '8px' }}>by</div>
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 700, lineHeight: 1.2, color: 'var(--fg)' }}>Prasanna<br />Rajendran</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '6px' }}>Editor-in-Chief</div>
          </div>
          <div style={{ textAlign: 'center', color: 'var(--sepia)', fontSize: '18px', letterSpacing: '6px', margin: '24px 0' }}>· · ·</div>
          <div style={{ border: '1px solid rgba(14,14,12,0.2)', padding: '14px', background: 'rgba(184,167,146,0.08)' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px' }}>Filed under</div>
            {tags.map(tag => (
              <div key={tag} style={{ fontFamily: '"Source Serif 4", serif', fontSize: '12px', color: 'var(--fg)', borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: '4px 0' }}>{tag}</div>
            ))}
          </div>
        </div>

        {/* Centre */}
        <div style={{ padding: '32px 32px', borderRight: '1px solid rgba(14,14,12,0.2)' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 20px', borderBottom: '2px solid var(--fg)', paddingBottom: '16px' }}>
            A Person,<br />Not a Résumé.
          </h2>
          <blockquote style={{ margin: '0 0 24px', padding: '20px 24px', borderLeft: '4px solid var(--accent)', background: 'rgba(193,39,45,0.04)' }}>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(18px, 2.5vw, 26px)', fontStyle: 'italic', fontWeight: 700, lineHeight: 1.3, color: 'var(--fg)', margin: 0 }}>
              &ldquo;I build things, break things, and find the pattern in between.&rdquo;
            </p>
          </blockquote>
          <div style={{ columns: 2, columnGap: '28px', columnRule: '1px solid rgba(14,14,12,0.15)' }}>
            <p className="drop-cap" style={{ fontFamily: '"Source Serif 4", serif', fontSize: '14.5px', lineHeight: 1.72, color: 'var(--fg)', margin: '0 0 16px' }}>
              Most portfolios are résumés with better fonts. This one is a newspaper because a person is not a list of skills — a person is a beat. The tech beat, the lab beat, the senses beat, the trails beat. Turn the page.
            </p>
            <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '14.5px', lineHeight: 1.72, color: 'var(--fg)', margin: 0 }}>
              The work happens in layers: the architecture decision at 10 a.m., the pull request review at 2, the production incident at 4, the personal project at midnight. None of those layers are separable. This paper doesn&apos;t try to separate them.
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
          <div style={{ marginTop: '28px', borderTop: '1px solid rgba(14,14,12,0.15)', paddingTop: '16px' }}>
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '13px', fontWeight: 700, color: 'var(--fg)', marginBottom: '10px', letterSpacing: '.02em' }}>What This Paper Covers</div>
            {coverage.map((item, i) => (
              <div key={i} style={{ fontFamily: '"Source Serif 4", serif', fontSize: '12px', lineHeight: 1.55, color: 'var(--fg)', padding: '4px 0', borderBottom: '1px dotted rgba(14,14,12,0.1)' }}>{item}</div>
            ))}
          </div>
          <div style={{ marginTop: '24px' }}><AdTender /></div>
        </div>
      </div>
      <SectionFiller watermark="OPINION" footnote="Op-Ed · p. 2 · All opinions are those of the Editor" page="2" />
    </section>
  )
}
