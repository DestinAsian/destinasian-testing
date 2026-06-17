import React, { useState, useEffect, useId, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import className from 'classnames/bind'
import styles from './SingleSlider.module.scss'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper'
import Image from 'next/image'

let cx = className.bind(styles)

export default function SingleSlider({ images = [], customClassName }) {
  const reactId = useId()

  const paginationClass = useMemo(() => {
    const safeId = reactId.replace(/[^a-zA-Z0-9_-]/g, '')
    return `gallery-slider-pagination-${safeId}`
  }, [reactId])

  const slides = useMemo(() => {
    if (!Array.isArray(images)) return []

    return images
      .map((item) => {
        // Case 1: item is an array like [src, caption]
        if (Array.isArray(item)) {
          return {
            src: item[0] || null,
            caption: item[1] || null,
          }
        }

        // Case 2: item is a string like '/image.jpg' or 'https://...'
        if (typeof item === 'string') {
          return {
            src: item,
            caption: null,
          }
        }

        // Case 3: item is an object like { src, caption }
        if (item && typeof item === 'object') {
          return {
            src:
              item.src ||
              item.url ||
              item.sourceUrl ||
              item.mediaItemUrl ||
              null,
            caption: item.caption || item.alt || item.description || null,
          }
        }

        return null
      })
      .filter((slide) => slide?.src)
  }, [images])

  const menuIndex = slides.map((_, index) => index)

  if (!slides.length) return null

  return (
    <div className={cx('component', 'gallery-slider-wrapper', customClassName)}>
      <div className={cx('swiper-slider', 'swiper-wrapper')}>
        <Swiper
          spaceBetween={30}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          loop={true}
          pagination={{
            el: `.${paginationClass}`,
            clickable: true,
            type: 'bullets',
          }}
          modules={[EffectFade, Autoplay, Pagination, Navigation]}
          className="post-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className={cx('slide-wrapper', customClassName)}>
                <div className={cx('image-wrapper')}>
                  <Image
                    src={slide.src}
                    alt={slide.caption || `Slider Image ${index + 1}`}
                    fill
                    sizes="100%"
                    priority
                    quality={100}
                  />
                  {slide.caption && (
                    <figcaption className="slide-caption">
                      {slide.caption}
                    </figcaption>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={`swiper-post-custom-pagination ${paginationClass}`} />
      </div>
      <div className={cx('border-bottom')} />
    </div>
  )
}
