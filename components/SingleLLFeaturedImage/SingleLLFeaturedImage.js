import className from 'classnames/bind'
import { FeaturedImage } from '..'
import styles from './SingleLLFeaturedImage.module.scss'

let cx = className.bind(styles)

export default function SingleLLFeaturedImage({
  image,
}) {
  return (
    <div className={cx(['component', className])}>
      <div className={cx('image-wrapper')}>
        {image && (
          <FeaturedImage
            image={image}
            layout={'intrinsic'}
            className={cx('image')}
            priority
          />
        )}
      </div>
    </div>
  )
}
