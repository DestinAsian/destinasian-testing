import className from 'classnames/bind'
import styles from './ContentWrapperHC.module.scss'
import { SingleHCSlider } from '../SingleHCSlider'

let cx = className.bind(styles)

export default function ContentWrapperHC({ content, children, images }) {
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
          <SingleHCSlider images={images} />
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
