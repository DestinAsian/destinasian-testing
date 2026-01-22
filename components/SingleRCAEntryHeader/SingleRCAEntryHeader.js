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
  sliderWidth,
  sliderHeight,
  isMobile,
}) {
  return (
    <>
      {parentTitle && (
        <div
          style={{
            marginTop: isMobile
              ? `${sliderHeight}px`
              : `calc(${sliderHeight}px + 4.5rem)`,
            width: !isMobile ? `${sliderWidth}px` : '',
          }}
          className={cx('component', className)}
        >
          <div className={cx('header-wrapper')}>
            <Heading className={cx('title')}>{parentTitle}</Heading>
          </div>
        </div>
      )}
      {title && (
        <div className={cx('component', className)}>
          <div className={cx('header-wrapper')}>
            <Heading className={cx('title')}>{title}</Heading>
          </div>
        </div>
      )}
    </>
  )
}
