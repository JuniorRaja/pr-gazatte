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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://prasannar.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The PR Gazette — Prasanna Rajendran',
    template: '%s — The PR Gazette',
  },
  description:
    'Seven years in FinTech. Project manager and engineer. Independent, opinionated, occasionally correct.',
  authors: [{ name: 'Prasanna Rajendran', url: SITE_URL }],
  keywords: [
    'Prasanna Rajendran',
    'Project Manager',
    'Software Engineer',
    'FinTech',
    'Chennai',
    'Next.js',
    'TypeScript',
    '.NET',
    'gRPC',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'The PR Gazette',
    title: 'The PR Gazette — Prasanna Rajendran',
    description:
      'Seven years in FinTech. Project manager and engineer. Independent, opinionated, occasionally correct.',
    images: [
      {
        url: '/pr-masthead-still-profes.webp',
        alt: 'Prasanna Rajendran — The PR Gazette',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The PR Gazette — Prasanna Rajendran',
    description:
      'Seven years in FinTech. Project manager and engineer. Independent, opinionated, occasionally correct.',
    images: ['/pr-masthead-still-profes.webp'],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

// Injects correct favicon set before first paint, then watches data-theme live.
// Uses document.createElement so the browser fetches the right variant from the start.
const themeScript = `(function(){
  function fav(t){
    var d=t==='ink'?'dark':'light',p='/favicon-'+d+'/';
    document.querySelectorAll('link[data-fav]').forEach(function(el){el.remove()});
    [{rel:'icon',type:'image/x-icon',href:p+'favicon.ico'},{rel:'icon',type:'image/png',sizes:'16x16',href:p+'favicon-16x16.png'},{rel:'icon',type:'image/png',sizes:'32x32',href:p+'favicon-32x32.png'},{rel:'apple-touch-icon',href:p+'apple-touch-icon.png'}].forEach(function(a){
      var el=document.createElement('link');
      el.setAttribute('data-fav','1');
      Object.keys(a).forEach(function(k){el.setAttribute(k,a[k])});
      document.head.appendChild(el);
    });
  }
  try{var t=localStorage.getItem('theme')||'newsprint';document.documentElement.setAttribute('data-theme',t);fav(t);}catch(e){}
  try{if(!localStorage.getItem('prg-intro'))document.documentElement.setAttribute('data-splash','')}catch(e){}
  new MutationObserver(function(ms){
    ms.forEach(function(m){if(m.attributeName==='data-theme')fav(document.documentElement.getAttribute('data-theme')||'newsprint')});
  }).observe(document.documentElement,{attributes:true});
})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="aged"
      suppressHydrationWarning
      className={`${bodoni.variable} ${sourceSerif.variable} ${barlow.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F4EFE6" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0E0E0C" />
      </head>
      <body>
        <div className="max-w-[1400px] mx-auto bg-[var(--bg)] text-[var(--fg)] border-t-4 border-t-[var(--fg)] min-h-screen md:border md:border-[var(--fg)] md:border-t-4">
          {children}
        </div>
      </body>
    </html>
  )
}
