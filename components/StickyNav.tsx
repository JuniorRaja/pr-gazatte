import ThemeToggle from '@/components/ThemeToggle'
import MobileNav from '@/components/MobileNav'

const navItems = ['Op-Ed', 'Tech', 'Career', 'Lab', 'Photos', 'Books', 'Travel', 'Hobbies', 'Contact']

export default function StickyNav() {
  return (
    <div
      className="section-padding-x"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--fg)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '6px',
        paddingBottom: '6px',
        fontSize: 'clamp(9px, 2vw, 10px)',
        fontFamily: '"Barlow Condensed", sans-serif',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--fg)',
      }}
    >
      <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 'clamp(9px, 2vw, 10px)' }}>★ FIRST EDITION</span>
      <nav className="hidden md:flex" style={{ gap: '20px' }}>
        {navItems.map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{ textDecoration: 'none', color: 'var(--fg)' }}>
            {item}
          </a>
        ))}
      </nav>
      <span className="hidden md:flex"><ThemeToggle /></span>
      <span className="md:hidden"><MobileNav /></span>
    </div>
  )
}
