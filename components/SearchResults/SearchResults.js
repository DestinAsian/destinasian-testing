import Link from 'next/link'
import { Container, FormatDate, LoadingSearchResult } from '../../components'
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

  return (
    <>
      <div className={styles.component}>
        {searchResults?.map((node) => (
          <Container>
            <div key={node.databaseId} className={styles.result}>
              <Link href={node.uri}>
                <a>
                  <h2 className={styles.title}>{node.title}</h2>
                </a>
              </Link>
              {/* <div className={styles.meta}>
                    <time className={styles.date} dateTime={node.date}>
                      <FormatDate date={node.date} />
                    </time>
                  </div> */}

              {/* Destinations */}
              {node.contentType?.node?.graphqlPluralName == 'Editorials' && (
                <Link href={node.categories?.edges[0]?.node?.uri}>
                  <h2 className={styles.meta}>
                    {node.categories?.edges[0]?.node?.name}
                  </h2>
                </Link>
              )}

              {/* Destination Guides */}
              {node.contentType?.node?.graphqlPluralName == 'posts' && (
                <Link href={node.categories?.edges[0]?.node?.uri}>
                  <h2 className={styles.meta}>
                    {node.categories?.edges[0]?.node?.parent?.node?.name}{' '}
                    {node.categories?.edges[0]?.node?.name}
                  </h2>
                </Link>
              )}

              {/* HonorsCircle */}
              {node.contentType?.node?.graphqlPluralName == 'HonorsCircles' && (
                <Link href={'/honors-circle'}>
                  <a>
                    <h2 className={styles.meta}>
                      {'Honors Circle'}
                    </h2>
                  </a>
                </Link>
              )}

              {/* Advertorials */}
              {node.contentType?.node?.graphqlPluralName == 'Advertorials' && (
                <Link href={node.uri}>
                  <a>
                    <h2 className={styles.meta}>
                      {node?.contentType?.node?.label}
                    </h2>
                  </a>
                </Link>
              )}

              <div
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
              />
            </div>
          </Container>
        ))}

        {isLoading === true && (
          <>
            <LoadingSearchResult />
            <LoadingSearchResult />
            <LoadingSearchResult />
          </>
        )}
      </div>
    </>
  )
}
