'use client'

import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    const lenis = (window as any).__lenis
    if (lenis) lenis.scrollTo(0, { duration: 1.2 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Return to front page"
      className="btt-btn"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '20px',
        zIndex: 40,
        fontFamily: '"Barlow Condensed", sans-serif',
        fontSize: '8px',
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        border: '1px solid var(--fg)',
        padding: '6px 10px',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s, background 0.15s, color 0.15s',
        lineHeight: 1.4,
      }}
    >
      ↑ Front Page
    </button>
  )
}
