import classNames from 'classnames/bind'
import styles from './SecondaryHeader.module.scss'
import dynamic from 'next/dynamic'
// Import Components
const RCAFullMenu = dynamic(() =>
  import('@/components/RCAFullMenu/RCAFullMenu'),
)
const MagazineFullMenu = dynamic(() =>
  import('@/components/MagazineFullMenu/MagazineFullMenu'),
)
const TravelGuidesMenu = dynamic(() =>
  import('@/components/TravelGuidesMenu/TravelGuidesMenu'),
)

let cx = classNames.bind(styles)

export default function SecondaryHeader({
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
  customClassName,
}) {
  return (
    <>
      <div
        className={cx(
          'navigation-wrapper',
          { sticky: isScrolled },
          customClassName,
        )}
      >
        <div className={cx('menu-wrapper')}>
          <button
            type="button"
            className={cx('menu-button', isGuidesNavShown ? 'active' : '')}
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
            className={cx('menu-button', isRCANavShown ? 'active' : '')}
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
          customClassName,
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
          customClassName,
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
        />
      </div>
      <div
        className={cx(
          'rca-menu-wrapper',
          isRCANavShown ? 'show' : undefined,
          customClassName,
        )}
      >
        <RCAFullMenu
          rcaDatabaseId={rcaDatabaseId}
          uri={rcaUri}
          isNavShown={isRCANavShown}
          setIsNavShown={setIsRCANavShown}
          customClassName={'light-color'}
        />
      </div>
    </>
  )
}
