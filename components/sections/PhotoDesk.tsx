import SectionFiller from '@/components/SectionFiller'
import { spreads } from '@/content/photos.mdx'

export default function PhotoDesk() {
  return (
    <section id="photos" style={{ borderBottom: '2px solid var(--fg)' }}>
      <div style={{ background: 'var(--fg)', color: 'var(--bg)', padding: '5px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Arts &amp; Culture · Page 6</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>THE PHOTO MAGAZINE</span>
      </div>

      <div style={{ background: '#1a1710', padding: '32px 24px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '960px', margin: '0 auto' }}>
          {spreads.map((spread) => (
            <div key={spread.issue} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', boxShadow: '0 12px 32px rgba(0,0,0,0.5)' }}>
              {/* Left page */}
              <div style={{ background: '#F0EAD8', padding: '24px 20px', borderRight: '2px solid rgba(14,14,12,0.4)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', letterSpacing: '.2em', textTransform: 'uppercase', color: spread.color, marginBottom: '4px' }}>{spread.issue}</div>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#0E0E0C', margin: 0 }}>{spread.title}</h3>
                  <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: '11px', fontStyle: 'italic', color: '#5a4a3a', marginTop: '2px' }}>{spread.subtitle}</div>
                </div>
                <div style={{ height: '120px', border: `1px solid ${spread.color}`, background: 'rgba(184,167,146,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', color: '#9a8070', textTransform: 'uppercase', letterSpacing: '.1em', textAlign: 'center' }}>{spread.date}<br />Photo spread</span>
                </div>
                <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '12px', lineHeight: 1.6, color: '#2a1f0e', margin: 0 }}>{spread.lead}</p>
              </div>
              {/* Right page — contact sheet */}
              <div style={{ background: '#E8E0CC', padding: '20px 16px' }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', letterSpacing: '.15em', textTransform: 'uppercase', color: '#7a6a5a', borderBottom: '1px solid rgba(14,14,12,0.2)', paddingBottom: '6px', marginBottom: '10px' }}>Contact Sheet</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} style={{ background: '#D8D0BC', border: '1px solid rgba(14,14,12,0.15)', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', color: '#7a6a5a' }}>{n}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '10px', fontFamily: '"Source Serif 4", serif', fontSize: '10px', fontStyle: 'italic', color: '#7a6a5a', lineHeight: 1.5 }}>
                  Geometry. Light. Texture.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SectionFiller watermark="PHOTOS" footnote="Arts & Culture · p. 6 · 4 issues · 9 countries · Photography" page="6" />
    </section>
  )
}
