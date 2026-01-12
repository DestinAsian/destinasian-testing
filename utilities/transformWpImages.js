import { renderToStaticMarkup } from 'react-dom/server'
import Image from 'next/image'
import { BACKEND_URL } from '@/constants/backendUrl'

/**
 * Transform <img> tags coming from WordPress into Next.js <Image />
 * - SSR safe
 * - Fast bail-outs
 * - Only touches images from BACKEND_URL
 */
export function transformWpImages(html) {
  if (!html) return ''

  // SSR guard
  if (typeof window === 'undefined') {
    return html
  }

  // Fast exit if no backend images
  if (!html.includes(BACKEND_URL)) {
    return html
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const images = doc.querySelectorAll(`img[src*="${BACKEND_URL}"]`)
  if (!images.length) return html

  images.forEach((img) => {
    const src = img.getAttribute('src')
    if (!src) return

    const alt = img.getAttribute('alt') || ''
    const width = Number(img.getAttribute('width')) || 500
    const height = Number(img.getAttribute('height')) || 500

    const imageComponent = (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        style={{ objectFit: 'contain' }}
      />
    )

    img.outerHTML = renderToStaticMarkup(imageComponent)
  })

  return doc.body.innerHTML
}
