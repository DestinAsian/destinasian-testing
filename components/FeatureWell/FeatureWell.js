import className from 'classnames/bind'
import styles from './FeatureWell.module.scss'
import React, { useRef, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { renderToStaticMarkup } from 'react-dom/server'
import Image from 'next/image'
import Link from 'next/link'
import { BACKEND_URL } from '../../constants/backendUrl'
import dynamic from 'next/dynamic'
// Import Components
const GallerySlider = dynamic(() =>
  import('@/components/GallerySlider/GallerySlider'),
)

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Div100vh from 'react-div-100vh'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

// import required modules
import { EffectFade, Autoplay, Pagination } from 'swiper'

let cx = className.bind(styles)

export default function FeatureWell({ featureWells, content }) {
  const isDesktop = useMediaQuery({ minWidth: 640 })
  const isMobile = useMediaQuery({ maxWidth: 639 })

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

  const captionRefs = useRef([])
  const [captionWidths, setCaptionWidths] = useState([])

  const updateCaptionWidths = () => {
    const widths = captionRefs.current.map((ref) => ref?.offsetWidth || 0)
    setCaptionWidths(widths)
    captionRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.setProperty('--caption-width', `${widths[index]}px`)
      }
    })
  }

  useEffect(() => {
    updateCaptionWidths()
    window.addEventListener('resize', updateCaptionWidths)
    return () => window.removeEventListener('resize', updateCaptionWidths)
  }, [])

  return (
    <>
      <Div100vh className="relative">
        {content !== null && (
          <div className={cx('content-wrapper')}>{transformedContent}</div>
        )}
        <Swiper
          onSlideChange={(swiper) => {
            // Get the current slide index from Swiper
            const currentSlideIndex = swiper.activeIndex
            const currentSlide = featureWells[currentSlideIndex]

            if (currentSlide.type === 'video') {
              const videoElement = document.getElementById(
                `video-${currentSlideIndex}`,
              )

              if (videoElement) {
                videoElement.currentTime = 0 // Start the video from the beginning
                videoElement.play() // Play the video
              }
            }
          }}
          effect={'fade'}
          autoplay={{
            delay: 15000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: '.swiper-custom-pagination',
            clickable: 'true',
            type: 'bullets',
            renderBullet: function (i, className) {
              return `
            <button class="${className}">
            <svg class= "progress">
            <circle class="circle-origin" cx="16" cy="16" r="10.5"></circle>
            </svg>
            <span></span>
            </button>
            `
            },
          }}
          modules={[EffectFade, Autoplay, Pagination]}
          className="fw-swiper-wrapper"
        >
          {featureWells?.map((featureWell, index) => (
            <SwiperSlide key={index}>
              {featureWell.type === 'image' && featureWell.url && (
                <Link href={featureWell.url}>
                  {isDesktop && (
                    <div className={cx('image-wrapper')}>
                      <Image
                        src={featureWell.desktopSrc}
                        alt="Feature Well Image"
                        fill
                        sizes="100%"
                        priority
                      />
                      <div className={cx('caption-wrapper')}>
                        {featureWell.category && featureWell.categoryLink && (
                          <div
                            style={{
                              '--caption-width': captionWidths[index]
                                ? `${captionWidths[index]}px`
                                : '100%',
                            }}
                            className={cx('category-wrapper')}
                          >
                            <Link href={featureWell.categoryLink}>
                              <h1 className={cx('category')}>
                                {featureWell.category}
                              </h1>
                            </Link>
                          </div>
                        )}
                        {featureWell.caption && (
                          <h1
                            ref={(el) => (captionRefs.current[index] = el)}
                            className={cx('caption')}
                          >
                            {featureWell.caption}
                          </h1>
                        )}
                        {featureWell.standFirst && (
                          <div
                            style={{
                              '--caption-width': captionWidths[index]
                                ? `${captionWidths[index]}px`
                                : '100%',
                            }}
                            className={cx('stand-first-wrapper')}
                          >
                            <h2 className={cx('stand-first')}>
                              {featureWell.standFirst}
                            </h2>
                          </div>
                        )}
                      </div>
                      <div className={cx('bottom-gradient')}></div>
                    </div>
                  )}
                  {isMobile && (
                    <div className={cx('image-wrapper')}>
                      <Image
                        src={featureWell.mobileSrc}
                        alt="Feature Well Image"
                        fill
                        sizes="100%"
                        priority
                      />
                      <div className={cx('caption-wrapper')}>
                        {featureWell.category && featureWell.categoryLink && (
                          <div
                            style={{
                              '--caption-width': captionWidths[index]
                                ? `${captionWidths[index]}px`
                                : '100%',
                            }}
                            className={cx('category-wrapper')}
                          >
                            <Link href={featureWell.categoryLink}>
                              <h1 className={cx('category')}>
                                {featureWell.category}
                              </h1>
                            </Link>
                          </div>
                        )}
                        {featureWell.caption && (
                          <h1
                            ref={(el) => (captionRefs.current[index] = el)}
                            className={cx('caption')}
                          >
                            {featureWell.caption}
                          </h1>
                        )}
                        {featureWell.standFirst && (
                          <div
                            style={{
                              '--caption-width': captionWidths[index]
                                ? `${captionWidths[index]}px`
                                : '100%',
                            }}
                            className={cx('stand-first-wrapper')}
                          >
                            <h2 className={cx('stand-first')}>
                              {featureWell.standFirst}
                            </h2>
                          </div>
                        )}
                      </div>
                      <div className={cx('bottom-gradient')}></div>
                    </div>
                  )}
                </Link>
              )}
              {featureWell.type === 'video' && featureWell.url && (
                <Link href={featureWell.url}>
                  <div className={cx('video-wrapper')}>
                    <video
                      id={`video-${index}`}
                      src={featureWell.videoSrc}
                      className="video-content"
                      loop
                      autoPlay
                      playsInline
                      muted
                    />

                    <div className={cx('caption-wrapper')}>
                      {featureWell.category && featureWell.categoryLink && (
                        <div
                          style={{
                            '--caption-width': captionWidths[index]
                              ? `${captionWidths[index]}px`
                              : '100%',
                          }}
                          className={cx('category-wrapper')}
                        >
                          <Link href={featureWell.categoryLink}>
                            <h1 className={cx('category')}>
                              {featureWell.category}
                            </h1>
                          </Link>
                        </div>
                      )}
                      {featureWell.caption && (
                        <h1
                          ref={(el) => (captionRefs.current[index] = el)}
                          className={cx('caption')}
                        >
                          {featureWell.caption}
                        </h1>
                      )}
                      {featureWell.standFirst && (
                        <div
                          style={{
                            '--caption-width': captionWidths[index]
                              ? `${captionWidths[index]}px`
                              : '100%',
                          }}
                          className={cx('stand-first-wrapper')}
                        >
                          <h2 className={cx('stand-first')}>
                            {featureWell.standFirst}
                          </h2>
                        </div>
                      )}
                    </div>
                    <div className={cx('bottom-gradient')}></div>
                  </div>
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-custom-pagination"></div>
      </Div100vh>
    </>
  )
}
