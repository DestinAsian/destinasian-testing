import { gql } from '@apollo/client'
import classNames from 'classnames/bind'
import styles from './ModuleAd.module.scss'

let cx = classNames.bind(styles)

function hasImgTag(content) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  const imgTags = doc.getElementsByTagName('img')
  return imgTags.length > 0
}

export default function ModuleAd({ bannerAd }) {
  // Check if `bannerAd` is empty or does not contain an <img> tag
  const isComponentHidden = !bannerAd || !hasImgTag(bannerAd)

  return (
    <div className={cx('component', isComponentHidden ? 'hide-component' : '')}>
      <div className={cx('banner-wrapper')}>
        <div className={cx('ad-container')}>
          {bannerAd && (
            // Render bannerAd only when it's not empty and not 'no banners'
            <div
              className={cx('ad-content')}
              dangerouslySetInnerHTML={{
                __html: bannerAd,
              }}
            ></div>
          )}
        </div>

        <div className={cx('border-bottom')}></div>
      </div>
    </div>
  )
}

ModuleAd.fragments = {
  entry: gql`
    fragment ModuleAdFragment on RootQueryToBannerAdConnection {
      edges {
        node {
          content
          title
          acfBannerAds {
            anyOf {
              uri
            }
            pinAd
          }
        }
      }
    }
  `,
}
