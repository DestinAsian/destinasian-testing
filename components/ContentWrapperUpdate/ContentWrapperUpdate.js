import className from 'classnames/bind'
import styles from './ContentWrapperUpdate.module.scss'
import { SingleEditorialSlider } from '../SingleEditorialSlider'

let cx = className.bind(styles)

export default function ContentWrapperUpdate({ content, children, images }) {
  // const paragraphs = content?.split('<p>').filter(Boolean)

  // // Insert slider component after the fourth paragraph
  // if (paragraphs.length >= 4) {
  //   paragraphs.splice(4, 0, )
  // }

  // const updatedContent = paragraphs.join('<p>')

  return (
    <article className={cx('component')}>
      <div className={cx('with-slider-wrapper')}>
        <div
          className={cx('content-wrapper')}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {children}
      </div>
    </article>
  )
}
