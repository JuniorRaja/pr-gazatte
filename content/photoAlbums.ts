import { albumThumbnail, photoUrl } from '@/utils/cdn'

export type PhotoVariant = 'thumb' | 'medium' | 'full'

export interface Album {
  slug: string
  title: string
  /** Word within the title to render in accent color */
  highlight: string
  description: string
  color: string
  /** Thumbnail extension for tnail_{slug}.{ext} */
  tnailExt: 'jpg' | 'jpeg'
  /** Ordered list of zero-padded sequence strings */
  sequences: string[]
}

function range(start: number, end: number): string[] {
  return Array.from({ length: end - start + 1 }, (_, i) =>
    String(start + i).padStart(3, '0')
  )
}

export const albums: Album[] = [
  {
    slug: 'doors',
    title: 'Knock Knock',
    highlight: 'Knock',
    description: 'Unique doors and windows from around the world.',
    color: '#8B2020',
    tnailExt: 'jpeg',
    sequences: range(1, 16),
  },
  {
    slug: 'macro',
    title: 'Too Close For Comfort',
    highlight: 'Close',
    description: 'Get closer to the world around you.',
    color: '#2a5a3b',
    tnailExt: 'jpeg',
    sequences: ['002', ...range(4, 15)],
  },
  {
    slug: 'minimal',
    title: 'Nothing To See Here',
    highlight: 'Nothing',
    description: 'Less is the new more.',
    color: '#1a3a5c',
    tnailExt: 'jpg',
    sequences: range(1, 7),
  },
  {
    slug: 'nature',
    title: 'Did Not Plant This',
    highlight: 'Plant',
    description: 'Indeed the most beautiful mother nature.',
    color: '#7a4a2a',
    tnailExt: 'jpg',
    sequences: range(1, 5),
  },
  {
    slug: 'patterns',
    title: 'Obsessive Tendencies',
    highlight: 'Obsessive',
    description: 'They are everywhere, just look around.',
    color: '#5a2a5a',
    tnailExt: 'jpg',
    sequences: ['001', '002'],
  },
]

/** Convenience: get the thumbnail URL for an album */
export function getAlbumThumbnail(album: Album): string {
  return albumThumbnail(album.slug, album.tnailExt)
}

/** Convenience: get a photo URL from an album by index */
export function getPhotoUrl(album: Album, index: number, variant: PhotoVariant): string {
  return photoUrl(album.slug, album.sequences[index], variant)
}
