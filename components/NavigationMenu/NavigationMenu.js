import classNames from 'classnames/bind'
import { gql } from '@apollo/client'
import styles from './NavigationMenu.module.scss'
import stylesFromWP from './NavigationMenuClassesFromWP.module.scss'
import flatListToHierarchical from '@/utilities/flatListToHierarchical'
import Link from 'next/link'

let cx = classNames.bind(styles)
let cxFromWp = classNames.bind(stylesFromWP)

export default function NavigationMenu({
  menuItems,
  className,
  renderCustomItem,
}) {
  if (!menuItems) {
    return null
  }

  const hierarchicalMenuItems = flatListToHierarchical(menuItems)
  const menuName = menuItems[0]?.menu?.node?.name

  function renderMenu(items) {
    return (
      <ul className={cx('menu')}>
        {items.map((item) => {
          const { id, path, label, children, cssClasses } = item

          if (!item.hasOwnProperty('__typename')) {
            return null
          }

          const wpClasses = Array.isArray(cssClasses)
            ? cssClasses
            : cssClasses
              ? [cssClasses]
              : []

          const customContent = renderCustomItem?.({
            item,
            wpClasses,
          })

          return (
            <li key={id} className={cxFromWp(cssClasses)}>
              {customContent ? (
                customContent
              ) : (
                <>
                  {path && (
                    <Link href={path} className={cx('menu-item')}>
                      {label ?? ''}
                    </Link>
                  )}
                </>
              )}

              {children.length ? renderMenu(children) : null}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <nav className={cx(['component', className])} role="navigation">
      <ul className={cx('menu-name')}>{menuName}</ul>
      {renderMenu(hierarchicalMenuItems)}
    </nav>
  )
}

NavigationMenu.fragments = {
  entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `,
}