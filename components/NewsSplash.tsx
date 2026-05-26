'use client'

import { useEffect, useState, useCallback } from 'react'

const BODY_LINES = [
  'Something landed on your doorstep.',
  'A newspaper, from Chennai, about a man named PR.',
  'He made this. For you.',
]

export default function NewsSplash() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let didLock = false
    try {
      if (!localStorage.getItem('prg-intro')) {
        setVisible(true)
        localStorage.setItem('prg-intro', '1')
        document.body.style.overflow = 'hidden'
        didLock = true
      }
    } catch {}
    // Always remove the pre-hydration CSS blocker set by the inline <script>
    document.documentElement.removeAttribute('data-splash')
    return () => {
      if (didLock) document.body.style.overflow = ''
    }
  }, [])

  const dismiss = useCallback(() => {
    if (exiting) return
    setExiting(true)
    setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
    }, 620)
  }, [exiting])

  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, dismiss])

  if (!visible) return null

  return (
    <div
      className={`splash-root${exiting ? ' splash-exit' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to The PR Gazette"
      onClick={dismiss}
    >
      <div className="splash-rule-bar splash-rule-top" aria-hidden="true" />
      <div className="splash-rule-bar splash-rule-bottom" aria-hidden="true" />

      <div className="splash-card">
        <p className="splash-edition">◆ &nbsp; Delivered This Morning &nbsp; ◆</p>

        <h1 className="splash-title">THE PR GAZETTE</h1>

        <div className="splash-sep" role="separator" />

        <div className="splash-body">
          {BODY_LINES.map((line, i) => (
            <p
              key={i}
              className="splash-line"
              style={{ animationDelay: `${750 + i * 175}ms` }}
            >
              {line}
            </p>
          ))}
        </div>

        <button
          className="splash-cta"
          onClick={dismiss}
          aria-label="Enter The PR Gazette"
        >
          Open it &rarr;
        </button>

        <p className="splash-hint">
          <kbd>Esc</kbd> or click anywhere to enter
        </p>
      </div>
    </div>
  )
}
