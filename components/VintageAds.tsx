import { type ReactNode, type CSSProperties } from 'react'

function AdFrame({ children, style = {} }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ border: '2px solid var(--fg)', outline: '1px solid var(--fg)', outlineOffset: '4px', padding: '16px 18px', background: 'rgba(184,167,146,0.06)', position: 'relative', ...style }}>
      {([['top:0;left:0', 0], ['top:0;right:0', 1], ['bottom:0;left:0', 2], ['bottom:0;right:0', 3]] as [string, number][]).map(([pos, i]) => {
        const s: CSSProperties = { position: 'absolute', width: '8px', height: '8px', borderTop: i < 2 ? '2px solid var(--fg)' : 'none', borderBottom: i >= 2 ? '2px solid var(--fg)' : 'none', borderLeft: (i === 0 || i === 2) ? '2px solid var(--fg)' : 'none', borderRight: (i === 1 || i === 3) ? '2px solid var(--fg)' : 'none', margin: '-6px' }
        pos.split(';').forEach(p => { const [k, v] = p.split(':'); (s as Record<string, string>)[k] = v })
        return <div key={i} style={s} />
      })}
      {children}
    </div>
  )
}

function OrnamentalRule({ symbol = '◆', color = 'var(--sepia)' }: { symbol?: string; color?: string }) {
  return <div style={{ textAlign: 'center', fontFamily: '"Barlow Condensed", sans-serif', fontSize: '9px', color, letterSpacing: '4px', margin: '8px 0' }}>· {symbol} ·</div>
}

export function AdCustomSoftware() {
  return (
    <AdFrame>
      <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '8px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center', marginBottom: '6px' }}>— Advertisement —</div>
      <div style={{ fontFamily: '"Bodoni Moda", serif', fontSize: '9px', letterSpacing: '.25em', textTransform: 'uppercase', textAlign: 'center', color: 'var(--sepia)' }}>P. Rajendran &amp; Co.</div>
      <OrnamentalRule symbol="✦" />
      <div style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(15px, 1.8vw, 21px)', fontWeight: 900, lineHeight: 1.1, textAlign: 'center', color: 'var(--fg)', letterSpacing: '-0.01em' }}>
        BESPOKE SOFTWARE<br /><span style={{ fontStyle: 'italic', fontWeight: 700 }}>Engineered to Order</span>
      </div>
      <OrnamentalRule />
      <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '11.5px', lineHeight: 1.6, textAlign: 'center', color: 'var(--fg)', margin: 0, fontStyle: 'italic' }}>
        Full-stack applications crafted with precision.<br />React · .NET · Azure · TypeScript.<br />From specification to production.
      </p>
      <OrnamentalRule />
      <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '8.5px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--accent)' }}>Inquiries: hello@prasannar.com</div>
      <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '7px', textAlign: 'center', color: 'var(--sepia)', marginTop: '6px', letterSpacing: '.08em' }}>Est. 1998 · Chennai, India · Six Years of Production-Proven Work</div>
    </AdFrame>
  )
}

export function AdPrivateApps() {
  return (
    <AdFrame style={{ borderStyle: 'double', borderWidth: '3px' }}>
      <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '8px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center', marginBottom: '6px' }}>— Notice —</div>
      <div style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(13px, 1.6vw, 18px)', fontWeight: 900, lineHeight: 1.15, textAlign: 'center', color: 'var(--fg)' }}>
        PRIVATE APPLICATIONS<br /><span style={{ fontStyle: 'italic', fontWeight: 700, fontSize: '0.75em' }}>Built for Discretion</span>
      </div>
      <div style={{ height: '1px', background: 'var(--fg)', margin: '8px 0' }} />
      <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '11px', lineHeight: 1.6, color: 'var(--fg)', margin: 0 }}>
        Internal tools. Client portals. Workflow automation. Applications that live behind your firewall and answer only to you.
      </p>
      <div style={{ height: '1px', background: 'rgba(14,14,12,0.2)', margin: '8px 0' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
        {['Custom Auth', 'Role-based Access', 'On-prem Deploy', 'API Integration'].map(f => (
          <div key={f} style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '8px', color: 'var(--fg)', textTransform: 'uppercase', letterSpacing: '.05em' }}>▶ {f}</div>
        ))}
      </div>
      <OrnamentalRule symbol="⬥" />
      <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '8px', textAlign: 'center', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em' }}>hello@prasannar.com</div>
    </AdFrame>
  )
}

export function AdCloudBill() {
  return (
    <AdFrame>
      <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '8px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center', marginBottom: '8px' }}>— Special Notice —</div>
      <div style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(13px, 1.6vw, 17px)', fontWeight: 900, lineHeight: 1.15, color: 'var(--fg)', textAlign: 'center', marginBottom: '4px' }}>Is Your Cloud Bill</div>
      <div style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 900, lineHeight: 1.0, color: 'var(--accent)', textAlign: 'center', letterSpacing: '-0.02em', marginBottom: '8px' }}>Too High?</div>
      <OrnamentalRule />
      <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '11px', lineHeight: 1.6, color: 'var(--fg)', margin: '0 0 10px', fontStyle: 'italic', textAlign: 'center' }}>
        Architecture review, right-sizing, and migration planning by an engineer who has built and operated cloud systems at scale.
      </p>
      <div style={{ border: '1px solid rgba(14,14,12,0.2)', padding: '8px 10px', background: 'rgba(193,39,45,0.04)' }}>
        {['Azure cost audits & optimisation', 'Cloudflare edge migration', 'Docker & container right-sizing', 'Free-tier maximisation strategies'].map(s => (
          <div key={s} style={{ fontFamily: '"Source Serif 4", serif', fontSize: '10.5px', color: 'var(--fg)', padding: '2px 0', borderBottom: '1px dotted rgba(14,14,12,0.12)' }}>→ {s}</div>
        ))}
      </div>
      <OrnamentalRule symbol="◈" />
      <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '8px', textAlign: 'center', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Consultations by arrangement</div>
      <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '7.5px', textAlign: 'center', color: 'var(--sepia)', marginTop: '4px' }}>hello@prasannar.com</div>
    </AdFrame>
  )
}

export function AdTender() {
  return (
    <div style={{ border: '3px solid var(--fg)', padding: '0', fontFamily: '"Barlow Condensed", sans-serif' }}>
      <div style={{ background: 'var(--fg)', color: 'var(--bg)', padding: '6px 14px', textAlign: 'center' }}>
        <div style={{ fontSize: '8px', letterSpacing: '.25em', textTransform: 'uppercase' }}>Notice Inviting Tender</div>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(13px, 1.6vw, 17px)', fontWeight: 900, lineHeight: 1.2, color: 'var(--fg)', marginBottom: '4px', textAlign: 'center' }}>
          PROJECT COLLABORATION<br /><span style={{ fontStyle: 'italic', fontWeight: 700, fontSize: '0.8em' }}>&amp; Technical Partnership</span>
        </div>
        <div style={{ height: '1px', background: 'var(--fg)', margin: '10px 0' }} />
        <div style={{ fontSize: '8px', color: 'var(--fg)', lineHeight: 1.7, marginBottom: '8px' }}>
          <div><span style={{ color: 'var(--sepia)' }}>Ref. No.:</span> PR/COLLAB/2026/01</div>
          <div><span style={{ color: 'var(--sepia)' }}>Issued by:</span> P. Rajendran, Chennai</div>
          <div><span style={{ color: 'var(--sepia)' }}>Scope:</span> FinTech · SaaS · Infrastructure</div>
        </div>
        <div style={{ height: '1px', background: 'rgba(14,14,12,0.15)', margin: '8px 0' }} />
        <div style={{ marginTop: '6px' }}>
          {['FinTech product development', 'Infrastructure modernisation', 'AI/RAG pipeline integration', 'Team augmentation & advisory'].map((s, i) => (
            <div key={s} style={{ fontSize: '8px', color: 'var(--fg)', padding: '3px 0', borderBottom: i < 3 ? '1px dotted rgba(14,14,12,0.15)' : 'none' }}>{i + 1}. {s}</div>
          ))}
        </div>
        <div style={{ height: '1px', background: 'var(--fg)', margin: '10px 0' }} />
        <div style={{ fontSize: '8px', color: 'var(--fg)', lineHeight: 1.65 }}>
          <div><span style={{ color: 'var(--sepia)' }}>Submission:</span> hello@prasannar.com</div>
          <div><span style={{ color: 'var(--sepia)' }}>Deadline:</span> Open · Rolling basis</div>
        </div>
      </div>
      <div style={{ background: 'rgba(14,14,12,0.06)', borderTop: '1px solid rgba(14,14,12,0.2)', padding: '5px 14px', textAlign: 'center', fontSize: '7px', color: 'var(--sepia)', letterSpacing: '.08em' }}>
        This notice is published in good faith · Canvassing will disqualify
      </div>
    </div>
  )
}
