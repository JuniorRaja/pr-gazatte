import SectionFiller from '@/components/SectionFiller'
import { AdCloudBill } from '@/components/VintageAds'
import { running, learning } from '@/content/lab.mdx'

export default function LabReport() {
  return (
    <section id="lab" style={{ borderBottom: '2px solid var(--fg)' }}>
      <div style={{ background: 'var(--accent)', color: '#F4EFE6', padding: '5px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Lab Report · Page 5</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>SELF-HOSTING · SERVERS · INFRASTRUCTURE</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '5fr 4fr', columnGap: 0 }}>
        {/* Left — SVG architecture diagram */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '32px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>
              Plate I — System Architecture · Engraved Anno 2024
            </div>
            <svg viewBox="0 0 560 340" style={{ width: '100%', height: 'auto', display: 'block', border: '1px solid rgba(14,14,12,0.2)' }} aria-label="Vintage engraving style architecture diagram">
              <defs>
                <pattern id="hatch-h" width="6" height="6" patternUnits="userSpaceOnUse"><line x1="0" y1="3" x2="6" y2="3" stroke="rgba(14,14,12,0.07)" strokeWidth="0.5"/></pattern>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgba(14,14,12,0.7)" /></marker>
                <filter id="roughen"><feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="5" seed="2" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" xChannelSelector="R" yChannelSelector="G"/></filter>
              </defs>
              <rect width="560" height="340" fill="#F0EAD8"/>
              <rect width="560" height="340" fill="url(#hatch-h)" opacity="0.6"/>
              <rect x="8" y="8" width="544" height="324" fill="none" stroke="rgba(14,14,12,0.5)" strokeWidth="1"/>
              <rect x="12" y="12" width="536" height="316" fill="none" stroke="rgba(14,14,12,0.25)" strokeWidth="0.5"/>
              <rect x="8" y="8" width="544" height="26" fill="rgba(14,14,12,0.07)"/>
              <text x="280" y="24" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="12" fontWeight="700" fill="rgba(14,14,12,0.8)" letterSpacing="2">DISTRIBUTED SYSTEM — PERSONAL INFRASTRUCTURE</text>
              <ellipse cx="280" cy="68" rx="52" ry="22" fill="none" stroke="rgba(14,14,12,0.5)" strokeWidth="1" strokeDasharray="3,2"/>
              <text x="280" y="65" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="rgba(14,14,12,0.75)">INTERNET</text>
              <text x="280" y="76" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(14,14,12,0.45)">PUBLIC TRAFFIC</text>
              <rect x="196" y="108" width="168" height="44" fill="rgba(193,39,45,0.07)" stroke="rgba(193,39,45,0.6)" strokeWidth="1" filter="url(#roughen)"/>
              <rect x="196" y="108" width="168" height="10" fill="rgba(193,39,45,0.15)"/>
              <text x="280" y="118" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fontWeight="700" fill="rgba(14,14,12,0.7)" letterSpacing="1">CLOUDFLARE NETWORK</text>
              <text x="218" y="132" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(14,14,12,0.55)">Workers</text>
              <text x="258" y="132" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(14,14,12,0.55)">D1 + R2</text>
              <text x="306" y="132" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(14,14,12,0.55)">Vectorize</text>
              <text x="218" y="143" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(14,14,12,0.55)">DNS Proxy</text>
              <text x="265" y="143" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(14,14,12,0.55)">WAF</text>
              <text x="298" y="143" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(14,14,12,0.55)">Pages</text>
              <line x1="280" y1="90" x2="280" y2="107" stroke="rgba(14,14,12,0.5)" strokeWidth="1" markerEnd="url(#arrow)"/>
              <rect x="80" y="192" width="180" height="116" fill="rgba(14,14,12,0.04)" stroke="rgba(14,14,12,0.5)" strokeWidth="1" filter="url(#roughen)"/>
              <rect x="80" y="192" width="180" height="12" fill="rgba(14,14,12,0.1)"/>
              <text x="170" y="202" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fontWeight="700" fill="rgba(14,14,12,0.7)" letterSpacing="1">PRIVATE COMPUTE (ARM)</text>
              <rect x="92" y="212" width="76" height="68" fill="rgba(14,14,12,0.04)" stroke="rgba(14,14,12,0.35)" strokeWidth="0.75" strokeDasharray="2,1.5"/>
              <text x="130" y="222" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fontWeight="700" fill="rgba(14,14,12,0.6)">DOCKER</text>
              <text x="130" y="234" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill="rgba(14,14,12,0.5)">Uptime Kuma</text>
              <text x="130" y="245" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill="rgba(14,14,12,0.5)">Gitea Forge</text>
              <text x="130" y="256" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill="rgba(14,14,12,0.5)">Monitoring</text>
              <text x="130" y="267" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill="rgba(14,14,12,0.5)">Backup Jobs</text>
              <text x="130" y="278" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill="rgba(14,14,12,0.5)">VPN Gateway</text>
              <rect x="180" y="212" width="68" height="30" fill="rgba(14,14,12,0.04)" stroke="rgba(14,14,12,0.35)" strokeWidth="0.75" strokeDasharray="2,1.5"/>
              <text x="214" y="223" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fontWeight="700" fill="rgba(14,14,12,0.6)">OBJ STORE</text>
              <text x="214" y="234" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill="rgba(14,14,12,0.5)">S3-compat</text>
              <rect x="180" y="252" width="68" height="30" fill="rgba(14,14,12,0.04)" stroke="rgba(14,14,12,0.35)" strokeWidth="0.75" strokeDasharray="2,1.5"/>
              <text x="214" y="263" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fontWeight="700" fill="rgba(14,14,12,0.6)">BLOCK VOL</text>
              <text x="214" y="274" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill="rgba(14,14,12,0.5)">50 GB SSD</text>
              <line x1="210" y1="152" x2="170" y2="191" stroke="rgba(14,14,12,0.45)" strokeWidth="0.75" markerEnd="url(#arrow)"/>
              <rect x="300" y="192" width="164" height="80" fill="rgba(193,39,45,0.05)" stroke="rgba(193,39,45,0.45)" strokeWidth="1" filter="url(#roughen)"/>
              <rect x="300" y="192" width="164" height="12" fill="rgba(193,39,45,0.12)"/>
              <text x="382" y="202" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fontWeight="700" fill="rgba(14,14,12,0.7)" letterSpacing="1">RAG CHATBOT ENGINE</text>
              <text x="318" y="218" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(14,14,12,0.55)">→ Cloudflare Vectorize</text>
              <text x="318" y="230" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(14,14,12,0.55)">→ D1 SQLite Store</text>
              <text x="318" y="242" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(14,14,12,0.55)">→ Workers AI (LLM)</text>
              <text x="318" y="254" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(14,14,12,0.55)">→ R2 Asset Storage</text>
              <text x="318" y="266" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(14,14,12,0.55)">→ Private KB Index</text>
              <line x1="330" y1="152" x2="360" y2="191" stroke="rgba(14,14,12,0.45)" strokeWidth="0.75" markerEnd="url(#arrow)"/>
              <rect x="300" y="286" width="164" height="38" fill="rgba(14,14,12,0.04)" stroke="rgba(14,14,12,0.4)" strokeWidth="1" filter="url(#roughen)"/>
              <text x="382" y="299" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fontWeight="700" fill="rgba(14,14,12,0.65)">DEV MACHINE</text>
              <text x="318" y="313" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fill="rgba(14,14,12,0.5)">macOS · VS Code · Docker CLI · Wrangler</text>
              <line x1="382" y1="272" x2="382" y2="285" stroke="rgba(14,14,12,0.4)" strokeWidth="0.75" markerEnd="url(#arrow)"/>
              <text x="280" y="333" textAnchor="middle" fontFamily="'Source Serif 4', serif" fontSize="8" fontStyle="italic" fill="rgba(14,14,12,0.45)">Fig. I — Personal Cloud Infrastructure · Private Compute + Cloudflare Edge · Chennai, 2024</text>
            </svg>
          </div>
          <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', fontStyle: 'italic', lineHeight: 1.65, color: 'var(--fg)', opacity: 0.65, borderTop: '1px solid rgba(14,14,12,0.15)', paddingTop: '10px' }}>
            Engraving reproduced from original system diagrams. Scale approximate. All components operational as of press date.
          </p>
        </div>

        {/* Right */}
        <div style={{ padding: '32px 28px' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 16px', borderBottom: '2px solid var(--fg)', paddingBottom: '14px' }}>
            The Other<br />Side of<br />Software.
          </h2>
          <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '14.5px', lineHeight: 1.7, color: 'var(--fg)', margin: '0 0 14px' }}>
            PM by title, engineer by habit. PR self-hosts production-grade infrastructure on free-tier cloud — not as a cost exercise, but because the metal is where intuition lives.
          </p>
          <div style={{ border: '1px solid rgba(14,14,12,0.2)', padding: '16px', background: 'rgba(184,167,146,0.08)', marginBottom: '20px' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '10px' }}>Systems Currently Running</div>
            {running.map(([name, desc]) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: '5px 0' }}>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--fg)', fontWeight: 700 }}>{name}</span>
                <span style={{ fontFamily: '"Source Serif 4", serif', fontSize: '11px', color: 'var(--sepia)', fontStyle: 'italic' }}>{desc}</span>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.12em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px' }}>Open Learning Positions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
            {learning.map(tech => (
              <div key={tech} style={{ border: '1px solid rgba(14,14,12,0.2)', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--accent)', fontWeight: 700 }}>▼</span>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--fg)', fontWeight: 700 }}>{tech}</span>
              </div>
            ))}
          </div>
          <AdCloudBill />
        </div>
      </div>
      <SectionFiller watermark="INFRA" footnote="Lab Report · p. 5 · Private compute · Cloudflare edge · Docker" page="5" accent="var(--accent)" />
    </section>
  )
}
