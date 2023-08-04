import classNames from 'classnames/bind'
import { FeaturedImage } from '..'
import styles from './RelatedStories.module.scss'

let cx = classNames.bind(styles)

const MAX_EXCERPT_LENGTH = 100 // Adjust the maximum length as needed

export default function RelatedStories({
  title,
  excerpt,
  uri,
  category,
  categoryUri,
  featuredImage,
}) {
  let trimmedExcerpt = excerpt?.substring(0, MAX_EXCERPT_LENGTH)
  const lastSpaceIndex = trimmedExcerpt?.lastIndexOf(' ')

  if (lastSpaceIndex !== -1) {
    trimmedExcerpt = trimmedExcerpt?.substring(0, lastSpaceIndex) + '...'
  }

  return (
    <article className={cx('component')}>
      <div className={cx('left-wrapper')}>
        {featuredImage && (
          <div className={cx('content-wrapper-image')}>
            <a href={uri}>
              <FeaturedImage
                image={featuredImage}
                layout=""
                className={styles.featuredImage}
              />
            </a>
          </div>
        )}
      </div>
      <div className={cx('right-wrapper')}>
        {category && (
          <div className={cx('content-wrapper')}>
            <a href={categoryUri}>
              <h5 className={cx('category')}>{category}</h5>
            </a>
          </div>
        )}
        <div className={cx('content-wrapper')}>
          <a href={uri}>
            <h2 className={cx('title')}>{title}</h2>
          </a>
        </div>
        {excerpt !== undefined && excerpt !== null && (
          <div className={cx('content-wrapper')}>
            <div
              className={cx('excerpt')}
              dangerouslySetInnerHTML={{ __html: trimmedExcerpt }}
            />
          </div>
        )}
      </div>
    </article>
  )
}
