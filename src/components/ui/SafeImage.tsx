import { useEffect, useMemo, useState } from 'react'

const FALLBACK_IMAGE = '/images/placeholder.png'

interface SafeImageProps {
  src?: string | null
  alt?: string
  className?: string
  style?: React.CSSProperties
}

function SafeImage({ src, alt = 'Image', className, style }: SafeImageProps) {
  const normalizedSrc = useMemo(() => {
    if (!src || typeof src !== 'string' || src.trim().length === 0) return FALLBACK_IMAGE
    return src
  }, [src])

  const [currentSrc, setCurrentSrc] = useState(normalizedSrc)

  useEffect(() => {
    setCurrentSrc(normalizedSrc)
  }, [normalizedSrc])

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      onError={() => {
        setCurrentSrc(FALLBACK_IMAGE)
      }}
    />
  )
}

export default SafeImage
