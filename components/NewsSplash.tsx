'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { track } from '@/lib/analytics'

const BODY_LINES = [
  'Somewhere in Chennai, a man named PR made a newspaper about himself.',
  'You\'re holding the first edition.',
  'He made this. For you.',
]

export default function NewsSplash() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const exitingRef = useRef(false)

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

  const dismiss = useCallback((method: 'button' | 'backdrop' | 'escape' = 'backdrop') => {
    if (exitingRef.current) return
    exitingRef.current = true
    track('splash_dismiss', { method })
    setExiting(true)
    setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
    }, 620)
  }, [])

  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss('escape')
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
      onClick={() => dismiss('backdrop')}
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
          onClick={(e) => { e.stopPropagation(); dismiss('button') }}
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
