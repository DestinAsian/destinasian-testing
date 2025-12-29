import className from 'classnames/bind'
import styles from './ContentWrapperAdvertorial.module.scss'
import { useEffect, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Image from 'next/image'
import { BACKEND_URL } from '@/constants/backendUrl'
import dynamic from 'next/dynamic'
// Import Components
const GallerySlider = dynamic(() =>
  import('@/components/GallerySlider/GallerySlider'),
)

let cx = className.bind(styles)

export default function ContentWrapperAdvertorial({
  content,
  children,
  luxuryTravelClass,
}) {
  const [transformedContent, setTransformedContent] = useState('')

  useEffect(() => {
    const extractHTMLData = () => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, 'text/html')

      // Recursively extract all images and their captions
      const extractImagesRecursively = (node) => {
        if (
          typeof node === 'object' &&
          node.nodeType === 1 &&
          node.tagName === 'IMG' &&
          typeof node.getAttribute === 'function' &&
          node.getAttribute('src')?.includes(BACKEND_URL)
        ) {
          // Skip images inside .gallery-slider
          const insideGallerySlider = node.closest('.gallery')
          if (insideGallerySlider) return

          // Skip if img has inline styles
          const hasInlineStyle = node.hasAttribute('style')
          if (hasInlineStyle) return

          const src = node.getAttribute('src')
          const alt = node.getAttribute('alt') || 'Image'
          const width = node.getAttribute('width') || 800
          const height = node.getAttribute('height') || 600

          const imageComponent = (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              style={{ objectFit: 'contain' }}
              priority
            />
          )

          const imageHtmlString = renderToStaticMarkup(imageComponent)
          node.outerHTML = imageHtmlString
        } else {
          // Traverse child nodes
          node.childNodes?.forEach(extractImagesRecursively)
        }
      }

      // Process the content's root element to find all <img> nodes and replace them
      Array.from(doc.body.childNodes).forEach(extractImagesRecursively)

      // Handle Instagram blockquote
      const elements = Array.from(doc.body.childNodes).map((node, index) => {
        // Instagram Post Embed
        if (
          node?.nodeType === 1 &&
          node?.matches('blockquote[data-instgrm-permalink*="instagram.com"]')
        ) {
          const url = node?.getAttribute('data-instgrm-permalink')
          const captioned = node?.hasAttribute('data-instgrm-captioned')

          return (
            <div
              key={index}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <InstagramEmbed url={url} width={500} captioned={captioned} />
            </div>
          )
        }

        // Gallery Slider
        if (node?.nodeType === 1 && node?.matches('div.gallery')) {
          const gallerySlider = node

          return <GallerySlider gallerySlider={gallerySlider} />
        }

        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: node.outerHTML }}
          />
        )
      })

      setTransformedContent(elements)
    }

    extractHTMLData()
  }, [content])

  return (
    <article
      className={cx(
        className,
        luxuryTravelClass === 'luxuryTravelClass'
          ? 'luxuryTravelClass'
          : 'component',
      )}
    >
      <div
        className={cx(
          luxuryTravelClass === 'luxuryTravelClassContent'
            ? 'luxuryTravelClassContent'
            : 'content-wrapper',
        )}
      >
        {transformedContent}
      </div>
      {children}
    </article>
  )
}
