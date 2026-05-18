import SectionFlag from '@/components/SectionFlag'
import { projects, services, stack } from '@/content/lab.mdx'

const condensed = '"Barlow Condensed", sans-serif'
const serif = '"Source Serif 4", serif'
const display = '"Bodoni Moda", serif'

function StatusBadge({ label, color }: { label: string; color: string }) {
  const isLive = label.toLowerCase() === 'live'
  return (
    <span style={{
      fontFamily: condensed, fontSize: '9px', fontWeight: 700, letterSpacing: '.12em',
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
      <style>{`
        .lab-link { text-decoration: underline; transition: color 0.15s, font-size 0.15s; }
        .lab-link:hover { color: var(--accent) !important; font-size: 11px !important; }
        .lab-left-col { border-right: 1px solid rgba(14,14,12,0.2); }
        .lab-right-col { padding-top: 24px; padding-bottom: 28px; }
        @media (max-width: 639px) {
          .lab-left-col { border-right: none; border-bottom: 1px solid rgba(14,14,12,0.2); }
          .lab-right-col { padding-top: 24px; padding-bottom: 24px; }
          .responsive-grid-2 { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>

      <SectionFlag pageLabel="Lab Report · Page 5" subtitle="Self-Hosting · Servers · Infrastructure" bgColor="var(--accent)" />

      {/* Subhead strip */}
      <div className="section-padding-x" style={{ borderBottom: '1px solid rgba(14,14,12,0.2)', paddingTop: '8px', paddingBottom: '8px', textAlign: 'center' }}>
        <span style={{ fontFamily: serif, fontSize: 'clamp(12px, 2.5vw, 13px)', fontStyle: 'italic', color: 'var(--fg)' }}>
          Dispatches from the garage, where things get built, broken, and occasionally shipped
        </span>
      </div>

      {/* Title block */}
      <div className="section-padding-x" style={{ paddingTop: '28px', paddingBottom: 0 }}>
        <h2 style={{ fontFamily: display, fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 6px' }}>
          The <span style={{ color: 'var(--accent)' }}>Lab.</span>
        </h2>
        <p style={{ fontFamily: display, fontSize: 'clamp(14px, 2.5vw, 19px)', fontStyle: 'italic', lineHeight: 1.45, color: 'var(--fg)', margin: '0 0 20px' }}>
          Where hypotheses meet hardware. Some experiments ship. Some teach lessons. All were worth it.
        </p>
      </div>

      {/* Two-column body → single on mobile */}
      <div className="responsive-grid-2" style={{ display: 'grid' }}>

        {/* ═══ LEFT — Projects ═══ */}
        <div className="section-padding-x section-padding-y lab-left-col">
          <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>
            Field Reports · Active Experiments
          </div>

          {/* Sub-headline */}
          <h3 style={{ fontFamily: display, fontSize: '28px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--fg)', margin: '0 0 4px' }}>
            <span style={{ color: 'var(--accent)' }}>Built by one.</span><br />Runs in production.
          </h3>
          <p style={{ fontFamily: display, fontSize: '13px', fontStyle: 'italic', color: 'var(--fg)', margin: '0 0 24px', lineHeight: 1.5 }}>
            No agency. No team. Just a terminal and a deadline self-imposed.
          </p>

          {/* Project cards */}
          {projects.map((p, i) => (
            <div key={p.name} style={{ borderTop: '1px solid rgba(14,14,12,0.18)', padding: '18px 0', ...(i === projects.length - 1 ? { borderBottom: '1px solid rgba(14,14,12,0.18)' } : {}) }}>
              {/* Header row: title + status badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ fontFamily: display, fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2 }}>{p.name}</div>
                <StatusBadge label={p.status} color={p.statusColor} />
              </div>
              {/* Tags and links row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                {p.tags.map(t => (
                  <span key={t} style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--sepia)', letterSpacing: '.04em' }}>#{t.replace(/\s+/g, '')}</span>
                ))}
                {p.links.map(l => (
                  <a key={l.label} href={l.href} className="lab-link" style={{ fontFamily: condensed, fontSize: '9px', fontWeight: 700, color: 'var(--fg)', textDecoration: 'underline', textTransform: 'uppercase', letterSpacing: '.08em' }}>↗ {l.label}</a>
                ))}
              </div>
              <div style={{ fontFamily: serif, fontSize: '12px', fontStyle: 'italic', color: 'var(--sepia)', marginBottom: '10px' }}>{p.subtitle}</div>
              <p style={{ fontFamily: serif, fontSize: '13.5px', lineHeight: 1.68, color: 'var(--fg)', margin: 0 }}>{p.body}</p>

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
        <div className="section-padding-x lab-right-col">
          <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>
            Infrastructure Dispatch · Always On
          </div>

          <h3 style={{ fontFamily: display, fontSize: '28px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--fg)', margin: '0 0 4px' }}>
            <span style={{ color: 'var(--accent)' }}>One VM.</span><br />Zero excuses.
          </h3>
          <p style={{ fontFamily: condensed, fontSize: '10px', color: 'var(--sepia)', letterSpacing: '.04em', margin: '0 0 24px', lineHeight: 1.6 }}>
            OCI Singapore · ARM · Ubuntu 24 · 200GB · Running since day one.
          </p>

          {/* Services on duty */}
          <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--fg)', textTransform: 'uppercase', letterSpacing: '.18em', marginBottom: '16px' }}>
            Services on Duty
          </div>

          {services.map((s, i) => (
            <div key={s.name} style={{ borderBottom: i < services.length - 1 ? '1px solid rgba(14,14,12,0.1)' : 'none', padding: '12px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontFamily: condensed, fontSize: '13px', fontWeight: 700, color: 'var(--fg)' }}>{s.name}</span>
              </div>
              <div style={{ paddingLeft: '16px', marginBottom: '4px' }}>
                <span style={{ fontFamily: condensed, fontSize: '10px', color: 'var(--sepia)', display: 'block', wordBreak: 'break-all' }}>{s.url}</span>
              </div>
              <div style={{ paddingLeft: '16px' }}>
                <p style={{ fontFamily: serif, fontSize: '12.5px', fontStyle: 'italic', lineHeight: 1.55, color: 'var(--fg)', margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}

          {/* Stack at a glance */}
          <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginTop: '24px', marginBottom: '12px' }}>
            Stack at a Glance
          </div>
          {stack.map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: '6px 0' }}>
              <span style={{ fontFamily: condensed, fontSize: '11px', color: 'var(--fg)' }}>{k}</span>
              <span style={{ fontFamily: condensed, fontSize: '11px', color: 'var(--fg)', textAlign: 'right' }}>{v}</span>
            </div>
          ))}

          {/* Infrastructure pull quote */}
          <blockquote style={{ margin: '24px 0 0', padding: '16px 20px', borderTop: '2px solid var(--accent)', borderBottom: '1px solid rgba(193,39,45,0.15)', background: 'rgba(193,39,45,0.04)' }}>
            <p style={{ fontFamily: display, fontSize: 'clamp(14px, 1.6vw, 17px)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.4, color: 'var(--fg)', margin: 0 }}>
              &ldquo;Every SaaS you replace with your own instance is a subscription cancelled and a skill compounded.&rdquo;
            </p>
          </blockquote>

          {/* Backup note */}
          <p style={{ fontFamily: serif, fontSize: '12px', fontStyle: 'italic', lineHeight: 1.65, color: 'var(--sepia)', margin: '16px 0 0' }}>
            Fully portable. Restore anywhere with tar + docker compose up. Each service independently restorable from OCI backup. Zero third-party data exposure, because that was the whole point.
          </p>
        </div>
      </div>


    </section>
  )
}
