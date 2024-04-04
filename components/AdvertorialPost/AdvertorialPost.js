import classNames from 'classnames/bind'
import { FeaturedImage, CategoryIcon, LocationIcon, Container } from '..'
import styles from './AdvertorialPost.module.scss'

let cx = classNames.bind(styles)

const MAX_EXCERPT_LENGTH = 150 // Adjust the maximum length as needed

export default function AdvertorialPost({
  title,
  excerpt,
  uri,
  featuredImage,
}) {
  let trimmedExcerpt = excerpt?.substring(0, MAX_EXCERPT_LENGTH)
  const lastSpaceIndex = trimmedExcerpt?.lastIndexOf(' ')

  if (lastSpaceIndex !== -1) {
    trimmedExcerpt = trimmedExcerpt?.substring(0, lastSpaceIndex) + '...'
  }

  return (
    <article className={cx('component')}>
      {featuredImage && (
        <div className={cx('content-wrapper-image')}>
          <a href={uri}>
            <FeaturedImage
              image={featuredImage}
              className={styles.featuredImage}
            />
          </a>
        </div>
      )}

      <div className={cx('content-wrapper')}>
        <a href={uri}>
          <h5 className={cx('category')}>{'Partner Post'}</h5>
        </a>
      </div>

      <div className={cx('content-wrapper')}>
        <a href={uri}>
          <h2 className={cx('title')}>{title}</h2>
        </a>
      </div>
      {excerpt !== undefined && excerpt !== null && (
        <div className={cx('content-wrapper')}>
          <a href={uri}>
            <div
              className={cx('excerpt')}
              dangerouslySetInnerHTML={{ __html: trimmedExcerpt }}
            />
          </a>
        </div>
      )}
      <div className={cx('border-bottom')}></div>
    </article>
  )
}
