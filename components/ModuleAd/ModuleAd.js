import { gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './ModuleAd.module.scss'
import banner1 from '../../assets/images/Banner Blank_1.jpg'
import banner2 from '../../assets/images/Banner Blank_2.jpg'
import banner3 from '../../assets/images/Banner Blank_3.jpg'
import banner4 from '../../assets/images/Banner Blank_4.jpg'

let cx = classNames.bind(styles)

export default function ModuleAd({ bannerAd }) {
  const [isComponentHidden, setIsComponentHidden] = useState(false)

  useEffect(() => {
    const componentElement = document.getElementsByClassName('component')
    if (componentElement.clientHeight < 50) {
      setIsComponentHidden(true)
    }
  }, [])

  const banners = [banner1.src, banner2.src, banner3.src, banner4.src]

  return (
    <div className={cx('component', isComponentHidden ? 'hide-component' : '')}>
      <div className={cx('banner-wrapper')}>
        <div className={cx('ad-container')}>
          <div
            className={cx('ad-content')}
            dangerouslySetInnerHTML={{
              __html: bannerAd,
            }}
          ></div>
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
