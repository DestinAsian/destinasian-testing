import { useQuery } from '@apollo/client'
import classNames from 'classnames/bind'
import { Button, FeaturedImage, NavigationMenu } from '../../components'
import styles from './RCAFullMenu.module.scss'
import React, { useState, useEffect } from 'react'
import * as MENUS from '../../constants/menus'
import { GetRCAMenu } from '../../queries/GetRCAMenu'
import Link from 'next/link'

let cx = classNames.bind(styles)

export default function RCAFullMenu({
  mainLogo,
  secondaryLogo,
  databaseId,
  uri,
  isNavShown,
  setIsNavShown,
}) {
  const postsPerPage = 50

  // Get Pages
  const { data, error, loading } = useQuery(GetRCAMenu, {
    variables: {
      first: postsPerPage,
      rcaMenuLocation: MENUS.RCA_LOCATION,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  const rcaMenu = data?.rcaMenuItems?.nodes ?? []

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  if (loading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          <Button className="gap-x-4 ">{'Loading...'}</Button>
        </div>
      </>
    )
  }

  // Declare all posts
  const allPosts =
    data?.readersChoiceAward?.children?.edges.map((post) => post.node) || []

  // Function to filter out duplicate categories
  const uniqueCategories = allPosts.reduce((unique, post) => {
    const categoryName = post?.categories?.edges[0]?.node?.name
    if (!unique.includes(categoryName)) {
      unique.push(categoryName)
    }
    return unique
  }, [])

  return (
    <div className={cx('component')}>
      {/* Full menu */}
      <div className={cx('full-menu-content')}>
        <div className={cx('menu-wrapper')}>
          {/* {uniqueCategories.map((categoryName, index) => (
            <React.Fragment key={index}>
              <div className={cx('category-wrapper')}>
                <div className={cx('category-name-wrapper')}>
                  <h2 className={cx('category-name')}>{categoryName}</h2>
                </div>
                {allPosts.map((post) => {
                  const postCategory = post?.categories?.edges[0]?.node?.name
                  if (postCategory === categoryName) {
                    return (
                      <div className={cx('content-wrapper')} key={post?.id}>
                        <div className={cx('title-wrapper')}>
                        {post?.uri && (
                          <Link href={post?.uri}>
                            <h2 className={cx('title')}>{post?.title}</h2>
                          </Link>
                        )}
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </React.Fragment>
          ))} */}
          {/* {uniqueCategories.length && (
            <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
              {data?.luxeList?.children?.pageInfo?.hasNextPage &&
                data?.luxeList?.children?.pageInfo?.endCursor && (
                  <Button
                    onClick={() => {
                      if (
                        !isFetchingMore &&
                        data?.luxeList?.children?.pageInfo?.hasNextPage
                      ) {
                        setIsFetchingMore(true)
                        fetchMore({
                          variables: {
                            first: postsPerPage,
                            after:
                              data?.luxeList?.children?.pageInfo?.endCursor,
                          },
                          updateQuery,
                        }).then(() => {
                          setIsFetchingMore(false) // Reset the flag after fetch is done
                        })
                      }
                    }}
                    className="gap-x-4	"
                  >
                    {isFetchingMore ? (
                      'Loading...' // Display loading text when fetching
                    ) : (
                      <>
                        Load More{' '}
                        <svg
                          className="h-auto w-8 origin-center rotate-90"
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="512.000000pt"
                          height="512.000000pt"
                          viewBox="0 0 512.000000 512.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g
                            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            fill="#ffffff"
                            stroke="none"
                          >
                            <path
                              d="M1387 5110 c-243 -62 -373 -329 -272 -560 27 -62 77 -114 989 -1027
l961 -963 -961 -963 c-912 -913 -962 -965 -989 -1027 -40 -91 -46 -200 -15
-289 39 -117 106 -191 220 -245 59 -28 74 -31 160 -30 74 0 108 5 155 23 58
22 106 70 1198 1160 1304 1302 1202 1185 1202 1371 0 186 102 69 -1202 1371
-1102 1101 -1140 1137 -1198 1159 -67 25 -189 34 -248 20z"
                            />
                          </g>
                        </svg>
                      </>
                    )}
                  </Button>
                )}
            </div>
          )} */}
          <NavigationMenu
            className={cx(['rca-navigation-menu'])}
            menuItems={rcaMenu}
          />
          <div className={cx('close-button')}>
            {/* close button */}
            <button
              type="button"
              className={cx('close-icon')}
              onClick={() => {
                setIsNavShown(!isNavShown)
              }}
              aria-label="Toggle navigation"
              aria-controls={cx('full-menu-wrapper')}
              aria-expanded={!isNavShown}
            >
              <svg
                width="83"
                height="79"
                viewBox="0 0 83 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M53.8 17.85L49.9 16.95L49.9 2.49634e-06L82.45 1.81358e-07L82.45 17.55L77.05 18.6L60.1 39.9L77.05 58.05L81.7 59.55L81.7 78.6L38.05 78.6L38.05 60.9L42.1 59.55L36.1 51.9L35.8 51.9L29.65 59.55L33.55 60.9L33.55 78.6L2.79999 78.6L2.79999 59.55L8.34999 58.2L23.95 40.05L5.64998 18.45L0.699985 17.55L0.699983 5.99549e-06L44.05 2.9124e-06L44.05 16.95L39.85 17.85L47.65 26.25L47.95 26.25L53.8 17.85Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
