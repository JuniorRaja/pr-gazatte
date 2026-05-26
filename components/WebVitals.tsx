'use client'

import { useEffect } from 'react'
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals'

export default function WebVitals() {
  useEffect(() => {
    const report = ({ name, value, rating }: { name: string; value: number; rating: string }) => {
      // CLS is unitless (0–1 scale), multiply by 1000 so Umami stores an integer
      const rounded = Math.round(name === 'CLS' ? value * 1000 : value)
      window.umami?.track(name, { value: rounded, rating })
    }

    onLCP(report)
    onINP(report)
    onCLS(report)
    onFCP(report)
    onTTFB(report)
  }, [])

  return null
}
