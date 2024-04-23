import classNames from 'classnames/bind'
import styles from './SingleNavigation.module.scss'
import { DaGuideMenu } from '../../../components'
import { useQuery } from '@apollo/client'
import { GetSingleNavigation } from '../../../queries/GetSingleNavigation'
import Link from 'next/link'

let cx = classNames.bind(styles)

export default function SingleNavigation({ databaseId, isActiveCategory }) {
  const catPerPage = 4

  let catVariable = {
    first: catPerPage,
    id: databaseId,
  }

  // Get Category
  const { data } = useQuery(GetSingleNavigation, {
    variables: catVariable,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  return (
    <div className={cx('navbar-wrapper')}>
      {/* {'categories'} */}
      <div className={cx('da-guide-wrapper')}>
        {data?.post?.categories?.edges[0]?.node?.parent?.node?.destinationGuides
          ?.destinationGuides == 'yes' && (
          <DaGuideMenu
            categories={
              data?.post?.categories?.edges[0]?.node?.parent?.node?.countryCode
                ?.countryCode
            }
            categoryUri={data?.post?.categories?.edges[0]?.node?.parent?.node?.uri}
            categoryName={data?.post?.categories?.edges[0]?.node?.parent?.node?.name}
          />
        )}
        {data?.post?.categories?.edges[0]?.node?.parent?.node?.destinationGuides
          ?.destinationGuides == null && null}
      </div>
      <div className={cx('navigation-wrapper')}>
        {data?.post?.categories?.edges[0]?.node?.parent?.node?.children?.edges?.map(
          (post) => (
            <li key={post?.node?.uri} className={cx('single-nav-link')}>
              {post?.node?.uri && (
                <Link
                  href={post?.node?.uri}
                  className={cx(
                    isActiveCategory(post?.node?.uri) ? 'active' : '',
                  )}
                >
                  <h2 className={cx('nav-name')}>{post?.node?.name}</h2>
                </Link>
              )}
            </li>
          ),
        )}
      </div>
    </div>
  )
}
