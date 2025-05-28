import className from 'classnames/bind'
import styles from './SingleContestEntryHeader.module.scss'
import dynamic from 'next/dynamic'
// Import Components
const Heading = dynamic(() => import('@/components/Heading/Heading'))
const Container = dynamic(() => import('@/components/Container/Container'))

let cx = className.bind(styles)

export default function SingleContestEntryHeader({ title, className }) {
  return (
    <div className={cx(['component', className])}>
      <Container>
        <div className={cx('header-wrapper')}>
          <Heading className={cx('title')}>
            {title}
          </Heading>
        </div>
      </Container>
    </div>
  )
}
