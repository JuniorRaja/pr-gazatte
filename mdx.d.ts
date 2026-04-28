declare module '*.mdx' {
  import type { FC } from 'react'
  const MDXContent: FC
  export default MDXContent

  // content/skills.mdx
  export const stocks: {
    sym: string; name: string; sector: string; ltp: number; chg: number;
    pctChg: number; vol: string; hi52: number; lo52: number; level: string;
  }[]
  export const indices: {
    name: string; value: number; chg: number; sparkline: number[];
  }[]

  // content/career.mdx
  export const timeline: { date: string; title: string; org: string; body: string }[]
  export const numbers: { n: string; unit: string; label: string }[]

  // content/lab.mdx
  export const running: [string, string][]
  export const learning: string[]
  export const projects: {
    name: string; status: string; statusColor: string; subtitle: string;
    body: string; tags: string[]; links: { label: string; href: string }[];
    footnote?: string;
  }[]
  export const services: { name: string; desc: string; url: string }[]
  export const stack: [string, string][]

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
