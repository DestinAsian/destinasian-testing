import className from 'classnames/bind'
import styles from './ContentWrapperRCA.module.scss'
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useLayoutEffect,
} from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GetRCAPagination } from '@/queries/GetRCAPagination'
import dynamic from 'next/dynamic'
import { transformWpImages } from '@/utilities/transformWpImages'
import { useMediaQuery } from 'react-responsive'
import { useClickOutside } from '@/constants/useClickOutside'
// Import Components
const SingleRCASlider = dynamic(() =>
  import('@/components/SingleRCASlider/SingleRCASlider'),
)
const SingleRCAEntryHeader = dynamic(() =>
  import('@/components/SingleRCAEntryHeader/SingleRCAEntryHeader'),
)
const RCAFullMenu = dynamic(() =>
  import('@/components/RCAFullMenu/RCAFullMenu'),
)

let cx = className.bind(styles)

export default function ContentWrapperRCA({
  title,
  parentTitle,
  images,
  content,
  databaseId,
  rcaDatabaseId,
  uri,
  rcaIndexData,
  sliderLoading,
  isRCANavShown,
  setIsRCANavShown,
  sliderRCA,
  activeIndex,
  setActiveIndex,
  rcaRef,
  bookNowButton,
}) {
  const batchSize = 100
  const [isSliderMounted, setIsSliderMounted] = useState(false) // Track slider mount status
  const [sliderHeight, setSliderHeight] = useState(0)
  const [sliderWidth, setSliderWidth] = useState(0)
  const sliderRef = useRef(null)

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

  // Close handlers
  useClickOutside(rcaRef, () => setIsRCANavShown(false))

  const slideTo = (index) => {
    if (sliderRCA?.current?.swiper) {
      sliderRCA.current.swiper.slideTo(index)
    }
    setActiveIndex(index)
  }

  const handleSlideChange = (index) => {
    setActiveIndex(index)
  }

  const isMobile = useMediaQuery({ maxWidth: 1023 })

  const { data, loading, error } = useQuery(GetRCAPagination, {
    variables: { first: batchSize, after: null, id: databaseId },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
  })

  const ancestors = data?.readersChoiceAwardBy?.ancestors

  // Declare Children Posts including nested child
  const extractPosts = (nodes) => {
    if (!nodes) return []
    return nodes.flatMap((post) => [
      post?.node,
      ...extractPosts(post?.node?.children?.edges || []),
    ])
  }

  const rcaAll = ancestors
    ? [
        ancestors?.edges[0]?.node,
        ...extractPosts(
          data?.readersChoiceAwardBy?.ancestors?.edges[0]?.node?.children?.edges.map(
            (post) => post,
          ) || [],
        ),
      ]
    : [
        data?.readersChoiceAwardBy,
        ...extractPosts(
          data?.readersChoiceAwardBy?.children?.edges.map((post) => post) || [],
        ),
      ]

  const indexOfRCA = data?.readersChoiceAwardBy?.menuOrder ?? 0
  const numberOfRCA = rcaAll?.length
  const prevIndex = indexOfRCA - 1
  const nextIndex = indexOfRCA + 1

  // Loop nextUri to the first index when reaching the last index
  const prevUri = prevIndex >= 0 ? rcaAll[prevIndex]?.uri : null
  const nextUri =
    nextIndex < numberOfRCA ? rcaAll[nextIndex]?.uri : rcaAll[0]?.uri // Loop back to the first URI

  // Transform Wordpress Images
  const transformedContent = useMemo(
    () => transformWpImages(content),
    [content, isSliderMounted],
  )

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

      if ((!h || !w) && sliderRCA?.current?.swiper?.el) {
        const el = sliderRCA.current.swiper.el
        const rect = el.getBoundingClientRect()
        h = rect.height || 0
        w = rect.width || 0
      }

      setSliderHeight(Math.round(h))
      setSliderWidth(Math.round(w))
    }

    getDimensions()

    let ro
    const target = sliderRef.current ?? sliderRCA?.current?.swiper?.el ?? null

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

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  if (loading || sliderLoading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 h-[80vh] w-8 animate-spin fill-black text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <article
        className={cx(
          'component',
          transformedContent !== 'null' && title !== null ? 'sm:top-0' : '',
        )}
      >
        <div className={cx('with-slider-wrapper')}>
          {images[0] != null && (
            <div ref={sliderRef} className={cx('slider-wrapper')}>
              <SingleRCASlider
                images={rcaIndexData.map((item) => item.imageUrl)}
                handleSlideChange={handleSlideChange}
                nextUri={nextUri}
                sliderRCA={sliderRCA}
                isSliderMounted={isSliderMounted}
                setIsSliderMounted={setIsSliderMounted}
              />
            </div>
          )}
          {images[0] == null && <div className={cx('slider-wrapper')}></div>}
          {/* Under the Slider */}
          {parentTitle && (
            <div
              style={{
                marginLeft: !isMobile ? `calc(${sliderWidth}px - 2rem)` : '',
              }}
            >
              <SingleRCAEntryHeader
                parentTitle={parentTitle}
                className={'parentClass'}
                sliderWidth={sliderWidth}
                sliderHeight={sliderHeight}
                isMobile={isMobile}
                hasBoth={parentTitle && title}
                rcaTitle={rcaAll[0]?.title}
                // category={category}
              />
            </div>
          )}
          {/* Before Content Wrapper */}
          {title && (
            <div
              style={{
                marginLeft: !isMobile ? `calc(${sliderWidth}px - 2rem)` : '',
              }}
            >
              <SingleRCAEntryHeader
                title={title}
                className={parentTitle ? 'bothClass' : 'defaultClass'}
                hasBoth={parentTitle && title}
                // rcaTitle={rcaAll[0]?.title}
              />
            </div>
          )}
          {rcaIndexData[0]?.name !== null && (
            <div
              style={{
                marginLeft: !isMobile ? `calc(${sliderWidth}px - 2rem)` : '',
                zIndex: 47,
                position: 'relative',
              }}
            >
              <div className={cx('content-list-wrapper')}>
                {rcaIndexData?.map((rcaIndex, index) => (
                  <>
                    <div
                      className={cx([
                        'button-pagination',
                        activeIndex == index ? 'active' : undefined,
                      ])}
                      id={rcaIndex?.name ? rcaIndex.name : null}
                      key={index}
                    >
                      <button
                        className={cx('content-list')}
                        onClick={() => {
                          slideTo(index)
                          handleSlideChange(index)
                        }}
                      >
                        {rcaIndex?.name && (
                          <>
                            <div className={cx('content-index')}>
                              {index + 1}
                            </div>
                            <div className={cx('content-property-name')}>
                              {rcaIndex?.name}
                            </div>
                          </>
                        )}
                      </button>
                      <div
                        className={cx([
                          'content-url',
                          activeIndex == index ? 'show' : undefined,
                        ])}
                      >
                        {rcaIndex?.url && (
                          <div className={cx('content-property-url')}>
                            <Link href={rcaIndex?.url} target="_blank">
                              {rcaIndex?.textUrl}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
          {transformedContent !== 'null' && (
            <div
              style={{
                marginLeft: !isMobile ? `calc(${sliderWidth}px - 2rem)` : '',
              }}
            >
              <div
                className={cx('content-wrapper')}
                dangerouslySetInnerHTML={{ __html: transformedContent ?? '' }}
              />
            </div>
          )}
          <div
            style={{
              // marginLeft: !isMobile ? `${sliderWidth}px` : '',
              width: !isMobile ? '100vw' : '',
            }}
            className={cx('navigation-wrapper')}
          >
            <div className={cx('navigation-inner-wrapper')}>
              <div className={cx(['navigation-button', 'prev'])}>
                {prevUri && (
                  <Link href={prevUri} className={cx('prev-button')}>
                    <svg
                      width="60"
                      height="90"
                      viewBox="0 0 60 90"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
              {bookNowButton?.bookNowLink && bookNowButton?.bookNowLabel && (
                <div className={cx('book-now-wrapper')}>
                  <div
                    className={cx('book-now-button')}
                    style={{
                      ...(bookNowButton?.bookNowBackgroundColor && {
                        backgroundColor: bookNowButton.bookNowBackgroundColor,
                      }),
                    }}
                  >
                    {/* {'Book Now Button'} */}
                    <Link
                      id={'RCA_Book_Now_ClickTracker'}
                      target="_blank"
                      href={bookNowButton.bookNowLink}
                      style={{
                        ...(bookNowButton?.bookNowTextColor && {
                          color: bookNowButton.bookNowTextColor,
                        }),
                      }}
                    >
                      {bookNowButton.bookNowLabel}
                    </Link>
                  </div>
                </div>
              )}
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
              <div className={cx('menu-wrapper')}>
                {!isRCANavShown ? (
                  <div className={cx('open-button-wrapper')}>
                    <button
                      type="button"
                      className={cx('menu-button')}
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsRCANavShown(!isRCANavShown)
                      }}
                      aria-controls={cx('rca-menu-wrapper')}
                      aria-expanded={isRCANavShown}
                    >
                      <div className={cx('menu-title')}>{'Awards Menu'}</div>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={cx('menu-button')}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsRCANavShown(!isRCANavShown)
                    }}
                    aria-controls={cx('rca-menu-wrapper')}
                    aria-expanded={isRCANavShown}
                  >
                    <div className={cx('menu-title')}>{'Awards Menu'}</div>
                  </button>
                )}
              </div>
              <div className={cx(['navigation-button', 'next'])}>
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
      {/* RCA menu */}
      <div
        className={cx(['rca-menu-wrapper', isRCANavShown ? 'show' : undefined])}
      >
        <RCAFullMenu
          rcaDatabaseId={rcaDatabaseId}
          uri={rcaAll[0]?.uri}
          isRCANavShown={isRCANavShown}
          setIsRCANavShown={setIsRCANavShown}
          rcaRef={rcaRef}
        />
      </div>
    </>
  )
}
