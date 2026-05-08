function getFormattedDate() {
  const DAYS = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']
  const MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
  const now = new Date()
  return `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`
}

function getMonthYear() {
  const MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
  const now = new Date()
  return `${MONTHS[now.getMonth()]} ${now.getFullYear()}`
}

const Masthead = ({ tweaks }) => {
  const { showRules = true } = tweaks || {};
  const [menuOpen, setMenuOpen] = React.useState(false);

  const navItems = ['Op-Ed', 'Tech', 'Career', 'Lab', 'Photos', 'Books', 'Travel', 'Hobbies', 'Contact'];

  return (
    <header style={{ borderBottom: '3px solid #0E0E0C' }}>
      {/* Top strip — navigation */}
      <div style={{
        borderBottom: '1px solid #0E0E0C',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 32px',
        fontSize: '10px',
        fontFamily: '"JetBrains Mono", monospace',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#0E0E0C',
      }}>
        <span style={{ color: '#C1272D', fontWeight: 700 }}>★ FIRST EDITION</span>
        <nav className="nav-links" style={{ display: 'flex', gap: '20px' }}>
          {navItems.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              textDecoration: 'none', color: '#0E0E0C', transition: 'color .15s'
            }}
              onMouseEnter={e => e.target.style.color = '#C1272D'}
              onMouseLeave={e => e.target.style.color = '#0E0E0C'}
            >{item}</a>
          ))}
        </nav>
        <span className="nav-links" style={{ display: 'flex' }}>hello@prasannar.com</span>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(true)}>☰ Menu</button>
      </div>

      {/* Mobile nav overlay */}
      <div className={`mobile-nav-overlay${menuOpen ? ' open' : ''}`}>
        <button onClick={() => setMenuOpen(false)} style={{
          position: 'absolute', top: '24px', right: '24px',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: '"JetBrains Mono", monospace', fontSize: '12px',
          color: 'var(--cream)', letterSpacing: '.1em',
        }}>✕ Close</button>
        <div style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '28px', fontWeight: 900, color: 'var(--cream)',
          marginBottom: '16px', letterSpacing: '-0.02em',
        }}>THE PR GAZETTE</div>
        {navItems.map(item => (
          <a key={item} href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '13px', letterSpacing: '.15em',
              textTransform: 'uppercase', color: 'var(--cream)',
              textDecoration: 'none', borderBottom: '1px solid rgba(244,239,230,0.15)',
              paddingBottom: '8px', width: '200px', textAlign: 'center',
            }}>{item}</a>
        ))}
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'rgba(244,239,230,0.4)', marginTop: '16px' }}>hello@prasannar.com</div>
      </div>

      {/* Date / Vol / Weather strip */}
      <div className="masthead-strip" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: '10px 32px 8px',
        borderBottom: '1px solid rgba(14,14,12,0.25)',
      }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.05em', color: '#0E0E0C' }}>
          <div style={{ fontWeight: 700 }}>{getFormattedDate()}</div>
          <div style={{ marginTop: 2 }}>Vol. PR · No. 1 · Chennai Edition</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(52px, 9vw, 110px)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: '#0E0E0C',
            userSelect: 'none',
          }}>
            THE PR GAZETTE
          </div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: '#0E0E0C',
            marginTop: '6px',
            textTransform: 'uppercase',
          }}>
            ◆ &nbsp; Independent · Opinionated · Occasionally Correct &nbsp; ◆
          </div>
        </div>

        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', textAlign: 'right', color: '#0E0E0C' }}>
          <div style={{ fontWeight: 700, color: '#C1272D' }}>WEATHER</div>
          <div>Chennai · 32°C</div>
          <div>Humid · Winds SW</div>
        </div>
      </div>

      {/* Thin red rule */}
      <div style={{ height: '3px', background: '#C1272D', margin: '0' }} />
      <div style={{ height: '1px', background: '#0E0E0C', margin: '0' }} />

      {/* Lead grid */}
      <div className="newspaper-grid-3" style={{
        display: 'grid',
        gridTemplateColumns: '3fr 5fr 4fr',
        columnGap: 0,
        borderBottom: '2px solid #0E0E0C',
      }}>
        {/* Left col */}
        <div style={{
          borderRight: showRules ? '1px solid rgba(14,14,12,0.2)' : 'none',
          padding: '24px 28px',
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px',
            letterSpacing: '.15em',
            textTransform: 'uppercase',
            color: '#C1272D',
            borderBottom: '1px solid #C1272D',
            paddingBottom: '4px',
            marginBottom: '12px',
          }}>
            About the Editor
          </div>
          <p style={{
            fontFamily: '"Source Serif 4", serif',
            fontSize: '13px',
            lineHeight: 1.65,
            color: '#0E0E0C',
            margin: 0,
          }}>
            Prasanna Rajendran has spent the better part of a decade inside non-banking finance — first writing code, then shaping the systems around it, and eventually taking responsibility for what happens when those systems meet the real world.
          </p>
          <p style={{
            fontFamily: '"Source Serif 4", serif',
            fontSize: '13px',
            lineHeight: 1.65,
            color: '#0E0E0C',
            margin: '12px 0 0',
          }}>
            He believes competence and curiosity are not trade-offs. You can — and should — keep both sharp.
          </p>

          <div style={{
            marginTop: '24px',
            borderTop: '1px solid rgba(14,14,12,0.2)',
            paddingTop: '14px',
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '9px',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: '#B8A792',
              marginBottom: '8px',
            }}>Quick Facts</div>
            {[
              ['Role', 'Project Manager + Engineer'],
              ['Location', 'Chennai, India'],
              ['Experience', '7+ years in FinTech'],
              ['Focus', 'Reliable systems & calmer teams'],
              ['Curiosities', 'Photography, books, rabbit holes'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: '4px 0', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>
                <span style={{ color: '#B8A792', textTransform: 'uppercase', letterSpacing: '.05em' }}>{k}</span>
                <span style={{ color: '#0E0E0C', fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Centre col — lead headline */}
        <div style={{
          borderRight: showRules ? '1px solid rgba(14,14,12,0.2)' : 'none',
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(32px, 4.5vw, 64px)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: '#0E0E0C',
              margin: '0 0 16px',
              borderBottom: '2px solid #0E0E0C',
              paddingBottom: '16px',
            }}>
              Writes Code.<br />
              Leads Teams.<br />
              <span style={{ color: '#C1272D' }}>Makes Things Ship.</span>
            </h1>

            <p style={{
              fontFamily: '"Source Serif 4", serif',
              fontSize: '15px',
              fontStyle: 'italic',
              lineHeight: 1.5,
              color: '#0E0E0C',
              margin: '0 0 18px',
              borderBottom: '1px solid rgba(14,14,12,0.15)',
              paddingBottom: '16px',
            }}>
              By day, I lead a FinTech engineering team that moves real money. By night, I ship experiments. On weekends, I chase whatever rabbit hole looks interesting. Same operating system, different tabs.
            </p>

            {/* Drop cap lead paragraph */}
            <p className="drop-cap" style={{
              fontFamily: '"Source Serif 4", serif',
              fontSize: '14px',
              lineHeight: 1.7,
              color: '#0E0E0C',
              margin: '0 0 16px',
              columns: 2,
              columnGap: '20px',
              columnRule: showRules ? '1px solid rgba(14,14,12,0.15)' : 'none',
            }}>
              Prasanna Rajendran has spent seven years inside the machinery of non-banking finance — writing the code, then leading the team that writes it, then calmly putting out the fires when that code meets reality at 3 a.m. He's the kind of person who fixes the bug before filing the ticket. The one reading RFCs on a Sunday not because anyone asked, but because something felt unfinished. Somewhere around year four, he learned that panic is the least efficient response when things break.
            </p>

            {/* Quote block */}
            <blockquote style={{
              margin: '0',
              padding: '14px 18px',
              borderLeft: '3px solid #C1272D',
              background: 'rgba(193,39,45,0.04)',
            }}>
              <p style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '13px',
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: '#0E0E0C',
                margin: '0 0 6px',
              }}>
                "I have never once finished learning something and thought — that's enough. Curiosity is not a trait. It is the only operating system I have never considered upgrading."
              </p>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: '#B8A792' }}>— Prasanna Rajendran, Editor-in-Chief</div>
            </blockquote>
          </div>

          <div style={{
            marginTop: '20px',
            borderTop: '1px solid #0E0E0C',
            paddingTop: '8px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '10px',
            color: '#C1272D',
            fontStyle: 'italic',
          }}>
            (Continued on Op-Ed, p. 2)
          </div>
        </div>

        {/* Right col */}
        <div style={{ padding: '24px 28px' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px',
            letterSpacing: '.15em',
            textTransform: 'uppercase',
            color: '#C1272D',
            borderBottom: '1px solid #C1272D',
            paddingBottom: '4px',
            marginBottom: '16px',
          }}>
            Today's Index
          </div>
          {[
            { p: '2', t: 'Op-Ed: A Person, Not a Resume' },
            { p: '3', t: 'Tech Desk: The Stack Report' },
            { p: '4', t: 'Career Beat: Six and a Half Years' },
            { p: '5', t: 'Lab Report: Self-Hosting & Servers' },
            { p: '6', t: 'Photo Desk: Patterns & Doors' },
            { p: '7', t: 'Books: This Week\'s Reads' },
            { p: '8', t: 'Travel: Stamps in the Passport' },
            { p: '9', t: 'Off-Duty: Cabinet of Curiosities' },
            { p: '10', t: 'Classifieds: Hire · Wanted · Lost' },
          ].map(({ p, t }) => (
            <div key={p} style={{
              display: 'flex',
              gap: '10px',
              borderBottom: '1px dotted rgba(14,14,12,0.2)',
              padding: '6px 0',
              alignItems: 'baseline',
            }}>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '9px',
                color: '#C1272D',
                fontWeight: 700,
                minWidth: '20px',
              }}>p.{p}</span>
              <span style={{
                fontFamily: '"Source Serif 4", serif',
                fontSize: '12px',
                color: '#0E0E0C',
                lineHeight: 1.4,
              }}>{t}</span>
            </div>
          ))}

          {/* Portrait */}
          <div style={{
            marginTop: '20px',
            height: '160px',
            border: '1px solid rgba(14,14,12,0.2)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <img
              src="https://picsum.photos/seed/portrait-pr/240/320"
              alt="Portrait"
              className="np-img"
              style={{ filter: 'grayscale(0.9) sepia(0.45) contrast(1.1) brightness(0.85)', width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(14,14,12,0.6))',
              padding: '12px 8px 6px',
            }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'rgba(244,239,230,0.8)', letterSpacing: '.08em' }}>Chennai · 2024</div>
            </div>
          </div>
        </div>
      </div>
      <SectionFiller watermark="GAZETTE" footnote={`Vol. PR · No. 1 · Chennai Edition · ${getMonthYear()}`} page="1" />
    </header>
  );
};
Object.assign(window, { Masthead });
