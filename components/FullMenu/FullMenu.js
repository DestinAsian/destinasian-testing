import { useQuery } from '@apollo/client'
import classNames from 'classnames/bind'
import { NavigationMenu, SearchInput, SearchResults, Button } from '..'
import styles from './FullMenu.module.scss'
import { useState } from 'react'
import { GetSearchResults } from '../../queries/GetSearchResults'
import appConfig from '../../app.config'

let cx = classNames.bind(styles)

export default function FullMenu({
  primaryMenuItems,
  secondaryMenuItems,
  thirdMenuItems,
  fourthMenuItems,
  fifthMenuItems,
  featureMenuItems,
  latestStories,
}) {
  const [visiblePosts] = useState(3)
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

  // Check if the search query is empty and no search results are loading, then hide the SearchResults component
  const isSearchResultsVisible = !!(searchQuery && !searchResultsLoading)

  return (
    <div className={cx('component')}>
      {/* Full menu */}
      <div className={cx('full-menu-content')}>
        {/* Search Bar */}
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

            {/* Conditionally render the SearchResults component */}
            {isSearchResultsVisible && (
              <SearchResults
                searchResults={searchResultsData?.contentNodes?.edges?.map(
                  ({ node }) => node,
                )}
                isLoading={searchResultsLoading}
              />
            )}
          </div>
        </div>
        <div className={cx('first-wrapper')}>
          {/* Secondary Menu {Destinations Menu} */}
          <NavigationMenu
            className={cx('secondary-navigation')}
            menuItems={secondaryMenuItems}
          />
        </div>
        <div className={cx('second-wrapper')}>
          {/* Primary Menu {Destination Guides Menu} */}
          <NavigationMenu
            className={cx('primary-navigation')}
            menuItems={primaryMenuItems}
          />
        </div>
        <div className={cx('third-wrapper')}>
          {/* Feature Stories & Latest Travel Stories */}
          <nav className={cx('feature-stories')}>
            <NavigationMenu
              className={cx('feature-navigation')}
              menuItems={featureMenuItems}
            />
          </nav>
          <nav className={cx('latest-stories')}>
            <ul className={cx('menu-name')}>{'Latest Travel Stories'}</ul>
            <ul className={cx('menu-content')}>
              {latestStories.length !== 0 &&
                latestStories.slice(0, visiblePosts).map((post) => (
                  <li key={post.id}>
                    <a href={post.uri}>{post.title}</a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
        <div className={cx('fourth-wrapper')}>
          <div className={cx('left-wrapper')}>
            {/* Third Menu {Static Pages Menu} */}
            <NavigationMenu
              className={cx(['third-navigation'])}
              menuItems={thirdMenuItems}
            />
            {/* Fourth Menu {Newsletters Menu} */}
            <NavigationMenu
              className={cx(['fourth-navigation'])}
              menuItems={fourthMenuItems}
            />
          </div>
          <div className={cx('right-wrapper')}>
            {/* Fifth Menu {Print Magazine Menu} */}
            <NavigationMenu
              className={cx(['fifth-navigation'])}
              menuItems={fifthMenuItems}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
