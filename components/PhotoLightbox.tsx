'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import NpImage from '@/components/NpImage'
import { photoUrl } from '@/utils/cdn'
import type { Album } from '@/content/photoAlbums'

const mono = '"Barlow Condensed", sans-serif'
const serif = '"Source Serif 4", serif'

interface PhotoLightboxProps {
  album: Album
  initialIndex: number
  showOriginal: boolean
  onToggleOriginal: () => void
  onClose: () => void
}

export default function PhotoLightbox({
  album,
  initialIndex,
  showOriginal,
  onToggleOriginal,
  onClose,
}: PhotoLightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const [exiting, setExiting] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<Element | null>(null)

  // Remember what triggered the lightbox so we can return focus on close
  useEffect(() => {
    triggerRef.current = document.activeElement
    closeButtonRef.current?.focus()
  }, [])

  const close = useCallback(() => {
    setExiting(true)
    setTimeout(() => {
      onClose()
      // Return focus to the element that opened the lightbox
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus()
      }
    }, 180)
  }, [onClose])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + album.sequences.length) % album.sequences.length)
  }, [album.sequences.length])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % album.sequences.length)
  }, [album.sequences.length])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close, prev, next])

  // Focus trap
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    const focusable = overlay.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    overlay.addEventListener('keydown', trap)
    return () => overlay.removeEventListener('keydown', trap)
  }, [])

  const seq = album.sequences[index]
  const src = photoUrl(album.slug, seq, 'full')
  const filterClass = showOriginal ? 'np-filter-off' : 'np-filter-light'

  return (
    <div
      ref={overlayRef}
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${album.title} — photo ${index + 1} of ${album.sequences.length}`}
      onClick={(e) => {
        // Close when clicking the backdrop (not the image panel)
        if (e.target === e.currentTarget) close()
      }}
    >
      {/* Main panel */}
      <div
        className={exiting ? 'lightbox-exit' : 'lightbox-enter'}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '90vw',
          maxHeight: '90vh',
          border: '1px solid rgba(244,239,230,0.2)',
          background: '#0E0E0C',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={close}
          aria-label="Close lightbox"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 2,
            background: 'rgba(14,14,12,0.7)',
            border: '1px solid rgba(244,239,230,0.3)',
            color: '#F4EFE6',
            fontFamily: mono,
            fontSize: '14px',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Image */}
        <div style={{ position: 'relative', width: '80vw', maxWidth: '900px', aspectRatio: '3/2', maxHeight: '75vh' }}>
          <NpImage
            key={src}
            src={src}
            alt={`${album.title} — ${seq}`}
            fill
            sizes="90vw"
            quality={85}
            placeholder="empty"
            className={filterClass}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Caption bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 14px',
          borderTop: '1px solid rgba(244,239,230,0.12)',
          background: '#0E0E0C',
          gap: '12px',
        }}>
          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous photo"
            style={{
              fontFamily: mono, fontSize: '10px', color: '#F4EFE6',
              background: 'transparent', border: '1px solid rgba(244,239,230,0.2)',
              padding: '5px 12px', cursor: 'pointer', letterSpacing: '.1em',
              textTransform: 'uppercase',
            }}
          >
            ←
          </button>

          {/* Caption */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <span style={{ fontFamily: mono, fontSize: '9px', color: 'rgba(244,239,230,0.5)', letterSpacing: '.15em', textTransform: 'uppercase' }}>
              {album.title}
            </span>
            <span style={{ fontFamily: mono, fontSize: '9px', color: 'rgba(244,239,230,0.3)', margin: '0 8px' }}>·</span>
            <span style={{ fontFamily: mono, fontSize: '9px', color: 'rgba(244,239,230,0.5)', letterSpacing: '.1em' }}>
              {index + 1} / {album.sequences.length}
            </span>
          </div>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next photo"
            style={{
              fontFamily: mono, fontSize: '10px', color: '#F4EFE6',
              background: 'transparent', border: '1px solid rgba(244,239,230,0.2)',
              padding: '5px 12px', cursor: 'pointer', letterSpacing: '.1em',
              textTransform: 'uppercase',
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* "Show Original Colors" toggle — right edge, vertically centered */}
      <button
        onClick={onToggleOriginal}
        aria-label={showOriginal ? 'Apply vintage filter' : 'Show original colors'}
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'right center',
          background: showOriginal ? '#F4EFE6' : 'rgba(14,14,12,0.8)',
          color: showOriginal ? '#0E0E0C' : '#F4EFE6',
          border: '1px solid rgba(244,239,230,0.3)',
          fontFamily: mono,
          fontSize: '9px',
          letterSpacing: '.15em',
          textTransform: 'uppercase',
          padding: '6px 14px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          zIndex: 10001,
        }}
      >
        {showOriginal ? 'Vintage' : 'Original Colors'}
      </button>
    </div>
  )
}
