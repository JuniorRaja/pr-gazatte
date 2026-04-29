import SectionFiller from '@/components/SectionFiller'
import { AdPrivateApps } from '@/components/VintageAds'
import { currentlyReading, recentlyRead, genres } from '@/content/books.mdx'

export default function BooksReview() {
  return (
    <section id="books" style={{ borderBottom: '2px solid var(--fg)' }}>
      <div style={{ background: 'var(--fg)', color: 'var(--bg)', padding: '5px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Books Review · Page 7</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>THE READING LEDGER</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 2fr', columnGap: 0 }}>
        {/* Left — Currently Reading */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '28px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 900, lineHeight: 1.0, color: 'var(--fg)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
              The<br />Reading<br />List.
            </h2>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--sepia)', lineHeight: 1.6 }}>
              Books currently<br />in progress.
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(14,14,12,0.15)', paddingTop: '16px' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '14px' }}>Currently Reading</div>
            {currentlyReading.map(book => (
              <div key={book.title} style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '13px', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2, marginBottom: '2px' }}>{book.title}</div>
                <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: '11px', fontStyle: 'italic', color: 'var(--sepia)', marginBottom: '6px' }}>{book.author}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '3px', background: 'rgba(14,14,12,0.12)', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${book.pct}%`, background: 'var(--fg)' }} />
                  </div>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--sepia)', minWidth: '32px' }}>{book.pct}%</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto' }}><AdPrivateApps /></div>
        </div>

        {/* Centre — Recently Read */}
        <div style={{ borderRight: '1px solid rgba(14,14,12,0.2)', padding: '28px 32px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '20px' }}>
            Completed — Last 12 Months
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1px', background: 'rgba(14,14,12,0.15)', border: '1px solid rgba(14,14,12,0.15)', marginBottom: '20px' }}>
            {['Title', 'Author', 'Genre', 'Rating'].map(h => (
              <div key={h} style={{ background: 'var(--fg)', color: 'var(--bg)', fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '.1em', textTransform: 'uppercase', padding: '6px 10px' }}>{h}</div>
            ))}
            {recentlyRead.map(book => (
              <div key={book.title} style={{ contents: 'contents' }}>
                <div style={{ background: 'var(--bg)', padding: '8px 10px', fontFamily: '"Playfair Display", serif', fontSize: '12px', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.3 }}>{book.title}</div>
                <div style={{ background: 'var(--bg)', padding: '8px 10px', fontFamily: '"Source Serif 4", serif', fontSize: '11px', fontStyle: 'italic', color: 'var(--sepia)', display: 'flex', alignItems: 'center' }}>{book.author}</div>
                <div style={{ background: 'var(--bg)', padding: '8px 10px', fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.08em', display: 'flex', alignItems: 'center' }}>{book.genre}</div>
                <div style={{ background: 'var(--bg)', padding: '8px 10px', fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#c7a830', display: 'flex', alignItems: 'center' }}>{'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13.5px', lineHeight: 1.68, color: 'var(--fg)', margin: 0 }}>
            Engineering texts as a baseline, history for perspective, leadership for the present reality. The bookshelf is a working document — revised quarterly.
          </p>
        </div>

        {/* Right — Genre Breakdown */}
        <div style={{ padding: '28px 28px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.15em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>Genre Breakdown</div>

          {genres.map(({ name, pct, color }) => (
            <div key={name} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--fg)', fontWeight: 700 }}>{name}</span>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--sepia)' }}>{pct}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(14,14,12,0.1)', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: color }} />
              </div>
            </div>
          ))}

          <div style={{ marginTop: '24px', border: '1px solid rgba(14,14,12,0.2)', padding: '14px', background: 'rgba(184,167,146,0.08)' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '10px' }}>Bookshelf Stats</div>
            {[['Books read / year', '~18'], ['Avg rating given', '4.4 ★'], ['Formats', 'Physical + Kindle'], ['Notes', 'Obsidian vault']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted rgba(14,14,12,0.15)', padding: '5px 0' }}>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--sepia)' }}>{k}</span>
                <span style={{ fontFamily: '"Source Serif 4", serif', fontSize: '11px', color: 'var(--fg)', fontStyle: 'italic' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SectionFiller watermark="BOOKS" footnote="Books Review · p. 7 · Reading ledger · ~18 books per year" page="7" />
    </section>
  )
}
