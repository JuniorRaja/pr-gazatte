
const OffDuty = ({ tweaks }) => {
  const { showRules = true } = tweaks || {};

  const columns = [
    {
      slug: 'The Collector',
      icon: '⬡',
      body: 'Rare ₹5 commemorative coins, custom-edition currency notes, a mixed lighter collection with no particular niche. If it\'s small, old, and has a story — it\'s probably in a drawer at home.',
      note: null,
    },
    {
      slug: 'The Nose',
      icon: '⬡',
      body: 'A trained olfactory palate that reverse-engineers perfume notes on a single sniff — top, heart, base. The hobby no one expects from a project manager.',
      note: '[awaiting filing: current collection list]',
    },
    {
      slug: 'The Palate',
      icon: '⬡',
      body: 'A tongue that can name ingredients in a dish blind. Useful at restaurants, dangerous at potlucks.',
      note: '[awaiting filing: notable identifications]',
    },
    {
      slug: 'The Trails',
      icon: '⬡',
      body: 'Casual hikes, honest views. No summit flags, no drama — just the walk.',
      note: '[awaiting filing: trail log]',
    },
  ];

  return (
    <section id="hobbies" style={{ borderBottom: '2px solid #0E0E0C' }}>
      <div style={{
        background: '#C1272D', color: '#F4EFE6',
        padding: '5px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Off-Duty Desk · Page 9</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>A CABINET OF CURIOSITIES</span>
      </div>

      <div style={{ padding: '28px 32px' }}>
        <div style={{
          borderBottom: '2px solid #0E0E0C', paddingBottom: '12px', marginBottom: '24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(26px, 3.5vw, 46px)',
            fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em',
            color: '#0E0E0C', margin: 0,
          }}>The Hobbies Column.</h2>
          <div style={{
            fontFamily: '"Source Serif 4", serif',
            fontSize: '13px', fontStyle: 'italic', color: '#B8A792',
          }}>
            A person is more than their job title.
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
          border: '1px solid rgba(14,14,12,0.2)',
        }}>
          {columns.map((col, i) => (
            <div key={col.slug} style={{
              borderRight: i < 3 ? (showRules ? '1px solid rgba(14,14,12,0.2)' : 'none') : 'none',
              padding: '20px 20px',
            }}>
              {/* Cabinet header */}
              <div style={{
                borderBottom: '1px solid #0E0E0C',
                paddingBottom: '10px', marginBottom: '14px',
              }}>
                <div style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '18px', fontWeight: 900,
                  color: '#0E0E0C', lineHeight: 1.1,
                  marginBottom: '2px',
                }}>{col.slug}</div>
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '8px', color: '#C1272D',
                  textTransform: 'uppercase', letterSpacing: '.12em',
                }}>Documented Obsession</div>
              </div>

              {/* Decorative placeholder box */}
              <div style={{
                height: '80px',
                marginBottom: '14px',
                background: 'repeating-linear-gradient(-45deg, rgba(184,167,146,0.15) 0px, rgba(184,167,146,0.15) 1px, transparent 1px, transparent 7px)',
                border: '1px solid rgba(184,167,146,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '8px', color: '#B8A792',
                  textTransform: 'uppercase', letterSpacing: '.1em',
                  textAlign: 'center',
                }}>[illustration<br />placeholder]</div>
              </div>

              <p style={{
                fontFamily: '"Source Serif 4", serif',
                fontSize: '13px', lineHeight: 1.65,
                color: '#0E0E0C', margin: '0 0 10px',
              }}>{col.body}</p>

              {col.note && (
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '9px', color: '#B8A792',
                  fontStyle: 'italic', borderTop: '1px dotted rgba(14,14,12,0.2)',
                  paddingTop: '8px', marginTop: '8px',
                }}>{col.note}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <SectionFiller watermark="OFFDUTY" footnote="Off-Duty · p. 9 · Coins · Perfume · Palate · Trails" page="9" accent="var(--red)" />
    </section>
  );
};
Object.assign(window, { OffDuty });
