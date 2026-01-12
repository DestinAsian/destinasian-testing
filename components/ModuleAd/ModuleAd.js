import { gql } from '@apollo/client'
import classNames from 'classnames/bind'
import styles from './ModuleAd.module.scss'
import { useMemo } from 'react'
import { transformWpImages } from '@/utilities/transformWpImages'

let cx = classNames.bind(styles)

export default function ModuleAd({ bannerAd }) {
  // Transform Wordpress Images
  const transformedBannerAd = useMemo(
    () => transformWpImages(bannerAd),
    [bannerAd],
  )

  const isComponentHidden = !transformedBannerAd

  return (
    <div className={cx('component', isComponentHidden && 'hide-component')}>
      <div className={cx('banner-wrapper')}>
        <div className={cx('ad-container')}>
          {transformedBannerAd && (
            <div
              className={cx('ad-content')}
              dangerouslySetInnerHTML={{ __html: transformedBannerAd }}
            />
          )}
        </div>
        <div className={cx('border-bottom')} />
      </div>
    </div>
  )
}
