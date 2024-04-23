import classNames from 'classnames/bind'
import styles from './ParentNavigation.module.scss'
import { DaGuideMenu } from '../../../components'
import { useQuery } from '@apollo/client'
import { GetParentNavigation } from '../../../queries/GetParentNavigation'
import Link from 'next/link'

let cx = classNames.bind(styles)

export default function ParentNavigation({ databaseId, isActive }) {
  const catPerPage = 4

  let catVariable = {
    first: catPerPage,
    id: databaseId,
  }

  // Get Category
  const { data } = useQuery(GetParentNavigation, {
    variables: catVariable,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  return (
    <div className={cx('navbar-wrapper')}>
      {/* {'parent'} */}
      <div className={cx('da-guide-wrapper')}>
        {data?.category?.destinationGuides?.destinationGuides == 'yes' && (
          <DaGuideMenu
            title={data?.category?.countryCode?.countryCode}
            titleName={data?.category?.name}
            titleUri={data?.category?.uri}
          />
        )}
        {data?.category?.destinationGuides?.destinationGuides == null && null}
      </div>
      <div className={cx('navigation-wrapper')}>
        {data?.category?.children?.edges?.map((post) => (
          <li key={post?.node?.uri} className={cx('nav-link')}>
            {post?.node?.uri && (
              <Link
                href={post?.node?.uri}
                className={cx(isActive(post?.node?.uri) ? 'active' : '')}
              >
                <h2 className={cx('nav-name')}>{post?.node?.name}</h2>
              </Link>
            )}
          </li>
        ))}
      </div>
    </div>
  )
}
