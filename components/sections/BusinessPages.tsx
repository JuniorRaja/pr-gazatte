import Image from 'next/image'
import SectionFiller from '@/components/SectionFiller'
import SectionFlag from '@/components/SectionFlag'
import { timeline, numbers } from '@/content/career.mdx'

const filingMeta = [
  ['Entity',   'Chennai FinTech'],
  ['Period',   'Jun 2019 – Present'],
  ['Position', 'Proj Manager, Dev'],
  ['Filed by', 'Prasanna R.'],
]

const pullQuote = 'Promoted to manager. Git blame still points to me.'

const editorial = [
  'Most careers have a shape. A beginning, a comfortable middle, a tidy arc toward seniority. This one does not. What looks like a single employer and a clean timeline is, on closer inspection, three different jobs — each demanding a different brain — run in sequence at the same address.',
  'The software engineer who taught himself the discipline of test-driven development is the same person now accountable for eight others doing the same. The distance between those two points is not measured in years, but in judgment calls made under pressure.',
]

export default function BusinessPages() {
  return (
    <section id="career" style={{ borderBottom: '2px solid var(--fg)' }}>

      <SectionFlag pageLabel="Business · Page 4" subtitle="The Career Beat" />

      {/* 3-column grid → responsive */}
      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 3fr 2fr', columnGap: 0 }}>

        {/* LEFT — Label + headline + filing meta + numbers */}
        <div className="section-padding-x section-padding-y" style={{ borderRight: '1px solid rgba(14,14,12,0.2)', display: 'flex', flexDirection: 'column' }}>

          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>
            Annual Report · FY 2019–Present
          </div>

          {/* Filing metadata */}
          <div style={{ border: '1px solid rgba(14,14,12,0.2)', padding: '10px 12px', marginBottom: '20px' }}>
            {filingMeta.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: '5px 0', gap: '8px' }}>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.08em', flexShrink: 0 }}>{k}</span>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--fg)', fontWeight: 700, textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* By the Numbers */}
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '4px' }}>
            By the Numbers
          </div>
          {numbers.map(({ n, unit, label }, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(14,14,12,0.12)', padding: '14px 0' }}>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(36px, 3vw, 48px)', fontWeight: 900, lineHeight: 0.9, color: 'var(--fg)', letterSpacing: '-0.02em' }}>{n}</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--fg)', textTransform: 'uppercase', letterSpacing: '.1em', marginTop: '7px', marginBottom: '4px' }}>{unit}</div>
              <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: '11px', color: 'var(--sepia)', fontStyle: 'italic', lineHeight: 1.5 }}>{label}</div>
            </div>
          ))}

          {/* Education */}
          <div style={{ marginTop: '16px', border: '1px solid rgba(14,14,12,0.2)', background: 'rgba(193,39,45,0.04)', position: 'relative', overflow: 'hidden' }}>
            {/* Topper badge */}
            <div style={{ background: 'var(--accent)', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid rgba(193,39,45,0.3)' }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: '#F4EFE6', textTransform: 'uppercase', letterSpacing: '.15em', fontWeight: 700 }}>★ First Class Distinction</span>
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '6px' }}>Education</div>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '14px', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.3 }}>B.Sc. Computer Science</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--fg)', fontWeight: 600, marginTop: '3px', letterSpacing: '.03em' }}>Bachelor of Science</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--sepia)', marginTop: '4px' }}>Chennai · 2019</div>
            </div>
          </div>

        </div>

        {/* CENTER — Headline + timeline + pull quote */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '28px 32px' }}>

          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, lineHeight: 1.05, color: 'var(--fg)', margin: '0 0 8px' }}>
            <span style={{ color: 'var(--accent)' }}>7 years</span><br />
            &amp; counting.
          </h2>

          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--sepia)', lineHeight: 1.9, marginBottom: '20px' }}>
            One company.&nbsp;&nbsp;·&nbsp;&nbsp;Three titles.&nbsp;&nbsp;·&nbsp;&nbsp;Infinite fires.
          </div>

          <div style={{ height: '2px', background: 'var(--fg)', marginBottom: '20px' }} />

          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '24px' }}>
            Consolidated Statement of Experience · Retrospective 2019 – Present
          </div>

          <div style={{ position: 'relative' }}>
            {/* Vertical timeline line */}
            <div style={{ position: 'absolute', left: '10px', top: '6px', bottom: '6px', width: '1px', background: 'rgba(14,14,12,0.2)' }} />

            {timeline.map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {/* Dot column */}
                  <div style={{ width: '20px', minWidth: '20px', display: 'flex', justifyContent: 'center', paddingTop: '4px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === 0 ? 'var(--accent)' : 'var(--bg)', border: `2px solid ${i === 0 ? 'var(--accent)' : 'var(--fg)'}`, outline: `2px solid ${i === 0 ? 'var(--accent)' : 'rgba(14,14,12,0.15)'}` }} />
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '5px' }}>{item.date}</div>
                    <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.15, marginBottom: '3px' }}>{item.title}</div>
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--sepia)', letterSpacing: '.05em', marginBottom: '10px' }}>{item.org}</div>
                    <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13.5px', lineHeight: 1.68, color: 'var(--fg)', margin: 0 }}>{item.body}</p>
                  </div>
                </div>
                {i < timeline.length - 1 && <div style={{ height: '1px', background: 'rgba(14,14,12,0.12)', margin: '22px 0 22px 36px' }} />}
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <blockquote style={{ margin: '28px 0 0', padding: '16px 20px', borderLeft: '4px solid var(--accent)', background: 'rgba(193,39,45,0.04)' }}>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(14px, 1.4vw, 17px)', fontStyle: 'italic', fontWeight: 700, lineHeight: 1.45, color: 'var(--fg)', margin: 0 }}>
              &ldquo;{pullQuote}&rdquo;
            </p>
          </blockquote>

        </div>

        {/* RIGHT — Editorial (justified) + photo + continued */}
        <div style={{ padding: '28px 28px', display: 'flex', flexDirection: 'column' }}>

          {/* Editorial label */}
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>
            Editor&apos;s Note
          </div>

          {/* Editorial paragraphs — justified, drop-cap on first */}
          {editorial.map((para, i) => (
            <p key={i} style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13.5px', lineHeight: 1.72, color: 'var(--fg)', textAlign: 'justify', margin: i < editorial.length - 1 ? '0 0 14px' : '0 0 24px' }}>
              {i === 0 ? (
                <>
                  <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '54px', fontWeight: 900, lineHeight: 0.78, float: 'left', marginRight: '7px', marginTop: '5px', color: 'var(--fg)' }}>{para[0]}</span>
                  {para.slice(1)}
                </>
              ) : para}
            </p>
          ))}

          {/* Photo fills remaining height */}
          <div style={{ flex: 1, minHeight: '220px', border: '1px solid rgba(14,14,12,0.2)', overflow: 'hidden', position: 'relative' }}>
            <Image
              src="/pr-business-still.png"
              alt="Career — Prasanna Rajendran"
              fill
              style={{ objectFit: 'cover', filter: 'grayscale(0.9) sepia(0.45) contrast(1.1) brightness(0.85)' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(14,14,12,0.65))', padding: '16px 8px 6px' }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'rgba(244,239,230,0.8)', letterSpacing: '.08em' }}>Chennai · 2024</span>
            </div>
          </div>

          {/* Continued */}
          <div style={{ marginTop: '12px', borderTop: '1px solid rgba(14,14,12,0.15)', paddingTop: '10px', textAlign: 'right' }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', fontStyle: 'italic' }}>
              Continued on skills &amp; projects →
            </span>
          </div>

        </div>

      </div>

      <SectionFiller watermark="CAREER" footnote="Career Beat · p. 4 · One company · Three titles · 7 years" page="4" />
    </section>
  )
}
