import Link from 'next/link'
import classNames from 'classnames/bind'
import { FeaturedImage, Heading } from '../../components'
import styles from './SingleAdvertorialPost.module.scss'

let cx = classNames.bind(styles)

export default function SingleAdvertorialPost({ title, uri, featuredImage }) {
  return (
    <article className={cx('component')}>
      {featuredImage && (
        <div className={cx('content-wrapper-image')}>
          <Link href={uri}>
            <FeaturedImage
              image={featuredImage}
              className={styles.featuredImage}
            />
          </Link>
        </div>
      )}
      <div className={cx('content-wrapper')}>
        <Link href={uri}>

          <Heading className={cx('sponsored')}>{'Sponsored Post'}</Heading>
          <Heading className={cx('title')}>{title}</Heading>

        </Link>
      </div>
      <div className={cx('border-bottom')}></div>
    </article>
  );
}
