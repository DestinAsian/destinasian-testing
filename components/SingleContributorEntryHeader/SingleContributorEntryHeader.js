import className from 'classnames/bind'
import styles from './SingleContributorEntryHeader.module.scss'
import dynamic from 'next/dynamic'
// Import Components
const Heading = dynamic(() => import('@/components/Heading/Heading'))
const ContentWrapper = dynamic(() =>
  import('@/components/ContentWrapper/ContentWrapper'),
)

let cx = className.bind(styles)

export default function SingleContributorEntryHeader({ name, title, content }) {
  return (
    <div className={cx('component')}>
      <div className={cx('header-wrapper')}>
        {name && <Heading className={cx('name')}>{name}</Heading>}
        {title && <Heading className={cx('title')}>{title}</Heading>}
        {content && (
          <div className={cx('content-wrapper')}>
            <ContentWrapper content={content} className={'contributorClass'} />
          </div>
        )}
      </div>
    </div>
  )
}
