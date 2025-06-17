import classNames from 'classnames/bind'
import styles from './RCASecondaryHeader.module.scss'
import dynamic from 'next/dynamic'
// Import Components
const MagazineFullMenu = dynamic(() =>
  import('@/components/MagazineFullMenu/MagazineFullMenu'),
)
const TravelGuidesMenu = dynamic(() =>
  import('@/components/TravelGuidesMenu/TravelGuidesMenu'),
)

let cx = classNames.bind(styles)

export default function RCASecondaryHeader({
  primaryMenuItems,
  secondaryMenuItems,
  thirdMenuItems,
  fourthMenuItems,
  fifthMenuItems,
  featureMenuItems,
  latestStories,
  menusLoading,
  latestLoading,
  isNavShown,
  setIsNavShown,
  isGuidesNavShown,
  setIsGuidesNavShown,
  isMagNavShown,
  setIsMagNavShown,
  setSearchQuery,
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
              isNavShown ? setIsNavShown(!isNavShown) : null
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
            aria-expanded={!isNavShown}
          >
            <div className={cx('menu-title')}>{`Guides`}</div>
          </button>
          <button
            type="button"
            className={cx('menu-button', isMagNavShown ? 'active' : '')}
            onClick={() => {
              setIsMagNavShown(!isMagNavShown)
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isNavShown ? setIsNavShown(!isNavShown) : null
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isNavShown}
          >
            <div className={cx('menu-title')}>{`Magazine`}</div>
          </button>
          <button
            type="button"
            className={cx('menu-button', isNavShown ? 'active' : '')}
            onClick={() => {
              setIsNavShown(!isNavShown)
              isGuidesNavShown ? setIsGuidesNavShown(!isGuidesNavShown) : null
              isMagNavShown ? setIsMagNavShown(!isMagNavShown) : null
              setSearchQuery('')
              if (!isNavShown && isAutoplayRunning) {
                return toggleAutoplay()
              }
              if (isNavShown && !isAutoplayRunning) {
                return toggleAutoplay()
              }
            }}
            aria-controls={cx('rca-menu-wrapper')}
            aria-expanded={!isNavShown}
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
    </>
  )
}
