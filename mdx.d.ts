declare module '*.mdx' {
  import type { FC } from 'react'
  const MDXContent: FC
  export default MDXContent

  // content/skills.mdx
  export const skills: { name: string; level: string; dir: string }[]
  export const bars: { name: string; pct: number; trend: string }[]
  export const tickerItems: { name: string; level: string; dir: string }[]

  // content/career.mdx
  export const timeline: { date: string; title: string; org: string; body: string }[]
  export const numbers: { n: string; unit: string; label: string }[]

  // content/lab.mdx
  export const running: [string, string][]
  export const learning: string[]

  // content/photos.mdx
  export const spreads: { issue: string; title: string; subtitle: string; date: string; lead: string; color: string }[]

  // content/books.mdx
  export const currentlyReading: { title: string; author: string; pct: number; genre: string }[]
  export const recentlyRead: { title: string; author: string; rating: number; genre: string }[]
  export const genres: { name: string; pct: number; color: string }[]

  // content/travel.mdx
  export const countries: { name: string; region: string; year: string; stamp: string }[]

  // content/hobbies.mdx
  export const columns: { slug: string; body: string; note: string | null }[]
}
