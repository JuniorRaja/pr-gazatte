import { columns } from '@/content/hobbies.mdx'
import SectionFiller from '@/components/SectionFiller'

export default function OffDuty() {
  return (
    <section id="hobbies" style={{ borderBottom: '2px solid var(--fg)' }}>
      <style>{`
        .od-flag { padding: 5px 16px; }
        .od-inner { padding: 20px 16px 28px; }
        .od-headline { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 8px; }
        .od-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid var(--rule); }
        .od-col-left { display: flex; flex-direction: column; border-right: 1px solid var(--rule); }
        .od-col-right { display: flex; flex-direction: column; }
        .od-col-item { padding: 20px; }
        .od-col-left .od-col-item:first-child { flex: 2; border-bottom: 1px solid var(--rule); }
        .od-col-left .od-col-item:last-child { flex: 1; }
        .od-col-right .od-col-item:first-child { flex: 1; border-bottom: 1px solid var(--rule); }
        .od-col-right .od-col-item:last-child { flex: 2; }
        @media (min-width: 640px) {
          .od-flag { padding: 5px 24px; }
          .od-inner { padding: 28px 24px; }
        }
        @media (min-width: 1024px) {
          .od-flag { padding: 5px 32px; }
          .od-inner { padding: 28px 32px; }
        }
        @media (max-width: 639px) {
          .od-grid { grid-template-columns: 1fr; }
          .od-col-left { border-right: none; border-bottom: 1px solid var(--rule); }
        }
        /* Ink-mode override for hobby note dotted border */
        [data-theme="ink"] .od-col-note { border-top-color: var(--rule) !important; }
      `}</style>

      <div className="od-flag" style={{ background: 'var(--accent)', color: '#F4EFE6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Off-Duty Desk · Page 9</span>
        <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '10px' }}>A CABINET OF CURIOSITIES</span>
      </div>

      <div className="od-inner">
        <div className="od-headline" style={{ borderBottom: '2px solid var(--fg)', paddingBottom: '12px', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(26px, 3.5vw, 48px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--fg)', margin: 0 }}>
            The <span style={{ color: 'var(--accent)' }}>Hobbies</span> Column.
          </h2>
          <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', fontStyle: 'italic', color: 'var(--sepia)' }}>
            A person is more than their job title.
          </div>
        </div>

        <div className="od-grid">
          {[0, 1].map(colIdx => (
            <div key={colIdx} className={colIdx === 0 ? 'od-col-left' : 'od-col-right'}>
              {columns.slice(colIdx * 2, colIdx * 2 + 2).map((col) => (
                <div key={col.slug} className="od-col-item">
                  <div style={{ borderBottom: '1px solid var(--fg)', paddingBottom: '10px', marginBottom: '14px' }}>
                    <div style={{ fontFamily: '"Bodoni Moda", serif', fontSize: '18px', fontWeight: 900, color: 'var(--fg)', lineHeight: 1.1, marginBottom: '2px' }}>{col.slug}</div>
                    <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '8px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.12em' }}>Documented Obsession</div>
                  </div>


                  <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', lineHeight: 1.65, color: 'var(--fg)', margin: '0 0 10px' }}>{col.body}</p>

                  {col.note && (
                    <div className="od-col-note" style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', color: 'var(--sepia)', fontStyle: 'italic', borderTop: '1px dotted rgba(14,14,12,0.2)', paddingTop: '8px', marginTop: '8px' }}>{col.note}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <SectionFiller watermark="HOBBIES" footnote="Vol. PR · No. 1 · Off-Duty · Chennai" page="9" accent="var(--fg)" />

    </section>
  )
}
