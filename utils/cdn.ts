export const CDN_BASE = 'https://cdn.jsdelivr.net/gh/JuniorRaja/static@master'

export type PhotoVariant = 'thumb' | 'medium' | 'full'

/**
 * Returns the CDN URL for a specific photo variant.
 * @param album  Album slug (e.g. 'doors')
 * @param seq    Zero-padded sequence string (e.g. '001')
 * @param variant Image size variant
 */
export function photoUrl(album: string, seq: string, variant: PhotoVariant): string {
  return `${CDN_BASE}/images/generated/${album}/${seq}/${variant}.webp`
}

/**
 * Returns the CDN URL for an album thumbnail.
 * @param slug  Album slug (e.g. 'doors')
 * @param ext   File extension ('jpg' or 'jpeg')
 */
export function albumThumbnail(slug: string, ext: 'jpg' | 'jpeg' = 'jpg'): string {
  return `${CDN_BASE}/assets/albums/tnail_${slug}.${ext}`
}
