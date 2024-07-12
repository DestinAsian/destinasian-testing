import { useQuery } from '@apollo/client'
import { FOOTER_LOCATION } from '../../constants/menus'
import classNames from 'classnames/bind'
import styles from './TravelGuidesMenu.module.scss'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, LLPost, FeaturedImage, NavigationMenu } from '../../components'
import { GetFooterMenus } from '../../queries/GetFooterMenus'

let cx = classNames.bind(styles)

export default function TravelGuidesMenu({}) {
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const postsPerPage = 20

  // Get Footer menus
  const { data: footerMenusData, loading: footerMenusLoading } = useQuery(
    GetFooterMenus,
    {
      variables: {
        first: 50,
        footerHeaderLocation: FOOTER_LOCATION,
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    },
  )

  // Footer Menu
  const footerMenu = footerMenusData?.footerHeaderMenuItems?.nodes ?? []


  console.log(footerMenu)

  // const updateQuery = (prev, { fetchMoreResult }) => {
  //   if (!fetchMoreResult) return prev

  //   return {
  //     ...data,
  //     luxeList: {
  //       ...data?.luxeList,
  //       children: {
  //         ...prev?.luxeList?.children,
  //         edges: [
  //           ...prev?.luxeList?.children?.edges,
  //           ...fetchMoreResult?.luxeList?.children?.edges,
  //         ],
  //         pageInfo: fetchMoreResult?.luxeList?.children?.pageInfo,
  //       },
  //     },
  //   }
  // }

  // // Fetch more stories when scroll to bottom
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrolledToBottom =
  //       window.scrollY + window.innerHeight >=
  //       document.documentElement.scrollHeight

  //     if (
  //       scrolledToBottom &&
  //       !isFetchingMore &&
  //       data?.luxeList?.children?.pageInfo?.hasNextPage
  //     ) {
  //       fetchMore({
  //         variables: {
  //           first: postsPerPage,
  //           after: data?.luxeList?.children?.pageInfo?.endCursor,
  //         },
  //         updateQuery,
  //       })
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [data, fetchMore])

  // if (error) {
  //   return <pre>{JSON.stringify(error)}</pre>
  // }

  // if (loading) {
  //   return (
  //     <>
  //       <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
  //         <Button className="gap-x-4	">{'Loading...'}</Button>
  //       </div>
  //     </>
  //   )
  // }

  // Declare all posts
  // const allPosts =
  //   data?.luxeList?.children?.edges.map((post) => post.node) || []

  return (
    <div className={cx('component')}>
      {/* Full menu */}
      <div className={cx('full-menu-content')}>
        {/* Footer Menu {DestinAsian Guides Menu} */}
        <NavigationMenu
          className={cx('footer-navigation')}
          menuItems={footerMenu}
        />
      </div>
    </div>
  )
}
