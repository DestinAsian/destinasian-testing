import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './SecondaryHeader.module.scss'
import {
  ChildrenNavigation,
  ParentNavigation,
  SingleNavigation,
} from '../../components'
import { useQuery } from '@apollo/client'
import { GetSecondaryHeader } from '../../queries/GetSecondaryHeader'

let cx = classNames.bind(styles)

export default function SecondaryHeader({ databaseId, home, categoryUri }) {
  const [currentUrl, setCurrentUrl] = useState('')
  const [categoryUrl, setCategoryUrl] = useState('')
  const [isNavShown, setIsNavShown] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [prevScrollY, setPrevScrollY] = useState(0)

  let catVariable = {
    first: 1,
    id: databaseId,
  }

  // Get Category
  const { data } = useQuery(GetSecondaryHeader, {
    variables: catVariable,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  // Add currentUrl function
  useEffect(() => {
    setCurrentUrl(window.location.pathname)
  }, [])
  function isActive(uri) {
    return currentUrl + '/' === uri
  }

  // Add currentCategoryUrl function
  useEffect(() => {
    setCategoryUrl(categoryUri)
  }, [])
  function isActiveCategory(uri) {
    return categoryUrl === uri
  }

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
    <nav className={cx('component')}>
      {home == undefined && (
        <div
          className={cx(
            'container-wrapper',
            { sticky: isScrolled },
            isNavShown ? 'show' : undefined,
          )}
        >
          <div className={cx('navbar')}>
            {/* Parent category navigation */}
            {data?.category?.children?.edges?.length != 0 &&
              data?.category?.children != null &&
              data?.category?.children != undefined && (
                <ParentNavigation
                  databaseId={databaseId}
                  isActive={isActive}
                  isNavShown={isNavShown}
                  setIsNavShown={setIsNavShown}
                  isScrolled={isScrolled}
                />
              )}
            {/* Children category navigation */}
            {!data?.category?.children?.edges?.length &&
              data?.category?.parent?.node?.children?.edges?.length != 0 &&
              data?.category?.parent != null &&
              data?.category?.parent != undefined && (
                <ChildrenNavigation
                  databaseId={databaseId}
                  isActive={isActive}
                  isNavShown={isNavShown}
                  setIsNavShown={setIsNavShown}
                  isScrolled={isScrolled}
                />
              )}
            {/* Single post navigation */}
            {data?.post?.categories?.edges[0]?.node?.parent && (
              <SingleNavigation
                databaseId={databaseId}
                isActiveCategory={isActiveCategory}
                isNavShown={isNavShown}
                setIsNavShown={setIsNavShown}
                isScrolled={isScrolled}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
