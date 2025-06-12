import classNames from 'classnames/bind'
import styles from './HomepageSecondaryHeader.module.scss'
import dynamic from 'next/dynamic'
// Import Components
const RCAFullMenu = dynamic(() =>
  import('@/components/RCAFullMenu/RCAFullMenu'),
)
const MagazineFullMenu = dynamic(() => import('@/components/MagazineFullMenu/MagazineFullMenu'))
const TravelGuidesMenu = dynamic(() =>
  import('@/components/TravelGuidesMenu/TravelGuidesMenu'),
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
  menusLoading,
  latestLoading,
  searchQuery,
  setSearchQuery,
  rcaDatabaseId,
  rcaUri,
  isGuidesNavShown,
  setIsGuidesNavShown,
  isMagNavShown,
  setIsMagNavShown,
  isRCANavShown,
  setIsRCANavShown,
  isScrolled,
}) {
  // Clear search input
  const clearSearch = () => {
    setSearchQuery('') // Reset the search query
  }

  return (
    <>
      <div className={cx('navigation-wrapper', { sticky: isScrolled })}>
        <div className={cx('menu-wrapper')}>
          <button
            type="button"
            className={cx(
              'menu-button',
              isGuidesNavShown ? 'active' : '',
              isGuidesNavShown && !isScrolled && 'active-not-scrolled',
            )}
            onClick={() => {
              setIsGuidesNavShown(!isGuidesNavShown)
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              isRCANavShown ? setIsRCANavShown(!isRCANavShown) : null
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isRCANavShown}
          >
            <div className={cx('menu-title')}>{`Guides`}</div>
          </button>
          <button
            type="button"
            className={cx(
              'menu-button',
              isMagNavShown ? 'active' : '',
              isMagNavShown && !isScrolled && 'active-not-scrolled',
            )}
            onClick={() => {
              setIsMagNavShown(!isMagNavShown)
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isRCANavShown ? setIsRCANavShown(!isRCANavShown) : null
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isRCANavShown}
          >
            <div className={cx('menu-title')}>{`Magazine`}</div>
          </button>
          <button
            type="button"
            className={cx(
              'menu-button',
              isRCANavShown ? 'active' : '',
              isRCANavShown && !isScrolled && 'active-not-scrolled',
            )}
            onClick={() => {
              setIsRCANavShown(!isRCANavShown)
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isRCANavShown}
          >
            <div className={cx('menu-title')}>{`Readers' Choice Awards`}</div>
          </button>
        </div>
      </div>

      <div
        className={cx(
          'full-menu-content',
          isGuidesNavShown ? 'show' : undefined,
        )}
      >
        <div className={cx('full-menu-wrapper')}>
          <TravelGuidesMenu />
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
          // contentNodesPosts={contentNodesPosts}
          // searchResultsLoading={searchResultsLoading}
          // searchResultsError={searchResultsError}
          // isSearchResultsVisible={isSearchResultsVisible}
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
          className={'light-color'}
        />
      </div>
    </>
  )
}
