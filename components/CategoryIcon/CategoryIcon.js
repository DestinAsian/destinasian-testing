import className from 'classnames/bind'
import styles from './CategoryIcon.module.scss'

import attractionIcon from '../../assets/icons/icon-attraction.png'
import diningIcon from '../../assets/icons/icon-dining.png'
import hotelIcon from '../../assets/icons/icon-hotel.png'
import nightlifeIcon from '../../assets/icons/icon-nightlife.png'
import Image from "next/legacy/image"

let cx = className.bind(styles)

export default function CategoryIcon({
  className,
  categoryLabel,
  chooseYourCategory,
  chooseIcon,
}) {
  return (
    <div className={cx(['component', className])}>
      {chooseIcon == (undefined || null) && (
        <div className={cx('icon-wrapper')}>
          {/* Generate category icon */}
          {chooseYourCategory == 'attraction' && (
            <div className={cx('icon')}>
              <Image
                src={attractionIcon.src}
                layout="fill"
                alt="Attraction Icon"
              />
            </div>
          )}
          {chooseYourCategory == 'dining' && (
            <div className={cx('icon')}>
              <Image src={diningIcon.src} layout="fill" alt="Dining Icon" />
            </div>
          )}
          {chooseYourCategory == 'hotel' && (
            <div className={cx('icon')}>
              <Image src={hotelIcon.src} layout="fill" alt="Hotel Icon" />
            </div>
          )}
          {chooseYourCategory == 'nightlife' && (
            <div className={cx('icon')}>
              <Image
                src={nightlifeIcon.src}
                layout="fill"
                alt="Nightlife Icon"
              />
            </div>
          )}
          {/* Label for category icon */}
          <div className={cx('category-label')}>{categoryLabel}</div>
        </div>
      )}
      {chooseIcon && (
        <div className={cx('icon-wrapper')}>
          {/* Generate category icon */}
          {chooseYourCategory == 'attraction' && (
            <div className={cx('icon')}>
              <Image src={chooseIcon} layout="fill" alt="Attraction Icon" />
            </div>
          )}
          {chooseYourCategory == 'dining' && (
            <div className={cx('icon')}>
              <Image src={chooseIcon} layout="fill" alt="Dining Icon" />
            </div>
          )}
          {chooseYourCategory == 'hotel' && (
            <div className={cx('icon')}>
              <Image src={chooseIcon} layout="fill" alt="Hotel Icon" />
            </div>
          )}
          {chooseYourCategory == 'nightlife' && (
            <div className={cx('icon')}>
              <Image src={chooseIcon} layout="fill" alt="Nightlife Icon" />
            </div>
          )}
          {/* Label for category icon */}
          <div className={cx('category-label')}>{categoryLabel}</div>
        </div>
      )}
    </div>
  )
}
