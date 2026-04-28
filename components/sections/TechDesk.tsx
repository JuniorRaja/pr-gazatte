import SectionFiller from '@/components/SectionFiller'
import { getMonthYear } from '@/utils/date'
import { AdCustomSoftware } from '@/components/VintageAds'
import { skills, bars } from '@/content/skills.mdx'

function dirColor(dir: string) {
  return dir === '▲' ? '#2a7a3b' : dir === '◆' ? 'var(--fg)' : 'var(--accent)'
}

const tickerItems = [...skills, ...skills]

export default function TechDesk() {
  return (
    <section id="tech" style={{ borderBottom: '2px solid var(--fg)' }}>
      <div style={{ background: 'var(--accent)', color: '#F4EFE6', padding: '5px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Tech Desk · Page 3</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>MARKETS · STACK REPORT · ENGINEERING</span>
      </div>

      {/* Ticker */}
      <div style={{ overflow: 'hidden', borderBottom: '1px solid var(--fg)', background: 'var(--fg)', padding: '8px 0' }}>
        <div className="ticker-track" style={{ display: 'flex', gap: '40px', width: 'max-content' }}>
          {tickerItems.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', whiteSpace: 'nowrap' }}>
              <span style={{ color: '#F4EFE6', fontWeight: 700, letterSpacing: '.05em' }}>{s.name}</span>
              <span style={{ color: dirColor(s.dir), fontSize: '12px' }}>{s.dir}</span>
              <span style={{ color: 'var(--sepia)', fontSize: '10px' }}>{s.level}</span>
              <span style={{ color: 'var(--sepia)', opacity: .4 }}>·</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 2fr', columnGap: 0 }}>
        {/* Left */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '28px 28px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '14px' }}>Markets Summary</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 900, lineHeight: 1.05, color: 'var(--fg)', margin: '0 0 16px' }}>The Stack<br />Report.</h2>
          <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13.5px', lineHeight: 1.68, color: 'var(--fg)', margin: 0 }}>
            React hit a new high this quarter. .NET 8 holds steady in enterprise. Rust opened a learning position.
          </p>
          <div style={{ marginTop: '20px' }}>
            {bars.map(({ name, pct, trend }) => (
              <div key={name} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--fg)', fontWeight: 700 }}>{name}</span>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--sepia)' }}>{trend}</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(14,14,12,0.1)', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: 'var(--fg)' }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px' }}><AdCustomSoftware /></div>
        </div>

        {/* Centre — full index table */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '28px 32px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '14px' }}>Full Stack Index</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: 'rgba(14,14,12,0.15)', border: '1px solid rgba(14,14,12,0.15)' }}>
            {['Technology', 'Proficiency', 'Trend'].map(h => (
              <div key={h} style={{ background: 'var(--fg)', color: 'var(--bg)', fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '.1em', textTransform: 'uppercase', padding: '6px 10px' }}>{h}</div>
            ))}
            {skills.map(({ name, level, dir }) => (
              <>
                <div key={`${name}-n`} style={{ background: 'var(--bg)', padding: '7px 10px', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', fontWeight: 700, color: 'var(--fg)' }}>{name}</div>
                <div key={`${name}-l`} style={{ background: 'var(--bg)', padding: '7px 10px', fontFamily: '"Source Serif 4", serif', fontSize: '11px', color: 'var(--fg)' }}>{level}</div>
                <div key={`${name}-d`} style={{ background: 'var(--bg)', padding: '7px 10px', fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: dirColor(dir), fontWeight: 700 }}>{dir}</div>
              </>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ padding: '28px 28px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '14px' }}>Analyst&apos;s Note</div>
          <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13.5px', lineHeight: 1.68, color: 'var(--fg)', margin: '0 0 14px' }}>
            Six years in, the portfolio skews deep over broad — but the learning positions in Rust, Kubernetes, and Kafka signal an appetite for infrastructure-level thinking.
          </p>
          <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13.5px', lineHeight: 1.68, color: 'var(--fg)', margin: 0 }}>
            The dual posture — expert-level application developer plus an active PM track — remains the defining characteristic. Rare. Durable. Currently undervalued by the market.
          </p>
          <div style={{ marginTop: '20px', border: '1px solid var(--fg)', padding: '12px 14px', background: 'rgba(14,14,12,0.03)' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px' }}>Key: Legend</div>
            {[['▲', 'Expert — production-proven'], ['◆', 'Intermediate — shipped code'], ['▼', 'Learning — active position']].map(([sym, label]) => (
              <div key={sym} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'center' }}>
                <span style={{ color: dirColor(sym), fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', fontWeight: 700 }}>{sym}</span>
                <span style={{ fontFamily: '"Source Serif 4", serif', fontSize: '12px', color: 'var(--fg)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SectionFiller watermark="STACK" footnote={`Tech Desk · p. 3 · Full-stack index updated ${getMonthYear()}`} page="3" accent="var(--accent)" />
    </section>
  )
}
