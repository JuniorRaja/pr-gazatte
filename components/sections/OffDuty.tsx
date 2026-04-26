import SectionFiller from '@/components/SectionFiller'
import { columns } from '@/content/hobbies.mdx'

export default function OffDuty() {
  return (
    <section id="hobbies" style={{ borderBottom: '2px solid var(--fg)' }}>
      <div style={{ background: 'var(--accent)', color: '#F4EFE6', padding: '5px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Off-Duty Desk · Page 9</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>A CABINET OF CURIOSITIES</span>
      </div>

      <div style={{ padding: '28px 32px' }}>
        <div style={{ borderBottom: '2px solid var(--fg)', paddingBottom: '12px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(26px, 3.5vw, 46px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--fg)', margin: 0 }}>
            The Hobbies Column.
          </h2>
          <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', fontStyle: 'italic', color: 'var(--sepia)' }}>
            A person is more than their job title.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', border: '1px solid rgba(14,14,12,0.2)' }}>
          {columns.map((col, i) => (
            <div key={col.slug} style={{ borderRight: i < 3 ? '1px solid rgba(14,14,12,0.2)' : 'none', padding: '20px 20px' }}>
              {/* Column header */}
              <div style={{ borderBottom: '1px solid var(--fg)', paddingBottom: '10px', marginBottom: '14px' }}>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 900, color: 'var(--fg)', lineHeight: 1.1, marginBottom: '2px' }}>{col.slug}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.12em' }}>Documented Obsession</div>
              </div>

              {/* Decorative hatched placeholder */}
              <div style={{ height: '80px', marginBottom: '14px', background: 'repeating-linear-gradient(-45deg, rgba(184,167,146,0.15) 0px, rgba(184,167,146,0.15) 1px, transparent 1px, transparent 7px)', border: '1px solid rgba(184,167,146,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.1em', textAlign: 'center' }}>
                  [illustration<br />placeholder]
                </div>
              </div>

              <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', lineHeight: 1.65, color: 'var(--fg)', margin: '0 0 10px' }}>{col.body}</p>

              {col.note && (
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--sepia)', fontStyle: 'italic', borderTop: '1px dotted rgba(14,14,12,0.2)', paddingTop: '8px', marginTop: '8px' }}>{col.note}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <SectionFiller watermark="OFFDUTY" footnote="Off-Duty · p. 9 · Coins · Perfume · Palate · Trails" page="9" accent="var(--accent)" />
    </section>
  )
}
