import classNames from 'classnames/bind'
import styles from './EntryMoreReviews.module.scss'

let cx = classNames.bind(styles)

export default function EntryMoreReviews({
  parentName,
  categoryName,
  categoryUri,
}) {
  return (
    <article className={cx('component')}>
      <div className={cx('entry-wrapper')}>
        <div className={cx('entry-title')}>{'More Reviews'}</div>
        <div className={cx('entry-border')}></div>
      </div>
      <div className={cx('category-wrapper')}>
        <a href={categoryUri}>
          <h2 className={cx('category')}>
            {parentName} {categoryName}
          </h2>
        </a>
      </div>
    </article>
  )
}
