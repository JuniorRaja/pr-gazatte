'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import MobileNav from '@/components/MobileNav'

const navItems = [
  { label: 'Op-Ed',   id: 'op-ed'   },
  { label: 'Tech',    id: 'tech'    },
  { label: 'Career',  id: 'career'  },
  { label: 'Lab',     id: 'lab'     },
  { label: 'Photos',  id: 'photos'  },
  { label: 'Books',   id: 'books'   },
  { label: 'Travel',  id: 'travel'  },
  { label: 'Hobbies', id: 'hobbies' },
  { label: 'Contact', id: 'contact' },
]

export default function StickyNav() {
  const [activeId, setActiveId] = useState('')
  const [progress, setProgress] = useState(0)
  const [showTitle, setShowTitle] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? el.scrollTop / total : 0)
      
      // Show title when scrolled past 300px (past the masthead section)
      setShowTitle(el.scrollTop > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio)
        else visible.delete(e.target.id)
      })
      let best = { id: '', ratio: -1 }
      visible.forEach((ratio, id) => {
        if (ratio > best.ratio) best = { id, ratio }
      })
      setActiveId(best.id)
    }, { rootMargin: '-35% 0px -35% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] })

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <div
        className="section-padding-x"
        style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--fg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '6px',
          paddingBottom: '6px',
          fontSize: 'clamp(9px, 2vw, 10px)',
          fontFamily: '"Barlow Condensed", sans-serif',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--fg)',
        }}
      >
        <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 'clamp(9px, 2vw, 10px)' }}>★ FIRST EDITION</span>

        <nav className="hidden md:flex" style={{ gap: '20px' }} aria-label="Sections">
          {navItems.map(({ label, id }) => {
            const isActive = activeId === id
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? 'location' : undefined}
                style={{
                  textDecoration: 'none',
                  color: isActive ? 'var(--accent)' : 'var(--fg)',
                  fontWeight: isActive ? 700 : undefined,
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </a>
            )
          })}
        </nav>

        {/* Mobile center title - shows when scrolled past masthead */}
        {showTitle && (
          <div className="md:hidden" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(11px, 3vw, 14px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--fg)' }}>
            THE PR GAZETTE
          </div>
        )}

        <span className="hidden md:flex"><ThemeToggle /></span>
        <span className="md:hidden"><MobileNav /></span>
      </div>

      {/* Scroll progress bar */}
      <div style={{ height: '3.5px', background: 'var(--rule)' }}>
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'var(--accent)',
            transition: 'width 80ms linear',
          }}
        />
      </div>
    </div>
  )
}
