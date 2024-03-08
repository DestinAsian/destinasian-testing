import className from 'classnames/bind'
import styles from './ContentWrapperRCA.module.scss'
import { RCAFullMenu, SingleRCASlider } from '../../components'
import { useQuery } from '@apollo/client'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { GetRCAPagination } from '../../queries/GetRCAPagination'
import Link from 'next/link'

let cx = className.bind(styles)

export default function ContentWrapperRCA({
  images,
  databaseId,
  parentDatabaseId,
  uri,
  rcaIndexData,
}) {
  const batchSize = 30
  const [isNavShown, setIsNavShown] = useState(false)
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

  // console.log(swiperRef)

  const slideTo = (index) => {
    swiperRef.slideTo(index)

    setActiveIndex(index)
  }

  const handleSlideChange = (index) => {
    setActiveIndex(index)
  }

  // console.log('Active Index: ' + activeIndex)

  // Stop scrolling pages when isNavShown
  useEffect(() => {
    if (isNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isNavShown])

  const { data, loading, error, fetchMore } = useQuery(GetRCAPagination, {
    variables: { first: batchSize, after: null, id: databaseId },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  const rcaAll = data?.readersChoiceAwardBy?.parent?.node?.children?.edges.map(
    (post) => post.node,
  )

  // Index number for each of Individual Page
  const indexOfRCA = data?.readersChoiceAwardBy?.menuOrder

  // Total number of RCAs in a year
  const numberOfRCA = rcaAll?.length

  console.log(indexOfRCA)

  // Navigation of RCA individual page
  const prevIndex = indexOfRCA - 1 - 1
  const nextIndex = indexOfRCA - 1 + 1

  const prevUri = prevIndex >= 0 ? rcaAll[prevIndex].uri : null
  const nextUri = nextIndex < numberOfRCA ? rcaAll[nextIndex].uri : null

  return (
    <>
      <article className={cx('component')}>
        <div className={cx('with-slider-wrapper')}>
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
                    className={cx('content-name')}
                    onClick={() => {
                      slideTo(index)
                      handleSlideChange(index)
                    }}
                  >
                    <div className={cx('content-index')}>{index + 1}</div>
                    {rcaIndex?.name && (
                      <div className={cx('content-property-name')}>
                        {rcaIndex?.name}
                      </div>
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
              <a href={prevUri} className={cx('prev-button')}>
                <svg
                  width="60"
                  height="90"
                  viewBox="0 0 60 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M52 8L15 45L52 82" stroke="none" stroke-width="20" />
                </svg>
              </a>
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
              <a href={nextUri} className={cx('next-button')}>
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
              </a>
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
