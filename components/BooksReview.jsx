
const BooksReview = ({ tweaks }) => {
  const { showRules = true } = tweaks || {};

  const categories = [
    {
      label: 'Currently Reading',
      accent: '#C1272D',
      books: [
        { title: 'Sapiens', author: 'Harari', genre: 'History', pct: 62 },
        { title: '48 Laws of Power', author: 'Greene', genre: 'Strategy', pct: 38 },
        { title: 'Power of Your Subconscious Mind', author: 'Murphy', genre: 'Psychology', pct: 81 },
      ],
    },
    {
      label: 'Completed',
      accent: '#2a7a3b',
      books: [
        { title: 'Atomic Habits', author: 'Clear', genre: 'Productivity', pct: 100 },
        { title: 'The Alchemist', author: 'Coelho', genre: 'Fiction', pct: 100 },
        { title: 'Psychology of Money', author: 'Housel', genre: 'Finance', pct: 100 },
        { title: 'Courage to be Disliked', author: 'Kishimi', genre: 'Philosophy', pct: 100 },
        { title: 'How to Win Friends', author: 'Carnegie', genre: 'Social', pct: 100 },
        { title: 'Ikigai', author: 'García', genre: 'Philosophy', pct: 100 },
        { title: 'Richest Man in Babylon', author: 'Clason', genre: 'Finance', pct: 100 },
        { title: 'Eat That Frog', author: 'Tracy', genre: 'Productivity', pct: 100 },
      ],
    },
    {
      label: 'On Deck',
      accent: '#7a4a2a',
      books: [
        { title: '21 Lessons', author: 'Harari', genre: 'History', pct: 0 },
        { title: '5 AM Club', author: 'Sharma', genre: 'Lifestyle', pct: 0 },
        { title: 'Deep Work', author: 'Newport', genre: 'Productivity', pct: 0 },
        { title: 'Almanack of Naval', author: 'Ravikant', genre: 'Philosophy', pct: 0 },
        { title: 'Thinking Fast & Slow', author: 'Kahneman', genre: 'Psychology', pct: 0 },
      ],
    },
  ];

  // Genre tally for the donut-like breakdown
  const allBooks = categories.flatMap(c => c.books);
  const genreMap = {};
  allBooks.forEach(b => { genreMap[b.genre] = (genreMap[b.genre] || 0) + 1; });
  const genres = Object.entries(genreMap).sort((a, b) => b[1] - a[1]);
  const total = allBooks.length;

  // Simple stacked bar segments
  const genreColors = ['#C1272D','#2a7a3b','#1a3a5c','#7a4a2a','#8B6914','#5c1a5c','#2a5a5a','#555'];

  return (
    <section id="books" style={{ borderBottom: '2px solid var(--ink)' }}>
      <div style={{
        background: 'var(--red)', color: '#F4EFE6',
        padding: '5px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase' }}>Books Review · Page 7</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px' }}>THE READING LEDGER</span>
      </div>

      <div style={{ padding: '28px 32px' }}>
        {/* Masthead row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          borderBottom: '2px solid var(--ink)', paddingBottom: '12px', marginBottom: '24px',
        }}>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(26px, 3.5vw, 48px)',
            fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em',
            color: 'var(--ink)', margin: 0,
          }}>The Reading Ledger.</h2>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900, color: 'var(--ink)', lineHeight: 1 }}>{total}</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Titles on record</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '5fr 2fr', gap: '0', columnGap: 32 }}>
          {/* Left — reading lists as ledger */}
          <div>
            {categories.map((cat, ci) => (
              <div key={cat.label} style={{ marginBottom: ci < categories.length - 1 ? '28px' : 0 }}>
                {/* Category header */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  marginBottom: '10px',
                }}>
                  <div style={{ width: '10px', height: '10px', background: cat.accent, flexShrink: 0 }} />
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: '9px',
                    textTransform: 'uppercase', letterSpacing: '.15em', color: cat.accent,
                    flex: 1,
                  }}>{cat.label}</div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: '9px',
                    color: 'var(--sepia)',
                  }}>{cat.books.length} titles</div>
                </div>

                {/* Table */}
                <div style={{ border: '1px solid rgba(14,14,12,0.15)' }}>
                  {/* Header */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: '3fr 1.5fr 1fr 120px',
                    background: 'rgba(14,14,12,0.05)',
                    borderBottom: '1px solid rgba(14,14,12,0.15)',
                    padding: '5px 10px',
                  }}>
                    {['Title', 'Author', 'Genre', 'Progress'].map(h => (
                      <div key={h} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--sepia)' }}>{h}</div>
                    ))}
                  </div>
                  {/* Rows */}
                  {cat.books.map((book, bi) => (
                    <div key={book.title} style={{
                      display: 'grid', gridTemplateColumns: '3fr 1.5fr 1fr 120px',
                      borderBottom: bi < cat.books.length - 1 ? '1px solid rgba(14,14,12,0.08)' : 'none',
                      padding: '7px 10px',
                      alignItems: 'center',
                      background: bi % 2 === 0 ? 'transparent' : 'rgba(14,14,12,0.02)',
                    }}>
                      <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: '13px', color: 'var(--ink)', fontWeight: 600 }}>{book.title}</div>
                      <div style={{ fontFamily: '"Source Serif 4", serif', fontSize: '12px', color: 'var(--ink)', fontStyle: 'italic' }}>{book.author}</div>
                      <div style={{
                        fontFamily: '"JetBrains Mono", monospace', fontSize: '8px',
                        textTransform: 'uppercase', color: cat.accent,
                        letterSpacing: '.05em',
                      }}>{book.genre}</div>
                      {/* Progress bar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ flex: 1, height: '4px', background: 'rgba(14,14,12,0.1)', position: 'relative' }}>
                          <div style={{
                            position: 'absolute', left: 0, top: 0, height: '100%',
                            width: `${book.pct}%`,
                            background: book.pct === 100 ? cat.accent : book.pct === 0 ? 'rgba(14,14,12,0.15)' : cat.accent,
                            opacity: book.pct === 0 ? 0.3 : 1,
                          }} />
                        </div>
                        <div style={{
                          fontFamily: '"JetBrains Mono", monospace', fontSize: '9px',
                          color: book.pct === 100 ? cat.accent : 'var(--sepia)',
                          minWidth: '28px', textAlign: 'right',
                        }}>
                          {book.pct === 100 ? '✓' : book.pct === 0 ? '—' : `${book.pct}%`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right — genre breakdown */}
          <div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--red)',
              textTransform: 'uppercase', letterSpacing: '.15em',
              borderBottom: '1px solid var(--red)', paddingBottom: '4px', marginBottom: '16px',
            }}>By Genre</div>

            {/* Stacked bar */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              border: '1px solid rgba(14,14,12,0.15)',
              overflow: 'hidden',
              marginBottom: '16px',
            }}>
              {genres.map(([genre, count], gi) => {
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={genre} style={{
                    background: genreColors[gi % genreColors.length],
                    height: `${Math.max(24, pct * 3)}px`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 8px',
                    borderBottom: gi < genres.length - 1 ? '1px solid rgba(244,239,230,0.15)' : 'none',
                  }}>
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'rgba(244,239,230,0.9)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{genre}</span>
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'rgba(244,239,230,0.9)', fontWeight: 700 }}>{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Key stats */}
            {[
              { n: `${categories[1].books.length}`, label: 'Completed' },
              { n: `${categories[0].books.length}`, label: 'In progress' },
              { n: `${categories[2].books.length}`, label: 'Queued' },
              { n: 'Non-fiction', label: 'Dominant genre' },
            ].map(({ n, label }) => (
              <div key={label} style={{
                borderBottom: '1px solid rgba(14,14,12,0.1)',
                padding: '8px 0',
              }}>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 900, color: 'var(--ink)', lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Vintage advertisement */}
          <div style={{ marginTop: '20px' }}>
            <AdPrivateApps />
          </div>
        </div>
      </div>
      <SectionFiller watermark="READS" footnote="Books Review · p. 7 · 16 titles on record · Non-fiction weighted" page="7" accent="var(--red)" />
    </section>
  );
};
Object.assign(window, { BooksReview });
