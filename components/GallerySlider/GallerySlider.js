import React, { useState, useEffect } from 'react'
import className from 'classnames/bind'
import styles from './GallerySlider.module.scss'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper'

let cx = className.bind(styles)

export default function GallerySlider({ gallerySlider, className }) {
  const [images, setImages] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  // Generate CSS-safe unique ID only on client to avoid SSR mismatch
  const [uniqueId, setUniqueId] = useState(null)
  React.useEffect(() => {
    setUniqueId(`gallery-slider-${Math.random().toString(36).substring(2, 9)}`)
  }, [])
  useEffect(() => {
    if (!gallerySlider) return

    const processGalleryImages = (galleryNode) => {
      let imagesArray = []

      // Recursively extract all images and their captions
      const extractImagesRecursively = (node) => {
        if (node.nodeType === 1 && node.tagName === 'IMG') {
          // Find the closest figure.gallery-item parent
          const figureParent = node.closest('figure.gallery-item')
          let caption = ''

          if (figureParent) {
            const figcaption = figureParent.querySelector('figcaption')
            caption = figcaption ? figcaption.innerText.trim() : ''
          }

          imagesArray.push({
            src: node.getAttribute('src'),
            alt: node.getAttribute('alt') || 'Image',
            width: node.getAttribute('width') || 800,
            height: node.getAttribute('height') || 600,
            caption, // Store the figcaption text
          })
        } else {
          // Traverse child nodes
          Array.from(node.childNodes).forEach(extractImagesRecursively)
        }
      }

      extractImagesRecursively(galleryNode)
      return imagesArray
    }

    setImages(processGalleryImages(gallerySlider))
  }, [gallerySlider])

  return (
    // <div className={cx('component')}>
    <div className={cx('component', 'gallery-slider-wrapper')}>
      <div className={cx('swiper-slider', 'swiper-wrapper')}>
        <Swiper
          spaceBetween={30}
          effect={'fade'}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          loop={true}
          pagination={
            uniqueId
              ? {
                  el: `.${uniqueId}-pagination`,
                  clickable: true,
                  type: 'bullets',
                }
              : undefined
          }
          modules={[EffectFade, Autoplay, Pagination, Navigation]}
          className="post-swiper"
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex)
            const currentSlide = images[swiper.realIndex]

            if (currentSlide) {
              const imgElement = document.getElementById(
                `image-${swiper.realIndex}`,
              )
              if (imgElement) {
                imgElement.classList.add('fade-in')
                setTimeout(() => {
                  imgElement.classList.remove('fade-in')
                }, 500) // match CSS animation
              }
            }
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className={cx('slide-wrapper', className)}>
                <div className={cx('image-wrapper')}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="100%"
                    priority
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={`swiper-post-custom-pagination ${uniqueId ? `${uniqueId}-pagination` : ''}`}
        ></div>
        {/* Caption absolutely positioned relative to Swiper */}
        {images[activeIndex]?.caption && (
          <div className={cx('caption-wrapper', className)}>
            <div
              className={cx('caption')}
              dangerouslySetInnerHTML={{
                __html: images[activeIndex].caption,
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
