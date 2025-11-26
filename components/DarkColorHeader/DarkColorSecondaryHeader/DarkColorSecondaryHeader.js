import classNames from 'classnames/bind'
import styles from './DarkColorSecondaryHeader.module.scss'
import { useQuery } from '@apollo/client'
import { useRef } from 'react'
import { useClickOutside } from '@/constants/useClickOutside'
import { CUSTOM_DATABASE_ID } from '@/constants/customDatabaseId'
import { GetSearchResults } from '@/queries/GetSearchResults'
import { GetLatestPartnerContent } from '@/queries/GetLatestPartnerContent'
import { FaSearch } from 'react-icons/fa'
import Image from 'next/image'
import HCLogoBlack from '@/public/logo/HC-Logo-Black.png'
import HCLogoWhite from '@/public/logo/HC-Logo-White.png'
import dynamic from 'next/dynamic'
// Import Components
const SearchInput = dynamic(() =>
  import('@/components/SearchInput/SearchInput'),
)
const SearchResults = dynamic(() =>
  import('@/components/SearchResults/SearchResults'),
)
const CustomFullMenu = dynamic(() =>
  import('@/components/CustomFullMenu/CustomFullMenu'),
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
  // don’t render anything until after menus loading
  if (menusLoading) return null

  // Posts for Search Function
  const postsPerPage = 1000

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
    loading: searchResultsLoading,
    error: searchResultsError,
  } = useQuery(GetSearchResults, {
    variables: {
      first: postsPerPage,
      after: null,
      search: searchQuery,
    },
    skip: searchQuery === '',
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: "network-only",
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
      const { databaseId, passwordProtected } = post.node

      if (!passwordProtected?.onOff && !uniqueDatabaseIds.has(databaseId)) {
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
        first: 10,
      },
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: "network-only",
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
            className={cx('hc-menu-button', isHCNavShown ? 'active' : '')}
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
            <div className={cx('hc-icon')}>
              {!isHCNavShown ? (
                <Image
                  src={HCLogoWhite}
                  alt="Honors Circle White Logo"
                  fill
                  sizes="100%"
                  priority
                />
              ) : (
                <Image
                  src={HCLogoBlack}
                  alt="Honors Circle Black Logo"
                  fill
                  sizes="100%"
                  priority
                />
              )}
            </div>
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
