import NpImage from '@/components/NpImage'
import SectionFiller from '@/components/SectionFiller'
import { countries } from '@/content/travel.mdx'

const europeCities = [
  { city: 'Warsaw',    country: 'PL' },
  { city: 'Bratislava', country: 'SK' },
  { city: 'Prague',    country: 'CZ' },
  { city: 'Vienna',    country: 'AT' },
  { city: 'Budapest',  country: 'HU' },
  { city: 'Ljubljana', country: 'SI' },
]

const shortDispatches = [
  {
    date: 'Jan 2023',
    title: 'The Engineered Island.',
    body: 'Marina Bay against Galle Fort — the January assignment was a study in contrast. One island engineered to perfection; the other, ancient and salt-worn.',
    image: 'https://picsum.photos/seed/singapore-marina/320/180',
    caption: 'Marina Bay · Singapore',
  },
  {
    date: 'Jun 2023',
    title: 'Galle Fort & the Ancient Coast.',
    body: 'Sri Lanka in June. The light is heavy. The coast at Galle feels like a different century. The contrast with Singapore, five months earlier, was precisely the point.',
    image: null,
    caption: null,
  },
  {
    date: '2023',
    title: 'First Southern Hemisphere Assignment.',
    body: 'Antipodean light is different. The birds are louder. Filed with confidence this was not the last visit.',
    image: 'https://picsum.photos/seed/sydney-harbour/320/180',
    caption: null,
  },
]

function StampDots() {
  return (
    <div style={{ position: 'absolute', top: '-4px', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
      {Array.from({ length: 7 }).map((_, j) => (
        <div key={j} style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--fg)', flexShrink: 0 }} />
      ))}
    </div>
  )
}

export default function Travel() {
  return (
    <section id="travel" style={{ borderBottom: '2px solid var(--fg)' }}>
      {/* Section flag */}
      <div style={{ background: 'var(--fg)', color: '#F4EFE6', padding: '5px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Travel · Page 8</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>FOREIGN CORRESPONDENTS · FIELD DISPATCHES</span>
      </div>

      {/* Full-width headline strip */}
      <div style={{ borderBottom: '3px double var(--fg)', padding: '20px 32px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.2em', marginBottom: '8px' }}>The Foreign Desk · Annual Dispatch</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(30px, 4.5vw, 64px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.025em', color: 'var(--fg)', margin: 0 }}>
            Nine Stamps.<br />Three Continents.<br />
            <span style={{ color: 'var(--accent)' }}>One Correspondent.</span>
          </h2>
        </div>
        <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: '14px', fontStyle: 'italic', lineHeight: 1.65, color: 'var(--fg)', maxWidth: '320px', flexShrink: 0, borderLeft: '3px solid var(--accent)', paddingLeft: '16px', opacity: 0.8 }}>
          From the Tatra ridgelines of Central Europe to the engineered island of Singapore and the antipodean light of Australia — the beat continues.
        </div>
      </div>

      {/* Main 4-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr 220px', columnGap: 0, minHeight: '600px' }}>

        {/* Col 1 — Passport stamps */}
        <div style={{ borderRight: '2px solid var(--fg)', padding: '20px 14px', background: 'rgba(14,14,12,0.025)' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.2em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px', textAlign: 'center' }}>Passport</div>

          {countries.map((c, i) => (
            <div key={c.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--fg)', outline: '1px solid var(--fg)', outlineOffset: '3px', padding: '8px 6px 6px', position: 'relative', background: i % 3 === 0 ? 'rgba(139,34,35,0.04)' : 'transparent', marginBottom: '10px' }}>
              <StampDots />
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 900, lineHeight: 1, color: i % 4 === 1 ? 'var(--accent)' : 'var(--fg)', letterSpacing: '.05em' }}>{c.stamp}</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--fg)', marginTop: '4px', textAlign: 'center', lineHeight: 1.3 }}>{c.name}</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', color: 'var(--sepia)', marginTop: '2px' }}>{c.year}</div>
            </div>
          ))}

          {/* Japan — pending */}
          <div style={{ border: '2px dashed var(--accent)', padding: '8px 6px 6px', textAlign: 'center', opacity: 0.6 }}>
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>JP</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', textTransform: 'uppercase', color: 'var(--accent)', marginTop: '4px', letterSpacing: '.08em' }}>JAPAN</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', color: 'var(--accent)', marginTop: '2px' }}>PENDING</div>
          </div>
        </div>

        {/* Col 2+3 — Lead story: Central Europe */}
        <div style={{ gridColumn: 'span 2', borderRight: '1px solid rgba(14,14,12,0.2)', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px' }}>
            Lead Dispatch · Central Europe · Sep–Nov 2023
          </div>

          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--fg)', margin: 0 }}>
            Six Nations in One Autumn.<br />
            <span style={{ fontStyle: 'italic', fontWeight: 700, color: 'var(--accent)' }}>Filed Without Incident.</span>
          </h3>

          {/* Country dateline tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['Poland', 'Slovakia', 'Czech Republic', 'Austria', 'Hungary', 'Slovenia'].map(c => (
              <span key={c} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', background: 'var(--fg)', color: 'var(--bg)', padding: '2px 8px', letterSpacing: '.06em', textTransform: 'uppercase' }}>{c}</span>
            ))}
          </div>

          {/* Photo strip */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '2px', height: '200px' }}>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <NpImage src="https://picsum.photos/seed/europe-castle/480/300" alt="Bratislava Castle Hill" fill sizes="(max-width: 900px) 100vw, 480px" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(14,14,12,0.65))', padding: '16px 8px 6px', zIndex: 1 }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'rgba(244,239,230,0.85)', letterSpacing: '.06em' }}>Bratislava Castle Hill · Slovakia</div>
              </div>
            </div>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <NpImage src="https://picsum.photos/seed/tatras-ridge/240/300" alt="Tatras" fill sizes="240px" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(14,14,12,0.65))', padding: '10px 6px 4px', zIndex: 1 }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', color: 'rgba(244,239,230,0.8)' }}>Tatras · Poland</div>
              </div>
            </div>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <NpImage src="https://picsum.photos/seed/vienna-arcade/240/300" alt="Vienna" fill sizes="240px" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(14,14,12,0.65))', padding: '10px 6px 4px', zIndex: 1 }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', color: 'rgba(244,239,230,0.8)' }}>Arcades · Vienna</div>
              </div>
            </div>
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'var(--sepia)', fontStyle: 'italic', textAlign: 'center', borderBottom: '1px solid rgba(14,14,12,0.12)', paddingBottom: '12px' }}>
            Above, left to right: Bratislava Castle Hill · Tatras Ridgeline · Viennese Arcades — Photographs by the Correspondent, Autumn 2023
          </div>

          {/* Pull quote */}
          <blockquote style={{ margin: 0, padding: '12px 18px', borderLeft: '4px solid var(--accent)', background: 'rgba(139,34,35,0.04)' }}>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(15px, 2vw, 20px)', fontStyle: 'italic', fontWeight: 700, lineHeight: 1.35, color: 'var(--fg)', margin: 0 }}>
              &ldquo;Thermal baths in Budapest. Castle hills in Bratislava. The Tatras in cloud. The contrast is the itinerary.&rdquo;
            </p>
          </blockquote>

          {/* Body copy — 2 columns */}
          <div style={{ columns: 2, columnGap: '24px', columnRule: '1px solid rgba(14,14,12,0.15)' }}>
            <p className="drop-cap" style={{ fontFamily: '"Source Serif 4", serif', fontSize: '14px', lineHeight: 1.72, color: 'var(--fg)', margin: '0 0 12px' }}>
              Six countries in one autumn was not planned as a sweep — it evolved into one. From Warsaw&apos;s reconstructed grandeur to Ljubljana&apos;s compact beauty, each capital offered a different texture of Central European history. The Tatras ridge in Poland was the physical high point. Budapest&apos;s thermal baths, the sensory one.
            </p>
            <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '14px', lineHeight: 1.72, color: 'var(--fg)', margin: 0 }}>
              The train network made it possible. The weather made it memorable. Filed from Vienna on the last leg, this correspondent notes: the architecture argues with itself across every border, and that argument is the most interesting thing about Central Europe.
            </p>
          </div>

          {/* City dateline bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', borderTop: '1px solid rgba(14,14,12,0.2)', paddingTop: '10px', gap: '1px' }}>
            {europeCities.map(({ city, country }) => (
              <div key={city} style={{ textAlign: 'center', padding: '4px 0' }}>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '14px', fontWeight: 900, color: 'var(--fg)' }}>{country}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{city}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 4 — Short dispatches */}
        <div style={{ padding: '24px 18px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {shortDispatches.map((d, i) => (
            <div key={i}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.12em', borderBottom: '1px solid var(--accent)', paddingBottom: '3px', marginBottom: '8px' }}>Dispatch · {d.date}</div>
              {d.image && (
                <div style={{ overflow: 'hidden', height: i === 0 ? '90px' : '80px', marginBottom: '8px', position: 'relative' }}>
                  <NpImage src={d.image} alt={d.title} fill sizes="220px" />
                  {d.caption && (
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(14,14,12,0.6))', padding: '10px 6px 4px', zIndex: 1 }}>
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '7px', color: 'rgba(244,239,230,0.85)' }}>{d.caption}</div>
                    </div>
                  )}
                </div>
              )}
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '14px', fontWeight: 700, lineHeight: 1.25, color: 'var(--fg)', marginBottom: '6px' }}>{d.title}</div>
              <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '12.5px', lineHeight: 1.6, color: 'var(--fg)', margin: 0 }}>{d.body}</p>
              {i < shortDispatches.length - 1 && <div style={{ height: '1px', background: 'rgba(14,14,12,0.15)', marginTop: '20px' }} />}
            </div>
          ))}

          {/* Japan WANTED notice */}
          <div style={{ border: '2px solid var(--fg)', padding: '12px', textAlign: 'center', background: 'rgba(139,34,35,0.03)' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.2em', color: 'var(--accent)', marginBottom: '6px' }}>⚑ WANTED NOTICE ⚑</div>
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 900, lineHeight: 1.1, color: 'var(--fg)', marginBottom: '6px' }}>Japan.<br />Long Overdue.</div>
            <div style={{ height: '1px', background: 'rgba(14,14,12,0.2)', margin: '8px 0' }} />
            <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '11.5px', lineHeight: 1.55, color: 'var(--fg)', margin: '0 0 8px', fontStyle: 'italic' }}>
              Tokyo · Kyoto · Osaka — target destinations. The railway system alone warrants the trip.
            </p>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'var(--accent)', letterSpacing: '.1em' }}>STATUS: OPEN ASSIGNMENT · 2025</div>
          </div>
        </div>
      </div>

      {/* Dark bottom strip */}
      <div style={{ borderTop: '3px double var(--fg)', background: 'var(--fg)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '16px 32px', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: 'var(--bg)', lineHeight: 1 }}>9 Countries.</div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'rgba(244,239,230,0.45)', textTransform: 'uppercase', letterSpacing: '.1em', marginTop: '4px' }}>Stamps collected as of press date</div>
        </div>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          {[['Europe', '6'], ['Asia', '2'], ['Oceania', '1']].map(([cont, n]) => (
            <div key={cont} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 900, color: 'var(--bg)', lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'rgba(244,239,230,0.4)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{cont}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', fontStyle: 'italic', color: 'rgba(244,239,230,0.6)', lineHeight: 1.5 }}>
            &ldquo;The beat continues.<br />Japan is next.&rdquo;
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'rgba(244,239,230,0.3)', marginTop: '6px' }}>— P.R., Foreign Correspondent</div>
        </div>
      </div>

      <SectionFiller watermark="TRAVEL" footnote="Travel · p. 8 · 9 countries dispatched · Japan: open assignment · 2023 season" page="8" />
    </section>
  )
}
