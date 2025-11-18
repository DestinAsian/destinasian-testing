import { useQuery } from '@apollo/client'
import classNames from 'classnames/bind'
import styles from './CustomFullMenu.module.scss'
import { GetCustomMenu } from '../../queries/GetCustomMenu'
import flatListToHierarchical from '../../utilities/flatListToHierarchical'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
// Import Components
const Button = dynamic(() => import('@/components/Button/Button'))
let cx = classNames.bind(styles)

export default function CustomFullMenu({
  isNavShown,
  setIsNavShown,
  customClassName,
  customRef,
}) {
  // Get menus
  const { data, loading, error } = useQuery(GetCustomMenu, {
    variables: { id: 'custom' },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: "network-only",
  })

  const { menuDescription } = data?.menu?.customMenuFields ?? []
  const menuItems = data?.menu?.menuItems?.nodes ?? []

  if (!menuItems) {
    return null
  }

  // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
  const hierarchicalMenuItems = flatListToHierarchical(menuItems)

  function renderMenu(items) {
    return (
      <ul className={cx('menu')}>
        {items.map((item) => {
          const { id, path, label, customMenuFields, children, cssClasses } =
            item

          const menuImage = customMenuFields?.menuImage

          // @TODO - Remove guard clause after ghost menu items are no longer appended to array.
          if (!item.hasOwnProperty('__typename')) {
            return null
          }

          return (
            <li key={id} className={cx(cssClasses)}>
              {path && menuImage && (
                <Link href={path} target={'_blank'} className={cx('menu-item')}>
                  <Image
                    src={menuImage?.sourceUrl}
                    alt={menuImage?.altText}
                    width={
                      menuImage?.mediaDetails?.width
                        ? menuImage?.mediaDetails?.width
                        : '500'
                    }
                    height={
                      menuImage?.mediaDetails?.height
                        ? menuImage?.mediaDetails?.height
                        : '500'
                    }
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </Link>
              )}
              {path && (
                <Link href={path} target={'_blank'} className={cx('menu-item')}>
                  {label ?? ''}
                </Link>
              )}
              {children.length ? renderMenu(children) : null}
            </li>
          )
        })}
      </ul>
    )
  }

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  if (loading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          <Button className="gap-x-4 ">{'Loading...'}</Button>
        </div>
      </>
    )
  }

  return (
    <div ref={customRef} className={cx('component')}>
      {/* Full menu */}
      <div
        className={cx(
          'full-menu-content',
          customClassName === 'light-color' ? 'full-menu-content-light' : '',
        )}
      >
        <div className={cx('menu-wrapper')}>
          <div className={cx('description-wrapper')}>
            <div
              className={cx('description')}
              dangerouslySetInnerHTML={{ __html: menuDescription }}
            />
          </div>
          <div className={cx('menu-list-wrapper')}>
            <nav className={cx('menu-list')} role="navigation">
              {renderMenu(hierarchicalMenuItems)}
            </nav>
          </div>
          {/* close button */}
          <div className={cx('close-button')}>
            <button
              type="button"
              className={cx('close-icon')}
              onClick={() => {
                setIsNavShown(!isNavShown)
              }}
              aria-controls={cx('full-menu-wrapper')}
              aria-expanded={!isNavShown}
            >
              <svg
                width="83"
                height="79"
                viewBox="0 0 83 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M53.8 17.85L49.9 16.95L49.9 2.49634e-06L82.45 1.81358e-07L82.45 17.55L77.05 18.6L60.1 39.9L77.05 58.05L81.7 59.55L81.7 78.6L38.05 78.6L38.05 60.9L42.1 59.55L36.1 51.9L35.8 51.9L29.65 59.55L33.55 60.9L33.55 78.6L2.79999 78.6L2.79999 59.55L8.34999 58.2L23.95 40.05L5.64998 18.45L0.699985 17.55L0.699983 5.99549e-06L44.05 2.9124e-06L44.05 16.95L39.85 17.85L47.65 26.25L47.95 26.25L53.8 17.85Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
