import {
  CategoryIcon,
  FeaturedImage,
  LocationIcon,
  PostInfo,
} from '../../components'
import { FaSearch } from 'react-icons/fa'
import className from 'classnames/bind'

import styles from './SearchResults.module.scss'
import Link from 'next/link'

let cx = className.bind(styles)

/**
 * Renders the search results list.
 *
 * @param {Props} props The props object.
 * @param {object[]} props.searchResults The search results list.
 * @param {boolean} props.isLoading Whether the search results are loading.
 * @returns {React.ReactElement} The SearchResults component.
 */
export default function SearchResults({ searchResults, isLoading }) {
  // If there are no results, or are loading, return null.
  if (!isLoading && searchResults === undefined) {
    return null
  }

  // If there are no results, return a message.
  if (!isLoading && !searchResults?.length) {
    return (
      <div className={styles['no-results']}>
        <FaSearch className={styles['no-results-icon']} />
        <div className={styles['no-results-text']}>No results</div>
      </div>
    )
  }

  // If loading is running, return a Loading screen
  if (isLoading) {
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

  const calculateTrimmedExcerpt = (excerpt, uri, title) => {
    const MAX_EXCERPT_LENGTH = 100 // You can adjust this value according to your needs

    let trimmedExcerpt = excerpt?.substring(0, MAX_EXCERPT_LENGTH)
    const lastSpaceIndex = trimmedExcerpt?.lastIndexOf(' ')

    if (lastSpaceIndex !== -1) {
      trimmedExcerpt = trimmedExcerpt?.substring(0, lastSpaceIndex) + '...'
    }

    return `${trimmedExcerpt} <a class="more-link" href="${uri}">Continue reading <span class="screen-reader-text">${title}</span></a>`
  }

  return (
    <>
      <div className={cx('component')}>
        {searchResults?.map((node) => (
          <div className={cx('content-wrapper')}>
            <div className={cx('left-wrapper')}>
              {node?.featuredImage?.node && (
                <Link href={node?.uri}>
                  <div className={cx('wrapper-image')}>
                    <FeaturedImage
                      image={node?.featuredImage?.node}
                      className={cx('featured-image')}
                    />
                  </div>
                </Link>
              )}
            </div>

            <div className={cx('right-wrapper')}>
              <div key={node?.databaseId} className={cx('result')}>
                <div className={cx('category-wrapper')}>
                  {/* Destinations */}
                  {node?.contentType?.node?.graphqlPluralName ==
                    'Editorials' && (
                    <Link href={node?.categories?.edges[0]?.node?.uri}>
                      <h2 className={cx('meta')}>
                        {node?.categories?.edges[0]?.node?.name}
                      </h2>
                    </Link>
                  )}

                  {/* Destination Guides */}
                  {node?.contentType?.node?.graphqlPluralName == 'posts' && (
                    <Link href={node?.categories?.edges[0]?.node?.uri}>
                      <h2 className={cx('meta')}>
                        {node?.categories?.edges[0]?.node?.parent?.node?.name}{' '}
                        {node?.categories?.edges[0]?.node?.name}
                      </h2>
                    </Link>
                  )}

                  {/* Update */}
                  {node?.contentType?.node?.graphqlPluralName == 'Updates' && (
                    <Link href={node?.categories?.edges[0]?.node?.uri}>
                      <h2 className={cx('meta')}>
                        {node?.categories?.edges[0]?.node?.parent?.node?.name}{' '}
                        {node?.categories?.edges[0]?.node?.name}
                      </h2>
                    </Link>
                  )}

                  {/* HonorsCircle */}
                  {node?.contentType?.node?.graphqlPluralName ==
                    'HonorsCircles' && (
                    <Link href={'/honors-circle'}>
                      <h2 className={cx('meta')}>{'Honors Circle'}</h2>
                    </Link>
                  )}

                  {/* Advertorials */}
                  {node?.contentType?.node?.graphqlPluralName ==
                    'Advertorials' && (
                    <Link href={node?.uri}>
                      <h2 className={cx('meta')}>
                        {node?.contentType?.node?.label}
                      </h2>
                    </Link>
                  )}

                  {/* LuxeList */}
                  {node?.contentType?.node?.graphqlPluralName ==
                    'LuxeLists' && (
                    <Link href={'/luxe-list/2023-lineup'}>
                      <h2 className={cx('meta')}>{'Luxe List'}</h2>
                    </Link>
                  )}

                  {/* Contest */}
                  {node?.contentType?.node?.graphqlPluralName == 'Contests' && (
                    <Link href={'/contests'}>
                      <h2 className={cx('meta')}>{'Contest'}</h2>
                    </Link>
                  )}
                </div>

                <Link href={node?.uri}>
                  <h2 className={cx('title')}>{node?.title}</h2>
                </Link>

                <div className={cx('meta-wrapper')}>
                  <div className={cx('date-wrapper')}>
                    <PostInfo date={node?.date} className={cx('meta')} />
                  </div>
                  {node?.acfCategoryIcon && node?.acfLocationIcon && (
                    <div className={cx('icon-wrapper')}>
                      <CategoryIcon
                        chooseYourCategory={
                          node?.acfCategoryIcon?.chooseYourCategory
                        }
                        chooseIcon={
                          node?.acfCategoryIcon?.chooseIcon?.mediaItemUrl
                        }
                        categoryLabel={node?.acfCategoryIcon?.categoryLabel}
                      />
                      <LocationIcon
                        locationValidation={
                          node?.acfLocationIcon?.fieldGroupName
                        }
                        locationLabel={node?.acfLocationIcon?.locationLabel}
                        locationUrl={node?.acfLocationIcon?.locationUrl}
                      />
                    </div>
                  )}
                </div>

                {node?.excerpt && (
                  <Link href={node?.uri}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: calculateTrimmedExcerpt(
                          node?.excerpt,
                          node?.uri,
                          node?.title,
                        ),
                      }}
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
