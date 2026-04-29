'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import SectionFiller from '@/components/SectionFiller'
import NpImage from '@/components/NpImage'
import PhotoSkeleton from '@/components/PhotoSkeleton'
import { albums, getAlbumThumbnail, getPhotoUrl } from '@/content/photoAlbums'
import { meta, editorsNote } from '@/content/photos.mdx'

// Lazy-load the lightbox so it doesn't bloat the initial bundle
const PhotoLightbox = dynamic(() => import('@/components/PhotoLightbox'), { ssr: false })

const mono = '"JetBrains Mono", monospace'
const serif = '"Source Serif 4", serif'
const display = '"Playfair Display", serif'

interface ImageState {
  [key: string]: boolean
}

export default function PhotoDesk() {
  const [current, setCurrent] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const [dir, setDir] = useState(1)
  const [lightbox, setLightbox] = useState<{ albumIndex: number; photoIndex: number } | null>(null)
  const [showOriginal, setShowOriginal] = useState(false)
  const [loaded, setLoaded] = useState<ImageState>({})

  const go = (delta: number) => {
    if (flipping) return
    const next = (current + delta + albums.length) % albums.length
    setDir(delta)
    setFlipping(true)
    setTimeout(() => {
      setCurrent(next)
      setFlipping(false)
    }, 320)
  }

  const jumpTo = (i: number) => {
    if (flipping || i === current) return
    setDir(i > current ? 1 : -1)
    setFlipping(true)
    setTimeout(() => {
      setCurrent(i)
      setFlipping(false)
    }, 320)
  }

  const openLightbox = useCallback((albumIndex: number, photoIndex: number) => {
    setLightbox({ albumIndex, photoIndex })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
  }, [])

  const markLoaded = useCallback((key: string) => {
    setLoaded((prev) => ({ ...prev, [key]: true }))
  }, [])

  const album = albums[current]
  const filterClass = showOriginal ? 'np-filter-off' : 'np-filter-light'

  return (
    <section id="photos" style={{ borderBottom: '2px solid var(--fg)', position: 'relative' }}>
      <style>{`
        .pd-nav-btn {
          font-family: ${mono}; font-size: 11px;
          color: var(--fg); background: transparent;
          border: 1px solid rgba(14,14,12,0.2);
          padding: 8px 18px; cursor: pointer;
          letter-spacing: .1em; text-transform: uppercase;
          transition: background .15s, color .15s;
        }
        .pd-nav-btn:hover { background: var(--accent); color: #F4EFE6; border-color: var(--accent); }
        .pd-pill { width: 28px; height: 4px; border: none; cursor: pointer; transition: background .2s; }
        .pd-thumb-row { cursor: pointer; transition: opacity .15s; }
        .pd-thumb-row:hover { opacity: 0.8; }
        .pd-contact-cell { cursor: pointer; transition: opacity .15s; }
        .pd-contact-cell:hover { opacity: 0.85; }
        .pd-orig-btn {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%) rotate(90deg) translateX(50%);
          transform-origin: right center;
          background: var(--fg);
          color: var(--bg);
          border: none;
          font-family: ${mono};
          font-size: 8px;
          letter-spacing: .15em;
          text-transform: uppercase;
          padding: 5px 12px;
          cursor: pointer;
          white-space: nowrap;
          z-index: 10;
          opacity: 0.75;
          transition: opacity .15s;
        }
        .pd-orig-btn:hover { opacity: 1; }
        @media (max-width: 900px) {
          .pd-body { grid-template-columns: 1fr !important; }
          .pd-col-left { border-right: none !important; border-bottom: 1px solid rgba(14,14,12,0.2) !important; }
          .pd-spread-grid { grid-template-columns: 1fr !important; }
          .pd-spread-right { display: none !important; }
          .pd-bottom-nav { flex-wrap: wrap; gap: 8px; justify-content: center !important; }
          .pd-bottom-nav .pd-nav-label { display: none; }
          .pd-orig-btn { display: none; }
        }
      `}</style>

      {/* ── Section bar ──────────────────────────────────────── */}
      <div style={{ background: 'var(--fg)', color: 'var(--bg)', padding: '5px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>{meta.sectionBar}</span>
        <span style={{ fontFamily: mono, fontSize: '10px' }}>THE PHOTO DESK</span>
      </div>

      {/* ── Full-width headline strip ────────────────────────── */}
      <div style={{ borderBottom: '3px double var(--fg)', padding: '20px 32px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '260px' }}>
          <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.2em', marginBottom: '8px' }}>{meta.kicker}</div>
          <h2 style={{ fontFamily: display, fontSize: 'clamp(30px, 4.5vw, 60px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.025em', color: 'var(--fg)', margin: 0 }}>
            The <span style={{ color: 'var(--accent)' }}>Photo</span> Desk.
          </h2>
        </div>
        <div style={{ fontFamily: serif, fontSize: '14px', fontStyle: 'italic', lineHeight: 1.65, color: 'var(--fg)', maxWidth: '340px', flexShrink: 0, borderLeft: '3px solid var(--accent)', paddingLeft: '16px', opacity: 0.8 }}>
          {meta.headerQuote}
        </div>
      </div>

      {/* ── Pull quote strip ─────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid rgba(14,14,12,0.15)', padding: '12px 32px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(14,14,12,0.03)' }}>
        <span style={{ fontFamily: mono, fontSize: '18px', color: 'var(--accent)', lineHeight: 1, flexShrink: 0 }}>"</span>
        <p style={{ fontFamily: serif, fontSize: '13px', fontStyle: 'italic', lineHeight: 1.6, color: 'var(--fg)', margin: 0, opacity: 0.85 }}>
          {meta.pullQuote}
        </p>
        <span style={{ fontFamily: mono, fontSize: '18px', color: 'var(--accent)', lineHeight: 1, flexShrink: 0, alignSelf: 'flex-end' }}>"</span>
      </div>

      <div className="pd-body" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', columnGap: 0 }}>

        {/* ═══ LEFT — Magazine spread + navigation ═══ */}
        <div className="pd-col-left" style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '24px 32px 28px' }}>

          {/* Pill indicators */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
            {albums.map((a, i) => (
              <button
                key={a.slug}
                className="pd-pill"
                onClick={() => jumpTo(i)}
                aria-label={`Go to ${a.title}`}
                style={{ background: i === current ? album.color : 'rgba(14,14,12,0.15)' }}
              />
            ))}
          </div>

          {/* The spread */}
          <div
            className="pd-spread-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              boxShadow: '0 12px 40px rgba(14,14,12,0.12)',
              border: '1px solid rgba(14,14,12,0.15)',
              transition: 'opacity .32s, transform .32s',
              opacity: flipping ? 0 : 1,
              transform: flipping ? `translateX(${dir * 18}px)` : 'translateX(0)',
            }}
          >
            {/* Left page */}
            <div style={{
              background: '#F0EAD8', padding: '28px 24px',
              borderRight: '2px solid rgba(14,14,12,0.25)',
              position: 'relative', minHeight: '500px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ position: 'absolute', right: 0, bottom: 0, width: '36px', height: '36px', background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.08) 50%)', pointerEvents: 'none' }} />

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontFamily: display, fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#0E0E0C', margin: 0 }}>
                      {album.title.split(' ').map((word, wi) =>
                        word === album.highlight
                          ? <span key={wi} style={{ color: '#8B2020' }}>{word} </span>
                          : word + ' '
                      )}
                    </h3>
                    <div style={{ fontFamily: serif, fontSize: '12px', fontStyle: 'italic', color: '#5a4a3a', marginTop: '4px' }}>{album.description}</div>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: '8px', color: '#9a8070', textAlign: 'right', lineHeight: 1.7 }}>{album.sequences.length} photos</div>
                </div>

                {/* Hero image — priority loaded, clickable */}
                <button
                  onClick={() => openLightbox(current, 0)}
                  aria-label={`Open ${album.title} in lightbox`}
                  style={{ display: 'block', width: '100%', padding: 0, border: `1px solid ${album.color}`, marginBottom: '14px', position: 'relative', overflow: 'hidden', height: '340px', cursor: 'zoom-in', background: 'transparent' }}
                >
                  {!loaded[`hero-${album.slug}`] && (
                    <PhotoSkeleton style={{ position: 'absolute', inset: 0 }} />
                  )}
                  <NpImage
                    src={getPhotoUrl(album, 0, 'medium')}
                    alt={`${album.title} — featured photo`}
                    fill
                    sizes="(max-width: 900px) 100vw, 480px"
                    quality={80}
                    priority
                    placeholder="empty"
                    className={filterClass}
                    onLoad={() => markLoaded(`hero-${album.slug}`)}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(14,14,12,0.6))', padding: '12px 10px 6px', pointerEvents: 'none' }}>
                    <div style={{ fontFamily: mono, fontSize: '8px', color: 'rgba(244,239,230,0.85)', letterSpacing: '.07em' }}>{album.description}</div>
                  </div>
                </button>

                <p style={{ fontFamily: serif, fontSize: '13.5px', lineHeight: 1.68, color: '#2a1f0e', margin: 0 }}>
                  {album.description} {album.sequences.length} photographs.
                </p>
              </div>

              <div style={{ fontFamily: mono, fontSize: '8px', color: '#9a8070', borderTop: '1px solid rgba(14,14,12,0.15)', paddingTop: '8px' }}>
                {current + 1} / {albums.length} &nbsp;·&nbsp; {album.title}
              </div>
            </div>

            {/* Right page — contact sheet */}
            <div className="pd-spread-right" style={{ background: '#E8E0CC', padding: '24px 20px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '.15em', textTransform: 'uppercase', color: '#7a6a5a', borderBottom: '1px solid rgba(14,14,12,0.2)', paddingBottom: '6px', marginBottom: '12px' }}>Contact Sheet · {album.title}</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', flex: 1, marginBottom: '12px' }}>
                {[1, 2, 3, 4].map((pi) => {
                  const imgKey = `contact-${album.slug}-${pi}`
                  const hasPhoto = pi < album.sequences.length
                  return (
                    <button
                      key={pi}
                      className="pd-contact-cell"
                      onClick={() => hasPhoto && openLightbox(current, pi)}
                      aria-label={hasPhoto ? `Open ${album.title} photo ${pi + 1} in lightbox` : undefined}
                      disabled={!hasPhoto}
                      style={{
                        background: '#D8D0BC',
                        border: '1px solid rgba(14,14,12,0.15)',
                        display: 'flex', flexDirection: 'column',
                        overflow: 'hidden', padding: 0,
                        cursor: hasPhoto ? 'zoom-in' : 'default',
                      }}
                    >
                      <div style={{ flex: 1, minHeight: '75px', overflow: 'hidden', position: 'relative' }}>
                        {!loaded[imgKey] && hasPhoto && (
                          <PhotoSkeleton style={{ position: 'absolute', inset: 0 }} />
                        )}
                        {hasPhoto && (
                          <NpImage
                            src={getPhotoUrl(album, pi, 'medium')}
                            alt={`${album.title} — photo ${pi + 1}`}
                            fill
                            sizes="(max-width: 900px) 50vw, 200px"
                            quality={80}
                            placeholder="empty"
                            className={filterClass}
                            onLoad={() => markLoaded(imgKey)}
                          />
                        )}
                        <div style={{ position: 'absolute', top: '3px', left: '4px', fontFamily: mono, fontSize: '7px', color: 'rgba(244,239,230,0.7)', background: 'rgba(14,14,12,0.4)', padding: '1px 4px', pointerEvents: 'none' }}>{pi + 1}</div>
                      </div>
                      <div style={{ padding: '4px 6px', borderTop: '1px solid rgba(14,14,12,0.1)' }}>
                        <div style={{ fontFamily: mono, fontSize: '7px', color: '#5a4a3a' }}>{album.title}</div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div style={{ fontFamily: serif, fontSize: '10px', fontStyle: 'italic', color: '#7a6a5a', lineHeight: 1.5, borderTop: '1px solid rgba(14,14,12,0.15)', paddingTop: '8px' }}>
                {meta.contactSheetCaption}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="pd-bottom-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <button className="pd-nav-btn" onClick={() => go(-1)} aria-label="Previous album">← Prev Album</button>
            <div className="pd-nav-label" style={{ fontFamily: mono, fontSize: '9px', color: 'var(--sepia)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              {album.title}
            </div>
            <button className="pd-nav-btn" onClick={() => go(1)} aria-label="Next album">Next Album →</button>
          </div>

        </div>

        {/* ═══ RIGHT — Editor's Note > Album Index ═══ */}
        <div style={{ padding: '24px 24px', display: 'flex', flexDirection: 'column' }}>

          {/* Editor's Note */}
          <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>Editor&apos;s Note</div>
          {editorsNote.map((para, i) => (
            <p key={i} style={{ fontFamily: serif, fontSize: '13px', lineHeight: 1.72, color: 'var(--fg)', margin: i < editorsNote.length - 1 ? '0 0 12px' : '0 0 20px' }}>
              {i === 0 ? (
                <>
                  <span style={{ fontFamily: display, fontSize: '48px', fontWeight: 900, lineHeight: 0.78, float: 'left', marginRight: '6px', marginTop: '4px', color: 'var(--fg)' }}>{para[0]}</span>
                  {para.slice(1)}
                </>
              ) : para}
            </p>
          ))}

          {/* Album Index — 2-col grid */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '10px' }}>Album Index</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {albums.map((a, i) => {
                const tnailKey = `tnail-${a.slug}`
                return (
                  <div
                    key={a.slug}
                    className="pd-thumb-row"
                    onClick={() => jumpTo(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && jumpTo(i)}
                    aria-label={`Switch to ${a.title} album`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '6px 8px 6px 6px',
                      cursor: 'pointer',
                      opacity: i === current ? 1 : 0.55,
                      transition: 'opacity .2s',
                      border: `1px solid ${i === current ? a.color : 'rgba(14,14,12,0.15)'}`,
                      borderTop: i === current ? `3px solid ${a.color}` : '3px solid transparent',
                      background: i === current ? 'rgba(14,14,12,0.03)' : 'transparent',
                    }}
                  >
                    <div style={{ width: '40px', height: '40px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                      {!loaded[tnailKey] && <PhotoSkeleton />}
                      <NpImage
                        src={getAlbumThumbnail(a)}
                        alt={`${a.title} thumbnail`}
                        fill
                        sizes="40px"
                        quality={80}
                        placeholder="empty"
                        className={filterClass}
                        onLoad={() => markLoaded(tnailKey)}
                      />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: mono, fontSize: '8px', color: a.color, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.title}</div>
                      <div style={{ fontFamily: mono, fontSize: '7px', color: 'var(--sepia)', marginTop: '2px' }}>{a.sequences.length} photos</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Continued */}
          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(14,14,12,0.15)', textAlign: 'right' }}>
            <span style={{ fontFamily: mono, fontSize: '9px', color: 'var(--accent)', fontStyle: 'italic' }}>
              Continued on books &amp; reviews →
            </span>
          </div>
        </div>
      </div>

      {/* "Show Original Colors" tab — right edge of section */}
      <button
        className="pd-orig-btn"
        onClick={() => setShowOriginal((v) => !v)}
        aria-label={showOriginal ? 'Apply vintage filter' : 'Show original colors'}
        aria-pressed={showOriginal}
      >
        {showOriginal ? 'Vintage' : 'Original Colors'}
      </button>

      <SectionFiller watermark="PHOTOS" footnote={meta.sectionFillerFootnote} page="6" />

      {/* Lightbox */}
      {lightbox !== null && (
        <PhotoLightbox
          album={albums[lightbox.albumIndex]}
          initialIndex={lightbox.photoIndex}
          showOriginal={showOriginal}
          onToggleOriginal={() => setShowOriginal((v) => !v)}
          onClose={closeLightbox}
        />
      )}
    </section>
  )
}
