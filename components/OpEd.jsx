
const OpEd = ({ tweaks }) => {
  const { showRules = true } = tweaks || {};
  return (
    <section id="op-ed" style={{ borderBottom: '2px solid #0E0E0C' }}>
      {/* Section flag */}
      <div style={{
        background: '#0E0E0C', color: '#F4EFE6',
        padding: '5px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Op-Ed · Page 2</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.1em' }}>Opinion &amp; Analysis</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        columnGap: 0,
        padding: '0',
      }}>
        {/* Left — byline + decorative */}
        <div style={{
          borderRight: showRules ? '1px solid rgba(14,14,12,0.2)' : 'none',
          padding: '32px 28px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '11px',
              fontStyle: 'italic',
              color: '#B8A792',
              letterSpacing: '.05em',
              marginBottom: '8px',
            }}>by</div>
            <div style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '22px',
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#0E0E0C',
            }}>Prasanna<br />Rajendran</div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '9px',
              color: '#C1272D',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              marginTop: '6px',
            }}>Editor-in-Chief</div>
          </div>

          {/* Ornamental rule */}
          <div style={{ textAlign: 'center', color: '#B8A792', fontSize: '18px', letterSpacing: '6px', margin: '24px 0' }}>
            · · ·
          </div>

          <div style={{
            border: '1px solid rgba(14,14,12,0.2)',
            padding: '14px',
            background: 'rgba(184,167,146,0.08)',
          }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: '#C1272D', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px' }}>Filed under</div>
            {['Career', 'Technology', 'Identity', 'First Person'].map(tag => (
              <div key={tag} style={{
                fontFamily: '"Source Serif 4", serif',
                fontSize: '12px',
                color: '#0E0E0C',
                borderBottom: '1px dotted rgba(14,14,12,0.15)',
                padding: '4px 0',
              }}>{tag}</div>
            ))}
          </div>
        </div>

        {/* Centre — main op-ed content */}
        <div style={{ padding: '32px 32px', borderRight: showRules ? '1px solid rgba(14,14,12,0.2)' : 'none' }}>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#0E0E0C',
            margin: '0 0 20px',
            borderBottom: '2px solid #0E0E0C',
            paddingBottom: '16px',
          }}>
            A Person,<br />Not a Résumé.
          </h2>

          {/* Pull quote */}
          <blockquote style={{
            margin: '0 0 24px',
            padding: '20px 24px',
            borderLeft: '4px solid #C1272D',
            background: 'rgba(193,39,45,0.04)',
          }}>
            <p style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(18px, 2.5vw, 26px)',
              fontStyle: 'italic',
              fontWeight: 700,
              lineHeight: 1.3,
              color: '#0E0E0C',
              margin: 0,
            }}>
              "I build things, break things, and find the pattern in between."
            </p>
          </blockquote>

          {/* Two-column body */}
          <div style={{
            columns: 2,
            columnGap: '28px',
            columnRule: showRules ? '1px solid rgba(14,14,12,0.15)' : 'none',
          }}>
            <p className="drop-cap" style={{
              fontFamily: '"Source Serif 4", serif',
              fontSize: '14.5px',
              lineHeight: 1.72,
              color: '#0E0E0C',
              margin: '0 0 16px',
            }}>
              Most portfolios are résumés with better fonts. This one is a newspaper because a person is not a list of skills — a person is a beat. The tech beat, the lab beat, the senses beat, the trails beat. Turn the page.
            </p>
            <p style={{
              fontFamily: '"Source Serif 4", serif',
              fontSize: '14.5px',
              lineHeight: 1.72,
              color: '#0E0E0C',
              margin: 0,
            }}>
              The work happens in layers: the architecture decision at 10 a.m., the pull request review at 2, the production incident at 4, the personal project at midnight. None of those layers are separable. This paper doesn't try to separate them.
            </p>
          </div>

          <div style={{
            marginTop: '20px',
            borderTop: '1px solid #0E0E0C',
            paddingTop: '8px',
            display: 'flex', justifyContent: 'space-between',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '10px',
            color: '#B8A792',
          }}>
            <span>April 23, 2026</span>
            <span style={{ color: '#C1272D' }}>Continued on p. 3 →</span>
          </div>
        </div>

        {/* Right — editorial sidebar */}
        <div style={{ padding: '32px 28px' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px',
            letterSpacing: '.15em',
            textTransform: 'uppercase',
            color: '#C1272D',
            borderBottom: '1px solid #C1272D',
            paddingBottom: '4px',
            marginBottom: '14px',
          }}>
            The Editor's Note
          </div>
          <p style={{
            fontFamily: '"Source Serif 4", serif',
            fontSize: '13px',
            fontStyle: 'italic',
            lineHeight: 1.65,
            color: '#0E0E0C',
            margin: '0 0 16px',
          }}>
            "This is not a self-promotion. This is a record. The record of someone who learned to code alone, then learned to lead, then decided to keep both skills sharp simultaneously."
          </p>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: '#B8A792' }}>— P.R., Editor</div>

          <div style={{
            marginTop: '28px',
            borderTop: '1px solid rgba(14,14,12,0.15)',
            paddingTop: '16px',
          }}>
            <div style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '13px',
              fontWeight: 700,
              color: '#0E0E0C',
              marginBottom: '10px',
              letterSpacing: '.02em',
            }}>What This Paper Covers</div>
            {[
              '→ Six years of FinTech engineering',
              '→ Team leadership & project delivery',
              '→ Self-hosted infrastructure projects',
              '→ Photography across 9 countries',
              '→ A bookshelf that keeps growing',
              '→ Curiosities, collected obsessively',
            ].map((item, i) => (
              <div key={i} style={{
                fontFamily: '"Source Serif 4", serif',
                fontSize: '12px',
                lineHeight: 1.55,
                color: '#0E0E0C',
                padding: '4px 0',
                borderBottom: '1px dotted rgba(14,14,12,0.1)',
              }}>{item}</div>
            ))}
          </div>

          {/* Vintage advertisement */}
          <div style={{ marginTop: '24px' }}>
            <AdTender />
          </div>
        </div>
      </div>
      <SectionFiller watermark="OPINION" footnote="Op-Ed · p. 2 · All opinions are those of the Editor" page="2" />
    </section>
  );
};
Object.assign(window, { OpEd });
