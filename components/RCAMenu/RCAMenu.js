import classNames from 'classnames/bind'
import styles from './RCAMenu.module.scss'
import { GetRCAMenu } from '@/queries/GetRCAMenu'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useSWRGraphQL } from '@/lib/useSWRGraphQL'
// Import Components
const Button = dynamic(() => import('@/components/Button/Button'))

let cx = classNames.bind(styles)

export default function RCAMenu({
  mainLogo,
  secondaryLogo,
  rcaDatabaseId,
  uri,
  isRCANavShown,
  setIsRCANavShown,
  customClassName,
  rcaRef,
  yearOfRCA,
}) {
  const postsPerPage = 100
  const firstYearOfRCA = 2007

  // Get Pages
  const { data, isLoading } = useSWRGraphQL('rca-menu', GetRCAMenu, {
    first: postsPerPage,
    after: null,
    id: rcaDatabaseId,
  })

  // Get all posts (including nested child posts if needed)
  const allPosts =
    data?.readersChoiceAward?.children?.edges.map((post) => post.node) || []

  // Filter posts where `parentCustomLabel` is null
  const filteredAllPosts = allPosts.filter(
    (post) => post?.rcaPageAttributes?.parentCustomLabel === null,
  )

  // Function to filter out duplicate categories
  const uniqueCategories = filteredAllPosts.reduce((unique, post) => {
    const categoryName = post?.categories?.edges[0]?.node?.name
    if (!unique.includes(categoryName)) {
      unique.push(categoryName)
    }
    return unique
  }, [])

  const getOrdinalSuffix = (number) => {
    if (!number) return '' // Handle null cases
    if (number % 100 >= 11 && number % 100 <= 13) return number + 'th' // Special case for 11-13
    switch (number % 10) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
      default:
        return number + 'th'
    }
  }

  const anniversary = yearOfRCA ? yearOfRCA - firstYearOfRCA : null
  const formattedAnniversary = anniversary
    ? getOrdinalSuffix(anniversary)
    : 'Unknown'

  // Loading state
  if (isLoading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]">
          <div role="status">
            <svg
              aria-hidden="true"
              className="text-black-200 dark:text-black-600 mr-2 h-[80vh] w-8 animate-spin fill-black"
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
    <div ref={rcaRef} className={cx('component')}>
      {/* Full menu */}
      <div
        className={cx(
          'full-menu-content',
          customClassName === 'light-color' ? 'full-menu-content-light' : '',
        )}
      >
        <div className={cx('menu-wrapper')}>
          {/* <NavigationMenu
            className={cx(['rca-navigation-menu'])}
            menuItems={filteredAllPosts}
          /> */}
          <div className={cx(['rca-navigation-menu'])}>
            <div className={cx('menu-name')}>
              {uri && (
                <Link href={uri}>
                  <span>
                    {`${formattedAnniversary} Annual Readers’ Choice Awards - ${yearOfRCA}`}
                  </span>
                </Link>
              )}
            </div>
            <div className={cx('menu')}>
              {uniqueCategories.map((categoryName, index) => (
                <div className={cx('menu-list-wrapper')} key={index}>
                  <div className={cx('category-wrapper')}>
                    <h2 className={cx('category')}>{categoryName}</h2>
                  </div>
                  <div className={cx('content-wrapper')}>
                    {filteredAllPosts.map((post) => {
                      const postCategory =
                        post?.categories?.edges[0]?.node?.name
                      if (postCategory === categoryName) {
                        return (
                          <div className={cx('content')} key={post?.id}>
                            <div className={cx('title-wrapper')}>
                              {post?.uri && (
                                <Link href={post?.uri}>
                                  <span className={cx('title')}>
                                    {post?.title}
                                  </span>
                                </Link>
                              )}
                            </div>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* close button */}
          <div className={cx('close-button')}>
            <button
              type="button"
              className={cx('close-icon')}
              onClick={() => {
                setIsRCANavShown(!isRCANavShown)
              }}
              aria-controls={cx('full-menu-wrapper')}
              aria-expanded={!isRCANavShown}
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
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
