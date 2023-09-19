import classNames from 'classnames/bind'
import { FeaturedImage } from '..'
import styles from './ContestPost.module.scss'

let cx = classNames.bind(styles)

export default function ContestPost({ title, uri, featuredImage, date }) {
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
      <div className={cx('date-wrapper')}>
        <h2 className={cx('date')}>
          {'Contest Date: '}
          {date}
        </h2>
      </div>
      <div className={cx('content-wrapper-image')}>
        <div className={cx('border-bottom')}></div>
      </div>
    </article>
  )
}
