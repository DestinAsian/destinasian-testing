import Link from 'next/link'
import classNames from 'classnames/bind'
import { FeaturedImage, CategoryIcon, LocationIcon } from '..'
import styles from './SingleHCPost.module.scss'

let cx = classNames.bind(styles)

const MAX_EXCERPT_LENGTH = 150 // Adjust the maximum length as needed

export default function SingleHCPost({
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
    <div className={cx('component')}>
      {featuredImage && (
        <div className={cx('content-wrapper-image')}>
          <Link href={uri}>
            <a>
              <FeaturedImage
                image={featuredImage}
                layout="intrinsic"
                className={styles.featuredImage}
              />
            </a>
          </Link>
        </div>
      )}
      <div className={cx('content-wrapper')}>
        <Link href={uri}>
          <a>
            <h2 className={cx('title')}>{title}</h2>
          </a>
        </Link>
      </div>
      <div className={cx('border-bottom')}></div>
    </div>
  )
}
