import className from 'classnames/bind'
import styles from './ContentWrapperRCA.module.scss'
import {
  RCAFullMenu,
  SingleRCAEntryHeader,
  SingleRCASlider,
} from '../../components'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

let cx = className.bind(styles)

export default function ContentWrapperRCA({
  title,
  category,
  images,
  parentDatabaseId,
  uri,
  rcaIndexData,
  sliderLoading,
  isNavShown,
  setIsNavShown,
  paginationData,
  paginationLoading,
}) {
  const [swiperRef, setSwiperRef] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hash, setHash] = useState('')

  useEffect(() => {
    // Update activeIndex based on the hash in the URL
    const hashFromURL = window.location.hash.substring(1)
    setHash(hashFromURL)
    if (hashFromURL) {
      const index = rcaIndexData.findIndex(
        (rcaIndex) => rcaIndex.id === hashFromURL,
      )
      setActiveIndex(index)
    }
  }, [rcaIndexData])

  useEffect(() => {
    // Scroll to the element with the matching ID when hash changes
    const element = document.getElementById(hash)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [hash])

  const slideTo = (index) => {
    swiperRef.slideTo(index)

    setActiveIndex(index)
  }

  const handleSlideChange = (index) => {
    setActiveIndex(index)
  }

  // const { data, loading, error, fetchMore } = useQuery(GetRCAPagination, {
  //   variables: { first: batchSize, after: null, id: databaseId },
  //   fetchPolicy: 'network-only',
  //   nextFetchPolicy: 'cache-and-network',
  // })

  if (paginationLoading || sliderLoading) {
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

  const rcaAll =
    paginationData?.readersChoiceAwardBy?.parent?.node?.children?.edges.map(
      (post) => post.node,
    )

  // Index number for each of Individual Page
  const indexOfRCA = paginationData?.readersChoiceAwardBy?.menuOrder

  // Total number of RCAs in a year
  const numberOfRCA = rcaAll?.length

  // Navigation of RCA individual page
  const prevIndex = indexOfRCA - 1 - 1
  const nextIndex = indexOfRCA - 1 + 1

  const prevUri = prevIndex >= 0 ? rcaAll[prevIndex].uri : null
  const nextUri = nextIndex < numberOfRCA ? rcaAll[nextIndex].uri : null

  return (
    <>
      {images[0] != null && (
        <div className={cx('slider-wrapper')}>
          <SingleRCASlider
            images={rcaIndexData.map((item) => item.imageUrl)}
            swiperRef={swiperRef}
            setSwiperRef={setSwiperRef}
            handleSlideChange={handleSlideChange}
            setActiveIndex={setActiveIndex}
          />
        </div>
      )}
      {images[0] == null && <div className={cx('slider-wrapper')}></div>}
      <SingleRCAEntryHeader title={title} category={category} />
      <article className={cx('component')}>
        <div className={cx('with-slider-wrapper')}>
          <div className={cx('content-wrapper')}>
            {rcaIndexData?.map((rcaIndex, index) => (
              <>
                <div
                  className={cx([
                    'button-pagination',
                    activeIndex == index ? 'active' : undefined,
                  ])}
                  id={rcaIndex?.id ? rcaIndex.id : null}
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
                        <div className={cx('content-index')}>{index + 1}</div>
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
                          {'Visit Site'}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className={cx('navigation-wrapper')}>
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
                    <path
                      d="M52 8L15 45L52 82"
                      stroke="none"
                      stroke-width="20"
                    />
                  </svg>
                </Link>
              )}
            </div>
            <div className={cx('menu-wrapper')}>
              <button
                type="button"
                className={cx('menu-button')}
                onClick={() => {
                  setIsNavShown(!isNavShown)
                }}
                aria-label="Toggle navigation"
                aria-controls={cx('rca-menu-wrapper')}
                aria-expanded={!isNavShown}
              >
                <div className={cx('menu-title')}>{'Awards Menu'}</div>
                {/* <div className={cx('menu-icon')}>
                  <svg
                    width="22"
                    height="96"
                    viewBox="0 0 22 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 0)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 0)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 0)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 0)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 0)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 74.4785)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 74.4785)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 74.4785)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 74.4785)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 74.4785)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 36.8105)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 36.8105)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 36.8105)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 36.8105)"
                      fill="white"
                    />
                    <circle
                      cx="10.7009"
                      cy="10.7009"
                      r="10.7009"
                      transform="matrix(-1 0 0 1 21.4019 36.8105)"
                      fill="white"
                    />
                  </svg>
                </div> */}
              </button>
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
      {/* RCA menu */}
      <div
        className={cx(['rca-menu-wrapper', isNavShown ? 'show' : undefined])}
      >
        <RCAFullMenu
          databaseId={parentDatabaseId}
          uri={uri}
          isNavShown={isNavShown}
          setIsNavShown={setIsNavShown}
        />
      </div>
    </>
  )
}
