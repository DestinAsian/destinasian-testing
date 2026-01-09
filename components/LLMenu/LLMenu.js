import { useQuery } from '@apollo/client'
import classNames from 'classnames/bind'
import styles from './LLMenu.module.scss'
import React, { useState } from 'react'
import { GetLuxeListMenu } from '@/queries/GetLuxeListMenu'
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
  const { data, error, loading } = useQuery(GetLuxeListMenu, {
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
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 h-[80vh] w-8 animate-spin fill-black text-gray-200 dark:text-gray-600"
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
