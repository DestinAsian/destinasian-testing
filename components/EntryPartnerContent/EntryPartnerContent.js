import classNames from 'classnames/bind'
import styles from './EntryPartnerContent.module.scss'

let cx = classNames.bind(styles)

export default function EntryPartnerContent({
}) {

  return (
    <article className={cx('component')}>
      <div className={cx('entry-wrapper')}>
        <div className={cx('entry-title')}>{'Partner Content'}</div>
        <div className={cx('entry-border')}></div>
      </div>
    </article>
  )
}
