import classNames from 'classnames/bind'
import Link from 'next/link'
import destinasianLogoBlk from '../../assets/logo/destinasian-logo.png'
import destinasianLogoWht from '../../assets/logo/destinasianLogoWht.png'
import { Container, SkipNavigationLink, FullMenu } from '..'
import styles from './HomepageHeader.module.scss'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/legacy/image'

let cx = classNames.bind(styles)

export default function HomepageHeader({
  primaryMenuItems,
  secondaryMenuItems,
  thirdMenuItems,
  fourthMenuItems,
  fifthMenuItems,
  featureMenuItems,
  latestStories,
  home,
  menusLoading,
  latestLoading,
}) {
  const isDesktop = useMediaQuery({ minWidth: 768 })
  const [isNavShown, setIsNavShown] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Stop scrolling pages when isNavShown
  useEffect(() => {
    if (isNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isNavShown])

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
      className={cx('component', { sticky: isScrolled, white: isNavShown })}
    >
      <SkipNavigationLink />
      {/* Responsive header */}
      {isDesktop || (!isDesktop && !isNavShown) ? (
        <Container>
          <div className={cx('navbar')}>
            {/* DA logo */}
            <div className={cx('brand')}>
              <Link href="/" className={cx('title')}>
                {isScrolled || isNavShown ? (
                  <Image
                    src={destinasianLogoBlk.src}
                    layout="fill"
                    alt="Destinasian Logo"
                  />
                ) : (
                  <Image
                    src={destinasianLogoWht.src}
                    layout="fill"
                    alt="Destinasian Logo"
                  />
                )}
              </Link>
            </div>

            {/* Homepage */}
            {home == '/' && (
              <Container>
                {/* Menu Button */}
                {isNavShown == false ? (
                  <div className={cx('menu-button')}>
                    {/* menu button */}
                    {isScrolled ? (
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
                        <svg
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="40.000000pt"
                          height="40.000000pt"
                          viewBox="0 0 40.000000 40.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g
                            transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)"
                            fill="#000000"
                            stroke="none"
                          >
                            <path
                              d="M12 368 c-18 -18 -14 -46 7 -58 26 -13 336 -13 362 0 21 12 25 40 7
58 -17 17 -359 17 -376 0z"
                            />
                            <path
                              d="M12 228 c-7 -7 -12 -20 -12 -29 0 -35 23 -40 205 -37 157 3 179 5
189 21 8 12 8 22 0 35 -10 15 -32 17 -190 20 -131 2 -183 -1 -192 -10z"
                            />
                            <path
                              d="M17 89 c-20 -12 -22 -40 -5 -57 17 -17 359 -17 376 0 18 18 14 46 -7
58 -26 13 -340 13 -364 -1z"
                            />
                          </g>
                        </svg>
                      </button>
                    ) : (
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
                        <svg
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="40.000000pt"
                          height="40.000000pt"
                          viewBox="0 0 40.000000 40.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g
                            transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)"
                            fill="#ffffff"
                            stroke="none"
                          >
                            <path
                              d="M12 368 c-18 -18 -14 -46 7 -58 26 -13 336 -13 362 0 21 12 25 40 7
58 -17 17 -359 17 -376 0z"
                            />
                            <path
                              d="M12 228 c-7 -7 -12 -20 -12 -29 0 -35 23 -40 205 -37 157 3 179 5
189 21 8 12 8 22 0 35 -10 15 -32 17 -190 20 -131 2 -183 -1 -192 -10z"
                            />
                            <path
                              d="M17 89 c-20 -12 -22 -40 -5 -57 17 -17 359 -17 376 0 18 18 14 46 -7
58 -26 13 -340 13 -364 -1z"
                            />
                          </g>
                        </svg>
                      </button>
                    )}
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
              </Container>
            )}

            {/* ROS */}
            {home == undefined && (
              <Container>
                {/* Menu Button */}
                {isNavShown == false ? (
                  <div className={cx('menu-button')}>
                    {/* menu button */}
                    {isScrolled ? (
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
                        <svg
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="40.000000pt"
                          height="40.000000pt"
                          viewBox="0 0 40.000000 40.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g
                            transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)"
                            fill="#000000"
                            stroke="none"
                          >
                            <path
                              d="M12 368 c-18 -18 -14 -46 7 -58 26 -13 336 -13 362 0 21 12 25 40 7
58 -17 17 -359 17 -376 0z"
                            />
                            <path
                              d="M12 228 c-7 -7 -12 -20 -12 -29 0 -35 23 -40 205 -37 157 3 179 5
189 21 8 12 8 22 0 35 -10 15 -32 17 -190 20 -131 2 -183 -1 -192 -10z"
                            />
                            <path
                              d="M17 89 c-20 -12 -22 -40 -5 -57 17 -17 359 -17 376 0 18 18 14 46 -7
58 -26 13 -340 13 -364 -1z"
                            />
                          </g>
                        </svg>
                      </button>
                    ) : (
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
                        <svg
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="40.000000pt"
                          height="40.000000pt"
                          viewBox="0 0 40.000000 40.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g
                            transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)"
                            fill="#ffffff"
                            stroke="none"
                          >
                            <path
                              d="M12 368 c-18 -18 -14 -46 7 -58 26 -13 336 -13 362 0 21 12 25 40 7
58 -17 17 -359 17 -376 0z"
                            />
                            <path
                              d="M12 228 c-7 -7 -12 -20 -12 -29 0 -35 23 -40 205 -37 157 3 179 5
189 21 8 12 8 22 0 35 -10 15 -32 17 -190 20 -131 2 -183 -1 -192 -10z"
                            />
                            <path
                              d="M17 89 c-20 -12 -22 -40 -5 -57 17 -17 359 -17 376 0 18 18 14 46 -7
58 -26 13 -340 13 -364 -1z"
                            />
                          </g>
                        </svg>
                      </button>
                    )}
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
              </Container>
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
                setIsNavShown(!isNavShown) // Toggle navigation
                clearSearch // Clear search input
              }}
              aria-label="Toggle navigation"
              aria-controls={cx('primary-navigation')}
              aria-expanded={!isNavShown}
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
        </Container>
      )}

      {/* SecondaryHeader Homepage*/}
      <div className={cx('home-container-wrapper', { homeSticky: isScrolled })}>
        <div className={cx('home-navbar')}>
          <div className={cx('home-navbar-wrapper')}>
            <div className={cx('navigation-wrapper')}>
              <li className={cx('nav-link')}>
                <button
                  type="button"
                  onClick={() => {
                    setIsNavShown(!isNavShown)
                    setSearchQuery('')
                  }}
                  aria-label="Toggle navigation"
                  aria-controls={cx('full-menu-wrapper')}
                  aria-expanded={!isNavShown}
                >
                  <h2 className={cx('nav-name')}>{'Destinations'}</h2>
                </button>
              </li>
              <li className={cx('nav-link')}>
                <button
                  type="button"
                  onClick={() => {
                    setIsNavShown(!isNavShown)
                    setSearchQuery('')
                  }}
                  aria-label="Toggle navigation"
                  aria-controls={cx('full-menu-wrapper')}
                  aria-expanded={!isNavShown}
                >
                  <h2 className={cx('nav-name')}>{'Destination Guides'}</h2>
                </button>
              </li>
              <li className={cx('nav-link')}>
                <button
                  type="button"
                  onClick={() => {
                    setIsNavShown(!isNavShown)
                    setSearchQuery('')
                  }}
                  aria-label="Toggle navigation"
                  aria-controls={cx('full-menu-wrapper')}
                  aria-expanded={!isNavShown}
                >
                  <h2 className={cx('nav-name')}>{'Feature Stories'}</h2>
                </button>
              </li>
              <li className={cx('nav-link')}>
                <button
                  type="button"
                  onClick={() => {
                    setIsNavShown(!isNavShown)
                    setSearchQuery('')
                  }}
                  aria-label="Toggle navigation"
                  aria-controls={cx('full-menu-wrapper')}
                  aria-expanded={!isNavShown}
                >
                  <h2 className={cx('nav-name')}>{'Latest Travel Stories'}</h2>
                </button>
              </li>
            </div>
          </div>
        </div>
      </div>

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
