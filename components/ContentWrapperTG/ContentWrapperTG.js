import className from 'classnames/bind'
import styles from './ContentWrapperTG.module.scss'
import { GetTravelGuidePagination } from '../../queries/GetTravelGuidePagination'
import { useQuery } from '@apollo/client'
import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
} from 'react'
import { useMediaQuery } from 'react-responsive'
import { renderToStaticMarkup } from 'react-dom/server'
import Image from 'next/image'
import Link from 'next/link'
import { BACKEND_URL } from '../../constants/backendUrl'
import dynamic from 'next/dynamic'
// Import Components
const SingleTGSlider = dynamic(() =>
  import('@/components/SingleTGSlider/SingleTGSlider'),
)
const SingleTGEntryHeader = dynamic(() =>
  import('@/components/SingleTGEntryHeader/SingleTGEntryHeader'),
)
const FeaturedImage = dynamic(() =>
  import('@/components/FeaturedImage/FeaturedImage'),
)

let cx = className.bind(styles)

export default function ContentWrapperTG({
  title,
  category,
  content,
  images,
  mainLogo,
  databaseId,
  guidesTitle,
  guidesUri,
  isTGNavShown,
  setIsTGNavShown,
  sliderTG,
}) {
  const batchSize = 30
  const [transformedContent, setTransformedContent] = useState('')
  const [isSliderMounted, setIsSliderMounted] = useState(false) // Track slider mount status

  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    if (isSharing) return // prevent double-clicks

    setIsSharing(true)
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (err) {
      alert('Sharing was canceled.')
    } finally {
      // allow another share after it completes (even if canceled)
      setIsSharing(false)
    }
  }

  const isMobile = useMediaQuery({ maxWidth: 1023 })

  const { data, loading, error } = useQuery(GetTravelGuidePagination, {
    variables: { first: batchSize, after: null, id: databaseId },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
  })

  const travelGuideBy = data?.travelGuideBy
  const parent = travelGuideBy?.parent
  const children = travelGuideBy?.children

  const travelGuideAll = useMemo(() => {
    if (loading || !travelGuideBy) return null

    if (parent && children?.edges?.length === 0) {
      return [
        parent.node,
        ...(parent.node.children?.edges?.map((post) => post.node) || []),
      ]
    }

    if (parent && children?.edges?.length !== 0) {
      return [
        travelGuideBy,
        ...(children.edges?.map((post) => post.node) || []),
      ]
    }

    return null
  }, [loading, travelGuideBy])

  const indexOfTravelGuide = travelGuideBy?.menuOrder ?? 0
  const numberOfTravelGuides = travelGuideAll?.length
  const prevIndex = indexOfTravelGuide - 1
  const nextIndex = indexOfTravelGuide + 1

  // Loop nextUri to the first index when reaching the last index
  const prevUri = prevIndex >= 0 ? travelGuideAll?.[prevIndex]?.uri : null
  const nextUri =
    nextIndex < numberOfTravelGuides
      ? travelGuideAll?.[nextIndex]?.uri
      : travelGuideAll?.[0]?.uri // Loop back to the first URI

  useEffect(() => {
    const extractImageData = () => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, 'text/html')
      const imageElements = doc.querySelectorAll(`img[src*="${BACKEND_URL}"]`)

      imageElements.forEach((img) => {
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        const width = img.getAttribute('width')
        const height = img.getAttribute('height')

        const imageComponent = (
          <Image
            src={src}
            alt={alt}
            width={width ? width : '500'}
            height={height ? height : '500'}
            style={{ objectFit: 'contain' }}
            priority
          />
        )

        const imageHtmlString = renderToStaticMarkup(imageComponent)
        img.outerHTML = imageHtmlString
      })

      setTransformedContent(doc.body.innerHTML)
    }

    extractImageData()
  }, [content, isSliderMounted])

  const [sliderHeight, setSliderHeight] = useState(0)
  const [sliderWidth, setSliderWidth] = useState(0)
  const sliderRef = useRef(null)

  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect

  // Measure slider width & height reliably and watch for changes
  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const getDimensions = () => {
      let h = 0
      let w = 0

      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect()
        h = rect.height || 0
        w = rect.width || 0
      }

      if ((!h || !w) && sliderTG?.current?.swiper?.el) {
        const el = sliderTG.current.swiper.el
        const rect = el.getBoundingClientRect()
        h = rect.height || 0
        w = rect.width || 0
      }

      setSliderHeight(Math.round(h))
      setSliderWidth(Math.round(w))
    }

    getDimensions()

    let ro
    const target = sliderRef.current ?? sliderTG?.current?.swiper?.el ?? null

    if (target && typeof window.ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(getDimensions)
      ro.observe(target)
    } else {
      const handleResize = () => getDimensions()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }

    return () => {
      if (ro) ro.disconnect()
    }
  }, [isSliderMounted, images && images.length])

  if (loading) {
    return null
  }

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  return (
    <article className={cx('component')}>
      <div className={cx('with-slider-wrapper')}>
        {images[0] != null && (
          <div ref={sliderRef} className={cx('slider-wrapper')}>
            <SingleTGSlider
              images={images}
              nextUri={nextUri}
              sliderTG={sliderTG}
              isSliderMounted={isSliderMounted}
              setIsSliderMounted={setIsSliderMounted}
            />
          </div>
        )}
        {images[0] == null && (
          <div ref={sliderRef} className={cx('slider-wrapper')}></div>
        )}
        {/* Wrap header so style actually affects the DOM */}
        <div
          style={{
            marginTop: isMobile ? `${sliderHeight}px` : '',
            marginLeft: !isMobile ? `${sliderWidth}px` : '',
          }}
        >
          <SingleTGEntryHeader
            title={title}
            category={category}
            guidesTitle={guidesTitle}
            guidesUri={guidesUri}
            responsive={'mobile'}
          />
        </div>
        <div
          style={{
            marginLeft: !isMobile ? `${sliderWidth}px` : '',
          }}
          className={cx('content-wrapper')}
          dangerouslySetInnerHTML={{ __html: transformedContent ?? '' }}
        />
        <div
          style={{
            marginLeft: !isMobile ? `${sliderWidth}px` : '',
            width: !isMobile ? `calc( 100vw - ${sliderWidth}px)` : '',
          }}
          className={cx('navigation-wrapper')}
        >
          <div className={cx('navigation-button')}>
            {prevUri && (
              <Link href={prevUri} className={cx('prev-button')}>
                <svg
                  width="60"
                  height="90"
                  viewBox="0 0 60 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M52 8L15 45L52 82" stroke="none" stroke-width="20" />
                </svg>
              </Link>
            )}
          </div>
          <div className={cx('share-button-wrapper')}>
            <div className={cx('image-wrapper')}>
              <div className={cx('menu-button')}>
                <button
                  type="button"
                  className={cx('share-icon')}
                  onClick={handleShare}
                  disabled={isSharing}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={cx('menu-center-wrapper')}>
            {!isTGNavShown ? (
              <div className={cx('image-wrapper')}>
                {/* Menu Button */}
                {isTGNavShown == false ? (
                  <div className={cx('menu-button')}>
                    {/* menu button */}
                    <button
                      type="button"
                      className={cx('menu-icon')}
                      onClick={() => {
                        setIsTGNavShown(!isTGNavShown) // Toggles navigation visibility
                        // if (isAutoplayRunning) {
                        //   return toggleAutoplay() // Calls the toggleAutoplay function
                        // }
                      }}
                      aria-controls={cx('full-menu-wrapper')}
                      aria-expanded={!isTGNavShown}
                    >
                      {mainLogo && (
                        <FeaturedImage
                          image={mainLogo}
                          className={cx('image')}
                          priority
                        />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className={cx('menu-button')}>
                    {/* close button */}
                    <button
                      type="button"
                      className={cx('close-icon')}
                      onClick={() => {
                        setIsTGNavShown(!isTGNavShown)
                      }}
                      aria-controls={cx('full-menu-wrapper')}
                      aria-expanded={!isTGNavShown}
                    >
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
                          fill="#000000"
                          stroke="none"
                        >
                          <path
                            d="M2330 5109 c-305 -29 -646 -126 -910 -259 -273 -138 -559 -356 -755
-576 -384 -432 -602 -931 -655 -1499 -41 -446 55 -949 260 -1355 138 -273 356
-559 576 -755 432 -384 931 -602 1499 -655 446 -41 949 55 1355 260 273 138
559 356 755 576 384 432 602 931 655 1499 41 446 -55 949 -260 1355 -138 273
-356 559 -576 755 -432 384 -931 602 -1499 655 -125 11 -320 11 -445 -1z
m-193 -1701 l423 -423 425 425 425 425 212 -213 213 -212 -425 -425 -425 -425
425 -425 425 -425 -213 -212 -212 -213 -425 425 -425 425 -425 -425 -425 -425
-212 213 -213 212 425 425 425 425 -425 425 -425 425 210 210 c115 115 212
210 215 210 3 0 195 -190 427 -422z"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={cx('image-wrapper')}>
                <div className={cx('menu-button')}>
                  {/* close button */}
                  <button
                    type="button"
                    className={cx('close-icon')}
                    onClick={() => {
                      setIsTGNavShown(!isTGNavShown)
                    }}
                    aria-controls={cx('full-menu-wrapper')}
                    aria-expanded={!isTGNavShown}
                  >
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
                        fill="#000000"
                        stroke="none"
                      >
                        <path
                          d="M2330 5109 c-305 -29 -646 -126 -910 -259 -273 -138 -559 -356 -755
-576 -384 -432 -602 -931 -655 -1499 -41 -446 55 -949 260 -1355 138 -273 356
-559 576 -755 432 -384 931 -602 1499 -655 446 -41 949 55 1355 260 273 138
559 356 755 576 384 432 602 931 655 1499 41 446 -55 949 -260 1355 -138 273
-356 559 -576 755 -432 384 -931 602 -1499 655 -125 11 -320 11 -445 -1z
m-193 -1701 l423 -423 425 425 425 425 212 -213 213 -212 -425 -425 -425 -425
425 -425 425 -425 -213 -212 -212 -213 -425 425 -425 425 -425 -425 -425 -425
-212 213 -213 212 425 425 425 425 -425 425 -425 425 210 210 c115 115 212
210 215 210 3 0 195 -190 427 -422z"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={cx('navigation-button')}>
            {nextUri && (
              <Link href={nextUri} className={cx('next-button')}>
                <svg
                  width="60"
                  height="90"
                  viewBox="0 0 60 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 82L45 45L8.00001 8"
                    stroke="none"
                    stroke-width="20"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
