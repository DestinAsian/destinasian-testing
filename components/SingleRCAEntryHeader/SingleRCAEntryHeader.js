import className from 'classnames/bind'
import styles from './SingleRCAEntryHeader.module.scss'
import dynamic from 'next/dynamic'
// Import Components
const Heading = dynamic(() => import('@/components/Heading/Heading'))

let cx = className.bind(styles)

export default function SingleRCAEntryHeader({
  parentTitle,
  title,
  className,
}) {
  return (
    <>
      {parentTitle && (
        <div className={cx('component', className)}>
          <div className={cx('header-wrapper')}>
            {/* {category && <Heading className={cx('category')}>{category}</Heading>} */}
            <Heading className={cx('title')}>{parentTitle}</Heading>
          </div>
        </div>
      )}
      {title && (
        <div className={cx('component', className)}>
          <div className={cx('header-wrapper')}>
            {/* {category && <Heading className={cx('category')}>{category}</Heading>} */}
            <Heading className={cx('title')}>{title}</Heading>
          </div>
        </div>
      )}
    </>
  )
}
