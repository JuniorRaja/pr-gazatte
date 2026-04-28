function getMonthYear() {
  const MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
  const now = new Date()
  return `${MONTHS[now.getMonth()]} ${now.getFullYear()}`
}

const TechDesk = ({ tweaks }) => {
  const { showRules = true } = tweaks || {};

  const skills = [
    { name: 'REACT', level: 'Expert', dir: '▲' },
    { name: 'TYPESCRIPT', level: 'Expert', dir: '▲' },
    { name: 'C#', level: 'Expert', dir: '▲' },
    { name: '.NET 8', level: 'Expert', dir: '▲' },
    { name: 'MSSQL', level: 'Expert', dir: '▲' },
    { name: 'AZURE', level: 'Expert', dir: '▲' },
    { name: 'NODE', level: 'Intermediate', dir: '◆' },
    { name: 'PYTHON', level: 'Intermediate', dir: '◆' },
    { name: 'DOCKER', level: 'Intermediate', dir: '◆' },
    { name: 'GRAPHQL', level: 'Intermediate', dir: '◆' },
    { name: 'KUBERNETES', level: 'Learning', dir: '▼' },
    { name: 'GO', level: 'Learning', dir: '▼' },
    { name: 'RUST', level: 'Learning', dir: '▼' },
    { name: 'KAFKA', level: 'Learning', dir: '▼' },
  ];

  const tickerContent = [...skills, ...skills];

  const dirColor = (dir) => dir === '▲' ? '#2a7a3b' : dir === '◆' ? '#0E0E0C' : '#C1272D';

  return (
    <section id="tech" style={{ borderBottom: '2px solid #0E0E0C' }}>
      {/* Section flag */}
      <div style={{
        background: '#C1272D', color: '#F4EFE6',
        padding: '5px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Tech Desk · Page 3</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>MARKETS · STACK REPORT · ENGINEERING</span>
      </div>

      {/* Ticker */}
      <div style={{
        overflow: 'hidden',
        borderBottom: '1px solid #0E0E0C',
        background: '#0E0E0C',
        padding: '8px 0',
        position: 'relative',
      }}>
        <div className="ticker-track" style={{
          display: 'flex',
          gap: '40px',
          width: 'max-content',
          animation: 'tickerScroll 35s linear infinite',
        }}>
          {tickerContent.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '11px',
              whiteSpace: 'nowrap',
            }}>
              <span style={{ color: '#F4EFE6', fontWeight: 700, letterSpacing: '.05em' }}>{s.name}</span>
              <span style={{ color: dirColor(s.dir), fontSize: '12px' }}>{s.dir}</span>
              <span style={{ color: '#B8A792', fontSize: '10px' }}>{s.level}</span>
              <span style={{ color: '#B8A792', opacity: .4 }}>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 3fr 2fr',
        columnGap: 0,
      }}>
        {/* Left — markets headline */}
        <div style={{
          borderRight: showRules ? '1px solid rgba(14,14,12,0.2)' : 'none',
          padding: '28px 28px',
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px', color: '#C1272D',
            textTransform: 'uppercase', letterSpacing: '.15em',
            borderBottom: '1px solid #C1272D',
            paddingBottom: '4px', marginBottom: '14px',
          }}>Markets Summary</div>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(22px, 3vw, 36px)',
            fontWeight: 900, lineHeight: 1.05,
            color: '#0E0E0C', margin: '0 0 16px',
          }}>The Stack<br />Report.</h2>
          <p style={{
            fontFamily: '"Source Serif 4", serif',
            fontSize: '13.5px', lineHeight: 1.68,
            color: '#0E0E0C', margin: 0,
          }}>
            React hit a new high this quarter. .NET 8 holds steady in enterprise. Rust opened a learning position.
          </p>

          <div style={{ marginTop: '20px' }}>
            {[
              { name: 'React', pct: 98, trend: '+2.1%' },
              { name: '.NET 8', pct: 95, trend: 'Steady' },
              { name: 'TypeScript', pct: 96, trend: '+1.4%' },
              { name: 'Docker', pct: 72, trend: '+5.2%' },
              { name: 'Kubernetes', pct: 28, trend: 'New pos.' },
            ].map(({ name, pct, trend }) => (
              <div key={name} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#0E0E0C', fontWeight: 700 }}>{name}</span>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: '#B8A792' }}>{trend}</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(14,14,12,0.1)', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: '#0E0E0C' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Vintage advertisement */}
          <div style={{ marginTop: '20px' }}>
            <AdCustomSoftware />
          </div>
        </div>

        {/* Centre — stack detail */}
        <div style={{
          borderRight: showRules ? '1px solid rgba(14,14,12,0.2)' : 'none',
          padding: '28px 32px',
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px', color: '#C1272D',
            textTransform: 'uppercase', letterSpacing: '.15em',
            borderBottom: '1px solid #C1272D',
            paddingBottom: '4px', marginBottom: '14px',
          }}>Full Stack Index</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: 'rgba(14,14,12,0.15)', border: '1px solid rgba(14,14,12,0.15)' }}>
            {/* Header row */}
            {['Technology', 'Proficiency', 'Trend'].map(h => (
              <div key={h} style={{
                background: '#0E0E0C', color: '#F4EFE6',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '9px', letterSpacing: '.1em', textTransform: 'uppercase',
                padding: '6px 10px',
              }}>{h}</div>
            ))}
            {skills.map(({ name, level, dir }) => (
              <React.Fragment key={name}>
                <div style={{ background: '#F4EFE6', padding: '7px 10px', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', fontWeight: 700, color: '#0E0E0C' }}>{name}</div>
                <div style={{ background: '#F4EFE6', padding: '7px 10px', fontFamily: '"Source Serif 4", serif', fontSize: '11px', color: '#0E0E0C' }}>{level}</div>
                <div style={{ background: '#F4EFE6', padding: '7px 10px', fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: dirColor(dir), fontWeight: 700 }}>{dir}</div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right — analysis */}
        <div style={{ padding: '28px 28px' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px', color: '#C1272D',
            textTransform: 'uppercase', letterSpacing: '.15em',
            borderBottom: '1px solid #C1272D',
            paddingBottom: '4px', marginBottom: '14px',
          }}>Analyst's Note</div>

          <p style={{
            fontFamily: '"Source Serif 4", serif',
            fontSize: '13.5px', lineHeight: 1.68, color: '#0E0E0C', margin: '0 0 14px',
          }}>
            Six years in, the portfolio skews deep over broad — but the learning positions in Rust, Kubernetes, and Kafka signal an appetite for infrastructure-level thinking.
          </p>
          <p style={{
            fontFamily: '"Source Serif 4", serif',
            fontSize: '13.5px', lineHeight: 1.68, color: '#0E0E0C', margin: 0,
          }}>
            The dual posture — expert-level application developer plus an active PM track — remains the defining characteristic. Rare. Durable. Currently undervalued by the market.
          </p>

          <div style={{
            marginTop: '20px',
            border: '1px solid #0E0E0C',
            padding: '12px 14px',
            background: 'rgba(14,14,12,0.03)',
          }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: '#C1272D', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px' }}>Key: Legend</div>
            {[
              { sym: '▲', label: 'Expert — production-proven' },
              { sym: '◆', label: 'Intermediate — shipped code' },
              { sym: '▼', label: 'Learning — active position' },
            ].map(({ sym, label }) => (
              <div key={sym} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'center' }}>
                <span style={{ color: dirColor(sym), fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', fontWeight: 700 }}>{sym}</span>
                <span style={{ fontFamily: '"Source Serif 4", serif', fontSize: '12px', color: '#0E0E0C' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SectionFiller watermark="STACK" footnote={`Tech Desk · p. 3 · Full-stack index updated ${getMonthYear()}`} page="3" accent="var(--red)" />
    </section>
  );
};
Object.assign(window, { TechDesk });
