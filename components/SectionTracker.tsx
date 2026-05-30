'use client'

import { useEffect, useRef } from 'react'
import { track } from '@/lib/analytics'

interface SectionTrackerProps {
  sectionIds: string[]
}

const DEPTH_MILESTONES = [25, 50, 75, 100]

export default function SectionTracker({ sectionIds }: SectionTrackerProps) {
  const currentHashRef = useRef('')
  const rafRef = useRef<number | null>(null)
  const lastUpdateRef = useRef(0)
  const firedDepthsRef = useRef(new Set<number>())

  useEffect(() => {
    const updateHash = (newHash: string) => {
      if (currentHashRef.current === newHash) return
      const now = Date.now()
      if (now - lastUpdateRef.current < 300) return

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
      const triggerY = window.innerHeight * 0.45
      let active = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= triggerY) active = id
      }
      return active
    }

    const checkScrollDepth = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop + el.clientHeight
      const total = el.scrollHeight
      const pct = Math.round((scrolled / total) * 100)
      for (const milestone of DEPTH_MILESTONES) {
        if (pct >= milestone && !firedDepthsRef.current.has(milestone)) {
          firedDepthsRef.current.add(milestone)
          track('scroll_depth', { depth: milestone })
        }
      }
    }

    const onScroll = () => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        updateHash(getActiveSection())
        checkScrollDepth()
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [sectionIds])

  return null
}
