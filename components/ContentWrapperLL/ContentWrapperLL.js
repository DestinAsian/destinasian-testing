import className from 'classnames/bind'
import styles from './ContentWrapperLL.module.scss'
import { SingleLLSlider, Button } from '../../components'
import { GetLuxeListPagination } from '../../queries/GetLuxeListPagination'
import { useQuery } from '@apollo/client'

let cx = className.bind(styles)

export default function ContentWrapperLL({ content, images, databaseId }) {
  const batchSize = 30

  const { data, loading, error, fetchMore } = useQuery(GetLuxeListPagination, {
    variables: { first: batchSize, after: null, id: databaseId },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  const luxeListAll = data?.luxeListBy?.parent?.node?.children?.edges.map(
    (post) => post.node,
  )

  // Index number for each of Hotel Page
  const indexOfLuxeList = data?.luxeListBy?.menuOrder

  // Total number of Luxe Lists in a year
  const numberOfLuxeLists = luxeListAll?.length

  return (
    <article className={cx('component')}>
      {images[0] != null && (
        <div className={cx('with-slider-wrapper')}>
          <div className={cx('slider-wrapper')}>
            <SingleLLSlider images={images} />
          </div>
          <div
            className={cx('content-wrapper')}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className={cx('navigation-wrapper')}>
            <div className={cx('navigation-button')}>{'-'}</div>
            <div className={cx('pagination-wrapper')}>
              {indexOfLuxeList}
              {' / '}
              {numberOfLuxeLists}
            </div>
            <div className={cx('navigation-button')}>{'+'}</div>
          </div>
        </div>
      )}
      {images[0] == null && (
        <div className={cx('with-slider-wrapper')}>
          <div className={cx('slider-wrapper')}></div>
          <div
            className={cx('content-wrapper')}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className={cx('navigation-wrapper')}>
            <div className={cx('navigation-button')}>{'-'}</div>
            <div className={cx('pagination-wrapper')}>
              {indexOfLuxeList}
              {' / '}
              {numberOfLuxeLists}
            </div>
            <div className={cx('navigation-button')}>{'+'}</div>
          </div>
        </div>
      )}
    </article>
  )
}
