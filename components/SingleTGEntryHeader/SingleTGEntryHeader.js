import className from 'classnames/bind'
import styles from './SingleTGEntryHeader.module.scss'
import dynamic from 'next/dynamic'
// Import Components
const Heading = dynamic(() => import('@/components/Heading/Heading'))

let cx = className.bind(styles)

export default function SingleTGEntryHeader({ title, category }) {
  return (
    <div className={cx('component', className)}>
      <div className={cx('header-wrapper')}>
        <Heading className={cx('category')}>{category}</Heading>
        <Heading className={cx('title')}>{title}</Heading>
      </div>
    </div>
  )
}
