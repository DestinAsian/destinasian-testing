import classNames from 'classnames/bind'
import styles from './CategorySecondaryHeader.module.scss'
import { useRef, useMemo, useState, useEffect } from 'react'
import { useClickOutside } from '@/constants/useClickOutside'
import { CUSTOM_DATABASE_ID } from '@/constants/customDatabaseId'
import { GetSearchResults } from '@/queries/GetSearchResults'
import { GetLatestPartnerContent } from '@/queries/GetLatestPartnerContent'
import { FaSearch } from 'react-icons/fa'
import dynamic from 'next/dynamic'
import { useSWRGraphQL } from '@/lib/useSWRGraphQL'
// Import Components
const Navigation = dynamic(() =>
  import(
    '@/components/CategoryHeader/CategorySecondaryHeader/Navigation/Navigation'
  ),
)
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
const TravelGuidesMenu = dynamic(() =>
  import('@/components/TravelGuidesMenu/TravelGuidesMenu'),
)
const HCMenu = dynamic(() => import('@/components/HCMenu/HCMenu'))

const BurgerFullMenu = dynamic(() =>
  import('@/components/BurgerFullMenu/BurgerFullMenu'),
)

let cx = classNames.bind(styles)

export default function CategorySecondaryHeader({
  data,
  databaseId,
  categoryUri,
  name,
  parent,
  parentCategory,
  countryCode,
  parentCountryCode,
  categoryCountryCode,
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
  isScrolled,
}) {
  const [currentUrl, setCurrentUrl] = useState('')
  const [categoryUrl, setCategoryUrl] = useState('')
  const [isMainNavShown, setIsMainNavShown] = useState(false)
  const [isNavShown, setIsNavShown] = useState(false)

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

  // Add currentUrl function
  useEffect(() => {
    setCurrentUrl(window.location.pathname)
  }, [])
  function isActive(uri) {
    return currentUrl + '/' === uri
  }

  // Add currentCategoryUrl function
  useEffect(() => {
    setCategoryUrl(categoryUri)
  }, [])
  function isActiveCategory(uri) {
    return categoryUrl === uri
  }

  // Stop scrolling pages when isNavShown
  useEffect(() => {
    if (isMainNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isMainNavShown])

  // Stop scrolling pages when isNavShown
  useEffect(() => {
    if (isNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isNavShown])

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
              isCustomNavShown ? setIsCustomNavShown(!isCustomNavShown) : null
              isHCNavShown ? setIsHCNavShown(!isHCNavShown) : null
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
          {/* Global Guides Button */}
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
              isCustomNavShown ? setIsCustomNavShown(!isCustomNavShown) : null
              isHCNavShown ? setIsHCNavShown(!isHCNavShown) : null
              isBurgerNavShown ? setIsBurgerNavShown(!isBurgerNavShown) : null
              setSearchQuery('')
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isCustomNavShown}
          >
            <div className={cx('menu-title')}>{`Guides`}</div>
          </button>
          {/* Divider */}
          <span className={cx('menu-divider')}>{':'}</span>
          {/* Single Guides Button */}
          <button
            type="button"
            className={cx(
              'menu-button',
              'single-guides',
              isMagNavShown ? 'active' : '',
              isMagNavShown && !isScrolled && 'active-not-scrolled',
            )}
            onClick={() => {
              setIsMagNavShown(!isMagNavShown)
              isSearchBarShown ? setIsSearchBarShown(!isSearchBarShown) : null
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isCustomNavShown ? setIsCustomNavShown(!isCustomNavShown) : null
              isHCNavShown ? setIsHCNavShown(!isHCNavShown) : null
              isBurgerNavShown ? setIsBurgerNavShown(!isBurgerNavShown) : null
              setSearchQuery('')
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isCustomNavShown}
          >
            {/* Parent category navigation */}
            {data?.category?.children?.edges?.length != 0 &&
              data?.category?.children != null &&
              data?.category?.children != undefined && (
                <div className={cx('menu-title')}>{countryCode}</div>
              )}
            {/* Children category navigation */}
            {!data?.category?.children?.edges?.length &&
              data?.category?.parent?.node?.children?.edges?.length != 0 &&
              data?.category?.parent != null &&
              data?.category?.parent != undefined && (
                <div className={cx('menu-title')}>{parentCountryCode}</div>
              )}
            {/* Single post navigation */}
            {data?.post?.categories?.edges[0]?.node?.parent && (
              <div className={cx('menu-title')}>{categoryCountryCode}</div>
            )}
          </button>
          {/* Honors Circle Button */}
          <button
            type="button"
            className={cx(
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
            {/* <div className={cx('hc-icon')}>
              {!isHCNavShown ? (
                <Image
                  src={HCLogoBlack}
                  alt="Honors Circle Black Logo"
                  fill
                  sizes="100%"
                  priority
                  quality={100}
                />
              ) : (
                <Image
                  src={HCLogoWhite}
                  alt="Honors Circle White Logo"
                  fill
                  sizes="100%"
                  priority
                  quality={100}
                />
              )}
            </div> */}
          </button>
          {/* Burger Button */}
          <button
            type="button"
            className={cx(
              'burger-menu-button',
              isBurgerNavShown ? 'active' : '',
              isBurgerNavShown && !isScrolled && 'active-not-scrolled',
            )}
            onClick={() => {
              setIsBurgerNavShown(!isBurgerNavShown)
              isSearchBarShown ? setIsSearchBarShown(!isSearchBarShown) : null
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isHCNavShown ? setIsHCNavShown(!isHCNavShown) : null
              isCustomNavShown ? setIsCustomNavShown(!isCustomNavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              setSearchQuery('')
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
                xmlns="https://www.w3.org/2000/svg"
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
      {/* Global Guides Menu */}
      <div
        className={cx(
          'full-menu-content',
          isGuidesNavShown ? 'show' : undefined,
        )}
      >
        <div ref={guidesRef} className={cx('full-menu-wrapper')}>
          <TravelGuidesMenu />
        </div>
      </div>
      {/* Single Guides Menu */}
      <div
        className={cx('rca-menu-wrapper', isMagNavShown ? 'show' : undefined)}
      >
        <div ref={magazineRef} className={cx('navbar')}>
          {/* Parent category navigation */}
          {data?.category?.children?.edges?.length != 0 &&
            data?.category?.children != null &&
            data?.category?.children != undefined && (
              <Navigation
                databaseId={databaseId}
                isActive={isActive}
                isMainNavShown={isMainNavShown}
                setIsMainNavShown={setIsMainNavShown}
                isNavShown={isNavShown}
                setIsNavShown={setIsNavShown}
                isScrolled={isScrolled}
                categoryName={name}
              />
            )}
          {/* Children category navigation */}
          {!data?.category?.children?.edges?.length &&
            data?.category?.parent?.node?.children?.edges?.length != 0 &&
            data?.category?.parent != null &&
            data?.category?.parent != undefined && (
              <Navigation
                databaseId={databaseId}
                isActive={isActive}
                isMainNavShown={isMainNavShown}
                setIsMainNavShown={setIsMainNavShown}
                isNavShown={isNavShown}
                setIsNavShown={setIsNavShown}
                isScrolled={isScrolled}
                categoryName={parent}
              />
            )}
          {/* Single post navigation */}
          {data?.post?.categories?.edges[0]?.node?.parent && (
            <Navigation
              databaseId={databaseId}
              isActiveCategory={isActiveCategory}
              isMainNavShown={isMainNavShown}
              setIsMainNavShown={setIsMainNavShown}
              isNavShown={isNavShown}
              setIsNavShown={setIsNavShown}
              isScrolled={isScrolled}
              categoryName={parentCategory}
            />
          )}
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
          menusLoading={menusLoading}
          latestLoading={latestLoading}
          latestPartnerContent={allPartnerContents}
          latestPartnerContentLoading={latestPartnerContentLoading}
          burgerRef={burgerRef}
        />
      </div>
    </>
  )
}
