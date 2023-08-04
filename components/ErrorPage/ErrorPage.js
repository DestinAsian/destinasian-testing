import { useQuery } from '@apollo/client'
import { useState } from 'react'
import className from 'classnames/bind'
import { SearchInput, SearchResults, FeaturedImage } from '..'
import styles from './ErrorPage.module.scss'
import { GetSearchResults } from '../../queries/GetSearchResults'
import appConfig from '../../app.config'

let cx = className.bind(styles)

export default function ErrorPage({ image, title, content }) {
  const [searchQuery, setSearchQuery] = useState('')

  // Add search query function
  const {
    data: searchResultsData,
    loading: searchResultsLoading,
    error: searchResultsError,
  } = useQuery(GetSearchResults, {
    variables: {
      first: appConfig.postsPerPage,
      after: '',
      search: searchQuery,
    },
    skip: searchQuery === '',
    fetchPolicy: 'network-only',
  })

  return (
    <div className={cx(['component', className])}>
      <div className={cx('image-wrapper')}>
        {image && (
          <FeaturedImage
            image={image}
            layout={'fill'}
            className={cx('image')}
            priority
          />
        )}
      </div>
      <div className={cx('title-wrapper')}>{title}</div>
      <div
        className={cx('content-wrapper')}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className={cx('search-bar-wrapper')}>
        <div className={cx('search-input-wrapper')}>
          <SearchInput
            value={searchQuery}
            onChange={(newValue) => setSearchQuery(newValue)}
          />
        </div>
        <div className={cx('search-result-wrapper')}>
          {searchResultsError && (
            <div className="alert-error">
              {'An error has occurred. Please refresh and try again.'}
            </div>
          )}

          <SearchResults
            searchResults={searchResultsData?.contentNodes?.edges?.map(
              ({ node }) => node,
            )}
            isLoading={searchResultsLoading}
          />
        </div>
      </div>
      <div className={cx('footer-wrapper')}>
        {'Go to '}
        <a href="/">{'DestinAsian.com'}</a>
      </div>
    </div>
  )
}
