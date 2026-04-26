import type { Metadata } from 'next'
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The PR Gazette — Prasanna Rajendran',
  description:
    'Senior software engineer available for new opportunities. React, TypeScript, .NET, Azure.',
}

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="newsprint"
      className={`${playfair.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div style={{ maxWidth: '1400px', margin: '0 auto', background: 'var(--bg)', color: 'var(--fg)', border: '1px solid var(--fg)', borderTop: '4px solid var(--fg)', minHeight: '100vh' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
