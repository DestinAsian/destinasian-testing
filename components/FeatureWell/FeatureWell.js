import React from 'react'
import className from 'classnames/bind'
import styles from './FeatureWell.module.scss'
import { useMediaQuery } from 'react-responsive'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Div100vh from 'react-div-100vh'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

// import required modules
import { EffectFade, Autoplay, Pagination } from 'swiper'
import Image from 'next/image'

let cx = className.bind(styles)

export default function FeatureWell({ featureWells }) {
  const isDesktop = useMediaQuery({ minWidth: 640 })
  const isMobile = useMediaQuery({ maxWidth: 639 })

  return (
    <>
      <Div100vh>
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
              {featureWell.type === 'image' && (
                <a href={featureWell.url}>
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
                        {featureWell.category && (
                          <div className={cx('category-wrapper')}>
                            <a href={featureWell.categoryLink}>
                              <h1 className={cx('category')}>
                                {featureWell.category}
                              </h1>
                            </a>
                          </div>
                        )}
                        <h1 className={cx('caption')}>{featureWell.caption}</h1>
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
                        {featureWell.category && (
                          <div className={cx('category-wrapper')}>
                            <a href={featureWell.categoryLink}>
                              <h1 className={cx('category')}>
                                {featureWell.category}
                              </h1>
                            </a>
                          </div>
                        )}
                        <h1 className={cx('caption')}>{featureWell.caption}</h1>
                      </div>
                      <div className={cx('bottom-gradient')}></div>
                    </div>
                  )}
                </a>
              )}
              {featureWell.type === 'video' && (
                <a href={featureWell.url}>
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
                      {featureWell.category && (
                        <div className={cx('category-wrapper')}>
                          <a href={featureWell.categoryLink}>
                            <h1 className={cx('category')}>
                              {featureWell.category}
                            </h1>
                          </a>
                        </div>
                      )}
                      <h1 className={cx('caption')}>{featureWell.caption}</h1>
                    </div>
                    <div className={cx('bottom-gradient')}></div>
                  </div>
                </a>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <div class="swiper-custom-pagination"></div>
      </Div100vh>
    </>
  )
}
