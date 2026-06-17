import className from 'classnames/bind'
import styles from './ContentWrapperLL.module.scss'
import { GetLuxeListPagination } from '@/queries/GetLuxeListPagination'
import { useQuery } from '@apollo/client'
import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
} from 'react'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { transformWpImages } from '@/utilities/transformWpImages'
// Import Components
const SingleLLSlider = dynamic(() =>
  import('@/components/SingleLLSlider/SingleLLSlider'),
)
const SingleLLEntryHeader = dynamic(() =>
  import('@/components/SingleLLEntryHeader/SingleLLEntryHeader'),
)
const FeaturedImage = dynamic(() =>
  import('@/components/FeaturedImage/FeaturedImage'),
)

let cx = className.bind(styles)

export default function ContentWrapperLL({
  title,
  category,
  content,
  images,
  mainLogo,
  databaseId,
  isNavShown,
  isLLNavShown,
  setIsLLNavShown,
  router,
  sliderLL,
}) {
  const batchSize = 30
  // const [transformedContent, setTransformedContent] = useState('')
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

  const { data, loading, error } = useQuery(GetLuxeListPagination, {
    variables: { first: batchSize, after: null, id: databaseId },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
  })

  const parent = data?.luxeListBy?.parent

  const luxeListAll = parent
    ? [
        parent?.node,
        ...(data?.luxeListBy?.parent?.node?.children?.edges.map(
          (post) => post.node,
        ) || []),
      ]
    : [
        data?.luxeListBy,
        ...(data?.luxeListBy?.children?.edges.map((post) => post.node) || []),
      ]

  const indexOfLuxeList = data?.luxeListBy?.menuOrder ?? 0
  const numberOfLuxeLists = luxeListAll?.length
  const prevIndex = indexOfLuxeList - 1
  const nextIndex = indexOfLuxeList + 1

  // Loop nextUri to the first index when reaching the last index
  const prevUri = prevIndex >= 0 ? luxeListAll?.[prevIndex]?.uri : null
  const nextUri =
    nextIndex < numberOfLuxeLists
      ? luxeListAll?.[nextIndex]?.uri
      : luxeListAll?.[0]?.uri // Loop back to the first URI

  // Transform Wordpress Images
  const transformedContent = useMemo(
    () => transformWpImages(content),
    [content, isSliderMounted],
  )

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

      if ((!h || !w) && sliderLL?.current?.swiper?.el) {
        const el = sliderLL.current.swiper.el
        const rect = el.getBoundingClientRect()
        h = rect.height || 0
        w = rect.width || 0
      }

      setSliderHeight(Math.round(h))
      setSliderWidth(Math.round(w))
    }

    getDimensions()

    let ro
    const target = sliderRef.current ?? sliderLL?.current?.swiper?.el ?? null

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
    return (
      <pre>
        {typeof error !== 'undefined' && error
          ? error.message
            ? error.message
            : JSON.stringify(error)
          : 'Unknown error'}
      </pre>
    )
  }

  return (
    <article className={cx('component')}>
      <div className={cx('with-slider-wrapper')}>
        {images[0] != null && (
          <div ref={sliderRef} className={cx('slider-wrapper')}>
            <SingleLLSlider
              images={images}
              nextUri={nextUri}
              sliderLL={sliderLL}
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
            // marginTop: isMobile ? `${sliderHeight}px` : '',
            marginLeft: !isMobile ? `${sliderWidth}px` : '',
          }}
        >
          <SingleLLEntryHeader
            title={title}
            category={category}
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
            width: !isMobile ? '100vw' : '',
          }}
          className={cx('navigation-wrapper')}
        >
          <div className={cx('navigation-inner-wrapper')}>
            <div className={cx('navigation-button')}>
              {prevUri && (
                <Link href={prevUri} className={cx('prev-button')}>
                  <svg
                    width="60"
                    height="90"
                    viewBox="0 0 60 90"
                    fill="none"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path
                      d="M52 8L15 45L52 82"
                      stroke="none"
                      strokeWidth="20"
                    />
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
                      xmlns="https://www.w3.org/2000/svg"
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
              {!isLLNavShown ? (
                <div className={cx('image-wrapper')}>
                  {/* Menu Button */}
                  {isLLNavShown == false ? (
                    <div className={cx('menu-button')}>
                      {/* menu button */}
                      <button
                        type="button"
                        className={cx('menu-icon')}
                        onClick={() => {
                          setIsLLNavShown(!isLLNavShown) // Toggles navigation visibility
                        }}
                        aria-controls={cx('full-menu-wrapper')}
                        aria-expanded={!isLLNavShown}
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
                          setIsLLNavShown(!isLLNavShown)
                        }}
                        aria-controls={cx('full-menu-wrapper')}
                        aria-expanded={!isLLNavShown}
                      >
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
                            fill="#ffffff"
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
                        setIsLLNavShown(!isLLNavShown)
                      }}
                      aria-controls={cx('full-menu-wrapper')}
                      aria-expanded={!isLLNavShown}
                    >
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
                          fill="#ffffff"
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
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 82L45 45L8.00001 8"
                      stroke="none"
                      strokeWidth="20"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
