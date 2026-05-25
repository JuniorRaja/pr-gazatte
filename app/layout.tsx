import type { Metadata } from 'next'
import { Bodoni_Moda, Source_Serif_4, Barlow_Condensed, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-condensed',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
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
      suppressHydrationWarning
      className={`${bodoni.variable} ${sourceSerif.variable} ${barlow.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="max-w-[1400px] mx-auto bg-[var(--bg)] text-[var(--fg)] border-t-4 border-t-[var(--fg)] min-h-screen md:border md:border-[var(--fg)] md:border-t-4">
          {children}
        </div>
      </body>
    </html>
  )
}
