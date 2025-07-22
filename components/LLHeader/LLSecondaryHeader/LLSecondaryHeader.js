import classNames from 'classnames/bind'
import styles from './LLSecondaryHeader.module.scss'
import { useQuery } from '@apollo/client'
import { GetSearchResults } from '@/queries/GetSearchResults'
import { GetLatestPartnerContent } from '@/queries/GetLatestPartnerContent'
import { FaSearch } from 'react-icons/fa'
import dynamic from 'next/dynamic'
// Import Components
const SearchInput = dynamic(() =>
  import('@/components/SearchInput/SearchInput'),
)
const SearchResults = dynamic(() =>
  import('@/components/SearchResults/SearchResults'),
)
const RCAFullMenu = dynamic(() =>
  import('@/components/RCAFullMenu/RCAFullMenu'),
)
const MagazineFullMenu = dynamic(() =>
  import('@/components/MagazineFullMenu/MagazineFullMenu'),
)
const TravelGuidesMenu = dynamic(() =>
  import('@/components/TravelGuidesMenu/TravelGuidesMenu'),
)
const BurgerFullMenu = dynamic(() =>
  import('@/components/BurgerFullMenu/BurgerFullMenu'),
)

let cx = classNames.bind(styles)

export default function LLSecondaryHeader({
  primaryMenuItems,
  secondaryMenuItems,
  thirdMenuItems,
  fourthMenuItems,
  fifthMenuItems,
  featureMenuItems,
  latestStories,
  menusLoading,
  latestLoading,
  searchQuery,
  setSearchQuery,
  rcaDatabaseId,
  rcaUri,
  isSearchBarShown,
  setIsSearchBarShown,
  isGuidesNavShown,
  setIsGuidesNavShown,
  isMagNavShown,
  setIsMagNavShown,
  isRCANavShown,
  setIsRCANavShown,
  isBurgerNavShown,
  setIsBurgerNavShown,
  isAutoplayRunning,
  toggleAutoplay,
}) {
  // Posts for Search Function
  const postsPerPage = 1000

  // Clear search input
  const clearSearch = () => {
    setSearchQuery('') // Reset the search query
  }

  // Add search query function
  const {
    data: searchResultsData,
    loading: searchResultsLoading,
    error: searchResultsError,
  } = useQuery(GetSearchResults, {
    variables: {
      first: postsPerPage,
      after: null,
      search: searchQuery,
    },
    skip: searchQuery === '',
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  // Check if the search query is empty and no search results are loading, then hide the SearchResults component
  const isSearchResultsVisible = !!searchQuery

  // Create a Set to store unique databaseId values
  const uniqueDatabaseIds = new Set()

  // Initialize an array to store unique posts
  const contentNodesPosts = []

  // Loop through categories (assuming similar structure)
  searchResultsData?.categories?.edges?.forEach((post) => {
    const { databaseId } = post.node

    if (!uniqueDatabaseIds.has(databaseId)) {
      uniqueDatabaseIds.add(databaseId)
      contentNodesPosts.push(post.node)
    }
  })

  // Loop through tags
  searchResultsData?.tags?.edges?.forEach((contentNodes) => {
    contentNodes.node?.contentNodes?.edges.forEach((post) => {
      const { databaseId } = post.node

      if (!uniqueDatabaseIds.has(databaseId)) {
        uniqueDatabaseIds.add(databaseId)
        contentNodesPosts.push(post.node)
      }
    })
  })

  // Sort contentNodesPosts array by date
  contentNodesPosts.sort((a, b) => {
    // Assuming your date is stored in 'date' property of the post objects
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    // Compare the dates
    return dateB - dateA
  })

  // Get latest travel stories
  const { data: latestPartnerContent, loading: latestPartnerContentLoading } =
    useQuery(GetLatestPartnerContent, {
      variables: {
        first: 5,
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    })

  const advertorials = latestPartnerContent?.advertorials ?? []

  const allPartnerContents = []

  // loop through all the main categories partner content
  advertorials?.edges?.forEach((post) => {
    allPartnerContents.push(post.node)
  })

  return (
    <>
      <div className={cx('navigation-wrapper')}>
        <div className={cx('menu-wrapper')}>
          <button
            type="button"
            className={cx(
              'search-menu-button',
              isSearchBarShown ? 'active' : '',
            )}
            onClick={() => {
              setIsSearchBarShown(!isSearchBarShown)
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              isRCANavShown ? setIsRCANavShown(!isRCANavShown) : null
              isBurgerNavShown ? setIsBurgerNavShown(!isBurgerNavShown) : null
              setSearchQuery('')
              if (!isSearchBarShown && isAutoplayRunning) {
                return toggleAutoplay()
              }
              if (isSearchBarShown && !isAutoplayRunning) {
                return toggleAutoplay()
              }
            }}
            aria-controls={cx('search-bar-wrapper')}
            aria-expanded={!isSearchBarShown}
          >
            <FaSearch className={cx('search-icon')} />
          </button>
          <button
            type="button"
            className={cx('menu-button', isRCANavShown ? 'active' : '')}
            onClick={() => {
              setIsRCANavShown(!isRCANavShown)
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              isSearchBarShown ? setIsSearchBarShown(!isSearchBarShown) : null
              isBurgerNavShown ? setIsBurgerNavShown(!isBurgerNavShown) : null
              setSearchQuery('')
              if (!isRCANavShown && isAutoplayRunning) {
                return toggleAutoplay()
              }
              if (isRCANavShown && !isAutoplayRunning) {
                return toggleAutoplay()
              }
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isRCANavShown}
          >
            <div className={cx('menu-title')}>{`Readers' Choice Awards`}</div>
          </button>
          <button
            type="button"
            className={cx('menu-button', isMagNavShown ? 'active' : '')}
            onClick={() => {
              setIsMagNavShown(!isMagNavShown)
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isRCANavShown ? setIsRCANavShown(!isRCANavShown) : null
              isSearchBarShown ? setIsSearchBarShown(!isSearchBarShown) : null
              isBurgerNavShown ? setIsBurgerNavShown(!isBurgerNavShown) : null
              setSearchQuery('')
              if (!isMagNavShown && isAutoplayRunning) {
                return toggleAutoplay()
              }
              if (isMagNavShown && !isAutoplayRunning) {
                return toggleAutoplay()
              }
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isRCANavShown}
          >
            <div className={cx('menu-title')}>{`Magazine`}</div>
          </button>
          <button
            type="button"
            className={cx('menu-button', isGuidesNavShown ? 'active' : '')}
            onClick={() => {
              setIsGuidesNavShown(!isGuidesNavShown)
              isRCANavShown ? setIsRCANavShown(!isRCANavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              isSearchBarShown ? setIsSearchBarShown(!isSearchBarShown) : null
              isBurgerNavShown ? setIsBurgerNavShown(!isBurgerNavShown) : null
              setSearchQuery('')
              if (!isGuidesNavShown && isAutoplayRunning) {
                return toggleAutoplay()
              }
              if (isGuidesNavShown && !isAutoplayRunning) {
                return toggleAutoplay()
              }
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isRCANavShown}
          >
            <div className={cx('menu-title')}>{`Guides`}</div>
          </button>
          <button
            type="button"
            className={cx(
              'burger-menu-button',
              isBurgerNavShown ? 'active' : '',
            )}
            onClick={() => {
              setIsBurgerNavShown(!isBurgerNavShown)
              isSearchBarShown ? setIsSearchBarShown(!isSearchBarShown) : null
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isRCANavShown ? setIsRCANavShown(!isRCANavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              setSearchQuery('')
              if (!isBurgerNavShown && isAutoplayRunning) {
                return toggleAutoplay()
              }
              if (isBurgerNavShown && !isAutoplayRunning) {
                return toggleAutoplay()
              }
            }}
            aria-controls={cx('burger-bar-wrapper')}
            aria-expanded={!isRCANavShown}
          >
            <div className={cx('burger-icon')}>
              <svg
                width="28"
                height="23"
                viewBox="0 0 28 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="28" height="5" fill="#000000" />
                <rect y="9" width="28" height="5" fill="#000000" />
                <rect y="18" width="28" height="5" fill="#000000" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={cx(
          'search-bar-wrapper',
          isSearchBarShown ? 'show' : undefined,
        )}
      >
        <div className={cx('search-bg-wrapper')}>
          <div className={cx('search-input-wrapper')}>
            <SearchInput
              value={searchQuery}
              onChange={(newValue) => setSearchQuery(newValue)}
              clearSearch={clearSearch}
            />
          </div>
          <div className={cx('search-result-wrapper')}>
            {searchResultsError && (
              <div className={cx('alert-error')}>
                {'An error has occurred. Please refresh and try again.'}
              </div>
            )}

            {/* Conditionally render the SearchResults component */}
            {isSearchResultsVisible && (
              <SearchResults
                searchResults={contentNodesPosts}
                isLoading={searchResultsLoading}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={cx(
          'full-menu-content',
          isGuidesNavShown ? 'show' : undefined,
        )}
      >
        <div className={cx('full-menu-wrapper')}>
          <TravelGuidesMenu className={'dark-color'} />
        </div>
      </div>
      {/* Full menu */}
      <div
        className={cx([
          'magazine-menu-wrapper',
          isMagNavShown ? 'show' : undefined,
        ])}
      >
        <MagazineFullMenu
          primaryMenuItems={primaryMenuItems}
          secondaryMenuItems={secondaryMenuItems}
          thirdMenuItems={thirdMenuItems}
          fourthMenuItems={fourthMenuItems}
          fifthMenuItems={fifthMenuItems}
          featureMenuItems={featureMenuItems}
          latestStories={latestStories}
          menusLoading={menusLoading}
          latestLoading={latestLoading}
          latestPartnerContent={allPartnerContents}
          latestPartnerContentLoading={latestPartnerContentLoading}
          customClassName={'dark-color'}
        />
      </div>
      <div
        className={cx('rca-menu-wrapper', isRCANavShown ? 'show' : undefined)}
      >
        <RCAFullMenu
          rcaDatabaseId={rcaDatabaseId}
          uri={rcaUri}
          isNavShown={isRCANavShown}
          setIsNavShown={setIsRCANavShown}
        />
      </div>
      {/* Burger Menu */}
      <div
        className={cx([
          'burger-menu-wrapper',
          isBurgerNavShown ? 'show' : undefined,
        ])}
      >
        <BurgerFullMenu
          primaryMenuItems={primaryMenuItems}
          secondaryMenuItems={secondaryMenuItems}
          thirdMenuItems={thirdMenuItems}
          fourthMenuItems={fourthMenuItems}
          fifthMenuItems={fifthMenuItems}
          featureMenuItems={featureMenuItems}
          latestStories={latestStories}
          menusLoading={menusLoading}
          latestLoading={latestLoading}
          customClassName={'dark-color'}
        />
      </div>
    </>
  )
}
