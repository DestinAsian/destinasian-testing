import className from 'classnames/bind'
import styles from './FeatureWell.module.scss'
import React, { useRef, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import Link from 'next/link'

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
  const validFeatureWells =
    featureWells?.filter(
      (featureWell) =>
        featureWell?.url &&
        (featureWell?.type === 'image' || featureWell?.type === 'video'),
    ) ?? []
  const hasMultipleSlides = validFeatureWells.length >= 2

  const [transformedContent, setTransformedContent] = useState('')

  useEffect(() => {
    const extractHTMLData = () => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, 'text/html')

      // Handle Instagram blockquote
      const elements = Array.from(doc.body.childNodes).map((node, index) => {
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
        {validFeatureWells.length > 0 && (
          <Swiper
            onSlideChange={(swiper) => {
              // Get the current slide index from Swiper
              const currentSlideIndex = swiper.activeIndex
              const currentSlide = validFeatureWells[currentSlideIndex]

              if (currentSlide?.type === 'video') {
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
            autoplay={
              hasMultipleSlides
                ? {
                    delay: 15000,
                    disableOnInteraction: false,
                  }
                : false
            }
            pagination={
              hasMultipleSlides
                ? {
                    el: '.swiper-custom-pagination',
                    clickable: true,
                    type: 'bullets',
                    renderBullet: function (i, className) {
                      return `
                    <button class="${className}">
                    <svg class="progress">
                    <circle class="circle-origin" cx="16" cy="16" r="10.5"></circle>
                    </svg>
                    <span></span>
                    </button>
                    `
                    },
                  }
                : false
            }
            modules={[EffectFade, Autoplay, Pagination]}
            className="fw-swiper-wrapper"
          >
            {validFeatureWells.map((featureWell, index) => (
              <SwiperSlide key={index}>
                {featureWell.type === 'image' && featureWell.url && (
                  <>
                    {isDesktop && (
                      <div className={cx('image-wrapper')}>
                        <Link href={featureWell.url}>
                          <div className={cx('image')}>
                            <Image
                              src={featureWell.desktopSrc}
                              alt="Feature Well Image"
                              fill
                              sizes="100%"
                              priority
                              quality={100}
                            />
                          </div>
                        </Link>
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
                              <Link href={featureWell.url}>
                                {featureWell.caption}
                              </Link>
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
                              <Link href={featureWell.url}>
                                <h2 className={cx('stand-first')}>
                                  {featureWell.standFirst}
                                </h2>
                              </Link>
                            </div>
                          )}
                        </div>
                        <div className={cx('bottom-gradient')}></div>
                      </div>
                    )}
                    {isMobile && (
                      <div className={cx('image-wrapper')}>
                        <Link href={featureWell.url}>
                          <div className={cx('image')}>
                            <Image
                              src={featureWell.mobileSrc}
                              alt="Feature Well Image"
                              fill
                              sizes="100%"
                              priority
                              quality={100}
                            />
                          </div>
                        </Link>
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
                              <Link href={featureWell.url}>
                                {featureWell.caption}
                              </Link>
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
                              <Link href={featureWell.url}>
                                <h2 className={cx('stand-first')}>
                                  {featureWell.standFirst}
                                </h2>
                              </Link>
                            </div>
                          )}
                        </div>
                        <div className={cx('bottom-gradient')}></div>
                      </div>
                    )}
                  </>
                )}
                {featureWell.type === 'video' && featureWell.url && (
                  <>
                    <div className={cx('video-wrapper')}>
                      <Link href={featureWell.url}>
                        <video
                          id={`video-${index}`}
                          src={featureWell.videoSrc}
                          className="video-content"
                          loop
                          autoPlay
                          playsInline
                          muted
                        />
                      </Link>
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
                            <Link href={featureWell.url}>
                              {featureWell.caption}
                            </Link>
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
                            <Link href={featureWell.url}>
                              <h2 className={cx('stand-first')}>
                                {featureWell.standFirst}
                              </h2>
                            </Link>
                          </div>
                        )}
                      </div>
                      <div className={cx('bottom-gradient')}></div>
                    </div>
                  </>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {hasMultipleSlides && <div className="swiper-custom-pagination"></div>}
      </Div100vh>
    </>
  )
}
