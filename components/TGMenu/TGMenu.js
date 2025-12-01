import { useQuery } from '@apollo/client'
import classNames from 'classnames/bind'
import styles from './TGMenu.module.scss'
import React from 'react'
import { GetTravelGuideMenu } from '../../queries/GetTravelGuideMenu'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// Import Components
const Button = dynamic(() => import('@/components/Button/Button'))

let cx = classNames.bind(styles)

export default function TGMenu({ mainLogo, secondaryLogo, databaseId, uri }) {
  const postsPerPage = 100

  // Get Pages
  const { data, error, loading, fetchMore } = useQuery(GetTravelGuideMenu, {
    variables: {
      first: postsPerPage,
      after: null,
      id: databaseId,
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
  })

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  if (loading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          <Button className="gap-x-4	">{'Loading...'}</Button>
        </div>
      </>
    )
  }

  // Declare all posts
  const allPosts =
    data?.travelGuide?.children?.edges.map((post) => post.node) || []

  // Function to filter out duplicate categories
  const uniqueCategories = allPosts
    .reduce((unique, post) => {
      const categoryName = post?.categories?.edges[0]?.node?.name
      if (categoryName && !unique.includes(categoryName)) {
        unique.push(categoryName)
      }
      return unique
    }, [])
    .sort() // Sort alphabetically

  // Required order
  const THEME_ORDER = ['none', 'explore', 'eat', 'stay']

  // Sort posts by theme order
  const sortedPosts = [...allPosts].sort((a, b) => {
    const themeA = a?.travelGuidesThemes?.themesSelection || 'NULL'
    const themeB = b?.travelGuidesThemes?.themesSelection || 'NULL'

    const indexA = themeA === 'NULL' ? -1 : THEME_ORDER.indexOf(themeA)
    const indexB = themeB === 'NULL' ? -1 : THEME_ORDER.indexOf(themeB)

    return indexA - indexB
  })

  // Group posts by theme
  const postsByTheme = allPosts.reduce((acc, post) => {
    const theme = post?.travelGuidesThemes?.themesSelection || 'None'

    if (!acc[theme]) acc[theme] = []
    acc[theme].push(post)

    return acc
  }, {})

  // Final theme list (in correct order + only existing)
  const sortedThemes = THEME_ORDER.filter(
    (theme) => postsByTheme[theme] && postsByTheme[theme].length > 0,
  )

  return (
    <div className={cx('component')}>
      {/* Full menu */}
      <div className={cx('full-menu-content')}>
        <div className={cx('guides-menu-header-wrapper')}>
          <div className={cx('guides-menu-header')}>
            {uniqueCategories.map((categoryName, index) => (
              <div className={cx('menu-list-wrapper')} key={index}>
                <div className={cx('category-wrapper')}>
                  <h2 className={cx('category')}>{categoryName}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className={cx('guides-menu-header')}>
            {data?.travelGuide?.uri && data?.travelGuide?.title && (
              <div className={cx('title-header-wrapper')}>
                <Link href={data?.travelGuide?.uri}>
                  <span>{data?.travelGuide?.title}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className={cx('menu-wrapper')}>
          {sortedThemes.map((theme, index) => (
            <div className={cx('menu-list-wrapper')} key={index}>
              {theme && theme !== 'none' && (
                <div className={cx('category-wrapper')}>
                  <h2 className={cx('category')}>{theme}</h2>
                </div>
              )}
              {postsByTheme[theme].map((post) => {
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
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
