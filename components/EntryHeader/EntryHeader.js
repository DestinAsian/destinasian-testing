import className from 'classnames/bind'
import styles from './EntryHeader.module.scss'
import dynamic from 'next/dynamic'
// Import Components
const Heading = dynamic(() => import('@/components/Heading/Heading'))
const PostInfo = dynamic(() => import('@/components/PostInfo/PostInfo'))
const FeaturedImage = dynamic(() =>
  import('@/components/FeaturedImage/FeaturedImage'),
)

let cx = className.bind(styles)

export default function EntryHeader({
  parent,
  title,
  hcTitle,
  hcCountryTitle,
  image,
  date,
  author,
  className,
  hcCaption,
  contestTitle,
}) {
  const hasText = parent || title || date || author

  return (
    <div className={cx(['component', className])}>
      {image && (
        <FeaturedImage image={image} className={cx('image')} priority />
      )}

      {hasText && (
        <div className={cx('text', { 'has-image': image })}>
          <>
            {!!title && (
              <Heading className={cx('title')}>
                {parent || null} {title}
              </Heading>
            )}
            <PostInfo className={cx('byline')} author={author} date={date} />
          </>
        </div>
      )}

      {hcTitle && (
        <>
          <Heading className={cx('hc-title')}>{hcTitle}</Heading>
          <Heading className={cx('hc-caption')}>{hcCaption}</Heading>
        </>
      )}

      {hcCountryTitle && (
        <>
          <Heading className={cx('hc-title')}>
            {'Honors Circle : '}
            {hcCountryTitle}
          </Heading>
          <Heading className={cx('hc-caption')}>{hcCaption}</Heading>
        </>
      )}

      {contestTitle && (
        <>
          <Heading className={cx('contest-title')}>{contestTitle}</Heading>
        </>
      )}
    </div>
  )
}
