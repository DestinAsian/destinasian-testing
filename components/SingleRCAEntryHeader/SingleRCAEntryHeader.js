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
        <div
          style={{
            marginTop: isMobile ? `${sliderHeight}px` : '',
            // marginLeft: !isMobile ? `${sliderWidth}px` : '',
            width: `${sliderWidth}px`,
          }}
          className={cx('component', className)}
        >
          <div className={cx('rca-title-wrapper')}>
            <Heading level={'h3'} className={cx('rca-title')}>
              {`DESTINASIAN Readers’ Choice Awards`}
            </Heading>
          </div>
        </div>
      )}
      {/* {parentTitle && (
        <div className={cx('component', className)}>
          <div className={cx('header-wrapper')}>
            <Heading level={hasBoth ? 'h2' : 'h1'} className={cx('title')}>
              {parentTitle}
            </Heading>
          </div>
        </div>
      )} */}
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
