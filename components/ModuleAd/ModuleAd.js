import { gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './ModuleAd.module.scss'

let cx = classNames.bind(styles)

export default function ModuleAd({ bannerAd }) {
  // Check if `bannerAd` is empty or does not contain an <img> tag
  const [isComponentHidden, setIsComponentHidden] = useState(true)

  useEffect(() => {
    // Check if `bannerAd` contains an <img> tag when the component is mounted
    setIsComponentHidden(!hasImgTag(bannerAd))
  }, [bannerAd])

  function hasImgTag(content) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const imgTags = doc.getElementsByTagName('img')
    return imgTags.length > 0
  }

  return (
    <div className={cx('component', isComponentHidden ? 'hide-component' : '')}>
      <div className={cx('banner-wrapper')}>
        <div className={cx('ad-container')}>
          {isComponentHidden ? null : (
            // Render bannerAd only when it contains an <img> tag
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
        }
      }
    }
  `,
}
