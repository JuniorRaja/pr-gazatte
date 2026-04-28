
const Classifieds = ({ tweaks }) => {
  const { showRules = true } = tweaks || {};

  return (
    <section id="contact" style={{ borderBottom: '3px solid var(--ink)' }}>
      <div style={{
        background: 'var(--ink)', color: '#F4EFE6',
        padding: '5px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Contact · Page 10</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>HIRE · REACH · CONNECT</span>
      </div>

      <div style={{ padding: '40px 32px 36px' }}>
        {/* 3-col: what, how, where */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr', gap: 0, marginBottom: '36px' }}>

          {/* Col 1 — What */}
          <div style={{ paddingRight: '36px' }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--red)',
              textTransform: 'uppercase', letterSpacing: '.18em',
              borderBottom: '1px solid var(--red)', paddingBottom: '4px', marginBottom: '16px',
            }}>What I Do</div>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(22px, 3vw, 36px)',
              fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em',
              color: 'var(--ink)', margin: '0 0 16px',
            }}>Lead teams.<br />Ship software.<br />Solve problems.</h3>
            <p style={{
              fontFamily: '"Source Serif 4", serif',
              fontSize: '14px', lineHeight: 1.7, color: 'var(--ink)', margin: 0,
            }}>
              6.5 years in FinTech. Deputy PM with hands-on engineering. Available for serious conversations.
            </p>
          </div>

          {/* Divider */}
          <div style={{ background: 'rgba(14,14,12,0.15)', margin: '0 0' }} />

          {/* Col 2 — How */}
          <div style={{ padding: '0 36px' }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--red)',
              textTransform: 'uppercase', letterSpacing: '.18em',
              borderBottom: '1px solid var(--red)', paddingBottom: '4px', marginBottom: '16px',
            }}>Reach Me</div>

            {[
              { label: 'Email', value: 'hello@prasannar.com', href: 'mailto:hello@prasannar.com', primary: true },
              { label: 'LinkedIn', value: '/in/rajendranprasanna', href: 'https://linkedin.com/in/rajendranprasanna', primary: false },
              { label: 'GitHub', value: '@JuniorRaja', href: 'https://github.com/JuniorRaja', primary: false },
              { label: 'Instagram', value: '@prasanna.it.seems', href: 'https://instagram.com/prasanna.it.seems', primary: false },
            ].map(({ label, value, href, primary }) => (
              <a key={label} href={href} target="_blank" rel="noopener" style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                borderBottom: '1px solid rgba(14,14,12,0.1)',
                padding: '10px 0',
                textDecoration: 'none',
                transition: 'padding-left .15s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.paddingLeft = '4px'}
                onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
              >
                <span style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: '9px',
                  color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.1em',
                }}>{label}</span>
                <span style={{
                  fontFamily: primary ? '"Playfair Display", serif' : '"JetBrains Mono", monospace',
                  fontSize: primary ? '15px' : '11px',
                  fontWeight: primary ? 700 : 400,
                  color: primary ? 'var(--red)' : 'var(--ink)',
                }}>{value}</span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div style={{ background: 'rgba(14,14,12,0.15)', margin: '0 0' }} />

          {/* Col 3 — Where / status */}
          <div style={{ paddingLeft: '36px' }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--red)',
              textTransform: 'uppercase', letterSpacing: '.18em',
              borderBottom: '1px solid var(--red)', paddingBottom: '4px', marginBottom: '16px',
            }}>Current Status</div>

            {[
              ['Location', 'Chennai, India'],
              ['Role', 'Dy. PM + Engineer'],
              ['Team size', '8 direct reports'],
              ['Open to', 'Interesting offers'],
              ['Notice', 'Negotiable'],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'flex', justifyContent: 'space-between',
                borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: '8px 0',
              }}>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{k}</span>
                <span style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', color: 'var(--ink)', fontWeight: 600 }}>{v}</span>
              </div>
            ))}

            {/* Open indicator */}
            <div style={{
              marginTop: '16px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2a7a3b', animation: 'pulse 2s infinite' }} />
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#2a7a3b', fontWeight: 700, letterSpacing: '.08em' }}>AVAILABLE FOR CONVERSATIONS</div>
            </div>
          </div>
        </div>

        {/* Single CTA rule */}
        <div style={{
          borderTop: '2px solid var(--ink)',
          paddingTop: '20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{
            fontFamily: '"Source Serif 4", serif',
            fontSize: '12px', fontStyle: 'italic', color: 'var(--sepia)', lineHeight: 1.6,
          }}>
            The PR Gazette · Chennai · Est. 1998 · Vol. PR · No. 69
          </div>
          <a href="mailto:hello@prasannar.com" style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '14px', fontWeight: 700,
            color: '#F4EFE6', background: 'var(--ink)',
            padding: '12px 28px',
            textDecoration: 'none',
            letterSpacing: '.02em',
            display: 'inline-block',
            transition: 'background .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--red)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
          >
            Write to the Editor →
          </a>
        </div>
      </div>
      <SectionFiller watermark="CONTACT" footnote="Classifieds · p. 10 · hello@prasannar.com · Chennai · Est. 1998" page="10" />
    </section>
  );
};
Object.assign(window, { Classifieds });
