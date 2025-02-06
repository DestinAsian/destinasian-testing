import React, { useEffect, useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

// import required modules
import { EffectFade, Autoplay, Pagination } from 'swiper'
import Image from 'next/image'

export default function SingleRCASlider({
  images,
  swiperRef,
  setSwiperRef,
  handleSlideChange,
  setActiveIndex,
  nextUri,
  isSliderMounted,
  setIsSliderMounted,
}) {
  // Real Index updating
  const [realIndex, setRealIndex] = useState(0)

  // Detect when slider is mounted
  useEffect(() => {
    if (swiperRef?.current && swiperRef?.current.swiper) {
      setIsSliderMounted(true) // Mark as mounted when slider is ready
    }
  }, [swiperRef?.current])

  useEffect(() => {
    if (isSliderMounted) {
      swiperRef?.current.swiper.update()
    }
  }, [images, nextUri, isSliderMounted])

  // Pagination according to images length
  const menuIndex = images?.map((image, index) => {
    return index
  })

  return (
    <>
      <Swiper
        spaceBetween={30}
        ref={swiperRef}
        onSwiper={setSwiperRef}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect={'fade'}
        // loop={true}
        direction={'horizontal'}
        pagination={{
          clickable: true,
          el: '.swiper-rca-custom-pagination',
          renderBullet: function (index, className) {
            const mappedIndex = menuIndex[index % images.length]
            return `<span key="${mappedIndex}" class="${className}"></span>`
          },
        }}
        onSlideChange={(swiper) => {
          handleSlideChange && handleSlideChange(swiper.realIndex)
          setRealIndex(swiper.realIndex)
        }}
        modules={[EffectFade, Autoplay, Pagination]}
        className="post-rca-swiper"
        style={{ display: images[0] ? 'block' : 'none' }}
      >
        {images?.map((image, index) => (
          <div className="post-swiper-slide">
            {image && (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  alt="Slider Image"
                  fill
                  sizes="100%"
                  priority
                />
              </SwiperSlide>
            )}
          </div>
        ))}
      </Swiper>
      <div className="swiper-rca-custom-pagination"></div>
      {/* Access realIndex anywhere in your component */}
      {/* <div>{`Current Real Index: ${realIndex}`}</div> */}
    </>
  )
}
