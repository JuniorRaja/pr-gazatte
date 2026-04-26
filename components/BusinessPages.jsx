
const BusinessPages = ({ tweaks }) => {
  const { showRules = true } = tweaks || {};

  const timeline = [
    {
      date: 'Apr 2024 – Present',
      title: 'Deputy Project Manager, Development',
      org: 'Chennai FinTech',
      body: 'Leads an 8-person team. Owns the SDLC end-to-end for core NBFC products. Sits at the intersection of architecture, delivery, and firefighting — sometimes all three in the same afternoon.',
    },
    {
      date: 'Oct 2022 – Mar 2024',
      title: 'Assistant Project Manager',
      org: 'Chennai FinTech',
      body: 'Trained junior associates, ran code reviews, coordinated cross-functional delivery. The transition from individual contributor to team accountability, executed in 18 months.',
    },
    {
      date: 'Jun 2019 – Sep 2022',
      title: 'Software Engineer Trainee',
      org: 'Chennai FinTech',
      body: '.NET Core, TDD, production debugging. Three years of getting very good at the craft before accepting the responsibility of the craft of others.',
    },
  ];

  return (
    <section id="career" style={{ borderBottom: '2px solid #0E0E0C' }}>
      <div style={{
        background: '#0E0E0C', color: '#F4EFE6',
        padding: '5px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Business · Page 4</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>THE CAREER BEAT</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', columnGap: 0 }}>
        {/* Left label */}
        <div style={{
          borderRight: showRules ? '1px solid rgba(14,14,12,0.2)' : 'none',
          padding: '28px 28px',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        }}>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(28px, 3.5vw, 46px)',
            fontWeight: 900, lineHeight: 1.0,
            color: '#0E0E0C', margin: '0 0 12px',
            letterSpacing: '-0.02em',
          }}>Six<br />and a<br />Half<br />Years.</h2>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '10px', color: '#B8A792',
            lineHeight: 1.6,
          }}>
            One company.<br />Three roles.<br />Infinite fires.
          </div>
          <div style={{
            marginTop: '20px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px', color: '#C1272D',
            fontStyle: 'italic',
          }}>Continued p. 5 →</div>
        </div>

        {/* Centre — timeline */}
        <div style={{
          borderRight: showRules ? '1px solid rgba(14,14,12,0.2)' : 'none',
          padding: '28px 32px',
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px', color: '#C1272D',
            textTransform: 'uppercase', letterSpacing: '.15em',
            borderBottom: '1px solid #C1272D',
            paddingBottom: '4px', marginBottom: '24px',
          }}>Retrospective · 2019 — Present</div>

          <div style={{ position: 'relative' }}>
            {/* Vertical spine */}
            <div style={{
              position: 'absolute', left: '10px', top: 0, bottom: 0,
              width: '1px', background: 'rgba(14,14,12,0.2)',
            }} />

            {timeline.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: i < timeline.length - 1 ? '28px' : 0, position: 'relative' }}>
                {/* Dot */}
                <div style={{
                  width: '20px', minWidth: '20px',
                  display: 'flex', justifyContent: 'center', paddingTop: '4px',
                }}>
                  <div style={{
                    width: '9px', height: '9px', borderRadius: '50%',
                    background: i === 0 ? '#C1272D' : '#0E0E0C',
                    border: '2px solid #F4EFE6',
                    outline: `2px solid ${i === 0 ? '#C1272D' : '#0E0E0C'}`,
                    zIndex: 1,
                  }} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '9px', color: '#C1272D',
                    textTransform: 'uppercase', letterSpacing: '.08em',
                    marginBottom: '4px',
                  }}>{item.date}</div>
                  <div style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '17px', fontWeight: 700,
                    color: '#0E0E0C', lineHeight: 1.2, marginBottom: '2px',
                  }}>{item.title}</div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '10px', color: '#B8A792', marginBottom: '8px',
                  }}>{item.org}</div>
                  <p style={{
                    fontFamily: '"Source Serif 4", serif',
                    fontSize: '13.5px', lineHeight: 1.65,
                    color: '#0E0E0C', margin: 0,
                  }}>{item.body}</p>
                  {i < timeline.length - 1 && (
                    <div style={{ height: '1px', background: 'rgba(14,14,12,0.1)', marginTop: '20px' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — sidebar numbers */}
        <div style={{ padding: '28px 28px' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px', color: '#C1272D',
            textTransform: 'uppercase', letterSpacing: '.15em',
            borderBottom: '1px solid #C1272D',
            paddingBottom: '4px', marginBottom: '16px',
          }}>By the Numbers</div>

          {[
            { n: '6.5', unit: 'years', label: 'experience' },
            { n: '8', unit: 'reports', label: 'direct' },
            { n: '1', unit: 'degree', label: 'B.E. Computer Science' },
            { n: '∞', unit: 'fires', label: 'extinguished' },
          ].map(({ n, unit, label }) => (
            <div key={n + label} style={{
              borderBottom: '1px solid rgba(14,14,12,0.15)',
              padding: '12px 0',
              marginBottom: '4px',
            }}>
              <div style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '36px', fontWeight: 900,
                color: '#0E0E0C', lineHeight: 1,
              }}>{n}</div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '9px', color: '#C1272D',
                textTransform: 'uppercase', letterSpacing: '.1em',
              }}>{unit}</div>
              <div style={{
                fontFamily: '"Source Serif 4", serif',
                fontSize: '11px', color: '#B8A792', fontStyle: 'italic',
              }}>{label}</div>
            </div>
          ))}

          <div style={{
            marginTop: '16px',
            border: '1px solid rgba(14,14,12,0.2)',
            padding: '12px',
            background: 'rgba(193,39,45,0.04)',
          }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: '#C1272D', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '6px' }}>Education</div>
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '14px', fontWeight: 700, color: '#0E0E0C' }}>B.E. Computer Science</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#B8A792', marginTop: '4px' }}>Chennai · 2019</div>
          </div>
        </div>
      </div>
      <SectionFiller watermark="CAREER" footnote="Career Beat · p. 4 · One company · Three roles · 6.5 years" page="4" />
    </section>
  );
};
Object.assign(window, { BusinessPages });
