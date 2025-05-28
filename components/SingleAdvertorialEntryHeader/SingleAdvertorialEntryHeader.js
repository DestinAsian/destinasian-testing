import className from 'classnames/bind'
import styles from './SingleAdvertorialEntryHeader.module.scss'
import dynamic from 'next/dynamic'
// Import Components
const Heading = dynamic(() => import('@/components/Heading/Heading'))

let cx = className.bind(styles)

export default function SingleAdvertorialEntryHeader({
  title,
  label,
  luxuryTravelClass,
}) {
  return (
    <div
      className={cx(
        className,
        luxuryTravelClass === 'luxuryTravelClass'
          ? 'luxuryTravelClass'
          : 'component',
      )}
    >
      <div className={cx('header-wrapper')}>
        <Heading className={cx('sponsored')}>{label}</Heading>
        <Heading className={cx('title')}>{title}</Heading>
      </div>
    </div>
  )
}
