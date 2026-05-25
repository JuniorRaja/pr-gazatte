'use client'

import { useState, useEffect, useRef } from 'react'
import { getMonthYear } from '@/utils/date'
import SectionFiller from '@/components/SectionFiller'
import { stocks as initialStocks, indices } from '@/content/skills.mdx'

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

const condensed = '"Barlow Condensed", sans-serif'
const serif = '"Source Serif 4", serif'
const display = '"Bodoni Moda", serif'

const levelIcon: Record<string, string> = {
  Expert:       '▲',
  Advanced:     '◆',
  Intermediate: '●',
  Learning:     '★',
}
const levelColor: Record<string, string> = {
  Expert:       '#2a7a3b',
  Advanced:     'var(--fg)',
  Intermediate: 'var(--fg)',
  Learning:     'var(--accent)',
}

type Stock = typeof initialStocks[number]

/* ── Sparkline SVG ───────────────────────────────────────────── */

function Sparkline({ data, color, height = 28 }: { data: number[]; color: string; height?: number }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [width, setWidth] = useState(200)

  useEffect(() => {
    if (!svgRef.current) return
    const ro = new ResizeObserver(entries => setWidth(entries[0].contentRect.width))
    ro.observe(svgRef.current)
    return () => ro.disconnect()
  }, [])

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ')
  const lastX = width
  const lastY = height - ((data[data.length - 1] - min) / range) * height
  const glowId = `glow-${color.replace(/[^a-z0-9]/gi, '')}`
  const gradId = `sg-${color.replace(/[^a-z0-9]/gi, '')}`

  return (
    <svg ref={svgRef} width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <polygon points={`0,${height} ${points} ${width},${height}`} fill={`url(#${gradId})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="5" fill={color} opacity="0.15" />
      <circle cx={lastX} cy={lastY} r="2.5" fill={color} filter={`url(#${glowId})`} />
    </svg>
  )
}

/* ── Sector Breakdown Bar ────────────────────────────────────── */

function SectorBar({ stocks }: { stocks: Stock[] }) {
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
            <span style={{ fontFamily: condensed, fontSize: 'clamp(11px, 2.2vw, 12px)', color: 'var(--fg)', letterSpacing: '.05em' }}>{sector} ({count})</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Stock Table ─────────────────────────────────────────────── */

function StockTable({ items, label, flashMap }: { items: Stock[]; label: string; flashMap: Record<string, 'up' | 'down'> }) {
  return (
    <div>
      <div style={{ fontFamily: condensed, fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px' }}>{label}</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: condensed, fontSize: 'clamp(11px, 2.2vw, 12px)' }}>
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
              <tr key={s.sym} className="stock-row" style={{ borderBottom: '1px solid rgba(14,14,12,0.08)', background: isIpo ? 'rgba(193,39,45,0.03)' : i % 2 === 0 ? 'transparent' : 'rgba(14,14,12,0.02)', animation: flashMap[s.sym] ? `${flashMap[s.sym] === 'up' ? 'prFlashGreen' : 'prFlashRed'} 0.9s ease-out` : undefined }}>
                <td style={{ padding: '6px 8px', fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap' }}>
                  <span style={{ color: levelColor[s.level] || 'var(--fg)', marginRight: '6px', fontSize: 'clamp(11px, 2.2vw, 12px)' }}>{levelIcon[s.level]}</span>
                  {s.sym}
                  <span style={{ fontSize: '10px', fontWeight: 400, color: 'var(--sepia)', letterSpacing: '.02em', marginLeft: '6px' }}>{s.name}</span>
                  {isIpo && <span style={{ fontSize: '8px', color: 'var(--accent)', marginLeft: '4px', fontWeight: 400, verticalAlign: 'super' }}>IPO</span>}
                </td>
                <td style={{ padding: '6px 8px', color: sectorColors[s.sector] || 'var(--sepia)', fontSize: 'clamp(11px, 2.2vw, 12px)', whiteSpace: 'nowrap' }}>{s.sector}</td>
                <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 700, color: 'var(--fg)', fontSize: '11px', fontVariantNumeric: 'tabular-nums' }}>₹{fmt(s.ltp)}</td>
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
  const [stocks, setStocks] = useState(initialStocks)
  const [flashMap, setFlashMap] = useState<Record<string, 'up' | 'down'>>({})

  useEffect(() => {
    const id = setInterval(() => {
      const flash: Record<string, 'up' | 'down'> = {}
      setStocks(prev => {
        const next = [...prev]
        const count = 2 + Math.floor(Math.random() * 3)
        const picked = new Set<number>()
        while (picked.size < count) picked.add(Math.floor(Math.random() * prev.length))
        picked.forEach(i => {
          const s = { ...next[i] }
          const nudge = (Math.random() - 0.47) * 0.4
          const newPct = Math.round((s.pctChg + nudge) * 100) / 100
          flash[s.sym] = newPct >= s.pctChg ? 'up' : 'down'
          s.pctChg = newPct
          s.chg = Math.round((s.ltp * s.pctChg / 100) * 100) / 100
          next[i] = s
        })
        return next
      })
      setFlashMap(flash)
      setTimeout(() => setFlashMap({}), 950)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  const tickerItems = [...stocks, ...stocks]
  const half = Math.ceil(stocks.length / 2)
  const topGainers = [...stocks].sort((a, b) => b.pctChg - a.pctChg).slice(0, 5)
  const ipos = stocks.filter(s => s.level === 'Learning')

  return (
    <section id="tech" style={{ borderBottom: '2px solid var(--fg)' }}>
      <style>{`
        @keyframes prTickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes prFlashGreen { 0%, 15% { background-color: rgba(42,122,59,0.22); } 100% { background-color: transparent; } }
        @keyframes prFlashRed   { 0%, 15% { background-color: rgba(193,39,45,0.22); } 100% { background-color: transparent; } }
        .stock-row:hover { background: rgba(14,14,12,0.04) !important; }
        
        @media (max-width: 1023px) {
          .tech-desk-grid {
            grid-template-columns: 1fr !important;
          }
          .tech-desk-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(14,14,12,0.2) !important;
          }
          .tech-desk-grid > div:last-child {
            border-bottom: none !important;
          }
          .tech-indices-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .tech-tables-grid {
            grid-template-columns: 1fr !important;
          }
          .tech-right-mobile {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>

      {/* ── Red banner ───────────────────────────────────────── */}
      <div style={{ background: 'var(--accent)', color: '#F4EFE6', padding: '5px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: condensed, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Tech Desk · Page 3</span>
        <span style={{ fontFamily: condensed, fontSize: '10px' }}>MARKETS · STACK REPORT · ENGINEERING</span>
      </div>

      {/* ── Ticker strip ─────────────────────────────────────── */}
      <div style={{ overflow: 'hidden', borderBottom: '1px solid var(--fg)', background: 'var(--fg)', padding: '6px 0' }}>
        <div style={{ display: 'flex', gap: '32px', width: 'max-content', animation: 'prTickerScroll 50s linear infinite' }}>
          {tickerItems.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: condensed, fontSize: '11px', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--bg)', fontWeight: 700, letterSpacing: '.05em' }}>{s.sym}</span>
              <span style={{ color: s.chg >= 0 ? '#4ade80' : '#f87171' }}>
                {s.chg >= 0 ? '▲' : '▼'} {s.chg >= 0 ? '+' : ''}{s.pctChg}%
              </span>
              <span style={{ color: 'var(--bg)', opacity: 0.2 }}>│</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3-column grid ────────────────────────────────────── */}
      <div className="tech-desk-grid" style={{ display: 'grid', gridTemplateColumns: '240px 1fr 220px', columnGap: 0 }}>

        {/* ════ LEFT — Analyst's Note + Trading Guide ════ */}
        <div className="section-padding-x section-padding-y" style={{ borderRight: '1px solid rgba(14,14,12,0.2)' }}>
          <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '14px' }}>Markets Summary</div>
          <h2 style={{ fontFamily: display, fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, lineHeight: 1.05, color: 'var(--fg)', margin: '0 0 12px' }}>
            The <span style={{ color: 'var(--accent)' }}>Stack</span><br />Report.
          </h2>
          <p style={{ fontFamily: serif, fontSize: 'clamp(14px, 2.8vw, 15px)', lineHeight: 1.7, color: 'var(--fg)', margin: '0 0 24px'}}>
            React hit a new high this quarter, .NET Core & Microservices holds steady in enterprise. Golang opened a learning position.
          </p>

          <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px' }}>Analyst&apos;s Note</div>
          {/* <p style={{ fontFamily: serif, fontSize: '12.5px', lineHeight: 1.7, color: 'var(--fg)', margin: '0 0 10px' }}>
            The BACKEND-30 index continues its bull run, buoyed by strong C# and .NET fundamentals. FRONTEND-50 surged past resistance on renewed React momentum.
          </p>
          <p style={{ fontFamily: serif, fontSize: '12.5px', lineHeight: 1.7, color: 'var(--fg)', margin: '0 0 24px' }}>
            EMERGING-10 posted the session&apos;s highest gains — Agentic AI and ML Ops leading the rally.
          </p> */}
          <p style={{ fontFamily: serif, fontSize: 'clamp(14px, 2.8vw, 15px)', lineHeight: 1.7, color: 'var(--fg)', margin: '0 0 24px' }}>
            &ldquo;The portfolio skews deep over broad, but these IPO positions signal infrastructure-level ambition. Rare. Durable. Currently undervalued by the market.&rdquo;
          </p>

          <div className="hide-mobile" style={{ border: '1px solid var(--fg)', padding: '12px 14px', background: 'rgba(14,14,12,0.03)' }}>
            <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px' }}>Trading Guide</div>
            {[
              { sym: '▲', label: 'Blue Chip — Expert, production-proven', color: '#2a7a3b' },
              { sym: '◆', label: 'Large Cap — Advanced, battle-tested', color: 'var(--fg)' },
              { sym: '●', label: 'Mid Cap — Intermediate, shipped code', color: 'var(--fg)' },
              { sym: '★', label: 'IPO — Learning, active new position', color: 'var(--accent)' },
            ].map(({ sym, label, color }) => (
              <div key={sym} style={{ display: 'flex', gap: '8px', marginBottom: '5px', alignItems: 'center' }}>
                <span style={{ color, fontFamily: condensed, fontSize: '12px', fontWeight: 700, width: '14px', textAlign: 'center' }}>{sym}</span>
                <span style={{ fontFamily: serif, fontSize: '11px', color: 'var(--fg)' }}>{label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* ════ CENTER — Index Cards + Stock Tables ════ */}
        <div className="section-padding-x section-padding-y" style={{ borderRight: '1px solid rgba(14,14,12,0.2)' }}>

          {/* Index cards — 4 across desktop, 2 across mobile */}
          <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px' }}>Market Indices</div>
          <div className="tech-indices-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1px', background: 'rgba(14,14,12,0.12)', border: '1px solid rgba(14,14,12,0.12)', marginBottom: '20px' }}>
            {indices.map(idx => (
              <div key={idx.name} style={{ background: 'var(--bg)', padding: '12px 14px' }}>
                <div style={{ fontFamily: condensed, fontSize: 'clamp(11px, 2.2vw, 12px)', color: 'var(--accent)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '6px' }}>{idx.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ fontFamily: condensed, fontSize: '14px', fontWeight: 700, color: 'var(--fg)', lineHeight: 1 }}>{fmt(idx.value)}</div>
                  <div style={{ fontFamily: condensed, fontSize: 'clamp(11px, 2.2vw, 12px)', color: idx.chg >= 0 ? '#2a7a3b' : 'var(--accent)' }}>
                    {idx.chg >= 0 ? '+' : ''}{idx.chg.toFixed(2)}%
                  </div>
                </div>
                <Sparkline data={idx.sparkline} color={idx.chg >= 0 ? '#2a7a3b' : '#C1272D'} height={26} />
              </div>
            ))}
          </div>

          {/* Side-by-side stock tables → stack on mobile */}
          <div className="tech-tables-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <StockTable items={stocks.slice(0, half)} label="Blue Chips &amp; Large Caps" flashMap={flashMap} />
            <StockTable items={stocks.slice(half)} label="Mid Caps &amp; New Listings" flashMap={flashMap} />
          </div>

          {/* Sector Breakdown */}
          <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px', marginTop: '20px' }}>Sector Breakdown</div>
          <SectorBar stocks={stocks} />

          {/* Footer row */}
          <div style={{ marginTop: '14px' }}>
            <p style={{ fontFamily: serif, fontSize: 'clamp(12px, 2.5vw, 13px)', fontStyle: 'italic', color: 'var(--sepia)', margin: 0, letterSpacing: '.01em', lineHeight: 1.65 }}>
              The higher the price, the deeper the knowledge.
            </p>
          </div>
        </div>

        {/* ════ RIGHT — Movers, IPOs, Sector ════ */}
        <div className="section-padding-x section-padding-y">
          <div className="tech-right-mobile">
            <div>
              <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px' }}>Top Gainers</div>
              {topGainers.map((s, i) => (
                <div key={s.sym} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: i < topGainers.length - 1 ? '1px solid rgba(14,14,12,0.06)' : 'none' }}>
                  <div>
                    <span style={{ fontFamily: condensed, fontSize: 'clamp(11px, 2.2vw, 12px)', fontWeight: 700, color: 'var(--fg)' }}>{s.sym}</span>
                    <span style={{ fontFamily: serif, fontSize: 'clamp(11px, 2.2vw, 12px)', color: 'var(--sepia)', marginLeft: '6px' }}>{s.name}</span>
                  </div>
                  <span style={{ fontFamily: condensed, fontSize: 'clamp(11px, 2.2vw, 12px)', color: '#2a7a3b', fontWeight: 700 }}>+{s.pctChg.toFixed(2)}%</span>
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '12px' }}>New Listings · IPO</div>
              {ipos.map(s => (
                <div key={s.sym} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid rgba(14,14,12,0.06)' }}>
                  <div>
                    <span style={{ fontFamily: condensed, fontSize: 'clamp(11px, 2.2vw, 12px)', fontWeight: 700, color: 'var(--fg)' }}>{s.sym}</span>
                    <span style={{ fontFamily: condensed, fontSize: '8px', color: 'var(--accent)', marginLeft: '4px', border: '1px solid var(--accent)', padding: '1px 3px' }}>NEW</span>
                  </div>
                  <span style={{ fontFamily: condensed, fontSize: 'clamp(11px, 2.2vw, 12px)', color: 'var(--fg)' }}>₹{fmt(s.ltp)}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '16px', fontFamily: condensed, fontSize: 'clamp(11px, 2.2vw, 12px)', color: 'var(--sepia)', letterSpacing: '.05em' }}>Source: PR Stack Exchange · {getMonthYear()}</div>

          <div className="hide-mobile" style={{ marginTop: '12px', border: '1px solid rgba(14,14,12,0.15)', padding: '10px 12px', background: 'rgba(14,14,12,0.02)' }}>
            <p style={{ fontFamily: serif, fontSize: 'clamp(11px, 2.2vw, 12px)', color: 'var(--sepia)', lineHeight: 1.65, letterSpacing: 0, textAlign: 'justify', margin: 0 }}>
              PR Stack Exchange operates 24/7. All prices are fictional and reflect proficiency, not financial advice. Past performance in production is indicative of future results.
            </p>
          </div>
        </div>
      </div>
      <SectionFiller watermark="TECH" footnote="Vol. PR · No. 1 · Tech Desk · Chennai" page="3" accent="#EC008C" />

    </section>
  )
}
