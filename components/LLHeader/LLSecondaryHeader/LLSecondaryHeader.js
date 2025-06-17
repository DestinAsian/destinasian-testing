import classNames from 'classnames/bind'
import styles from './LLSecondaryHeader.module.scss'
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
  isGuidesNavShown,
  setIsGuidesNavShown,
  isMagNavShown,
  setIsMagNavShown,
  isRCANavShown,
  setIsRCANavShown,
  isAutoplayRunning,
  toggleAutoplay,
}) {
  return (
    <>
      <div className={cx('navigation-wrapper')}>
        <div className={cx('menu-wrapper')}>
          <button
            type="button"
            className={cx('menu-button', isGuidesNavShown ? 'active' : '')}
            onClick={() => {
              setIsGuidesNavShown(!isGuidesNavShown)
              isRCANavShown ? setIsRCANavShown(!isRCANavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
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
            className={cx('menu-button', isMagNavShown ? 'active' : '')}
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
    </>
  )
}
