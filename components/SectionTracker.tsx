'use client'

import { useEffect, useRef } from 'react'

interface SectionTrackerProps {
  sectionIds: string[]
}

export default function SectionTracker({ sectionIds }: SectionTrackerProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const currentHashRef = useRef<string>('')

  useEffect(() => {
    // Get initial hash if present
    currentHashRef.current = window.location.hash.slice(1)

    const updateHash = (newHash: string) => {
      // Skip if hash hasn't changed
      if (currentHashRef.current === newHash) return

      currentHashRef.current = newHash

      // Update URL without triggering scroll or adding to history
      const url = new URL(window.location.href)
      url.hash = newHash
      window.history.replaceState(null, '', url.toString())
    }

    const debouncedUpdateHash = (hash: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        updateHash(hash)
      }, 300)
    }

    // Track which sections are currently visible
    const visibleSections = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id

          if (entry.isIntersecting) {
            // Store the intersection ratio for this section
            visibleSections.set(sectionId, entry.intersectionRatio)
          } else {
            // Remove section from visible list
            visibleSections.delete(sectionId)
          }
        })

        // Find the most visible section
        if (visibleSections.size > 0) {
          let maxRatio = 0
          let mostVisibleSection = ''

          visibleSections.forEach((ratio, id) => {
            if (ratio > maxRatio) {
              maxRatio = ratio
              mostVisibleSection = id
            }
          })

          if (mostVisibleSection) {
            debouncedUpdateHash(mostVisibleSection)
          }
        }
      },
      {
        root: null, // viewport
        rootMargin: '-50% 0px -50% 0px', // center-based detection
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // multiple thresholds for accuracy
      }
    )

    // Observe all sections
    const elements: Element[] = []
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
        elements.push(element)
      }
    })

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      elements.forEach((element) => observer.unobserve(element))
      observer.disconnect()
    }
  }, [sectionIds])

  return null
}
