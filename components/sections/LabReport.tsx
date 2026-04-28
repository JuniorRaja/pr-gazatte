import SectionFiller from '@/components/SectionFiller'
import { projects, services, stack } from '@/content/lab.mdx'

const mono  = '"JetBrains Mono", monospace'
const serif = '"Source Serif 4", serif'
const display = '"Playfair Display", serif'

function StatusBadge({ label, color }: { label: string; color: string }) {
  const isLive = label.toLowerCase() === 'live'
  return (
    <span style={{
      fontFamily: mono, fontSize: '9px', fontWeight: 700, letterSpacing: '.12em',
      textTransform: 'uppercase', color, border: `1px solid ${color}`,
      padding: '2px 8px', display: 'inline-flex', alignItems: 'center', gap: '5px',
    }}>
      {isLive && <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />}
      {label}
    </span>
  )
}

export default function LabReport() {
  return (
    <section id="lab" style={{ borderBottom: '2px solid var(--fg)' }}>
      {/* Banner */}
      <div style={{ background: 'var(--accent)', color: '#F4EFE6', padding: '5px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Lab Report · Page 5</span>
        <span style={{ fontFamily: mono, fontSize: '10px' }}>SELF-HOSTING · SERVERS · INFRASTRUCTURE</span>
      </div>

      {/* Subhead strip */}
      <div style={{ borderBottom: '1px solid rgba(14,14,12,0.2)', padding: '8px 32px', textAlign: 'center' }}>
        <span style={{ fontFamily: serif, fontSize: '13px', fontStyle: 'italic', color: 'var(--fg)' }}>
          Dispatches from the garage — where things get built, broken, and occasionally shipped
        </span>
      </div>

      {/* Title block */}
      <div style={{ padding: '28px 32px 0' }}>
        <h2 style={{ fontFamily: display, fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 6px' }}>
          The <span style={{ color: 'var(--accent)' }}>Garage.</span>
        </h2>
        <p style={{ fontFamily: display, fontSize: 'clamp(14px, 2vw, 19px)', fontStyle: 'italic', lineHeight: 1.45, color: 'var(--fg)', margin: '0 0 20px' }}>
          Where things get built. Some see daylight. Some teach lessons. All were worth it.
        </p>
      </div>

      {/* Two-column body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 0 }}>

        {/* ═══ LEFT — Projects ═══ */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '0 32px 28px' }}>
          <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: '16px' }}>
            Field Reports · Active Experiments
          </div>

          {/* Sub-headline */}
          <h3 style={{ fontFamily: display, fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 900, lineHeight: 1.05, color: 'var(--fg)', margin: '0 0 4px' }}>
            Built by one.<br />Runs in production.
          </h3>
          <p style={{ fontFamily: display, fontSize: '13px', fontStyle: 'italic', color: 'var(--fg)', margin: '0 0 24px', lineHeight: 1.5 }}>
            No agency. No team. Just a terminal and a deadline self-imposed.
          </p>

          {/* Project cards */}
          {projects.map((p, i) => (
            <div key={p.name} style={{ borderTop: '1px solid rgba(14,14,12,0.18)', padding: '18px 0', ...(i === projects.length - 1 ? { borderBottom: '1px solid rgba(14,14,12,0.18)' } : {}) }}>
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <div style={{ fontFamily: display, fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2 }}>{p.name}</div>
                <StatusBadge label={p.status} color={p.statusColor} />
              </div>
              <div style={{ fontFamily: serif, fontSize: '12px', fontStyle: 'italic', color: 'var(--sepia)', marginBottom: '10px' }}>{p.subtitle}</div>
              <p style={{ fontFamily: serif, fontSize: '13.5px', lineHeight: 1.68, color: 'var(--fg)', margin: '0 0 10px' }}>{p.body}</p>

              {/* Tags */}
              {p.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontFamily: serif, fontSize: '11px', fontStyle: 'italic', color: 'var(--fg)', letterSpacing: '.02em' }}>{t}</span>
                  ))}
                </div>
              )}

              {/* Links */}
              {p.links.length > 0 && (
                <div style={{ display: 'flex', gap: '16px' }}>
                  {p.links.map(l => (
                    <a key={l.label} href={l.href} style={{ fontFamily: mono, fontSize: '10px', fontWeight: 700, color: 'var(--fg)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '.08em' }}>{l.label}</a>
                  ))}
                </div>
              )}

              {/* Footnote (for WIP) */}
              {p.footnote && (
                <div style={{ fontFamily: serif, fontSize: '12px', fontStyle: 'italic', color: 'var(--sepia)', marginTop: '6px' }}>{p.footnote}</div>
              )}
            </div>
          ))}

          {/* Pull quote */}
          <blockquote style={{ margin: '24px 0 0', padding: '0' }}>
            <p style={{ fontFamily: display, fontSize: 'clamp(15px, 2vw, 19px)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.4, color: 'var(--accent)', margin: 0 }}>
              &ldquo;The best side projects are the ones that solve your own problem so well, you forget you built them.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* ═══ RIGHT — Infrastructure ═══ */}
        <div style={{ padding: '0 32px 28px' }}>
          <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: '16px' }}>
            Infrastructure Dispatch · Always On
          </div>

          <h3 style={{ fontFamily: display, fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 900, lineHeight: 1.05, color: 'var(--fg)', margin: '0 0 4px' }}>
            One VM.<br />Zero excuses.
          </h3>
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--sepia)', letterSpacing: '.04em', margin: '0 0 24px', lineHeight: 1.6 }}>
            OCI Singapore · ARM · Ubuntu 24 · 200GB · Running since day one.
          </p>

          {/* Services on duty */}
          <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--fg)', textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: '16px' }}>
            Services on Duty
          </div>

          {services.map((s, i) => (
            <div key={s.name} style={{ borderBottom: i < services.length - 1 ? '1px solid rgba(14,14,12,0.1)' : 'none', padding: '12px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontFamily: mono, fontSize: '13px', fontWeight: 700, color: 'var(--fg)' }}>{s.name}</span>
                </div>
                <span style={{ fontFamily: mono, fontSize: '10px', color: 'var(--sepia)', textAlign: 'right' }}>{s.url}</span>
              </div>
              <div style={{ paddingLeft: '16px' }}>
                <p style={{ fontFamily: serif, fontSize: '12.5px', fontStyle: 'italic', lineHeight: 1.55, color: 'var(--fg)', margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}

          {/* Stack at a glance */}
          <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--fg)', textTransform: 'uppercase', letterSpacing: '.18em', marginTop: '24px', marginBottom: '12px' }}>
            Stack at a Glance
          </div>
          {stack.map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: '6px 0' }}>
              <span style={{ fontFamily: mono, fontSize: '11px', color: 'var(--fg)' }}>{k}</span>
              <span style={{ fontFamily: mono, fontSize: '11px', color: 'var(--fg)', textAlign: 'right' }}>{v}</span>
            </div>
          ))}

          {/* Infrastructure pull quote */}
          <blockquote style={{ margin: '24px 0 0', padding: '16px 20px', borderLeft: '4px solid var(--accent)', background: 'rgba(193,39,45,0.04)' }}>
            <p style={{ fontFamily: display, fontSize: 'clamp(14px, 1.6vw, 17px)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.4, color: 'var(--fg)', margin: 0 }}>
              &ldquo;Every SaaS you replace with your own instance is a subscription cancelled and a skill compounded.&rdquo;
            </p>
          </blockquote>

          {/* Backup note */}
          <p style={{ fontFamily: serif, fontSize: '12px', fontStyle: 'italic', lineHeight: 1.65, color: 'var(--sepia)', margin: '16px 0 0' }}>
            Fully portable. Restore anywhere with tar + docker compose up. Each service independently restorable from OCI backup. Zero third-party data exposure — because that was the whole point.
          </p>
        </div>
      </div>

      <SectionFiller watermark="INFRA" footnote="Lab Report · p. 5 · Private compute · Cloudflare edge · Docker" page="5" accent="var(--accent)" />
    </section>
  )
}
