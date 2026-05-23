'use client'
import { useEffect, useState } from 'react'

const THEMES = ['newsprint', 'ink', 'aged'] as const
type Theme = (typeof THEMES)[number]

interface Props {
  variant?: 'strip' | 'drawer'
}

export default function ThemeToggle({ variant = 'strip' }: Props) {
  const [theme, setTheme] = useState<Theme>('newsprint')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved && THEMES.includes(saved)) {
      setTheme(saved)
    } else {
      const attr = document.documentElement.getAttribute('data-theme') as Theme | null
      if (attr && THEMES.includes(attr)) setTheme(attr)
    }
  }, [])

  function pick(t: Theme) {
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('theme', t)
  }

  if (variant === 'drawer') {
    return (
      <div style={{ width: '100%', maxWidth: '280px' }}>
        <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '10px', letterSpacing: '.15em', color: 'rgba(244,239,230,0.45)', textTransform: 'uppercase', marginBottom: '8px', textAlign: 'center' }}>
          Edition
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {THEMES.map(t => (
            <button
              key={t}
              onClick={() => pick(t)}
              style={{
                flex: 1,
                background: theme === t ? 'rgba(244,239,230,0.9)' : 'transparent',
                color: theme === t ? '#0E0E0C' : 'rgba(244,239,230,0.6)',
                border: `1px solid ${theme === t ? 'rgba(244,239,230,0.9)' : 'rgba(244,239,230,0.25)'}`,
                fontFamily: '"Barlow Condensed", sans-serif',
                fontSize: '11px',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: '10px 4px',
                transition: 'background 0.15s, color 0.15s, border-color 0.15s',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
      {THEMES.map(t => (
        <button
          key={t}
          onClick={() => pick(t)}
          title={`Switch to ${t} edition`}
          style={{
            background: theme === t ? 'var(--fg)' : 'transparent',
            color: theme === t ? 'var(--bg)' : 'var(--fg)',
            border: '1px solid var(--fg)',
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: '9px',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            padding: '2px 5px',
            lineHeight: 1.4,
            transition: 'background 0.15s, color 0.15s',
          }}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
