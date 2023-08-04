import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './SecondaryHeader.module.scss'
import { CategoryEntryHeader, DaGuideMenu } from '..'

let cx = classNames.bind(styles)

export default function SecondaryHeader({
  home,
  parent,
  parentName,
  parentUri,
  parentCountryCode,
  children,
  categories,
  titleCountryCode,
  titleName,
  titleUri,
  destinationGuides,
  parentDestinationGuides,
  categoryDestinationGuides,
  categoryName,
  categoryCountryCode,
  categoryUri,
}) {
  const [currentUrl, setCurrentUrl] = useState('')
  const [categoryUrl, setCategoryUrl] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [prevScrollY, setPrevScrollY] = useState(0)

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
        <div className={cx('container-wrapper', { sticky: isScrolled })}>
          <div className={cx('navbar')}>
            {/* Parent category navigation */}
            {children?.edges?.length != 0 &&
              children != null &&
              children != undefined && (
                <div className={cx('navbar-wrapper')}>
                  {/* {'parent'} */}
                  <div className={cx('da-guide-wrapper')}>
                    {destinationGuides == 'yes' && (
                      <DaGuideMenu
                        title={titleCountryCode}
                        titleName={titleName}
                        titleUri={titleUri}
                      />
                    )}
                    {destinationGuides == null && null}
                  </div>
                  <div className={cx('navigation-wrapper')}>
                    {children?.edges?.map((post) => (
                      <li key={post?.node?.uri} className={cx('nav-link')}>
                        <a
                          href={post?.node?.uri}
                          className={cx(
                            isActive(post?.node?.uri) ? 'active' : '',
                          )}
                        >
                          <h2 className={cx('nav-name')}>{post?.node?.name}</h2>
                        </a>
                      </li>
                    ))}
                  </div>
                </div>
              )}

            {/* Children category navigation */}
            {parent?.node?.children?.edges?.length != 0 &&
              parent != null &&
              parent != undefined && (
                <div className={cx('navbar-wrapper')}>
                  {/* {'children'} */}
                  <div className={cx('da-guide-wrapper')}>
                    {parentDestinationGuides == 'yes' && (
                      <DaGuideMenu
                        parent={parentCountryCode}
                        parentUri={parentUri}
                        parentName={parentName}
                        parentDestinationGuides={parentDestinationGuides}
                      />
                    )}
                    {parentDestinationGuides == null && null}
                  </div>
                  <div className={cx('navigation-wrapper')}>
                    {parent?.node?.children?.edges?.map((post) => (
                      <li key={post?.node?.uri} className={cx('nav-link')}>
                        <a
                          href={post?.node?.uri}
                          className={cx(
                            isActive(post?.node?.uri) ? 'active' : '',
                          )}
                        >
                          <h2 className={cx('nav-name')}>{post?.node?.name}</h2>
                        </a>
                      </li>
                    ))}
                  </div>
                </div>
              )}

            {/* Single post navigation */}
            {categories && (
              <div className={cx('navbar-wrapper')}>
                {/* {'categories'} */}
                <div className={cx('da-guide-wrapper')}>
                  {categoryDestinationGuides == 'yes' && (
                    <DaGuideMenu
                      categories={categoryCountryCode}
                      categoryUri={categoryUri}
                      categoryName={categoryName}
                    />
                  )}
                  {categoryDestinationGuides == null && null}
                </div>
                <div className={cx('navigation-wrapper')}>
                  {categories?.node?.children?.edges?.map((post) => (
                    <li key={post?.node?.uri} className={cx('single-nav-link')}>
                      <a
                        href={post?.node?.uri}
                        className={cx(
                          isActiveCategory(post?.node?.uri) ? 'active' : '',
                        )}
                      >
                        <h2 className={cx('nav-name')}>{post?.node?.name}</h2>
                      </a>
                    </li>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
