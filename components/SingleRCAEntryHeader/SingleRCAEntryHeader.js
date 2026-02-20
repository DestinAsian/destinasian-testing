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
  hasBoth,
  rcaTitle,
}) {
  return (
    <>
      {rcaTitle && (
        <div className={cx('component', className)}>
          <div className={cx('header-wrapper')}>
            <Heading level={'h3'} className={cx('rca-title')}>
              {`DESTINASIAN  ${rcaTitle}`}
            </Heading>
          </div>
        </div>
      )}
      {parentTitle && (
        <div
          style={{
            marginTop: isMobile ? `${sliderHeight}px` : '',
            // marginLeft: !isMobile ? `${sliderWidth}px` : '',
            width: `${sliderWidth}px`,
          }}
          className={cx('component', className)}
        >
          <div className={cx('header-wrapper')}>
            <Heading level={hasBoth ? 'h2' : 'h1'} className={cx('title')}>
              {parentTitle}
            </Heading>
          </div>
        </div>
      )}
      {title && (
        <div className={cx('component', className)}>
          <div className={cx('header-wrapper')}>
            <Heading level={'h1'} className={cx('title')}>
              {title}
            </Heading>
          </div>
        </div>
      )}
    </>
  )
}
