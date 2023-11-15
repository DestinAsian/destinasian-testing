import React, { useEffect, useState } from 'react'
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
  const [IsMaximized, setIsMaximized] = useState(false)

  // Maximized chevron when page load
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMaximized(true)
    }, 2000) // Change the timeframe (in milliseconds) as per your requirement

    return () => clearTimeout(timeout)
  }, [])

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
                        layout="fill"
                        alt="Feature Well Image"
                      />
                      <div className={cx('caption-wrapper')}>
                        {featureWell.caption}
                      </div>
                      <div className={cx('bottom-gradient')}></div>
                    </div>
                  )}
                  {isMobile && (
                    <div className={cx('image-wrapper')}>
                      <Image
                        src={featureWell.mobileSrc}
                        layout="fill"
                        alt="Feature Well Image"
                      />
                      <div className={cx('caption-wrapper')}>
                        {featureWell.caption}
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
                      {featureWell.caption}
                    </div>
                    <div className={cx('bottom-gradient')}></div>
                  </div>
                </a>
              )}
              {/* <div
                className={cx('chevron-wrapper', {
                  maximized: IsMaximized,
                })}
              >
                <a href="#snapStart">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="512.000000pt"
                    height="512.000000pt"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      fill="#ffffff"
                      stroke="none"
                    >
                      <path
                        d="M1387 5110 c-243 -62 -373 -329 -272 -560 27 -62 77 -114 989 -1027
    l961 -963 -961 -963 c-912 -913 -962 -965 -989 -1027 -40 -91 -46 -200 -15
    -289 39 -117 106 -191 220 -245 59 -28 74 -31 160 -30 74 0 108 5 155 23 58
    22 106 70 1198 1160 1304 1302 1202 1185 1202 1371 0 186 102 69 -1202 1371
    -1102 1101 -1140 1137 -1198 1159 -67 25 -189 34 -248 20z"
                      />
                    </g>
                  </svg>
                </a>
              </div> */}
            </SwiperSlide>
          ))}
        </Swiper>
        <div class="swiper-custom-pagination"></div>
      </Div100vh>
    </>
  )
}
