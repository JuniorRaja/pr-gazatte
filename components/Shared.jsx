
// Shared newspaper components — load FIRST before all section components

const SectionFiller = ({ watermark, footnote, page, accent }) => {
  const accentColor = accent || 'var(--red)';
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      overflow: 'hidden',
      position: 'relative',
      minHeight: '48px',
    }}>
      {/* Faint background rules — like aged newsprint column guides */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(14,14,12,0.025) 0px, rgba(14,14,12,0.025) 1px, transparent 1px, transparent calc(100% / 12))',
        pointerEvents: 'none',
      }} />

      {/* Oversized watermark word */}
      {watermark && (
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          right: '20px',
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(72px, 11vw, 148px)',
          fontWeight: 900,
          lineHeight: 1,
          color: 'rgba(14,14,12,0.038)',
          letterSpacing: '-0.04em',
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}>{watermark}</div>
      )}

      {/* Bottom colophon strip */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid rgba(14,14,12,0.12)',
        padding: '9px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '8.5px',
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'rgba(14,14,12,0.3)',
        }}>{footnote || 'The PR Gazette · Chennai'}</div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {/* Small ornamental dots */}
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: accentColor, opacity: 0.35 }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: accentColor, opacity: 0.2 }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: accentColor, opacity: 0.1 }} />
        </div>

        {page && (
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '8.5px',
            color: 'rgba(14,14,12,0.3)',
            letterSpacing: '.1em',
          }}>— p. {page} —</div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { SectionFiller });
