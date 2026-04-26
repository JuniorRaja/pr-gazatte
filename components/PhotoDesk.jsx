
const PhotoDesk = ({ tweaks }) => {
  const { showRules = true } = tweaks || {};

  const spreads = [
    {
      issue: 'Issue I',
      title: 'Eastern Europe',
      subtitle: 'Prague · Budapest · Vienna · Bratislava',
      date: 'Sep – Nov 2023',
      lead: 'Ornate doors and iron-worked windows. Cities that aged into grandeur.',
      photos: [
        { label: 'Prague Old Town Hall', orient: 'portrait' },
        { label: 'Széchenyi Baths', orient: 'landscape' },
        { label: 'Vienna Ringstraße', orient: 'landscape' },
        { label: 'Bratislava Castle', orient: 'portrait' },
      ],
      color: '#8B2020',
    },
    {
      issue: 'Issue II',
      title: 'South-East Asia',
      subtitle: 'Singapore · Sri Lanka',
      date: 'Jan · Jun 2023',
      lead: 'Humidity and light. Modern towers beside colonial stone.',
      photos: [
        { label: 'Marina Bay Sands', orient: 'landscape' },
        { label: 'Temple of the Tooth', orient: 'portrait' },
        { label: 'Chinatown Facades', orient: 'portrait' },
        { label: 'Galle Fort', orient: 'landscape' },
      ],
      color: '#2a5a3b',
    },
    {
      issue: 'Issue III',
      title: 'High Country',
      subtitle: 'High Tatras · Slovenia · Poland',
      date: 'Sep – Oct 2023',
      lead: 'Ridge-lines and river gorges. Silence at altitude.',
      photos: [
        { label: 'Tatra Ridgeline', orient: 'landscape' },
        { label: 'Bled Island', orient: 'landscape' },
        { label: 'Morskie Oko', orient: 'portrait' },
        { label: 'Dunajec Gorge', orient: 'portrait' },
      ],
      color: '#1a3a5c',
    },
    {
      issue: 'Issue IV',
      title: 'The Home Beat',
      subtitle: 'Chennai · Tamil Nadu',
      date: '2022 – 2024',
      lead: 'Monsoon light through jalousies. Morning markets. The geometry of the familiar.',
      photos: [
        { label: 'Marina Beach', orient: 'landscape' },
        { label: 'Kapaleeshwarar gopuram', orient: 'portrait' },
        { label: 'Pongal harvest', orient: 'portrait' },
        { label: 'Monsoon street', orient: 'landscape' },
      ],
      color: '#7a4a2a',
    },
  ];

  const [current, setCurrent] = React.useState(0);
  const [flipping, setFlipping] = React.useState(false);
  const [dir, setDir] = React.useState(1); // 1 = forward, -1 = back

  const go = (delta) => {
    if (flipping) return;
    const next = (current + delta + spreads.length) % spreads.length;
    setDir(delta);
    setFlipping(true);
    setTimeout(() => {
      setCurrent(next);
      setFlipping(false);
    }, 320);
  };

  const spread = spreads[current];

  return (
    <section id="photos" style={{ borderBottom: '2px solid var(--ink)' }}>
      <div style={{
        background: 'var(--ink)', color: '#F4EFE6',
        padding: '5px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Arts &amp; Culture · Page 6</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>THE PHOTO MAGAZINE</span>
      </div>

      {/* Magazine wrapper */}
      <div style={{
        background: '#1a1710',
        padding: '32px 24px 28px',
        position: 'relative',
      }}>
        {/* Issue indicator pills */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
          {spreads.map((s, i) => (
            <button key={i} onClick={() => { setDir(i > current ? 1 : -1); setFlipping(true); setTimeout(() => { setCurrent(i); setFlipping(false); }, 320); }}
              style={{
                width: '28px', height: '4px', border: 'none', cursor: 'pointer',
                background: i === current ? '#F4EFE6' : 'rgba(244,239,230,0.25)',
                transition: 'background .2s',
              }} />
          ))}
        </div>

        {/* Magazine spread */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          maxWidth: '960px',
          margin: '0 auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          transition: 'opacity .32s, transform .32s',
          opacity: flipping ? 0 : 1,
          transform: flipping ? `translateX(${dir * 18}px)` : 'translateX(0)',
        }}>
          {/* Left page */}
          <div style={{
            background: '#F0EAD8',
            padding: '36px 32px',
            borderRight: '2px solid rgba(14,14,12,0.4)',
            position: 'relative',
            minHeight: '460px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            {/* Page curl shadow */}
            <div style={{
              position: 'absolute', right: 0, bottom: 0,
              width: '40px', height: '40px',
              background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.12) 50%)',
              pointerEvents: 'none',
            }} />

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: '8px',
                    letterSpacing: '.2em', textTransform: 'uppercase',
                    color: spread.color, marginBottom: '6px',
                  }}>{spread.issue} · The Photo Desk</div>
                  <h2 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em',
                    color: '#0E0E0C', margin: 0,
                  }}>{spread.title}</h2>
                  <div style={{
                    fontFamily: '"Source Serif 4", serif',
                    fontSize: '13px', fontStyle: 'italic', color: '#5a4a3a',
                    marginTop: '4px',
                  }}>{spread.subtitle}</div>
                </div>
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: '8px',
                  color: '#9a8070', textAlign: 'right', lineHeight: 1.7,
                }}>{spread.date}</div>
              </div>

              {/* Featured image */}
              <div style={{
                height: '200px',
                border: `1px solid ${spread.color}`,
                marginBottom: '16px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <img
                  src={`https://picsum.photos/seed/${spread.issue.replace(' ','')}-feat/560/320`}
                  alt={spread.photos[0].label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(0.85) sepia(0.42) contrast(1.12) brightness(0.88)' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(transparent, rgba(14,14,12,0.65))',
                  padding: '14px 10px 6px',
                }}>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'rgba(244,239,230,0.85)', letterSpacing: '.07em' }}>{spread.photos[0].label}</div>
                </div>
              </div>

              <p style={{
                fontFamily: '"Source Serif 4", serif',
                fontSize: '14px', lineHeight: 1.7, color: '#2a1f0e',
                margin: 0,
              }}>{spread.lead}</p>
            </div>

            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: '8px',
              color: '#9a8070', borderTop: '1px solid rgba(14,14,12,0.15)', paddingTop: '8px',
            }}>
              {current + 1} / {spreads.length} &nbsp;·&nbsp; {spread.subtitle}
            </div>
          </div>

          {/* Right page — contact sheet */}
          <div style={{
            background: '#E8E0CC',
            padding: '28px 28px',
            display: 'flex', flexDirection: 'column', gap: '0',
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: '8px',
              letterSpacing: '.15em', textTransform: 'uppercase', color: '#7a6a5a',
              borderBottom: '1px solid rgba(14,14,12,0.2)', paddingBottom: '6px', marginBottom: '14px',
            }}>Contact Sheet · {spread.issue}</div>

            {/* 2×2 grid of photo thumbnails */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px',
              flex: 1, marginBottom: '14px',
            }}>
              {spread.photos.map((photo, pi) => (
                <div key={pi} style={{
                  background: '#D8D0BC',
                  border: '1px solid rgba(14,14,12,0.15)',
                  display: 'flex', flexDirection: 'column',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    flex: 1, minHeight: photo.orient === 'portrait' ? '90px' : '65px',
                    overflow: 'hidden', position: 'relative',
                  }}>
                    <img
                      src={`https://picsum.photos/seed/${spread.issue.replace(' ','')}-${pi}/200/160`}
                      alt={photo.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(0.88) sepia(0.38) contrast(1.1) brightness(0.9)' }}
                    />
                    <div style={{ position: 'absolute', top: '3px', left: '4px', fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', color: 'rgba(244,239,230,0.7)', background: 'rgba(14,14,12,0.4)', padding: '1px 4px' }}>{pi + 1}</div>
                  </div>
                  <div style={{ padding: '4px 6px', borderTop: '1px solid rgba(14,14,12,0.1)' }}>
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', color: '#5a4a3a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{photo.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              fontFamily: '"Source Serif 4", serif',
              fontSize: '11px', fontStyle: 'italic', color: '#7a6a5a',
              lineHeight: 1.6, borderTop: '1px solid rgba(14,14,12,0.15)', paddingTop: '10px',
            }}>
              Geometry. Light. Texture. The same search in every city.
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          maxWidth: '960px', margin: '16px auto 0',
        }}>
          <button onClick={() => go(-1)} style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: '11px',
            color: '#F4EFE6', background: 'rgba(244,239,230,0.1)',
            border: '1px solid rgba(244,239,230,0.2)',
            padding: '8px 18px', cursor: 'pointer',
            letterSpacing: '.1em', textTransform: 'uppercase',
            transition: 'background .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,239,230,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(244,239,230,0.1)'}
          >← Prev Issue</button>

          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'rgba(244,239,230,0.4)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
            {spread.issue} — {spread.title}
          </div>

          <button onClick={() => go(1)} style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: '11px',
            color: '#F4EFE6', background: 'rgba(244,239,230,0.1)',
            border: '1px solid rgba(244,239,230,0.2)',
            padding: '8px 18px', cursor: 'pointer',
            letterSpacing: '.1em', textTransform: 'uppercase',
            transition: 'background .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,239,230,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(244,239,230,0.1)'}
          >Next Issue →</button>
        </div>
      </div>
      <SectionFiller watermark="PHOTOS" footnote="Arts & Culture · p. 6 · 4 issues · 9 countries · Photography" page="6" />
    </section>
  );
};
Object.assign(window, { PhotoDesk });
