import className from 'classnames/bind'
import { Heading } from '..'
import styles from './SingleAdvertorialEntryHeader.module.scss'

let cx = className.bind(styles)

export default function SingleAdvertorialEntryHeader({
  title,
  label,
}) {

  return (
    <div className={cx('component', className)}>
      <div className={cx('header-wrapper')}>
      <Heading className={cx('sponsored')}>
          {label}
        </Heading>
        <Heading className={cx('title')}>
          {title}
        </Heading>
      </div>
    </div>
  )
}
