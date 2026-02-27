import className from 'classnames/bind'
import { sanitizeHtml } from '@/lib/sanitizeHtml'
import styles from './LuxuryTravelDirectory.module.scss'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '@/constants/backendUrl'

let cx = className.bind(styles)

export default function LuxuryTravelDirectory({ content, parent, children, isAdvertorial }) {
  const [transformedContent, setTransformedContent] = useState('')

  if (!parent && !isAdvertorial) {
    return null
  }

  useEffect(() => {
    // Function to extract image data and replace <img> with <Image>
    const extractImageData = () => {
      // Create a DOMParser
      const parser = new DOMParser()

      // Parse the HTML content
      const doc = parser.parseFromString(content, 'text/html')

      // Get only image elements with src containing BACKEND_URL
      const imageElements = doc.querySelectorAll(`img[src*="${BACKEND_URL}"]`)

      // Replace <img> elements with <Image> components
      imageElements.forEach((img) => {
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        const width = img.getAttribute('width')
        const height = img.getAttribute('height')
        const normalizedWidth = width ? String(width) : '500'
        const normalizedHeight = height ? String(height) : '500'

        if (!src) return

        img.setAttribute('src', src)
        img.setAttribute('alt', alt || 'Image')
        img.setAttribute('width', normalizedWidth)
        img.setAttribute('height', normalizedHeight)
        img.setAttribute('loading', 'lazy')
        img.setAttribute('decoding', 'async')
        img.setAttribute('style', 'object-fit:contain;max-width:100%;height:auto;')
      })

      // Set the transformed HTML content
      setTransformedContent(doc.body.innerHTML)
    }

    // Call the function to extract image data and replace <img>
    extractImageData()
  }, [content])

  return (
    <article className={cx('component')}>
      <div
        className={cx('content-wrapper')}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(transformedContent ?? '') }}
      />
      {children}
    </article>
  )
}
