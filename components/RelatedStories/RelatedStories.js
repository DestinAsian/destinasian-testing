import classNames from 'classnames/bind'
import styles from './RelatedStories.module.scss'
import Link from 'next/link'
import Image from 'next/image'

let cx = classNames.bind(styles)

export default function RelatedStories({
  title,
  uri,
  parentCategory,
  category,
  categoryUri,
  featuredImage,
  customClassName,
}) {
  return (
    <article className={cx('component', customClassName)}>
      <div className={cx('left-wrapper')}>
        {featuredImage && (
          <div className={cx('content-wrapper-image')}>
            {uri && (
              <Link href={uri} className={cx('image')}>
                <Image
                  src={featuredImage?.sourceUrl}
                  alt={featuredImage?.altText || 'Featured Image'}
                  fill
                  sizes="100%"
                  priority
                  quality={100}
                />
              </Link>
            )}
          </div>
        )}
      </div>
      <div className={cx('right-wrapper')}>
        {category && (
          <div className={cx('content-wrapper')}>
            {categoryUri && (
              <Link href={categoryUri}>
                <h5 className={cx('category')}>
                  {parentCategory ? `${parentCategory} ${category}` : category}
                </h5>
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
      </div>
    </article>
  )
}
