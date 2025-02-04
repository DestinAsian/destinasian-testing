import className from 'classnames/bind'
import { Heading } from '../../components'
import styles from './SingleRCAEntryHeader.module.scss'

let cx = className.bind(styles)

export default function SingleRCAEntryHeader({ title, category }) {
  return (
    <div className={cx('component', className)}>
      <div className={cx('header-wrapper')}>
        {category && <Heading className={cx('category')}>{category}</Heading>}
        {title && <Heading className={cx('title')}>{title}</Heading>}
      </div>
    </div>
  )
}
