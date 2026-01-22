import React, { useEffect } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper'
import Image from 'next/image'

export default function SingleLLSlider({
  images,
  nextUri,
  sliderLL,
  isSliderMounted,
  setIsSliderMounted,
}) {
  // Detect when slider is mounted
  useEffect(() => {
    if (sliderLL.current && sliderLL.current.swiper) {
      setIsSliderMounted(true) // Mark as mounted when slider is ready
    }
  }, [sliderLL.current])

  useEffect(() => {
    if (isSliderMounted) {
      sliderLL.current.swiper.update()
    }
  }, [images, nextUri, isSliderMounted])

  const menuIndex = images?.map((image, index) => {
    return index
  })

  return (
    <>
      <Swiper
        key={nextUri}
        ref={sliderLL}
        spaceBetween={30}
        effect={'fade'}
        loop={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.swiper-ll-custom-pagination',
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
        className="post-ll-swiper"
        style={{ display: images[0] ? 'block' : 'none' }}
      >
        {images?.map((image, index) => (
          <div key={index} className="post-swiper-slide">
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
      <div className="swiper-ll-custom-pagination"></div>
    </>
  )
}
