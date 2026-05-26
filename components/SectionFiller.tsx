interface SectionFillerProps {
  watermark?: string
  footnote?: string
  page?: string
  accent?: string
}

const CMYK = ['#00AFEC', '#EC008C', '#FFF200', '#1a1a1a'] as const

export default function SectionFiller({ watermark, footnote, page, accent = 'var(--accent)' }: SectionFillerProps) {
  return (
    <div className="sf-root">
      <style>{`
        :root,[data-theme="newsprint"],[data-theme="aged"]{
          --sf-grid:rgba(14,14,12,0.025);
          --sf-watermark:rgba(14,14,12,0.04);
          --sf-border:rgba(14,14,12,0.12);
          --sf-text:rgba(14,14,12,0.30);
          --sf-blend:multiply;
          --sf-cmyk-op:0.45;
        }
        [data-theme="ink"]{
          --sf-grid:rgba(244,239,230,0.04);
          --sf-watermark:rgba(244,239,230,0.07);
          --sf-border:rgba(244,239,230,0.15);
          --sf-text:rgba(244,239,230,0.45);
          --sf-blend:screen;
          --sf-cmyk-op:0.6;
        }
        .sf-root{flex:1;display:flex;flex-direction:column;justify-content:flex-end;position:relative;min-height:48px}
        .sf-grid{position:absolute;inset:0;background-image:repeating-linear-gradient(90deg,var(--sf-grid) 0px,var(--sf-grid) 1px,transparent 1px,transparent calc(100% / 12));pointer-events:none}
        .sf-watermark{position:absolute;bottom:-10px;right:20px;font-family:"Bodoni Moda",serif;font-size:clamp(72px,11vw,148px);font-weight:900;line-height:1;color:var(--sf-watermark);letter-spacing:-0.04em;user-select:none;pointer-events:none;white-space:nowrap;overflow:visible}
        .sf-bar{position:relative;z-index:1;border-top:1px solid var(--sf-border);padding:9px 32px;display:flex;justify-content:space-between;align-items:center}
        .sf-footnote{font-family:"Barlow Condensed",sans-serif;font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--sf-text)}
        .sf-cmyk-wrap{position:relative;width:28px;height:14px;flex-shrink:0}
        .sf-cmyk-dot{position:absolute;width:10px;height:10px;border-radius:50%;top:2px;opacity:var(--sf-cmyk-op);mix-blend-mode:var(--sf-blend)}
        .sf-page{font-family:"Barlow Condensed",sans-serif;font-size:8.5px;color:var(--sf-text);letter-spacing:.1em}
      `}</style>

      <div className="sf-grid" />
      {watermark && <div className="sf-watermark">{watermark}</div>}

      <div className="sf-bar">
        <div className="sf-footnote">{footnote || 'The PR Gazette · Chennai'}</div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {[0.35, 0.2, 0.1].map((op, i) => (
            <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: accent, opacity: op }} />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="sf-cmyk-wrap">
            {CMYK.map((color, i) => (
              <div key={color} className="sf-cmyk-dot" style={{ background: color, left: `${i * 6}px` }} />
            ))}
          </div>
          {page && <div className="sf-page">p. {page}</div>}
        </div>
      </div>
    </div>
  )
}
