import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './SecondaryHeader.module.scss'
import { Button, DaGuideMenu } from '..'
import { useQuery } from '@apollo/client'
import { GetSecondaryHeader } from '../../queries/GetSecondaryHeader'

let cx = classNames.bind(styles)

export default function SecondaryHeader({ databaseId, home, categoryUri }) {
  const [currentUrl, setCurrentUrl] = useState('')
  const [categoryUrl, setCategoryUrl] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [prevScrollY, setPrevScrollY] = useState(0)

  const catPerPage = 4

  let catVariable = {
    first: catPerPage,
    id: databaseId,
  }

  // Get Category
  const { data, loading } = useQuery(GetSecondaryHeader, {
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

  // Loading Menu
  if (loading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 h-auto w-8 animate-spin fill-black text-gray-200 dark:text-gray-600"
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
    <nav className={cx('component')}>
      {home == undefined && (
        <div className={cx('container-wrapper', { sticky: isScrolled })}>
          <div className={cx('navbar')}>
            {/* Parent category navigation */}
            {data?.category?.children?.edges?.length != 0 &&
              data?.category?.children != null &&
              data?.category?.children != undefined && (
                <div className={cx('navbar-wrapper')}>
                  {/* {'parent'} */}
                  <div className={cx('da-guide-wrapper')}>
                    {data?.category?.destinationGuides?.destinationGuides ==
                      'yes' && (
                      <DaGuideMenu
                        title={data?.category?.countryCode?.countryCode}
                        titleName={data?.category?.name}
                        titleUri={data?.category?.uri}
                      />
                    )}
                    {data?.category?.destinationGuides?.destinationGuides ==
                      null && null}
                  </div>
                  <div className={cx('navigation-wrapper')}>
                    {data?.category?.children?.edges?.map((post) => (
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
            {data?.category?.parent?.node?.children?.edges?.length != 0 &&
              data?.category?.parent != null &&
              data?.category?.parent != undefined && (
                <div className={cx('navbar-wrapper')}>
                  {/* {'children'} */}
                  <div className={cx('da-guide-wrapper')}>
                    {data?.category?.parent?.node?.destinationGuides
                      ?.destinationGuides == 'yes' && (
                      <DaGuideMenu
                        parent={
                          data?.category?.parent?.node?.countryCode?.countryCode
                        }
                        parentUri={data?.category?.parent?.node?.uri}
                        parentName={data?.category?.parent?.node?.name}
                        parentDestinationGuides={
                          data?.category?.parent?.node?.destinationGuides
                            ?.destinationGuides
                        }
                      />
                    )}
                    {data?.category?.parent?.node?.destinationGuides
                      ?.destinationGuides == null && null}
                  </div>
                  <div className={cx('navigation-wrapper')}>
                    {data?.category?.parent?.node?.children?.edges?.map(
                      (post) => (
                        <li key={post?.node?.uri} className={cx('nav-link')}>
                          <a
                            href={post?.node?.uri}
                            className={cx(
                              isActive(post?.node?.uri) ? 'active' : '',
                            )}
                          >
                            <h2 className={cx('nav-name')}>
                              {post?.node?.name}
                            </h2>
                          </a>
                        </li>
                      ),
                    )}
                  </div>
                </div>
              )}

            {/* Single post navigation */}
            {data?.post?.categories?.edges[0]?.node?.parent && (
              <div className={cx('navbar-wrapper')}>
                {/* {'categories'} */}
                <div className={cx('da-guide-wrapper')}>
                  {data?.post?.categories?.edges[0]?.node?.parent?.node
                    ?.destinationGuides?.destinationGuides == 'yes' && (
                    <DaGuideMenu
                      categories={
                        data?.post?.categories?.edges[0]?.node?.parent?.node
                          ?.countryCode?.countryCode
                      }
                      categoryUri={
                        data?.post?.categories?.edges[0]?.node?.parent?.node
                          ?.uri
                      }
                      categoryName={
                        data?.post?.categories?.edges[0]?.node?.parent?.node
                          ?.name
                      }
                    />
                  )}
                  {data?.post?.categories?.edges[0]?.node?.parent?.node
                    ?.destinationGuides?.destinationGuides == null && null}
                </div>
                <div className={cx('navigation-wrapper')}>
                  {data?.post?.categories?.edges[0]?.node?.parent?.node?.children?.edges?.map(
                    (post) => (
                      <li
                        key={post?.node?.uri}
                        className={cx('single-nav-link')}
                      >
                        <a
                          href={post?.node?.uri}
                          className={cx(
                            isActiveCategory(post?.node?.uri) ? 'active' : '',
                          )}
                        >
                          <h2 className={cx('nav-name')}>{post?.node?.name}</h2>
                        </a>
                      </li>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
