import classNames from 'classnames/bind'
import { FeaturedImage, CategoryIcon, LocationIcon, Container } from '..'
import styles from './ContestPost.module.scss'

let cx = classNames.bind(styles)

const MAX_EXCERPT_LENGTH = 150 // Adjust the maximum length as needed

export default function ContestPost({ title, uri, featuredImage }) {
  return (
    <article className={cx('component')}>
      {featuredImage && (
        <div className={cx('content-wrapper-image')}>
          <a href={uri}>
            <FeaturedImage
              image={featuredImage}
              layout="intrinsic"
              className={styles.featuredImage}
            />
          </a>
        </div>
      )}
      <div className={cx('content-wrapper')}>
        <a href={uri}>
          <h2 className={cx('title')}>{title}</h2>
        </a>
      </div>
      <div className={cx('border-bottom')}></div>
    </article>
  )
}
