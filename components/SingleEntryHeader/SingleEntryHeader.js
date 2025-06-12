import className from 'classnames/bind'
import styles from './SingleEntryHeader.module.scss'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// Import Components
const Heading = dynamic(() => import('@/components/Heading/Heading'))
const CategoryIcon = dynamic(() =>
  import('@/components/CategoryIcon/CategoryIcon'),
)
const LocationIcon = dynamic(() =>
  import('@/components/LocationIcon/LocationIcon'),
)

let cx = className.bind(styles)

export default function SingleEntryHeader({
  parent,
  title,
  className,
  parentCategory,
  categoryUri,
  categoryName,
  categoryLabel,
  chooseYourCategory,
  chooseIcon,
  locationLabel,
  locationUrl,
  locationValidation,
}) {
  return (
    <div className={cx(['component', className])}>
      <>
        <div className={cx('header-wrapper')}>
          {parentCategory !== 'Rest of World' &&
            categoryName !== 'Rest of World' &&
            categoryUri && (
              <Link href={categoryUri}>
                <div className={cx('category-name')}>
                  {parentCategory} {categoryName}
                </div>
              </Link>
            )}
          <Heading className={cx('title')}>
            {/* {parent || null} */}
            {title}
          </Heading>
          <div className={cx('icon-wrapper')}>
            <CategoryIcon
              chooseYourCategory={chooseYourCategory}
              chooseIcon={chooseIcon}
              categoryLabel={categoryLabel}
            />
            <LocationIcon
              locationValidation={locationValidation}
              locationLabel={locationLabel}
              locationUrl={locationUrl}
            />
          </div>
        </div>
      </>
    </div>
  )
}
