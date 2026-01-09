import { useQuery } from '@apollo/client'
import { FOOTER_LOCATION } from '@/constants/menus'
import classNames from 'classnames/bind'
import styles from './TravelGuidesMenu.module.scss'
import { GetGuidesMenu } from '@/queries/GetGuidesMenu'
import dynamic from 'next/dynamic'
// Import Components
const NavigationMenu = dynamic(() =>
  import('@/components/NavigationMenu/NavigationMenu'),
)

let cx = classNames.bind(styles)

export default function TravelGuidesMenu(className) {
  let menuVariable = {
    first: 100,
    footerHeaderLocation: FOOTER_LOCATION,
  }

  // Get Footer menus
  const { data: footerMenusData, loading: footerMenusLoading } = useQuery(
    GetGuidesMenu,
    {
      variables: menuVariable,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'network-only',
    },
  )

  // Footer Menu
  const footerMenu = footerMenusData?.footerHeaderMenuItems?.nodes ?? []

  return (
    <div className={cx('component')}>
      {/* Full menu */}
      <div className={cx('full-menu-content')}>
        <div
          className={cx(
            'menu-wrapper',
            className?.className === 'dark-color' ? 'menu-wrapper-dark' : '',
          )}
        >
          <NavigationMenu
            className={cx('footer-navigation')}
            menuItems={footerMenu}
          />
        </div>
      </div>
    </div>
  )
}
