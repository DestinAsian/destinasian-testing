import classNames from 'classnames/bind'
import styles from './ChildrenNavigation.module.scss'
import { DaGuideMenu, TravelGuidesMenu } from '../../../components'
import { useQuery } from '@apollo/client'
import { GetChildrenNavigation } from '../../../queries/GetChildrenNavigation'
import Link from 'next/link'

let cx = classNames.bind(styles)

export default function ChildrenNavigation({
  databaseId,
  isNavShown,
  setIsNavShown,
  isScrolled,
  isActive,
}) {
  const catPerPage = 4

  let catVariable = {
    first: catPerPage,
    id: databaseId,
  }

  // Get Category
  const { data } = useQuery(GetChildrenNavigation, {
    variables: catVariable,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  return (
    <div className={cx('component', isNavShown ? 'show' : undefined)}>
      <div className={cx('navbar-wrapper', isNavShown ? 'show' : undefined)}>
        {/* {'children'} */}
        {!isScrolled && (
          <div className={cx('text-menu-wrapper')}>
            {/* Menu Button */}
            <div className={cx('menu-button')}>
              {/* menu button */}
              <button
                type="button"
                className={cx('menu-icon')}
                onClick={() => {
                  setIsNavShown(!isNavShown)
                }}
                aria-label="Toggle navigation"
                aria-controls={cx('full-menu-wrapper')}
                aria-expanded={!isNavShown}
              >
                <div key={'text-menu'} className={cx('da-guide-wrapper')}>
                  {data?.category?.parent?.node?.destinationGuides
                    ?.destinationGuides == 'yes' && (
                    <DaGuideMenu
                      title={
                        data?.category?.parent?.node?.countryCode?.countryCode
                      }
                      titleName={data?.category?.parent?.node?.name}
                    />
                  )}
                  {data?.category?.parent?.node?.destinationGuides
                    ?.destinationGuides == null && null}
                </div>
              </button>
            </div>
          </div>
        )}
        {!!isScrolled && (
          <div className={cx('sticky-text-menu-wrapper')}>
            <div className={cx('menu-button')}>
              {/* menu button */}
              <button
                type="button"
                className={cx('menu-icon')}
                onClick={() => {
                  setIsNavShown(!isNavShown)
                }}
                aria-label="Toggle navigation"
                aria-controls={cx('full-menu-wrapper')}
                aria-expanded={!isNavShown}
              >
                <div
                  key={'sticky-text-menu'}
                  className={cx('da-guide-wrapper')}
                >
                  {data?.category?.parent?.node?.destinationGuides
                    ?.destinationGuides == 'yes' && (
                    <DaGuideMenu
                      title={
                        data?.category?.parent?.node?.countryCode?.countryCode
                      }
                      titleName={data?.category?.parent?.node?.name}
                    />
                  )}
                  {data?.category?.parent?.node?.destinationGuides
                    ?.destinationGuides == null && null}
                </div>
              </button>
            </div>
          </div>
        )}

        <div className={cx('navigation-wrapper')}>
          <div className={cx('navigation')}>
            {data?.category?.parent?.node?.children?.edges?.map((post) => (
              <li key={post?.node?.uri} className={cx('nav-link')}>
                {post?.node?.uri && (
                  <Link
                    href={post?.node?.uri}
                    className={cx(
                      isActive(post?.node?.uri) ? 'active' : 'not-active',
                    )}
                  >
                    <h2 className={cx('nav-name')}>{post?.node?.name}</h2>
                  </Link>
                )}
              </li>
            ))}
          </div>
        </div>

        <div
          className={cx(['full-menu-wrapper', isNavShown ? 'show' : undefined])}
        >
          <TravelGuidesMenu />
        </div>
      </div>
    </div>
  )
}
