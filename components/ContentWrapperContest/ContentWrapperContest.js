import className from 'classnames/bind';
import styles from './ContentWrapperContest.module.scss';

let cx = className.bind(styles);

export default function ContentWrapperContest({ content, children }) {
  return (
    <article className={cx('component')}>
      <div className={cx('content-wrapper')} dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      {children}
    </article>
  );
}
