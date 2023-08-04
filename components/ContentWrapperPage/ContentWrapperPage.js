import className from 'classnames/bind';
import styles from './ContentWrapperPage.module.scss';

let cx = className.bind(styles);

export default function ContentWrapperPage({ content, children }) {
  return (
    <article className={cx('component')}>
      <div className={cx('content-wrapper')} dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      {children}
    </article>
  );
}
