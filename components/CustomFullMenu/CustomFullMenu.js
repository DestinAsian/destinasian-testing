import { useQuery } from '@apollo/client'
import classNames from 'classnames/bind'
import styles from './CustomFullMenu.module.scss'
import { GetCustomMenu } from '../../queries/GetCustomMenu'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// Import Components
const Button = dynamic(() => import('@/components/Button/Button'))
let cx = classNames.bind(styles)

export default function CustomFullMenu({
  isNavShown,
  setIsNavShown,
  customClassName,
}) {
  const firstYearOfRCA = 2007

  // Get menus
  const { data, loading, error } = useQuery(GetCustomMenu, {
    variables: { id: 'custom' },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  const { menuDescription } = data?.menu?.customMenuFields ?? []
  const allPosts = data?.menu?.menuItems?.nodes ?? []

  console.log(allPosts)

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
    <div className={cx('component')}>
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
