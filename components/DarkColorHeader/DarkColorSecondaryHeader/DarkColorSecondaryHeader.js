import classNames from 'classnames/bind'
import styles from './DarkColorSecondaryHeader.module.scss'
import { useQuery } from '@apollo/client'
import { useRef, useMemo, useState, useEffect } from 'react'
import { useClickOutside } from '@/constants/useClickOutside'
import { CUSTOM_DATABASE_ID } from '@/constants/customDatabaseId'
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
const NavigationMenu = dynamic(() =>
  import('@/components/NavigationMenu/NavigationMenu'),
)
const LLMenu = dynamic(() => import('@/components/LLMenu/LLMenu'))
const TravelGuidesMenu = dynamic(() =>
  import('@/components/TravelGuidesMenu/TravelGuidesMenu'),
)
const HCMenu = dynamic(() => import('@/components/HCMenu/HCMenu'))
const BurgerFullMenu = dynamic(() =>
  import('@/components/BurgerFullMenu/BurgerFullMenu'),
)

let cx = classNames.bind(styles)

export default function DarkColorSecondaryHeader({
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
  isSearchBarShown,
  setIsSearchBarShown,
  isGuidesNavShown,
  setIsGuidesNavShown,
  isMagNavShown,
  setIsMagNavShown,
  isCustomNavShown,
  setIsCustomNavShown,
  isHCNavShown,
  setIsHCNavShown,
  isBurgerNavShown,
  setIsBurgerNavShown,
  // isAutoplayRunning,
  // toggleAutoplay,
  customClassName,
}) {
  // Posts for Search Function
  const postsPerPage = 200

  // Search Results Query
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [year, setYear] = useState(2024)

  // Clear search input
  const clearSearch = () => {
    setSearchQuery('') // Reset the search query
  }

  const searchRef = useRef(null)
  const guidesRef = useRef(null)
  const magazineRef = useRef(null)
  const customRef = useRef(null)
  const hcRef = useRef(null)
  const burgerRef = useRef(null)
  const menuRef = useRef(null)

  // Close handlers
  useClickOutside(searchRef, () => setIsSearchBarShown(false), [menuRef])
  useClickOutside(guidesRef, () => setIsGuidesNavShown(false), [menuRef])
  useClickOutside(magazineRef, () => setIsMagNavShown(false), [menuRef])
  useClickOutside(customRef, () => setIsCustomNavShown(false), [menuRef])
  useClickOutside(hcRef, () => setIsHCNavShown(false), [menuRef])
  useClickOutside(burgerRef, () => setIsBurgerNavShown(false), [menuRef])

  // Add search query function
  const {
    data: searchResultsData,
    loading,
    error,
    fetchMore,
  } = useQuery(GetSearchResults, {
    variables: {
      first: postsPerPage,

      search: searchQuery,
      year,
    },
    skip: !searchQuery,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
  })

  // Check if the search query is empty and no search results are loading, then hide the SearchResults component
  const isSearchResultsVisible = !!searchQuery

  const MIN_YEAR = 2023

  const fetchMorePosts = async () => {
    if (isFetchingMore) return

    const nextYear = year - 1
    if (nextYear < MIN_YEAR) return

    setIsFetchingMore(true)

    await fetchMore({
      variables: {
        year: nextYear,
      },
    })

    setYear(nextYear)
    setIsFetchingMore(false)
  }

  // Search Results - tags content nodes, remove duplicates, and sort by date
  const contentNodesPosts = useMemo(() => {
    if (!searchResultsData?.tags?.edges) return []

    const seen = new Set()
    const results = []

    for (const { node } of searchResultsData.tags.edges) {
      for (const { node: post } of node.contentNodes.edges) {
        if (!post?.databaseId) continue
        if (post?.passwordProtected?.onOff) continue
        if (seen.has(post.databaseId)) continue

        seen.add(post.databaseId)
        results.push(post)
      }
    }

    results.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    return results
  }, [searchResultsData?.tags?.edges])

  useEffect(() => {
    if (!searchQuery) return

    setYear(2024)
  }, [searchQuery])

  // Get latest travel stories
  const { data: latestPartnerContent, loading: latestPartnerContentLoading } =
    useQuery(GetLatestPartnerContent, {
      variables: {
        first: 10,
      },
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'network-only',
    })

  const advertorials = latestPartnerContent?.advertorials ?? []

  const allPartnerContents =
    advertorials?.edges
      ?.filter((post) => !post.node?.passwordProtected?.onOff)
      .map((post) => post.node) ?? []

  return (
    <>
      <div className={cx('navigation-wrapper')}>
        <div ref={menuRef} className={cx('menu-wrapper')}>
          {/* Search Button */}
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
              isCustomNavShown ? setIsCustomNavShown(!isCustomNavShown) : null
              isHCNavShown ? setIsHCNavShown(!isHCNavShown) : null
              isBurgerNavShown ? setIsBurgerNavShown(!isBurgerNavShown) : null
              setSearchQuery('')
              // if (!isSearchBarShown && isAutoplayRunning) {
              //   return toggleAutoplay()
              // }
              // if (isSearchBarShown && !isAutoplayRunning) {
              //   return toggleAutoplay()
              // }
            }}
            aria-controls={cx('search-bar-wrapper')}
            aria-expanded={!isSearchBarShown}
          >
            <FaSearch className={cx('search-icon')} />
          </button>
          {/* RCA Button */}
          <button
            type="button"
            className={cx('menu-button', isCustomNavShown ? 'active' : '')}
            onClick={() => {
              setIsCustomNavShown(!isCustomNavShown)
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              isSearchBarShown ? setIsSearchBarShown(!isSearchBarShown) : null
              isHCNavShown ? setIsHCNavShown(!isHCNavShown) : null
              isBurgerNavShown ? setIsBurgerNavShown(!isBurgerNavShown) : null
              // setSearchQuery('')
              // if (!isCustomNavShown && isAutoplayRunning) {
              //   return toggleAutoplay()
              // }
              // if (isCustomNavShown && !isAutoplayRunning) {
              //   return toggleAutoplay()
              // }
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isCustomNavShown}
          >
            <div className={cx('menu-title')}>{`The Luxe List 2025`}</div>
          </button>
          {/* Guides Button */}
          <button
            type="button"
            className={cx('menu-button', isGuidesNavShown ? 'active' : '')}
            onClick={() => {
              setIsGuidesNavShown(!isGuidesNavShown)
              isCustomNavShown ? setIsCustomNavShown(!isCustomNavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              isSearchBarShown ? setIsSearchBarShown(!isSearchBarShown) : null
              isHCNavShown ? setIsHCNavShown(!isHCNavShown) : null
              isBurgerNavShown ? setIsBurgerNavShown(!isBurgerNavShown) : null
              setSearchQuery('')
              // if (!isGuidesNavShown && isAutoplayRunning) {
              //   return toggleAutoplay()
              // }
              // if (isGuidesNavShown && !isAutoplayRunning) {
              //   return toggleAutoplay()
              // }
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isCustomNavShown}
          >
            <div className={cx('menu-title')}>{`Guides`}</div>
          </button>
          {/* Honors Circle Button */}
          <button
            type="button"
            className={cx('menu-button', isHCNavShown ? 'active' : '')}
            onClick={() => {
              setIsHCNavShown(!isHCNavShown)
              isSearchBarShown ? setIsSearchBarShown(!isSearchBarShown) : null
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              isCustomNavShown ? setIsCustomNavShown(!isCustomNavShown) : null
              isBurgerNavShown ? setIsBurgerNavShown(!isBurgerNavShown) : null
              setSearchQuery('')
            }}
            aria-controls={cx('hc-menu-wrapper')}
            aria-expanded={!isCustomNavShown}
          >
            <div className={cx('menu-title')}>{'Honors Circle'}</div>
          </button>
          {/* Burger Button */}
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
              isHCNavShown ? setIsHCNavShown(!isHCNavShown) : null
              isCustomNavShown ? setIsCustomNavShown(!isCustomNavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              setSearchQuery('')
              // if (!isBurgerNavShown && isAutoplayRunning) {
              //   return toggleAutoplay()
              // }
              // if (isBurgerNavShown && !isAutoplayRunning) {
              //   return toggleAutoplay()
              // }
            }}
            aria-controls={cx('burger-bar-wrapper')}
            aria-expanded={!isCustomNavShown}
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
        <div ref={searchRef} className={cx('search-bg-wrapper')}>
          <div className={cx('search-input-wrapper')}>
            <SearchInput
              value={searchQuery}
              onChange={(newValue) => setSearchQuery(newValue)}
              clearSearch={clearSearch}
            />
          </div>
          <div className={cx('search-header-wrapper')}>
            {/* Third Menu {Luxe List Menu} */}
            <NavigationMenu
              className={cx(['third-navigation'])}
              menuItems={thirdMenuItems}
            />
            {/* Readers' Choice Awards Menu */}
            <NavigationMenu
              className={cx('fourth-navigation')}
              menuItems={fourthMenuItems}
            />
          </div>
          <div className={cx('search-result-wrapper')}>
            {error && (
              <div className={cx('alert-error')}>
                {'An error has occurred. Please refresh and try again.'}
              </div>
            )}

            {/* Conditionally render the SearchResults component */}
            {isSearchResultsVisible && (
              <SearchResults
                searchResults={contentNodesPosts}
                isLoading={loading}
                isFetchingMore={isFetchingMore}
                onLoadMore={fetchMorePosts}
                hasMore={year > 2023}
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
        <div ref={guidesRef} className={cx('full-menu-wrapper')}>
          <TravelGuidesMenu className={'dark-color'} />
        </div>
      </div>
      <div
        className={cx(
          'rca-menu-wrapper',
          isCustomNavShown ? 'show' : undefined,
        )}
      >
        <LLMenu
          databaseId={CUSTOM_DATABASE_ID}
          isNavShown={isCustomNavShown}
          setIsNavShown={setIsCustomNavShown}
          customRef={customRef}
          customClassName={customClassName}
        />
      </div>
      {/* Honors Circle Menu */}
      <div
        className={cx('full-menu-content', isHCNavShown ? 'show' : undefined)}
      >
        <div ref={hcRef} className={cx('hc-menu-wrapper')}>
          <HCMenu customClassName={'dark-color'} />
        </div>
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
          latestPartnerContent={allPartnerContents}
          latestPartnerContentLoading={latestPartnerContentLoading}
          customClassName={'dark-color'}
          burgerRef={burgerRef}
        />
      </div>
    </>
  )
}
