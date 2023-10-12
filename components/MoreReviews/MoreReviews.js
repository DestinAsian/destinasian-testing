import classNames from 'classnames/bind'
import { FeaturedImage } from '..'
import styles from './MoreReviews.module.scss'

let cx = classNames.bind(styles)

const MAX_EXCERPT_LENGTH = 100 // Adjust the maximum length as needed

export default function MoreReviews({
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
      <div className={cx('content-wrapper')}>
        <a href={uri}>
          <h2 className={cx('title')}>{title}</h2>
        </a>
      </div>
    </article>
  )
}
