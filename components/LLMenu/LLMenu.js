import { useQuery } from '@apollo/client'
import classNames from 'classnames/bind'
import styles from './LLMenu.module.scss'
import React, { useState } from 'react'
import { GetLuxeListMenu } from '../../queries/GetLuxeListMenu'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// Import Components
const Button = dynamic(() => import('@/components/Button/Button'))

let cx = classNames.bind(styles)

export default function LLMenu({
  databaseId,
  isNavShown,
  setIsNavShown,
  customRef,
  customClassName,
}) {
  const postsPerPage = 100

  // Get Pages
  const { data, error, loading, fetchMore } = useQuery(GetLuxeListMenu, {
    variables: {
      first: postsPerPage,
      after: null,
      id: databaseId,
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: "network-only",
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

  // Luxe List main page
  const luxeList = data?.luxeList
  const menuTitleImage = luxeList.luxeListLogo?.secondaryLogo

  // Declare all posts
  const allPosts = luxeList.children?.edges.map((post) => post.node) || []

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

  return (
    <div ref={customRef} className={cx('component', customClassName)}>
      {/* Full menu */}
      <div className={cx('full-menu-content')}>
        <div className={cx('ll-menu-header')}>
          {luxeList?.uri && luxeList?.title && (
            <div className={cx('title-header-wrapper')}>
              <Link href={luxeList?.uri}>
                {menuTitleImage ? (
                  <div>
                    <Image
                      src={menuTitleImage?.sourceUrl}
                      alt={menuTitleImage?.altText}
                      fill
                      sizes="100%"
                      priority
                    />
                  </div>
                ) : (
                  <span>{luxeList?.title}</span>
                )}
              </Link>
            </div>
          )}
        </div>
        <div className={cx('menu-wrapper')}>
          {uniqueCategories.map((categoryName, index) => (
            <div className={cx('menu-list-wrapper')} key={index}>
              <div className={cx('category-wrapper')}>
                <h2 className={cx('category')}>{categoryName}</h2>
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
          ))}
        </div>
      </div>
    </div>
  )
}
