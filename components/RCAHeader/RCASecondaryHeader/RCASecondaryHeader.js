import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './RCASecondaryHeader.module.scss'
import { useQuery } from '@apollo/client'
import { RCAFullMenu, TravelGuidesMenu } from '../../../components'

let cx = classNames.bind(styles)

export default function RCASecondaryHeader({
  isMainNavShown,
  setIsMainNavShown,
  isNavShown,
  setIsNavShown,
  isGuidesNavShown,
  setIsGuidesNavShown,
  searchQuery,
  setSearchQuery,
  rcaDatabaseId,
  uri,
}) {
  // const [currentUrl, setCurrentUrl] = useState('')
  // const [categoryUrl, setCategoryUrl] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [prevScrollY, setPrevScrollY] = useState(0)

  // Stop scrolling pages when isNavShown
  useEffect(() => {
    if (isMainNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isMainNavShown])

  // Stop scrolling pages when isNavShown
  useEffect(() => {
    if (isNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isNavShown])

  // Show sticky header when scroll down, Hide it when scroll up
  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY
      setIsScrolled(
        currentScrollY > 0,
        // && currentScrollY < prevScrollY
      )
      setPrevScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollY])

  return (
    <>
      <div className={cx('navigation-wrapper')}>
        <div className={cx('menu-wrapper')}>
          <button
            type="button"
            className={cx('menu-button', searchQuery ? 'active' : '')}
            onClick={() => {
              searchQuery ? setSearchQuery('') : setSearchQuery('travel')
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isNavShown ? setIsNavShown(!isNavShown) : null
            }}
            aria-label="Toggle navigation"
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isNavShown}
          >
            <div className={cx('menu-title')}>{`Travel Stories`}</div>
          </button>
          <button
            type="button"
            className={cx('menu-button', isGuidesNavShown ? 'active' : '')}
            onClick={() => {
              setIsGuidesNavShown(!isGuidesNavShown)
              isNavShown ? setIsNavShown(!isNavShown) : null
              setSearchQuery('')
            }}
            aria-label="Toggle navigation"
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isNavShown}
          >
            <div className={cx('menu-title')}>{`Guides`}</div>
          </button>
          <button
            type="button"
            className={cx('menu-button', isNavShown ? 'active' : '')}
            onClick={() => {
              setIsNavShown(!isNavShown)
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              setSearchQuery('')
            }}
            aria-label="Toggle navigation"
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isNavShown}
          >
            <div className={cx('menu-title')}>{`Readers' Choice Awards`}</div>
          </button>
        </div>
      </div>

      <div
        className={cx(
          'full-menu-content',
          isGuidesNavShown ? 'show' : undefined,
        )}
      >
        <div className={cx('full-menu-wrapper')}>
          <TravelGuidesMenu className={'dark-color'} />
        </div>
      </div>
    </>
  )
}
