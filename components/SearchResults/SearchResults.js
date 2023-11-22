import { FeaturedImage, LoadingSearchResult } from '../../components'
import { FaSearch } from 'react-icons/fa'

import styles from './SearchResults.module.scss'

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

  // // trimmedExcerpt
  // let trimmedExcerpt = excerpt?.substring(0, MAX_EXCERPT_LENGTH)
  // const lastSpaceIndex = trimmedExcerpt?.lastIndexOf(' ')

  // if (lastSpaceIndex !== -1) {
  //   trimmedExcerpt = trimmedExcerpt?.substring(0, lastSpaceIndex) + '...'
  // }

  return (
    <>
      <div className={styles.component}>
        {searchResults?.map((node) => (
          <div className={styles.contentWrapper}>
            {/* {node.featuredImage.node && (
              <div className={styles.wrapperImage}>
                <a href={node.uri}>
                  <FeaturedImage
                    image={node.featuredImage.node}
                    className={styles.featuredImage}
                  />
                </a>
              </div>
            )} */}
            <div key={node.databaseId} className={styles.result}>
              <a href={node.uri}>
                <h2 className={styles.title}>{node.title}</h2>
              </a>

              {/* Destinations */}
              {node.contentType?.node?.graphqlPluralName == 'Editorials' && (
                <a href={node.categories?.edges[0]?.node?.uri}>
                  <h2 className={styles.meta}>
                    {node.categories?.edges[0]?.node?.name}
                  </h2>
                </a>
              )}

              {/* Destination Guides */}
              {node.contentType?.node?.graphqlPluralName == 'posts' && (
                <a href={node.categories?.edges[0]?.node?.uri}>
                  <h2 className={styles.meta}>
                    {node.categories?.edges[0]?.node?.parent?.node?.name}{' '}
                    {node.categories?.edges[0]?.node?.name}
                  </h2>
                </a>
              )}

              {/* HonorsCircle */}
              {node.contentType?.node?.graphqlPluralName == 'HonorsCircles' && (
                <a href={'/honors-circle'}>
                  <h2 className={styles.meta}>{'Honors Circle'}</h2>
                </a>
              )}

              {/* Advertorials */}
              {node.contentType?.node?.graphqlPluralName == 'Advertorials' && (
                <a href={node.uri}>
                  <h2 className={styles.meta}>
                    {node?.contentType?.node?.label}
                  </h2>
                </a>
              )}

              {/* LuxeList */}
              {node.contentType?.node?.graphqlPluralName == 'LuxeLists' && (
                <a href={'/luxe-list/2023-lineup'}>
                  <h2 className={styles.meta}>{'Luxe List'}</h2>
                </a>
              )}

              {/* Contest */}
              {node.contentType?.node?.graphqlPluralName == 'Contests' && (
                <a href={'/contests'}>
                  <h2 className={styles.meta}>{'Contest'}</h2>
                </a>
              )}

              <a href={node.uri}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: node.excerpt,
                  }}
                />
              </a>
            </div>
          </div>
        ))}

        {/* {isLoading === true && (
          <>
            <LoadingSearchResult />
            <LoadingSearchResult />
            <LoadingSearchResult />
            <LoadingSearchResult />
            <LoadingSearchResult />
          </>
        )} */}
      </div>
    </>
  )
}
