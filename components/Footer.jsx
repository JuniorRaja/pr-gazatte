
const Footer = ({ tweaks }) => {
  return (
    <footer style={{ background: 'var(--ink)', color: '#F4EFE6', position: 'relative', overflow: 'hidden' }}>

      {/* Mega display text */}
      <div style={{
        padding: '48px 32px 0',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(244,239,230,0.08)',
      }}>
        {/* Huge ruled text lines */}
        {['PRASANNA', 'RAJENDRAN'].map((word, i) => (
          <div key={word} style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(72px, 14vw, 180px)',
            fontWeight: 900,
            lineHeight: 0.88,
            letterSpacing: '-0.04em',
            color: i === 0 ? '#F4EFE6' : 'transparent',
            WebkitTextStroke: i === 1 ? '1.5px rgba(244,239,230,0.3)' : 'none',
            userSelect: 'none',
            display: 'block',
            whiteSpace: 'nowrap',
          }}>{word}</div>
        ))}

        {/* Subtitle rule */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginTop: '24px',
          marginBottom: '32px',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(244,239,230,0.15)' }} />
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '10px', letterSpacing: '.3em',
            textTransform: 'uppercase',
            color: 'rgba(244,239,230,0.4)',
            whiteSpace: 'nowrap',
          }}>Deputy Project Manager · Software Engineer · Chennai</div>
          <div style={{ flex: 1, height: '1px', background: 'rgba(244,239,230,0.15)' }} />
        </div>
      </div>

      {/* Info row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        borderBottom: '1px solid rgba(244,239,230,0.08)',
      }}>
        {[
          {
            heading: 'The Paper',
            lines: ['The PR Gazette', 'Vol. PR · No. 1', 'Chennai', 'Est. 1998'],
          },
          {
            heading: 'The Editor',
            lines: ['Prasanna Rajendran', 'B.E. Computer Science', '6.5 years in FinTech', '8 direct reports'],
          },
          {
            heading: 'The Stack',
            lines: ['React · .NET 8 · TypeScript', 'Azure · MSSQL · Docker', 'Cloudflare · OCI', 'Currently: Kubernetes'],
          },
          {
            heading: 'The Contact',
            lines: ['hello@prasannar.com', 'github.com/JuniorRaja', 'linkedin.com/in/rajendranprasanna', '@prasanna.it.seems'],
          },
        ].map(({ heading, lines }, i) => (
          <div key={heading} style={{
            padding: '24px 28px',
            borderRight: i < 3 ? '1px solid rgba(244,239,230,0.08)' : 'none',
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '8px', letterSpacing: '.2em', textTransform: 'uppercase',
              color: 'var(--red)',
              borderBottom: '1px solid rgba(193,39,45,0.4)',
              paddingBottom: '4px', marginBottom: '12px',
            }}>{heading}</div>
            {lines.map(line => (
              <div key={line} style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '10px', color: 'rgba(244,239,230,0.5)',
                lineHeight: 1.9, letterSpacing: '.02em',
              }}>{line}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Colophon + CMYK dots row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 28px',
      }}>
        {/* Small print */}
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '8.5px', color: 'rgba(244,239,230,0.22)',
          letterSpacing: '.04em', lineHeight: 1.8,
        }}>
          <span>The PR Gazette is an independent publication. All opinions are those of the Editor.</span>
          <br />
          <span>Set in Playfair Display, Source Serif 4, and JetBrains Mono. Typeset in Chennai.</span>
          <br />
          <span>© {new Date().getFullYear()} Prasanna Rajendran. Printed on recycled electrons.</span>
        </div>

        {/* CMYK registration dots */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0px',
          position: 'relative',
        }}>
          {/* Label */}
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '7px', letterSpacing: '.15em', textTransform: 'uppercase',
            color: 'rgba(244,239,230,0.18)',
            marginRight: '12px',
          }}>CMYK REG</div>

          {/* The 4 dots — overlapping registration style */}
          <div style={{ position: 'relative', width: '64px', height: '32px' }}>
            {/* Cyan */}
            <div style={{
              position: 'absolute', left: '0px', top: '50%', transform: 'translateY(-50%)',
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'rgba(0, 188, 212, 0.85)',
              mixBlendMode: 'screen',
            }} />
            {/* Magenta */}
            <div style={{
              position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'rgba(233, 30, 99, 0.85)',
              mixBlendMode: 'screen',
            }} />
            {/* Yellow */}
            <div style={{
              position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)',
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'rgba(255, 235, 59, 0.85)',
              mixBlendMode: 'screen',
            }} />
            {/* Key (Black) */}
            <div style={{
              position: 'absolute', left: '36px', top: '50%', transform: 'translateY(-50%)',
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(244,239,230,0.2)',
              mixBlendMode: 'screen',
            }} />
          </div>

          {/* CMYK labels below dots */}
          <div style={{
            position: 'absolute',
            bottom: '-14px',
            right: 0,
            display: 'flex', gap: '10px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '6.5px', letterSpacing: '.08em',
          }}>
            {[['C','rgba(0,188,212,0.6)'],['M','rgba(233,30,99,0.6)'],['Y','rgba(255,235,59,0.6)'],['K','rgba(244,239,230,0.25)']].map(([l, c]) => (
              <span key={l} style={{ color: c }}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Final thin red rule at absolute bottom */}
      <div style={{ height: '3px', background: 'var(--red)' }} />
      <div style={{ height: '1px', background: 'rgba(244,239,230,0.06)' }} />
    </footer>
  );
};
Object.assign(window, { Footer });
