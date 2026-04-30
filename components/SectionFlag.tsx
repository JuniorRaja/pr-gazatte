// Reusable section flag component for newspaper sections
// Used across all sections with consistent responsive styling

interface SectionFlagProps {
  pageLabel: string // e.g., "Op-Ed · Page 2"
  subtitle?: string // e.g., "Opinion & Analysis"
  bgColor?: string // Default: var(--fg)
  textColor?: string // Default: var(--bg)
}

export default function SectionFlag({ 
  pageLabel, 
  subtitle, 
  bgColor = 'var(--fg)', 
  textColor = 'var(--bg)' 
}: SectionFlagProps) {
  return (
    <div 
      className="section-padding-x"
      style={{ 
        background: bgColor, 
        color: textColor,
        paddingTop: '5px',
        paddingBottom: '5px',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}
    >
      <span style={{ 
        fontFamily: '"JetBrains Mono", monospace', 
        fontSize: 'clamp(9px, 2vw, 10px)', 
        letterSpacing: '.2em', 
        textTransform: 'uppercase',
        fontWeight: 700
      }}>
        {pageLabel}
      </span>
      {subtitle && (
        <span 
          className="hidden sm:inline"
          style={{ 
            fontFamily: '"JetBrains Mono", monospace', 
            fontSize: 'clamp(8px, 1.8vw, 10px)', 
            letterSpacing: '.1em' 
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  )
}
