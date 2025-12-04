import className from 'classnames/bind'
import styles from './SingleTGEntryHeader.module.scss'
import dynamic from 'next/dynamic'
// Import Components
const Heading = dynamic(() => import('@/components/Heading/Heading'))

let cx = className.bind(styles)

export default function SingleTGEntryHeader({
  title,
  category,
  guidesTitle,
}) {
  return (
    <div className={cx('component', className)}>
      <div className={cx('header-wrapper')}>
        <div className={cx('guides-header-wrapper')}>
          <Heading className={cx('category')}>{category}</Heading>
          <div className={cx('guides-header')}>
            {guidesTitle && (
              <div className={cx('title-header-wrapper')}>
                <span>{guidesTitle}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {guidesTitle !== title && (
        <div className={cx('guides-title-wrapper')}>
          <Heading className={cx('title')}>{title}</Heading>
        </div>
      )}
    </div>
  )
}
