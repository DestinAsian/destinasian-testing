import { useQuery } from '@apollo/client'
import { FOOTER_LOCATION } from '../../constants/menus'
import classNames from 'classnames/bind'
import styles from './TravelGuidesMenu.module.scss'
import { NavigationMenu } from '../../components'
import { GetFooterMenus } from '../../queries/GetFooterMenus'

let cx = classNames.bind(styles)

export default function TravelGuidesMenu() {
  // Get Footer menus
  const { data: footerMenusData, loading: footerMenusLoading } = useQuery(
    GetFooterMenus,
    {
      variables: {
        first: 50,
        footerHeaderLocation: FOOTER_LOCATION,
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    },
  )

  // Footer Menu
  const footerMenu = footerMenusData?.footerHeaderMenuItems?.nodes ?? []

  return (
    <div className={cx('component')}>
      {/* Full menu */}
      <div className={cx('full-menu-content')}>
        {/* Footer Menu {DestinAsian Guides Menu} */}
        <NavigationMenu
          className={cx('footer-navigation')}
          menuItems={footerMenu}
        />
      </div>
    </div>
  )
}
