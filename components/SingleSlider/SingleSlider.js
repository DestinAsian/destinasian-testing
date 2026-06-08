import React, { useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper'
import Image from 'next/image'

export default function SingleSlider({ images = [] }) {
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
    <>
      <Swiper
        spaceBetween={30}
        effect="fade"
        loop={slides.length > 1}
        autoplay={{
          delay: 25000,
          disableOnInteraction: true,
        }}
        pagination={{
          el: '.swiper-post-custom-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return `<span key="${menuIndex[index]}" class="${className}"></span>`
          },
        }}
        navigation={{
          prevEl: '.swiper-custom-button-prev',
          nextEl: '.swiper-custom-button-next',
        }}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="post-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <figure className="post-swiper-slide">
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
            </figure>
          </SwiperSlide>
        ))}

        <div className="swiper-custom-button-prev">
          <svg
            version="1.0"
            xmlns="https://www.w3.org/2000/svg"
            width="512.000000pt"
            height="512.000000pt"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#FFFFFF"
              stroke="none"
            >
              <path d="M1387 5110 c-243 -62 -373 -329 -272 -560 27 -62 77 -114 989 -1027 l961 -963 -961 -963 c-912 -913 -962 -965 -989 -1027 -40 -91 -46 -200 -15 -289 39 -117 106 -191 220 -245 59 -28 74 -31 160 -30 74 0 108 5 155 23 58 22 106 70 1198 1160 1304 1302 1202 1185 1202 1371 0 186 102 69 -1202 1371 -1102 1101 -1140 1137 -1198 1159 -67 25 -189 34 -248 20z" />
            </g>
          </svg>
        </div>

        <div className="swiper-custom-button-next">
          <svg
            version="1.0"
            xmlns="https://www.w3.org/2000/svg"
            width="512.000000pt"
            height="512.000000pt"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#FFFFFF"
              stroke="none"
            >
              <path d="M1387 5110 c-243 -62 -373 -329 -272 -560 27 -62 77 -114 989 -1027 l961 -963 -961 -963 c-912 -913 -962 -965 -989 -1027 -40 -91 -46 -200 -15 -289 39 -117 106 -191 220 -245 59 -28 74 -31 160 -30 74 0 108 5 155 23 58 22 106 70 1198 1160 1304 1302 1202 1185 1202 1371 0 186 102 69 -1202 1371 -1102 1101 -1140 1137 -1198 1159 -67 25 -189 34 -248 20z" />
            </g>
          </svg>
        </div>
      </Swiper>

      <div className="swiper-post-custom-pagination"></div>
    </>
  )
}
