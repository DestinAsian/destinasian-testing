import className from 'classnames/bind'
import styles from './ContentWrapperEditorial.module.scss'
import { SingleEditorialSlider } from '../SingleEditorialSlider'

let cx = className.bind(styles)

export default function ContentWrapperEditorial({ content, children, images }) {
  // const paragraphs = content?.split('<p>').filter(Boolean)

  // // Insert slider component after the fourth paragraph
  // if (paragraphs.length >= 4) {
  //   paragraphs.splice(4, 0, )
  // }

  // const updatedContent = paragraphs.join('<p>')

  return (
    <article className={cx('component')}>
      {images[0] != null && (
        <div className={cx('with-slider-wrapper')}>
          <SingleEditorialSlider images={images} />
          <div
            className={cx('content-wrapper')}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {children}
          
        </div>
      )}

      {images[0] == null && (
        <div className={cx('with-slider-wrapper')}>
          <div
            className={cx('content-wrapper')}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {children}
        </div>
      )}
    </article>
  )
}
