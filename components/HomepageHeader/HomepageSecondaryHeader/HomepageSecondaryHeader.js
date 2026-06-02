import classNames from 'classnames/bind'
import styles from './HomepageSecondaryHeader.module.scss'
import { useRef, useMemo, useState, useEffect } from 'react'
import { useClickOutside } from '@/constants/useClickOutside'
import { CUSTOM_DATABASE_ID } from '@/constants/customDatabaseId'
import { HEADER_REF_KEYS } from '@/constants/headerConfig'
import { WEDDING_SLUG } from '@/constants/weddingSlug'
import { GetSearchResults } from '@/queries/GetSearchResults'
import { GetLatestPartnerContent } from '@/queries/GetLatestPartnerContent'
import { FaSearch } from 'react-icons/fa'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useSWRGraphQL } from '@/lib/useSWRGraphQL'
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
const RCAFullMenu = dynamic(() =>
  import('@/components/RCAFullMenu/RCAFullMenu'),
)
const HCMenu = dynamic(() => import('@/components/HCMenu/HCMenu'))
const BurgerFullMenu = dynamic(() =>
  import('@/components/BurgerFullMenu/BurgerFullMenu'),
)

let cx = classNames.bind(styles)

export default function HomepageSecondaryHeader({
  primaryMenuItems,
  secondaryMenuItems,
  thirdMenuItems,
  fourthMenuItems,
  fifthMenuItems,
  featureMenuItems,
  latestStories,
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
  isScrolled,
  burgerButtonRef,
}) {
  // Posts for Search Function
  const postsPerPage = 200

  // Search Results Query
  const MIN_YEAR = 2023
  const [year, setYear] = useState(2024)
  const [yearsLoaded, setYearsLoaded] = useState([2024])
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  // Clear search input
  const clearSearch = () => {
    setSearchQuery('') // Reset the search query
  }

  const refs = {
    [HEADER_REF_KEYS.SEARCH]: useRef(null),
    [HEADER_REF_KEYS.GUIDES]: useRef(null),
    [HEADER_REF_KEYS.MAGAZINE]: useRef(null),
    [HEADER_REF_KEYS.CUSTOM]: useRef(null),
    [HEADER_REF_KEYS.HC]: useRef(null),
    [HEADER_REF_KEYS.BURGER]: useRef(null),
    [HEADER_REF_KEYS.MENU]: useRef(null),
  }

  const {
    searchRef,
    guidesRef,
    magazineRef,
    customRef,
    hcRef,
    burgerRef,
    menuRef,
  } = refs

  // Close handlers
  useClickOutside(searchRef, () => setIsSearchBarShown(false), [menuRef])
  useClickOutside(guidesRef, () => setIsGuidesNavShown(false), [menuRef])
  useClickOutside(magazineRef, () => setIsMagNavShown(false), [menuRef])
  useClickOutside(customRef, () => setIsCustomNavShown(false), [menuRef])
  useClickOutside(hcRef, () => setIsHCNavShown(false), [menuRef])
  useClickOutside(burgerRef, () => setIsBurgerNavShown(false), [
    menuRef,
    burgerButtonRef,
  ])

  // Add search query function
  const swrKey = searchQuery ? ['search-results', searchQuery, year] : null

  const {
    data: searchResultsData,
    isLoading,
    error,
  } = useSWRGraphQL(swrKey, GetSearchResults, {
    first: postsPerPage,
    search: searchQuery,
    year,
  })

  // Check if the search query is empty and no search results are loading, then hide the SearchResults component
  const isSearchResultsVisible = !!searchQuery

  const fetchMorePosts = () => {
    if (isFetchingMore) return

    const nextYear = year - 1
    if (nextYear < MIN_YEAR) return

    setIsFetchingMore(true)

    setYearsLoaded((prev) => [...prev, nextYear])
    setYear(nextYear)

    setIsFetchingMore(false)
  }

  // Search Results - combine content types, remove duplicates, and sort by date
  const contentNodesPosts = useMemo(() => {
    if (!searchResultsData) return []

    const edgesGroups = [
      searchResultsData.posts?.edges,
      searchResultsData.editorials?.edges,
      searchResultsData.updates?.edges,
      searchResultsData.advertorials?.edges,
    ]

    const seen = new Set()
    const results = []

    for (const edges of edgesGroups) {
      for (const { node: post } of edges ?? []) {
        if (!post?.databaseId) continue
        if (post?.passwordProtected?.onOff) continue
        if (seen.has(post.databaseId)) continue

        seen.add(post.databaseId)
        results.push(post)
      }
    }

    results.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    return results
  }, [searchResultsData])

  useEffect(() => {
    if (!searchQuery) return

    setYear(2024)
    setYearsLoaded([2024])
  }, [searchQuery])

  // Get latest travel stories
  const { data: latestPartnerContent, isLoading: latestPartnerContentLoading } =
    useSWRGraphQL('latest-partner-content', GetLatestPartnerContent, {
      first: 10,
    })

  const advertorials = latestPartnerContent?.advertorials ?? []

  const allPartnerContents =
    advertorials?.edges
      ?.filter((post) => !post.node?.passwordProtected?.onOff)
      .map((post) => post.node) ?? []

  return (
    <>
      <div className={cx('navigation-wrapper', { sticky: isScrolled })}>
        <div ref={menuRef} className={cx('menu-wrapper')}>
          {/* Search Button */}
          <button
            type="button"
            className={cx(
              'search-menu-button',
              isSearchBarShown ? 'active' : '',
              isSearchBarShown && !isScrolled && 'active-not-scrolled',
            )}
            onClick={() => {
              setIsSearchBarShown(!isSearchBarShown)
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              isHCNavShown ? setIsHCNavShown(!isHCNavShown) : null
              isCustomNavShown ? setIsCustomNavShown(!isCustomNavShown) : null
              isBurgerNavShown ? setIsBurgerNavShown(!isBurgerNavShown) : null
              setSearchQuery('')
            }}
            aria-controls={cx('search-bar-wrapper')}
            aria-expanded={!isSearchBarShown}
          >
            <FaSearch className={cx('search-icon')} />
          </button>
          {/* RCA Button */}
          <button
            type="button"
            className={cx(
              'menu-button',
              isCustomNavShown ? 'active' : '',
              isCustomNavShown && !isScrolled && 'active-not-scrolled',
            )}
            onClick={() => {
              setIsCustomNavShown(!isCustomNavShown)
              isSearchBarShown ? setIsSearchBarShown(!isSearchBarShown) : null
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              isHCNavShown ? setIsHCNavShown(!isHCNavShown) : null
              isBurgerNavShown ? setIsBurgerNavShown(!isBurgerNavShown) : null
              setSearchQuery('')
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isCustomNavShown}
          >
            <div className={cx('menu-title')}>{`Readers’ Choice Awards`}</div>
          </button>
          {/* Guides Button */}
          <button
            type="button"
            className={cx(
              'menu-button',
              isGuidesNavShown ? 'active' : '',
              isGuidesNavShown && !isScrolled && 'active-not-scrolled',
            )}
            onClick={() => {
              setIsGuidesNavShown(!isGuidesNavShown)
              isSearchBarShown ? setIsSearchBarShown(!isSearchBarShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              isHCNavShown ? setIsHCNavShown(!isHCNavShown) : null
              isCustomNavShown ? setIsCustomNavShown(!isCustomNavShown) : null
              isBurgerNavShown ? setIsBurgerNavShown(!isBurgerNavShown) : null
              setSearchQuery('')
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isCustomNavShown}
          >
            <div className={cx('menu-title')}>{`Destinations`}</div>
          </button>
          {/* Honors Circle Button */}
          <button
            type="button"
            className={cx(
              // 'hc-menu-button',
              'menu-button',
              isHCNavShown ? 'active' : '',
              isHCNavShown && !isScrolled && 'active-not-scrolled',
            )}
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
          {/* Weddings Button */}
          <Link
            href={WEDDING_SLUG}
            target="_blank"
            className={cx(
              'desktop-menu-button',
              !isScrolled && 'active-not-scrolled',
            )}
          >
            {'WEDDINGS'}
          </Link>
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
                isLoading={isLoading}
                isFetchingMore={isFetchingMore}
                onLoadMore={fetchMorePosts}
                hasMore={year > MIN_YEAR}
              />
            )}
          </div>
        </div>
      </div>
      {/* RCA Menu */}
      <div
        className={cx(
          'rca-menu-wrapper',
          isCustomNavShown ? 'show' : undefined,
        )}
      >
        <RCAFullMenu
          rcaDatabaseId={CUSTOM_DATABASE_ID}
          uri={'/readers-choice-awards/winners'}
          yearOfRCA={'2026'}
          isNavShown={isCustomNavShown}
          setIsNavShown={setIsCustomNavShown}
          rcaRef={customRef}
          customClassName={'light-color'}
        />
      </div>
      {/* Guides Menu */}
      <div
        className={cx(
          'full-menu-content',
          isGuidesNavShown ? 'show' : undefined,
        )}
      >
        <div ref={guidesRef} className={cx('full-menu-wrapper')}>
          <NavigationMenu
            className={cx('primary-navigation')}
            menuItems={primaryMenuItems}
          />
        </div>
      </div>
      {/* Honors Circle Menu */}
      <div
        className={cx('full-menu-content', isHCNavShown ? 'show' : undefined)}
      >
        <div ref={hcRef} className={cx('hc-menu-wrapper')}>
          <HCMenu />
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
          latestLoading={latestLoading}
          latestPartnerContent={allPartnerContents}
          latestPartnerContentLoading={latestPartnerContentLoading}
          burgerRef={burgerRef}
        />
      </div>
    </>
  )
}
