interface SectionFillerProps {
  watermark?: string
  footnote?: string
  page?: string
  accent?: string
}

export default function SectionFiller({ watermark, footnote, page, accent = 'var(--accent)' }: SectionFillerProps) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', minHeight: '48px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, rgba(14,14,12,0.025) 0px, rgba(14,14,12,0.025) 1px, transparent 1px, transparent calc(100% / 12))', pointerEvents: 'none' }} />
      {watermark && (
        <div style={{ position: 'absolute', bottom: '-10px', right: '20px', fontFamily: '"Playfair Display", serif', fontSize: 'clamp(72px, 11vw, 148px)', fontWeight: 900, lineHeight: 1, color: 'rgba(14,14,12,0.038)', letterSpacing: '-0.04em', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap', overflow: 'visible' }}>
          {watermark}
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(14,14,12,0.12)', padding: '9px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(14,14,12,0.3)' }}>
          {footnote || 'The PR Gazette · Chennai'}
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: accent, opacity: 0.35 }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: accent, opacity: 0.2 }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: accent, opacity: 0.1 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative', width: '28px', height: '14px', flexShrink: 0 }}>
            {(['#00AFEC', '#EC008C', '#FFF200', '#1a1a1a'] as const).map((color, i) => (
              <div key={color} style={{ position: 'absolute', width: '10px', height: '10px', borderRadius: '50%', background: color, opacity: 0.45, top: '2px', left: `${i * 6}px`, mixBlendMode: 'multiply' }} />
            ))}
          </div>
          {page && (
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8.5px', color: 'rgba(14,14,12,0.3)', letterSpacing: '.1em' }}>— p. {page} —</div>
          )}
        </div>
      </div>
    </div>
  )
}
