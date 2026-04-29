'use client'

interface PhotoSkeletonProps {
  className?: string
  style?: React.CSSProperties
}

/**
 * Newspaper-themed loading placeholder shown while images are loading.
 * Uses a crosshatch pattern and a pulsing "DEVELOPING..." label.
 */
export default function PhotoSkeleton({ className = '', style }: PhotoSkeletonProps) {
  return (
    <div
      className={`photo-skeleton ${className}`.trim()}
      style={{ width: '100%', height: '100%', ...style }}
      aria-hidden="true"
    />
  )
}
