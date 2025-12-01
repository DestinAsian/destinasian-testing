import className from 'classnames/bind'
import styles from './SingleTGEntryHeader.module.scss'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// Import Components
const Heading = dynamic(() => import('@/components/Heading/Heading'))

let cx = className.bind(styles)

export default function SingleTGEntryHeader({
  title,
  category,
  guidesTitle,
  guidesUri,
}) {
  return (
    <div className={cx('component', className)}>
      <div className={cx('header-wrapper')}>
        <div className={cx('guides-header-wrapper')}>
          <Heading className={cx('category')}>{category}</Heading>
          <div className={cx('guides-header')}>
            {guidesTitle && guidesUri && (
              <div className={cx('title-header-wrapper')}>
                <Link href={guidesUri}>
                  <span>{guidesTitle}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={cx('guides-title-wrapper')}>
        <Heading className={cx('title')}>{title}</Heading>
      </div>
    </div>
  )
}
