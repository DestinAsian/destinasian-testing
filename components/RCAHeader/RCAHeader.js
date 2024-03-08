import classNames from 'classnames/bind'
import Link from 'next/link'
import destinasianLogoGold from '../../assets/logo/destinasian-logo-gold.png'
import destinasianLogo from '../../assets/logo/destinasian-logo.png'
import {
  Container,
  SkipNavigationLink,
  FullMenu,
  RCAFullMenu,
} from '../../components'
import styles from './RCAHeader.module.scss'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'

let cx = classNames.bind(styles)

export default function RCAHeader({
  primaryMenuItems,
  secondaryMenuItems,
  thirdMenuItems,
  fourthMenuItems,
  fifthMenuItems,
  featureMenuItems,
  latestStories,
  menusLoading,
  latestLoading,
  parent,
  databaseId,
  uri,
  isNavShown,
  setIsNavShown,
}) {
  const isDesktop = useMediaQuery({ minWidth: 768 })
  const [isScrolled, setIsScrolled] = useState(false)

  const isParent = parent == null

  // Add sticky header on scroll
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [searchQuery, setSearchQuery] = useState('')

  // Clear search input
  const clearSearch = () => {
    setSearchQuery('') // Reset the search query
  }

  return (
    <header
      className={cx('component', {
        sticky: isScrolled,
        parentColor: isParent,
        navShown: isNavShown,
      })}
    >
      <SkipNavigationLink />
      {/* Responsive header */}
      {isDesktop || (!isDesktop && !isNavShown) ? (
        <Container>
          <div className={cx('navbar')}>
            {/* DA logo */}
            <Link href="/" className={cx('title')}>
              {isParent || isNavShown ? (
                <div className={cx('brand')}>
                  <Image
                    src={destinasianLogo.src}
                    alt="Destinasian Logo"
                    fill
                    sizes="100%"
                    priority
                  />
                </div>
              ) : (
                <div className={cx('brand')}>
                  <Image
                    src={destinasianLogoGold.src}
                    alt="Destinasian Logo"
                    fill
                    sizes="100%"
                    priority
                  />
                </div>
              )}
            </Link>

            {/* Menu Button */}
            {isNavShown == false ? (
              <div className={cx('menu-button')}>
                {/* menu button */}
                <button
                  type="button"
                  className={cx('menu-icon')}
                  onClick={() => {
                    setIsNavShown(!isNavShown)
                    setSearchQuery('')
                  }}
                  aria-label="Toggle navigation"
                  aria-controls={cx('full-menu-wrapper')}
                  aria-expanded={!isNavShown}
                >
                  {isParent ? (
                    <svg
                      width="22"
                      height="96"
                      viewBox="0 0 22 96"
                      fill="#000000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 0)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 0)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 0)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 0)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 0)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 74.4785)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 74.4785)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 74.4785)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 74.4785)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 74.4785)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 36.8105)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 36.8105)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 36.8105)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 36.8105)"
                        fill="#000000"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 36.8105)"
                        fill="#000000"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="96"
                      viewBox="0 0 22 96"
                      fill="#ffffff"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 0)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 0)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 0)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 0)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 0)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 74.4785)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 74.4785)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 74.4785)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 74.4785)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 74.4785)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 36.8105)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 36.8105)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 36.8105)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 36.8105)"
                        fill="#ffffff"
                      />
                      <circle
                        cx="10.7009"
                        cy="10.7009"
                        r="10.7009"
                        transform="matrix(-1 0 0 1 21.4019 36.8105)"
                        fill="#ffffff"
                      />
                    </svg>
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
                    setIsNavShown(!isNavShown)
                    setSearchQuery('')
                  }}
                  aria-label="Toggle navigation"
                  aria-controls={cx('full-menu-wrapper')}
                  aria-expanded={!isNavShown}
                >
                  {isParent ? (
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
                  ) : (
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
                  )}
                </button>
              </div>
            )}
          </div>
        </Container>
      ) : (
        <Container>
          <div className={cx('close-button')}>
            {/* close button */}
            <button
              type="button"
              className={cx('close-icon')}
              onClick={() => {
                setIsNavShown(!isNavShown)
                setSearchQuery('')
              }}
              aria-label="Toggle navigation"
              aria-controls={cx('primary-navigation')}
              aria-expanded={!isNavShown}
            >
              {isParent ? (
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
              ) : (
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
              )}
            </button>
          </div>
        </Container>
      )}

      {/* Full menu */}
      <div
        className={cx(['full-menu-wrapper', isNavShown ? 'show' : undefined])}
      >
        <FullMenu
          primaryMenuItems={primaryMenuItems}
          secondaryMenuItems={secondaryMenuItems}
          thirdMenuItems={thirdMenuItems}
          fourthMenuItems={fourthMenuItems}
          fifthMenuItems={fifthMenuItems}
          featureMenuItems={featureMenuItems}
          latestStories={latestStories}
          clearSearch={clearSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          menusLoading={menusLoading}
          latestLoading={latestLoading}
        />
      </div>
    </header>
  )
}
