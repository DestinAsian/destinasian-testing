import classNames from 'classnames/bind'
import styles from './BurgerFullMenu.module.scss'
import { useCallback, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { GetLatestStoriesBurgerMenu } from '@/queries/GetLatestStoriesBurgerMenu'
import { useSWRGraphQL } from '@/lib/useSWRGraphQL'
// Import Components
const NavigationMenu = dynamic(() =>
  import('@/components/NavigationMenu/NavigationMenu'),
)
const SocialMediaMenuIcons = dynamic(() =>
  import('@/components/SocialMediaMenuIcons/SocialMediaMenuIcons'),
)

let cx = classNames.bind(styles)

export default function BurgerFullMenu({
  secondaryMenuItems,
  fifthMenuItems,
  featureMenuItems,
  menusLoading,
  isSearchResultsVisible,
  customClassName,
  burgerRef,
}) {
  // LatestStories content
  const [visiblePosts] = useState(5)

  const renderNavigationCustomItem = useCallback(({ wpClasses }) => {
    if (!wpClasses.includes('socmed-icon')) return null

    return <SocialMediaMenuIcons />
  }, [])

  // Get latest travel stories
  const { data, isLoading, error } = useSWRGraphQL(
    'burger-latest-stories',
    GetLatestStoriesBurgerMenu,
    { first: 10 },
  )

  const editorials =
    data?.editorials?.edges
      ?.filter((edge) => !edge.node?.passwordProtected?.onOff)
      ?.map((edge) => edge.node) ?? []

  // sort posts by date
  const sortPostsByDate = (a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA // Sort in descending order
  }

  // sortByDate mainCat & childCat Posts
  const latestStories = editorials.sort(sortPostsByDate)

  // Loading Menu
  if (menusLoading || isLoading) {
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

  return (
    <div className={cx('component')}>
      {/* Full menu */}
      <div
        className={cx(
          'full-menu-content',
          {
            searchVisible: isSearchResultsVisible,
          },
          customClassName,
        )}
      >
        <div ref={burgerRef} className={cx('menu-wrapper')}>
          <div className={cx('first-wrapper')}>
            {/* Latest Travel Stories */}
            {latestStories?.length !== 0 && (
              <nav className={cx('latest-stories')}>
                <ul className="menu-name">{'New Stories'}</ul>
                <ul className={cx('menu-content')}>
                  {latestStories.slice(0, visiblePosts).map((post) => (
                    <li key={post?.id}>
                      {post?.uri && (
                        <Link href={post?.uri} className={cx('menu-item')}>
                          {post?.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
          <div className={cx('second-wrapper')}>
            {/* Feature Menu */}
            <NavigationMenu
              className={cx('feature-navigation')}
              menuItems={featureMenuItems}
              renderCustomItem={renderNavigationCustomItem}
            />
          </div>
          <div className={cx('fourth-wrapper')}>
            {/* Secondary Menu {Special Sections Menu} */}
            <NavigationMenu
              className={cx('feature-navigation')}
              menuItems={secondaryMenuItems}
              renderCustomItem={renderNavigationCustomItem}
            />
          </div>
          <div className={cx('sixth-wrapper')}></div>
          <div className={cx('seventh-wrapper')}>
            {/* Fifth Menu {Others Menu} */}
            <NavigationMenu
              className={cx(['fifth-navigation'])}
              menuItems={fifthMenuItems}
              renderCustomItem={renderNavigationCustomItem}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
