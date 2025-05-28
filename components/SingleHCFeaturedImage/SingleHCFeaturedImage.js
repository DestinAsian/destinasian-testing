import className from 'classnames/bind'
import styles from './SingleHCFeaturedImage.module.scss'
import dynamic from 'next/dynamic'
// Import Components
const FeaturedImage = dynamic(() =>
  import('@/components/FeaturedImage/FeaturedImage'),
)

let cx = className.bind(styles)

export default function SingleHCFeaturedImage({ image }) {
  return (
    <div className={cx(['component', className])}>
      <div className={cx('image-wrapper')}>
        {image && (
          <FeaturedImage image={image} className={cx('image')} priority />
        )}
      </div>
    </div>
  )
}
