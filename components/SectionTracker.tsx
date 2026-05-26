'use client'

import { useEffect, useRef } from 'react'

interface SectionTrackerProps {
  sectionIds: string[]
}

export default function SectionTracker({ sectionIds }: SectionTrackerProps) {
  const currentHashRef = useRef('')
  const rafRef = useRef<number | null>(null)
  const lastUpdateRef = useRef(0)

  useEffect(() => {
    const updateHash = (newHash: string) => {
      if (currentHashRef.current === newHash) return
      // Throttle replaceState to stay well under browser limits (~100/30s)
      const now = Date.now()
      if (now - lastUpdateRef.current < 250) return
      lastUpdateRef.current = now
      currentHashRef.current = newHash

      const url = new URL(window.location.href)
      if (newHash === '') {
        url.hash = ''
        window.history.replaceState(null, '', url.toString().replace(/#$/, ''))
      } else {
        url.hash = newHash
        window.history.replaceState(null, '', url.toString())
      }
    }

    const getActiveSection = (): string => {
      // Trigger point: 45% down from the top of the viewport
      const triggerY = window.innerHeight * 0.45
      let active = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        // Once this section's top is above (or at) the trigger, it becomes the candidate.
        // We keep iterating so the last matching section wins (i.e. the lowest one still above trigger).
        if (el.getBoundingClientRect().top <= triggerY) active = id
      }
      return active
    }

    const onScroll = () => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        updateHash(getActiveSection())
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Set initial hash on mount
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [sectionIds])

  return null
}
