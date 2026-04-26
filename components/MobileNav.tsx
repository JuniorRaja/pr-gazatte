'use client'

import { useState } from 'react'

const navItems = ['Op-Ed', 'Tech', 'Career', 'Lab', 'Photos', 'Books', 'Travel', 'Hobbies', 'Contact']

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(true)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--fg)' }}
      >
        ☰ Menu
      </button>

      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--fg)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <button
            onClick={() => setOpen(false)}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: 'var(--bg)', letterSpacing: '.1em' }}
          >
            ✕ Close
          </button>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 900, color: 'var(--bg)', marginBottom: '16px', letterSpacing: '-0.02em' }}>THE PR GAZETTE</div>
          {navItems.map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--bg)', textDecoration: 'none', borderBottom: '1px solid rgba(244,239,230,0.15)', paddingBottom: '8px', width: '200px', textAlign: 'center' }}
            >
              {item}
            </a>
          ))}
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'rgba(244,239,230,0.4)', marginTop: '16px' }}>hello@prasannar.com</div>
        </div>
      )}
    </>
  )
}
