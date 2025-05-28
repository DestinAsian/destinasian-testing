import classNames from 'classnames/bind'
import styles from './SingleHCPost.module.scss'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// Import Components
const FeaturedImage = dynamic(() =>
  import('@/components/FeaturedImage/FeaturedImage'),
)

let cx = classNames.bind(styles)

const MAX_EXCERPT_LENGTH = 150 // Adjust the maximum length as needed

export default function SingleHCPost({ title, excerpt, uri, featuredImage }) {
  let trimmedExcerpt = excerpt?.substring(0, MAX_EXCERPT_LENGTH)
  const lastSpaceIndex = trimmedExcerpt?.lastIndexOf(' ')

  if (lastSpaceIndex !== -1) {
    trimmedExcerpt = trimmedExcerpt?.substring(0, lastSpaceIndex) + '...'
  }

  return (
    <div className={cx('component')}>
      {featuredImage && (
        <div className={cx('content-wrapper-image')}>
          {uri && (
            <Link href={uri}>
              <FeaturedImage
                image={featuredImage}
                className={styles.featuredImage}
              />
            </Link>
          )}
        </div>
      )}
      <div className={cx('content-wrapper')}>
        {uri && (
          <Link href={uri}>
            <h2 className={cx('title')}>{title}</h2>
          </Link>
        )}
      </div>
      <div className={cx('border-bottom')}></div>
    </div>
  )
}
