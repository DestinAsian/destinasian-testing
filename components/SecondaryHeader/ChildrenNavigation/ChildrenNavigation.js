import classNames from 'classnames/bind'
import styles from './ChildrenNavigation.module.scss'
import { DaGuideMenu } from '../../../components'
import { useQuery } from '@apollo/client'
import { GetChildrenNavigation } from '../../../queries/GetChildrenNavigation'
import Link from 'next/link'

let cx = classNames.bind(styles)

export default function ChildrenNavigation({ databaseId, isActive }) {
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
    <div className={cx('navbar-wrapper')}>
      {/* {'children'} */}
      <div className={cx('da-guide-wrapper')}>
        {data?.category?.parent?.node?.destinationGuides?.destinationGuides ==
          'yes' && (
          <DaGuideMenu
            parent={data?.category?.parent?.node?.countryCode?.countryCode}
            parentUri={data?.category?.parent?.node?.uri}
            parentName={data?.category?.parent?.node?.name}
            parentDestinationGuides={
              data?.category?.parent?.node?.destinationGuides?.destinationGuides
            }
          />
        )}
        {data?.category?.parent?.node?.destinationGuides?.destinationGuides ==
          null && null}
      </div>
      <div className={cx('navigation-wrapper')}>
        {data?.category?.parent?.node?.children?.edges?.map((post) => (
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
