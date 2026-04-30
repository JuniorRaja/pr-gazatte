import SectionFiller from '@/components/SectionFiller'
import { columns } from '@/content/hobbies.mdx'

export default function OffDuty() {
  return (
    <section id="hobbies" style={{ borderBottom: '2px solid var(--fg)' }}>
      <style>{`
        .od-flag { padding: 5px 16px; }
        .od-inner { padding: 20px 16px 28px; }
        .od-headline { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 8px; }
        .od-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1px solid rgba(14,14,12,0.2); }
        .od-col-item { padding: 20px; }
        .od-col-item:not(:last-child) { border-right: 1px solid rgba(14,14,12,0.2); }
        @media (min-width: 640px) {
          .od-flag { padding: 5px 24px; }
          .od-inner { padding: 28px 24px; }
        }
        @media (min-width: 1024px) {
          .od-flag { padding: 5px 32px; }
          .od-inner { padding: 28px 32px; }
        }
        @media (max-width: 1023px) {
          .od-grid { grid-template-columns: 1fr 1fr; }
          .od-col-item:not(:last-child) { border-right: none; }
          .od-col-item:nth-child(odd) { border-right: 1px solid rgba(14,14,12,0.2); }
          .od-col-item:nth-child(1), .od-col-item:nth-child(2) { border-bottom: 1px solid rgba(14,14,12,0.2); }
        }
        @media (max-width: 639px) {
          .od-grid { grid-template-columns: 1fr; }
          .od-col-item:nth-child(odd) { border-right: none; }
          .od-col-item:not(:last-child) { border-bottom: 1px solid rgba(14,14,12,0.2) !important; border-right: none !important; }
        }
      `}</style>

      <div className="od-flag" style={{ background: 'var(--accent)', color: '#F4EFE6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Off-Duty Desk · Page 9</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>A CABINET OF CURIOSITIES</span>
      </div>

      <div className="od-inner">
        <div className="od-headline" style={{ borderBottom: '2px solid var(--fg)', paddingBottom: '12px', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(26px, 3.5vw, 46px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--fg)', margin: 0 }}>
            The Hobbies Column.
          </h2>
          <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', fontStyle: 'italic', color: 'var(--sepia)' }}>
            A person is more than their job title.
          </div>
        </div>

        <div className="od-grid">
          {columns.map((col, i) => (
            <div key={col.slug} className="od-col-item">
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
