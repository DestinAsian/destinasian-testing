import React, { useId, useMemo, useState } from 'react'
import className from 'classnames/bind'
import styles from './GallerySlider.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper'

let cx = className.bind(styles)

export default function GallerySlider({
  gallerySlider,
  slides = [],
  className,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const reactId = useId()

  const paginationClass = useMemo(() => {
    const safeId = reactId.replace(/[^a-zA-Z0-9_-]/g, '')
    return `gallery-slider-pagination-${safeId}`
  }, [reactId])

  const normalizedSlides = useMemo(() => {
    const normalizeArraySlides = (items) => {
      if (!Array.isArray(items)) return []

      return items
        .map((item) => {
          if (!item) return null

          // string
          if (typeof item === 'string') {
            return {
              src: item,
              alt: 'Image',
              width: 800,
              height: 600,
              caption: '',
            }
          }

          // array: [src, caption]
          if (Array.isArray(item)) {
            return {
              src: item[0] || '',
              alt: 'Image',
              width: 800,
              height: 600,
              caption: item[1] || '',
            }
          }

          // object
          if (typeof item === 'object') {
            return {
              src:
                item.src ||
                item.url ||
                item.sourceUrl ||
                item.mediaItemUrl ||
                '',
              alt: item.alt || item.altText || 'Image',
              width: Number(item.width) || 800,
              height: Number(item.height) || 600,
              caption:
                item.caption || item.figcaption || item.description || '',
            }
          }

          return null
        })
        .filter((item) => item?.src)
    }

    const normalizeGalleryNode = (galleryNode) => {
      if (!galleryNode) return []

      const imagesArray = []

      const extractImagesRecursively = (node) => {
        if (!node) return

        if (node.nodeType === 1 && node.tagName === 'IMG') {
          const figureParent = node.closest('figure.gallery-item')
          let caption = ''

          if (figureParent) {
            const figcaption = figureParent.querySelector('figcaption')
            caption = figcaption ? figcaption.innerHTML.trim() : ''
          }

          imagesArray.push({
            src: node.getAttribute('src') || '',
            alt: node.getAttribute('alt') || 'Image',
            width: Number(node.getAttribute('width')) || 800,
            height: Number(node.getAttribute('height')) || 600,
            caption,
          })
        } else {
          Array.from(node.childNodes || []).forEach(extractImagesRecursively)
        }
      }

      extractImagesRecursively(galleryNode)
      return imagesArray.filter((item) => item?.src)
    }

    // priority: slides prop first, fallback to parsed gallerySlider
    if (slides?.length) {
      return normalizeArraySlides(slides)
    }

    return normalizeGalleryNode(gallerySlider)
  }, [gallerySlider, slides])

  if (!normalizedSlides.length) return null

  return (
    <div className={cx('component', 'gallery-slider-wrapper')}>
      <div className={cx('swiper-slider', 'swiper-wrapper')}>
        <Swiper
          spaceBetween={30}
          effect="fade"
          autoHeight={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          loop={normalizedSlides.length > 1}
          pagination={{
            el: `.${paginationClass}`,
            clickable: true,
            type: 'bullets',
          }}
          modules={[EffectFade, Autoplay, Pagination, Navigation]}
          className="post-swiper"
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex)
          }}
        >
          {normalizedSlides.map((image, index) => (
            <SwiperSlide key={`${image.src}-${index}`}>
              <figure className={cx('slide-wrapper', className)}>
                <div className={cx('image-wrapper')}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 800px) 100vw, 800px"
                    priority={index === 0}
                    quality={100}
                    className={cx('slide-image')}
                  />
                </div>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>

        {normalizedSlides[activeIndex]?.caption && (
          <div className={cx('caption-wrapper', className)}>
            <div
              className={cx('caption')}
              dangerouslySetInnerHTML={{
                __html: normalizedSlides[activeIndex].caption,
              }}
            />
          </div>
        )}

        <div className={`swiper-post-custom-pagination ${paginationClass}`} />
      </div>

      <div className={cx('border-bottom')} />
    </div>
  )
}
