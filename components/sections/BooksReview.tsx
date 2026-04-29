'use client'

import { useState, useRef } from 'react'
import SectionFiller from '@/components/SectionFiller'
import NpImage from '@/components/NpImage'

const mono = '"JetBrains Mono", monospace'
const serif = '"Source Serif 4", serif'
const display = '"Playfair Display", serif'

type BookStatus = 'currently-reading' | 'will-read' | 'read'

interface BookData {
  id: number
  title: string
  author: string
  coverImage: string
  spineColor: string
  textColor: string
  status?: BookStatus
  rating: number
  overview: string
}

const booksData: BookData[] = [
  { id: 1,  title: 'Sapiens',                author: 'Yuval Noah Harari', coverImage: '/book-covers/sapiens.png',                          spineColor: '#fefcfb', textColor: '#1a1a2e', status: 'currently-reading', rating: 5, overview: 'A brief history of humankind, exploring how Homo sapiens came to dominate the world through cognitive, agricultural, and scientific revolutions.' },
  { id: 2,  title: 'Atomic Habits',          author: 'James Clear',       coverImage: '/book-covers/atomic-habits.png',                    spineColor: '#fefcfb', textColor: '#1a1a1a',                             rating: 5, overview: 'Tiny changes, remarkable results. A proven framework for improving every day through the compound effect of small habits.' },
  { id: 3,  title: 'The Alchemist',          author: 'Paulo Coelho',      coverImage: '/book-covers/the-alchemist.png',                    spineColor: '#f17623', textColor: '#ffffff',                             rating: 4, overview: 'A magical fable about following your dreams. Santiago, a shepherd boy, journeys to find treasure and discovers the true meaning of life.' },
  { id: 4,  title: '48 Laws of Power',       author: 'Robert Greene',     coverImage: '/book-covers/48-laws-of-popwer.png',                spineColor: '#e33d31', textColor: '#ffffff', status: 'currently-reading', rating: 4, overview: 'A masterful guide to understanding power dynamics through historical examples and timeless strategies for gaining influence.' },
  { id: 5,  title: 'Psychology of Money',    author: 'Morgan Housel',     coverImage: '/book-covers/the-psychology-of-money.png',          spineColor: '#fefcfb', textColor: '#1a1a1a',                             rating: 5, overview: 'Timeless lessons on wealth, greed, and happiness. How behavior matters more than knowledge in financial success.' },
  { id: 6,  title: '21 Lessons',             author: 'Yuval Noah Harari', coverImage: '/book-covers/21-lessons-for-21st-century.png',      spineColor: '#b8b6c1', textColor: '#1a1a1a', status: 'will-read',        rating: 4, overview: 'Explores the most pressing issues of our present: technology, truth, justice, and how to navigate an uncertain future.' },
  { id: 7,  title: 'Courage to be Disliked', author: 'Ichiro Kishimi',    coverImage: '/book-covers/the-courage-to-be-disliked.png',       spineColor: '#fefcfb', textColor: '#1a1a1a',                             rating: 5, overview: 'A liberating dialogue on Adlerian psychology. Learn to free yourself from the expectations of others and live authentically.' },
  { id: 8,  title: 'Tentacles',              author: 'Roland Smith',      coverImage: '/book-covers/tentacles.png',                        spineColor: '#203e4f', textColor: '#38bdf8',                             rating: 3, overview: 'An adventure thriller following Marty and his mysterious uncle as they search for a giant squid in the deep ocean.' },
  { id: 9,  title: '5 AM Club',              author: 'Robin Sharma',      coverImage: '/book-covers/5-am-club.jpg',                        spineColor: '#ffffff', textColor: '#1a1a1a', status: 'will-read',        rating: 4, overview: 'Own your morning, elevate your life. A revolutionary morning routine to maximize productivity and activate your best self.' },
  { id: 10, title: 'Deep Work',              author: 'Cal Newport',       coverImage: '/book-covers/dseep-work.jpg',                       spineColor: '#ffffff', textColor: '#1a1a1a', status: 'will-read',        rating: 5, overview: 'Rules for focused success in a distracted world. Learn to cultivate intense concentration for meaningful work.' },
  { id: 11, title: 'Eat That Frog',          author: 'Brian Tracy',       coverImage: '/book-covers/eat-that-frog.jpg',                    spineColor: '#7bbe47', textColor: '#ffffff',                             rating: 4, overview: '21 ways to stop procrastinating and get more done. Tackle your most challenging task first thing each day.' },
  { id: 12, title: 'Win Friends',            author: 'Dale Carnegie',     coverImage: '/book-covers/how-to-win-and-influence-people.jpg',  spineColor: '#bd0621', textColor: '#fef3c7',                             rating: 5, overview: 'The timeless classic on human relations. Fundamental techniques for handling people and winning them to your way of thinking.' },
  { id: 13, title: 'Ikigai',                 author: 'Héctor García',     coverImage: '/book-covers/ikigai.jpg',                           spineColor: '#d8e5f1', textColor: '#c44536',                             rating: 4, overview: 'The Japanese secret to a long and happy life. Discover your purpose and find joy in everyday moments.' },
  { id: 14, title: 'Subconscious Mind',      author: 'Joseph Murphy',     coverImage: '/book-covers/power-of-your-subconsious-min.jpg',    spineColor: '#fdfdfd', textColor: '#1a1a1a', status: 'currently-reading', rating: 4, overview: 'Unlock the extraordinary power within you. Techniques to harness your subconscious for health, wealth, and success.' },
  { id: 15, title: 'Naval Ravikant',         author: 'Eric Jorgenson',    coverImage: '/book-covers/the-almanack-of-naval-ravikant.jpg',   spineColor: '#ffffff', textColor: '#0ea5e9', status: 'will-read',        rating: 5, overview: 'A guide to wealth and happiness. Wisdom from the angel investor and philosopher on building a meaningful life.' },
  { id: 16, title: 'Richest Man in Babylon', author: 'George S. Clason',  coverImage: '/book-covers/the-richest-man-in-babylon.webp',      spineColor: '#f4ab40', textColor: '#1a1a1a',                             rating: 5, overview: 'Timeless financial wisdom through parables of ancient Babylon. The classic guide to acquiring wealth and keeping it.' },
  { id: 17, title: 'The Secret',             author: 'Rhonda Byrne',      coverImage: '/book-covers/the-secret.jpg',                       spineColor: '#d08643', textColor: '#ffffff',                             rating: 3, overview: 'The law of attraction revealed. Learn how your thoughts can shape your reality and manifest your desires.' },
  { id: 18, title: 'Thinking Fast & Slow',   author: 'Daniel Kahneman',   coverImage: '/book-covers/thinking-fast-and-slow.jpg',           spineColor: '#fdfdfd', textColor: '#f97316', status: 'will-read',        rating: 5, overview: 'A groundbreaking exploration of the two systems that drive how we think—intuitive and deliberate—and their impact on decisions.' },
]

const readCount        = booksData.filter(b => !b.status || b.status === 'read').length
const readingCount     = booksData.filter(b => b.status === 'currently-reading').length
const willReadCount    = booksData.filter(b => b.status === 'will-read').length

// Split into three columns for the table
const third = Math.ceil(booksData.length / 3)
const leftCol   = booksData.slice(0, third)
const midCol    = booksData.slice(third, third * 2)
const rightCol  = booksData.slice(third * 2)

function statusLabel(status?: BookStatus) {
  if (status === 'currently-reading') return 'Reading'
  if (status === 'will-read')         return 'To Read'
  return 'Done'
}

function stampClass(status?: BookStatus) {
  if (status === 'currently-reading') return 'br-stamp br-stamp-reading'
  if (status === 'will-read')         return 'br-stamp br-stamp-soon'
  return 'br-stamp br-stamp-done'
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ fontFamily: mono, fontSize: '9px', color: '#c7a830', letterSpacing: '1px' }}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  )
}

function BookRow({ book, hoveredId, onHover }: {
  book: BookData
  hoveredId: number | null
  onHover: (id: number | null) => void
}) {
  const isHovered = hoveredId === book.id
  const isDimmed  = hoveredId !== null && !isHovered
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => onHover(book.id), 400)
  }

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    onHover(null)
  }

  return (
    <div
      className="br-book-row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'grid',
        gridTemplateColumns: '44px 1fr 72px',
        gap: '0 10px',
        alignItems: 'center',
        borderBottom: '1px dotted rgba(14,14,12,0.2)',
        padding: '7px 0',
        position: 'relative',
        transition: 'opacity 0.2s, filter 0.2s',
        opacity: isDimmed ? 0.25 : 1,
        filter: isDimmed ? 'blur(1px)' : 'none',
        cursor: 'default',
        zIndex: isHovered ? 2 : 1,
      }}
    >
      {/* Cover */}
      <div style={{
        width: '36px',
        height: '50px',
        position: 'relative',
        overflow: 'hidden',
        border: '0.5px solid rgba(14,14,12,0.2)',
        flexShrink: 0,
        transition: 'transform 0.25s',
        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        boxShadow: isHovered ? '2px 4px 12px rgba(14,14,12,0.3)' : '1px 1px 4px rgba(14,14,12,0.12)',
      }}>
        <NpImage src={book.coverImage} alt={book.title} fill sizes="36px" quality={80} />
      </div>

      {/* Title + author */}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: display,
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--fg)',
          lineHeight: 1.25,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>{book.title}</div>
        <div style={{
          fontFamily: serif,
          fontSize: '9.5px',
          fontStyle: 'italic',
          color: 'var(--sepia)',
          marginTop: '1px',
        }}>{book.author}</div>
      </div>

      {/* Stamp */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className={stampClass(book.status)}>{statusLabel(book.status)}</span>
      </div>

      {/* Hover detail card */}
      {isHovered && (
        <div
          className="br-hover-card"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
            width: '240px',
            background: 'var(--bg)',
            border: '1px solid var(--fg)',
            outline: '3px solid var(--fg)',
            outlineOffset: '3px',
            padding: '14px 16px',
            boxShadow: '4px 6px 24px rgba(14,14,12,0.28)',
            pointerEvents: 'none',
          }}
        >
          {/* Cover + title row */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
            <div style={{
              width: '52px',
              height: '72px',
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
              border: '0.5px solid rgba(14,14,12,0.2)',
              boxShadow: '2px 3px 10px rgba(14,14,12,0.2)',
            }}>
              <NpImage src={book.coverImage} alt={book.title} fill sizes="52px" quality={85} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: display,
                fontSize: '13px',
                fontWeight: 900,
                color: 'var(--fg)',
                lineHeight: 1.2,
                marginBottom: '3px',
              }}>{book.title}</div>
              <div style={{
                fontFamily: serif,
                fontSize: '10px',
                fontStyle: 'italic',
                color: 'var(--sepia)',
                marginBottom: '6px',
              }}>{book.author}</div>
              <StarRating rating={book.rating} />
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(14,14,12,0.15)', marginBottom: '8px' }} />

          {/* Overview */}
          <p style={{
            fontFamily: serif,
            fontSize: '10.5px',
            lineHeight: 1.65,
            color: 'var(--fg)',
            margin: '0 0 10px',
            opacity: 0.85,
          }}>{book.overview}</p>

          {/* Status badge */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <span className={stampClass(book.status)} style={{ fontSize: '7px' }}>
              {statusLabel(book.status)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function BookTableCol({ books, hoveredId, onHover }: {
  books: BookData[]
  hoveredId: number | null
  onHover: (id: number | null) => void
}) {
  return (
    <div>
      {/* Column header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '44px 1fr 72px',
        gap: '0 10px',
        fontFamily: mono,
        fontSize: '8.5px',
        letterSpacing: '.15em',
        textTransform: 'uppercase',
        color: 'var(--sepia)',
        borderBottom: '1px solid var(--fg)',
        paddingBottom: '5px',
        marginBottom: '2px',
      }}>
        <span>Cover</span>
        <span>Title &amp; Author</span>
        <span style={{ textAlign: 'center' }}>Status</span>
      </div>
      {books.map(book => (
        <BookRow key={book.id} book={book} hoveredId={hoveredId} onHover={onHover} />
      ))}
    </div>
  )
}

export default function BooksReview() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="books" style={{ borderBottom: '2px solid var(--fg)' }}>
      <style>{`
        /* ── Stamps ── */
        .br-stamp {
          font-family: ${mono};
          font-size: 7.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 3px 6px;
          border: 1.5px solid;
          display: inline-block;
        }
        .br-stamp-done    { color: #1a5a1a; border-color: #1a5a1a; background: rgba(26,90,26,0.07);   transform: rotate(-6deg); }
        .br-stamp-reading { color: var(--accent); border-color: var(--accent); background: rgba(139,34,35,0.07); transform: rotate(5deg); }
        .br-stamp-soon    { color: #3a3a8a; border-color: #3a3a8a; background: rgba(58,58,138,0.07);  transform: rotate(-4deg); }

        /* ── Hover card entrance ── */
        .br-hover-card {
          animation: brCardIn 0.18s ease-out forwards;
        }
        @keyframes brCardIn {
          from { opacity: 0; transform: translate(-50%, -44%) scale(0.94); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        /* ── Book row hover cursor ── */
        .br-book-row:hover { cursor: default; }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .br-outer { grid-template-columns: 1fr !important; }
          .br-photo-right { display: none !important; }
          .br-writing-row { grid-template-columns: 1fr 1fr !important; }
          .br-table-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .br-writing-row { grid-template-columns: 1fr !important; }
          .br-writing-row .br-wcol { border-right: none !important; margin-right: 0 !important; padding-right: 0 !important; border-bottom: 1px solid rgba(14,14,12,0.15); padding-bottom: 16px; margin-bottom: 16px; }
          .br-table-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Section bar ── */}
      <div style={{
        background: 'var(--fg)', color: 'var(--bg)',
        padding: '5px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Culture &amp; Character · The Reading Life</span>
        <span style={{ fontFamily: mono, fontSize: '10px' }}>Page 7</span>
      </div>

      {/* ── Top 2-col: [headline + writing] | [tall photo] ── */}
      <div
        className="br-outer"
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          alignItems: 'stretch',
          borderBottom: '1px solid rgba(14,14,12,0.2)',
        }}
      >

        {/* ══ LEFT — headline + writing only ══ */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '20px 28px 20px 32px' }}>

          {/* ── Headline + deck ── */}
          <h2 style={{
            fontFamily: display,
            fontSize: 'clamp(30px, 4.5vw, 52px)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: 'var(--fg)',
            margin: '0 0 8px',
          }}>
            The Bookshelf<br />
            <span style={{ color: 'var(--accent)' }}>Speaks First.</span>
          </h2>
          <p style={{
            fontFamily: serif,
            fontSize: '13px',
            fontStyle: 'italic',
            color: 'var(--sepia)',
            maxWidth: '580px',
            lineHeight: 1.55,
            borderBottom: '0.5px solid rgba(14,14,12,0.25)',
            paddingBottom: '16px',
            marginBottom: '20px',
          }}>
            Ask him anything. His answers trace back to a book he finished, one he&apos;s halfway through, or one he keeps meaning to start. The shelf is a map. This is the legend.
          </p>

          {/* ── Writing row: 2 editorial cols ── */}
          <div
            className="br-writing-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
              marginBottom: '22px',
              alignItems: 'start',
            }}
          >
            {/* Left editorial */}
            <div
              className="br-wcol"
              style={{
                paddingRight: '22px',
                borderRight: '0.5px solid rgba(14,14,12,0.25)',
                marginRight: '22px',
              }}
            >
              <div style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--sepia)', borderBottom: '0.5px solid rgba(14,14,12,0.2)', paddingBottom: '4px', marginBottom: '10px' }}>The habit</div>
              <p className="drop-cap" style={{ fontFamily: serif, fontSize: '11.5px', lineHeight: 1.72, color: 'var(--fg)', textAlign: 'justify', marginBottom: '8px' }}>
                He does not read on schedule. He reads the way some people think — in bursts, in margins, in the ten minutes before a meeting where a decent idea might still show up. The book is always somewhere nearby. Sometimes it is open. Sometimes it is just watching.
              </p>
              <p style={{ fontFamily: serif, fontSize: '11.5px', lineHeight: 1.72, color: 'var(--fg)', textAlign: 'justify', marginBottom: '14px' }}>
                The habit formed not in school but in the years after, when answers stopped arriving pre-packaged and questions started arriving faster. A book became the cheapest form of a very expensive conversation.
              </p>

              <div style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--sepia)', borderBottom: '0.5px solid rgba(14,14,12,0.2)', paddingBottom: '4px', marginBottom: '10px' }}>What gets chosen</div>
              <p style={{ fontFamily: serif, fontSize: '11.5px', lineHeight: 1.72, color: 'var(--fg)', textAlign: 'justify', marginBottom: '12px' }}>
                The shelf leans non-fiction without being cold. History. Systems. The psychology of decisions. The occasional biography of someone who built something and survived it. Fiction makes a rare appearance — usually when a colleague insists, or when the nonfiction starts sounding too much like itself.
              </p>
              <div style={{
                fontFamily: serif,
                fontSize: '13px',
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: 'var(--accent)',
                borderTop: '1.5px solid var(--accent)',
                borderBottom: '1.5px solid var(--accent)',
                padding: '8px 0',
                textAlign: 'center',
              }}>
                &ldquo;He doesn&apos;t collect books. He collects the version of himself that exists after finishing them.&rdquo;
              </div>
            </div>

            {/* Right editorial */}
            <div>
              <div style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--sepia)', borderBottom: '0.5px solid rgba(14,14,12,0.2)', paddingBottom: '4px', marginBottom: '10px' }}>What stays</div>
              <p style={{ fontFamily: serif, fontSize: '11.5px', lineHeight: 1.72, color: 'var(--fg)', textAlign: 'justify', marginBottom: '14px' }}>
                The books that earn a permanent place are not the easiest to finish. They are the ones that left a sentence behind — something that surfaced weeks later in a code review, a retrospective, a late-night architecture discussion where the right framing suddenly mattered.
              </p>

              <div style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--sepia)', borderBottom: '0.5px solid rgba(14,14,12,0.2)', paddingBottom: '4px', marginBottom: '10px' }}>The system</div>
              <p style={{ fontFamily: serif, fontSize: '11.5px', lineHeight: 1.72, color: 'var(--fg)', textAlign: 'justify', marginBottom: '14px' }}>
                There is no colour-coding, no reading tracker, no Goodreads profile updated with military precision. The system is simpler: start, finish if it earns it, remember what matters. Dog-eared pages over highlights — a highlight is for someone else. The folded corner is a private agreement between reader and page.
              </p>

              <div style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--sepia)', borderBottom: '0.5px solid rgba(14,14,12,0.2)', paddingBottom: '4px', marginBottom: '10px' }}>What comes next</div>
              <p style={{ fontFamily: serif, fontSize: '11.5px', lineHeight: 1.72, color: 'var(--fg)', textAlign: 'justify' }}>
                Five are waiting. The to-read list is shorter than it has ever been — not because curiosity has narrowed, but because the bar has quietly raised itself. A book earns its place by being mentioned twice by people whose judgment has already proven expensive to ignore.
              </p>
            </div>
          </div>

        </div>

        {/* ══ RIGHT — tall library photo ══ */}
        <div
          className="br-photo-right"
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '100%',
          }}
        >
          <NpImage
            src="/pr-library-still.png"
            alt="The reading room"
            fill
            sizes="(max-width: 960px) 100vw, 40vw"
            quality={85}
            priority
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
          {/* Bottom caption overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(14,14,12,0.72))',
            padding: '40px 12px 14px',
          }}>
            <div style={{
              fontFamily: mono,
              fontSize: '7px',
              color: 'rgba(244,239,230,0.85)',
              textTransform: 'uppercase',
              letterSpacing: '.12em',
              lineHeight: 1.7,
            }}>
              The Reading<br />Room
            </div>
            <div style={{
              fontFamily: serif,
              fontSize: '8px',
              fontStyle: 'italic',
              color: 'rgba(244,239,230,0.6)',
              marginTop: '3px',
            }}>
              Chennai — 2024
            </div>
          </div>
        </div>

      </div>

      {/* ── Full-width: divider + 3-col book table ── */}
      <div style={{ padding: '0 32px 0' }}>

          {/* ── Section divider ── */}
          <div style={{
            borderTop: '2px solid var(--fg)',
            borderBottom: '1px solid var(--fg)',
            padding: '4px 0 3px',
            marginBottom: '18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
            <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700 }}>
              Consolidated Reading Record · All Titles
            </span>
            <span style={{ fontFamily: serif, fontSize: '9px', fontStyle: 'italic', color: 'var(--sepia)', letterSpacing: '.05em' }}>
              {readCount} finished &nbsp;·&nbsp; {readingCount} in progress &nbsp;·&nbsp; {willReadCount} to read
            </span>
          </div>

          {/* ── Book table — 3 col grid ── */}
          <div
            className="br-table-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '0 28px',
              paddingBottom: '24px',
              position: 'relative',
            }}
          >
            <BookTableCol books={leftCol}   hoveredId={hoveredId} onHover={setHoveredId} />
            <BookTableCol books={midCol}    hoveredId={hoveredId} onHover={setHoveredId} />
            <BookTableCol books={rightCol}  hoveredId={hoveredId} onHover={setHoveredId} />
          </div>

      </div>

      <SectionFiller
        watermark="READS"
        footnote={`The Career Beat · Books & Reading · Annual Review`}
        page="7"
        accent="var(--accent)"
      />
    </section>
  )
}
