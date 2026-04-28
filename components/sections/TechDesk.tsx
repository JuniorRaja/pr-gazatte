'use client'

import SectionFiller from '@/components/SectionFiller'
import { getMonthYear } from '@/utils/date'
import { stocks, indices } from '@/content/skills.mdx'

/* ── helpers ─────────────────────────────────────────────────── */

const fmt = (n: number) => n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const sectorColors: Record<string, string> = {
  Frontend: '#2a7a3b',
  Backend: '#1a5276',
  Data: '#7d3c98',
  Cloud: '#2e86c1',
  Infra: '#a04000',
  DevOps: '#1e8449',
}

const tickerItems = [...stocks, ...stocks]
const half = Math.ceil(stocks.length / 2)
const topGainers = [...stocks].sort((a, b) => b.pctChg - a.pctChg).slice(0, 5)
const ipos = stocks.filter(s => s.level === 'Learning')

const mono = '"JetBrains Mono", monospace'
const serif = '"Source Serif 4", serif'
const display = '"Playfair Display", serif'

/* ── Sparkline SVG ───────────────────────────────────────────── */

function Sparkline({ data, color, width = 80, height = 28 }: { data: number[]; color: string; width?: number; height?: number }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`sg-${color.replace(/[^a-z0-9]/gi, '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${height} ${points} ${width},${height}`} fill={`url(#sg-${color.replace(/[^a-z0-9]/gi, '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Sector Breakdown Bar ────────────────────────────────────── */

function SectorBar() {
  const sectors: Record<string, number> = {}
  stocks.forEach(s => { sectors[s.sector] = (sectors[s.sector] || 0) + 1 })
  const total = stocks.length
  return (
    <div>
      <div style={{ display: 'flex', height: '8px', borderRadius: '1px', overflow: 'hidden', border: '1px solid rgba(14,14,12,0.15)' }}>
        {Object.entries(sectors).map(([sector, count]) => (
          <div key={sector} style={{ width: `${(count / total) * 100}%`, background: sectorColors[sector] || 'var(--sepia)' }} title={`${sector}: ${count}`} />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', marginTop: '8px' }}>
        {Object.entries(sectors).map(([sector, count]) => (
          <div key={sector} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '6px', height: '6px', background: sectorColors[sector] || 'var(--sepia)' }} />
            <span style={{ fontFamily: mono, fontSize: '8px', color: 'var(--fg)', letterSpacing: '.05em' }}>{sector} ({count})</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Stock Table ─────────────────────────────────────────────── */

function StockTable({ items, label }: { items: typeof stocks; label: string }) {
  return (
    <div>
      <div style={{ fontFamily: mono, fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px' }}>{label}</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: mono, fontSize: '11.5px' }}>
        <thead>
          <tr style={{ background: 'var(--fg)', color: 'var(--bg)' }}>
            {['Symbol', 'Sector', 'LTP', '%Chg'].map(h => (
              <th key={h} style={{ padding: '6px 8px', textAlign: h === 'Symbol' || h === 'Sector' ? 'left' : 'right', fontSize: '9px', letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((s, i) => {
            const isPositive = s.chg >= 0
            const changeColor = isPositive ? '#2a7a3b' : 'var(--accent)'
            const isIpo = s.level === 'Learning'
            return (
              <tr key={s.sym} className="stock-row" style={{ borderBottom: '1px solid rgba(14,14,12,0.08)', background: isIpo ? 'rgba(193,39,45,0.03)' : i % 2 === 0 ? 'transparent' : 'rgba(14,14,12,0.02)' }}>
                <td style={{ padding: '6px 8px', fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap' }}>
                  {s.sym}
                  {isIpo && <span style={{ fontSize: '8px', color: 'var(--accent)', marginLeft: '4px', fontWeight: 400, verticalAlign: 'super' }}>IPO</span>}
                </td>
                <td style={{ padding: '6px 8px', color: sectorColors[s.sector] || 'var(--sepia)', fontSize: '10px', whiteSpace: 'nowrap' }}>{s.sector}</td>
                <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700, color: 'var(--fg)' }}>₹{fmt(s.ltp)}</td>
                <td style={{ padding: '6px 8px', textAlign: 'right', color: changeColor, fontWeight: 700 }}>
                  {isPositive ? '▲' : '▼'} {Math.abs(s.pctChg).toFixed(2)}%
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* ── Main Component ──────────────────────────────────────────── */

export default function TechDesk() {
  return (
    <section id="tech" style={{ borderBottom: '2px solid var(--fg)' }}>
      <style>{`
        @keyframes prTickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .stock-row:hover { background: rgba(14,14,12,0.04) !important; }
      `}</style>

      {/* ── Red banner ───────────────────────────────────────── */}
      <div style={{ background: 'var(--accent)', color: '#F4EFE6', padding: '5px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Tech Desk · Page 3</span>
        <span style={{ fontFamily: mono, fontSize: '10px' }}>MARKETS · STACK REPORT · ENGINEERING</span>
      </div>

      {/* ── Ticker strip (pure CSS marquee, no state) ─────────── */}
      <div style={{ overflow: 'hidden', borderBottom: '1px solid var(--fg)', background: 'var(--fg)', padding: '6px 0' }}>
        <div style={{ display: 'flex', gap: '32px', width: 'max-content', animation: 'prTickerScroll 50s linear infinite' }}>
          {tickerItems.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: mono, fontSize: '11px', whiteSpace: 'nowrap' }}>
              <span style={{ color: '#F4EFE6', fontWeight: 700, letterSpacing: '.05em' }}>{s.sym}</span>
              <span style={{ color: s.chg >= 0 ? '#4ade80' : '#f87171' }}>
                {s.chg >= 0 ? '▲' : '▼'} {s.chg >= 0 ? '+' : ''}{s.pctChg}%
              </span>
              <span style={{ color: '#F4EFE6', opacity: 0.2 }}>│</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3-column grid ────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 220px', columnGap: 0 }}>

        {/* ════ LEFT — Indices + Commentary ════ */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '24px 20px' }}>
          <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>Market Indices</div>

          {indices.map(idx => (
            <div key={idx.name} style={{ marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid rgba(14,14,12,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <span style={{ fontFamily: mono, fontSize: '9px', fontWeight: 700, color: 'var(--fg)', letterSpacing: '.08em' }}>{idx.name}</span>
                <span style={{ fontFamily: mono, fontSize: '9px', color: idx.chg >= 0 ? '#2a7a3b' : 'var(--accent)' }}>
                  {idx.chg >= 0 ? '+' : ''}{idx.chg.toFixed(2)}%
                </span>
              </div>
              <div style={{ fontFamily: display, fontSize: '22px', fontWeight: 900, color: 'var(--fg)', lineHeight: 1, marginBottom: '6px' }}>
                {fmt(idx.value)}
              </div>
              <Sparkline data={idx.sparkline} color={idx.chg >= 0 ? '#2a7a3b' : '#C1272D'} width={190} height={32} />
            </div>
          ))}

          <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px', marginTop: '8px' }}>Analyst&apos;s Note</div>
          <p style={{ fontFamily: serif, fontSize: '12.5px', lineHeight: 1.7, color: 'var(--fg)', margin: '0 0 10px' }}>
            The BACKEND-30 index continues its bull run, buoyed by strong C# and .NET fundamentals. FRONTEND-50 surged past resistance on renewed React momentum.
          </p>
          <p style={{ fontFamily: serif, fontSize: '12.5px', lineHeight: 1.7, color: 'var(--fg)', margin: 0 }}>
            EMERGING-10 posted the session&apos;s highest gains — Agentic AI and ML Ops leading the rally. Analysts note: &ldquo;The portfolio skews deep over broad, but these IPO positions signal infrastructure-level ambition. Rare. Durable. Currently undervalued by the market.&rdquo;
          </p>
        </div>

        {/* ════ CENTER — Side-by-side Stock Tables ════ */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '24px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <StockTable items={stocks.slice(0, half)} label="Blue Chips &amp; Large Caps" />
            <StockTable items={stocks.slice(half)} label="Mid Caps &amp; New Listings" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontFamily: mono, fontSize: '8px', color: 'var(--sepia)', letterSpacing: '.05em' }}>
            <span>Prices in ₹</span>
            <span>Source: PR Stack Exchange · {getMonthYear()}</span>
          </div>
        </div>

        {/* ════ RIGHT — Movers, IPOs, Sector, Legend ════ */}
        <div style={{ padding: '24px 18px' }}>
          <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px' }}>Top Gainers</div>
          {topGainers.map((s, i) => (
            <div key={s.sym} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: i < topGainers.length - 1 ? '1px solid rgba(14,14,12,0.06)' : 'none' }}>
              <div>
                <span style={{ fontFamily: mono, fontSize: '10px', fontWeight: 700, color: 'var(--fg)' }}>{s.sym}</span>
                <span style={{ fontFamily: serif, fontSize: '9px', color: 'var(--sepia)', marginLeft: '6px' }}>{s.name}</span>
              </div>
              <span style={{ fontFamily: mono, fontSize: '10px', color: '#2a7a3b', fontWeight: 700 }}>+{s.pctChg.toFixed(2)}%</span>
            </div>
          ))}

          <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px', marginTop: '20px' }}>New Listings · IPO</div>
          {ipos.map(s => (
            <div key={s.sym} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid rgba(14,14,12,0.06)' }}>
              <div>
                <span style={{ fontFamily: mono, fontSize: '10px', fontWeight: 700, color: 'var(--fg)' }}>{s.sym}</span>
                <span style={{ fontFamily: mono, fontSize: '7px', color: 'var(--accent)', marginLeft: '4px', border: '1px solid var(--accent)', padding: '1px 3px' }}>NEW</span>
              </div>
              <span style={{ fontFamily: mono, fontSize: '10px', color: 'var(--fg)' }}>₹{fmt(s.ltp)}</span>
            </div>
          ))}

          <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px', marginTop: '20px' }}>Sector Breakdown</div>
          <SectorBar />

          <div style={{ marginTop: '20px', border: '1px solid var(--fg)', padding: '12px 14px', background: 'rgba(14,14,12,0.03)' }}>
            <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px' }}>Trading Guide</div>
            {[
              { sym: '▲', label: 'Blue Chip — Expert, production-proven', color: '#2a7a3b' },
              { sym: '◆', label: 'Large Cap — Advanced, battle-tested', color: 'var(--fg)' },
              { sym: '●', label: 'Mid Cap — Intermediate, shipped code', color: 'var(--fg)' },
              { sym: '★', label: 'IPO — Learning, active new position', color: 'var(--accent)' },
            ].map(({ sym, label, color }) => (
              <div key={sym} style={{ display: 'flex', gap: '8px', marginBottom: '5px', alignItems: 'center' }}>
                <span style={{ color, fontFamily: mono, fontSize: '12px', fontWeight: 700, width: '14px', textAlign: 'center' }}>{sym}</span>
                <span style={{ fontFamily: serif, fontSize: '11px', color: 'var(--fg)' }}>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '14px', fontFamily: mono, fontSize: '7.5px', color: 'var(--sepia)', lineHeight: 1.6, letterSpacing: '.03em' }}>
            PR Stack Exchange operates 24/7.<br />
            All prices are fictional and reflect<br />
            proficiency, not financial advice.<br />
            Past performance in production is<br />
            indicative of future results.
          </div>
        </div>
      </div>

      <SectionFiller watermark="MARKETS" footnote={`Tech Desk · p. 3 · PR Stack Exchange · ${getMonthYear()}`} page="3" accent="var(--accent)" />
    </section>
  )
}
