'use client'

import { useState } from 'react'

const navItems = ['Op-Ed', 'Tech', 'Career', 'Lab', 'Photos', 'Books', 'Travel', 'Hobbies', 'Contact']

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="touch-target"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer', 
          fontFamily: '"JetBrains Mono", monospace', 
          fontSize: '11px', 
          letterSpacing: '.1em', 
          textTransform: 'uppercase', 
          color: 'var(--fg)',
          padding: '8px 12px'
        }}
      >
        ☰ Menu
      </button>

      {open && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'var(--fg)', 
            zIndex: 10001, // Higher than lightbox (10000) 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px',
            padding: '20px'
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="touch-target"
            style={{ 
              position: 'absolute', 
              top: '16px', 
              right: '16px', 
              background: 'none', 
              border: '1px solid var(--bg)', 
              cursor: 'pointer', 
              fontFamily: '"JetBrains Mono", monospace', 
              fontSize: '12px', 
              color: 'var(--bg)', 
              letterSpacing: '.1em',
              padding: '10px 16px',
              borderRadius: '2px',
              transition: 'background 0.15s, color 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg)'
              e.currentTarget.style.color = 'var(--fg)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none'
              e.currentTarget.style.color = 'var(--bg)'
            }}
          >
            ✕ Close
          </button>
          
          <div style={{ 
            fontFamily: '"Playfair Display", serif', 
            fontSize: 'clamp(28px, 8vw, 38px)', 
            fontWeight: 900, 
            color: 'var(--bg)', 
            marginBottom: '24px', 
            letterSpacing: '-0.02em',
            textAlign: 'center'
          }}>
            THE PR GAZETTE
          </div>
          
          <nav style={{ width: '100%', maxWidth: '280px' }}>
            {navItems.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="touch-target-padded"
                style={{ 
                  fontFamily: '"JetBrains Mono", monospace', 
                  fontSize: '13px', 
                  letterSpacing: '.15em', 
                  textTransform: 'uppercase', 
                  color: 'var(--bg)', 
                  textDecoration: 'none', 
                  borderBottom: '1px solid rgba(244,239,230,0.15)', 
                  width: '100%',
                  textAlign: 'center',
                  display: 'block',
                  transition: 'background 0.15s, color 0.15s, padding-left 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(244,239,230,0.1)'
                  e.currentTarget.style.paddingLeft = '20px'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none'
                  e.currentTarget.style.paddingLeft = '16px'
                }}
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div style={{ 
            fontFamily: '"JetBrains Mono", monospace', 
            fontSize: '10px', 
            color: 'rgba(244,239,230,0.5)', 
            marginTop: '32px',
            letterSpacing: '.05em'
          }}>
            hello@prasannar.com
          </div>
        </div>
      )}
    </>
  )
}
