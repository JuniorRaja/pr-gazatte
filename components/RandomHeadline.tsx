'use client'

import { useState } from 'react'

const headlines = [
  "Builds Systems. Scales Teams. Ships Products.",
  "Debugs Code. Debugs Teams. Debugs Everything.",
  "Firefighter. Code Writer. Team Builder.",
  "Five Years Coding. Two Years Leading. Forever Learning.",
  "Trainee to PM. Coder to Leader. Maker to Manager.",
]

export default function RandomHeadline() {
  const [idx] = useState(() => Math.floor(Math.random() * headlines.length))

  const headline = headlines[idx] ?? headlines[0]
  const parts = headline.split('. ')
  const lastPart = parts.pop()
  const firstParts = parts.length > 0 ? parts.join('. ') + '.' : ''

  return (
    <h1 style={{ fontFamily: '"Bodoni Moda", serif', fontSize: 'clamp(24px, 5.5vw, 54px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 16px', borderBottom: '2px solid var(--fg)', paddingBottom: '16px' }} suppressHydrationWarning>
      {firstParts && <>{firstParts}<br /></>}
      <span style={{ color: 'var(--accent)' }}>{lastPart}</span>
    </h1>
  )
}
