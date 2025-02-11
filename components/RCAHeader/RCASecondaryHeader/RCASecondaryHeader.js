import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './RCASecondaryHeader.module.scss'
import { useQuery } from '@apollo/client'
import { RCAFullMenu } from '../../../components'

let cx = classNames.bind(styles)

export default function RCASecondaryHeader({
  isMainNavShown,
  setIsMainNavShown,
  isNavShown,
  setIsNavShown,
  rcaDatabaseId,
  uri,
}) {
  const [currentUrl, setCurrentUrl] = useState('')
  const [categoryUrl, setCategoryUrl] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [prevScrollY, setPrevScrollY] = useState(0)

  // let catVariable = {
  //   first: 1,
  //   id: databaseId,
  // }

  // // Get Category
  // const { data } = useQuery(GetRCASecondaryHeader, {
  //   variables: catVariable,
  //   fetchPolicy: 'network-only',
  //   nextFetchPolicy: 'cache-and-network',
  // })

  // // Add currentUrl function
  // useEffect(() => {
  //   setCurrentUrl(window.location.pathname)
  // }, [])
  // function isActive(uri) {
  //   return currentUrl + '/' === uri
  // }

  // // Add currentCategoryUrl function
  // useEffect(() => {
  //   setCategoryUrl(categoryUri)
  // }, [])
  // function isActiveCategory(uri) {
  //   return categoryUrl === uri
  // }

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
            className={cx('menu-button')}
            onClick={() => {
              setIsNavShown(!isNavShown)
            }}
            aria-label="Toggle navigation"
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isNavShown}
          >
            <div className={cx('menu-title')}>{`Travel Stories`}</div>
          </button>
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
            <div className={cx('menu-title')}>{`Guides`}</div>
          </button>
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
            <div className={cx('menu-title')}>{`Readers' Choice Awards`}</div>
          </button>
        </div>
      </div>
    </>
  )
}
