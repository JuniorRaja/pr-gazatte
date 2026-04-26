import Image, { type ImageProps } from 'next/image'

type NpImageProps = Omit<ImageProps, 'className'> & { className?: string }

export default function NpImage({ className = '', style, ...props }: NpImageProps) {
  return (
    <Image
      className={`np-filter ${className}`.trim()}
      style={{ objectFit: 'cover', ...style }}
      {...props}
    />
  )
}
