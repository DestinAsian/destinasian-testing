import className from 'classnames/bind'
import styles from './CategoryIcon.module.scss'

import attractionIcon from '../../assets/icons/icon-attraction.png'
import diningIcon from '../../assets/icons/icon-dining.png'
import hotelIcon from '../../assets/icons/icon-hotel.png'
import nightlifeIcon from '../../assets/icons/icon-nightlife.png'
import Image from "next/image"

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
              <Image src={attractionIcon.src} alt="Attraction Icon" fill sizes="100%" />
            </div>
          )}
          {chooseYourCategory == 'dining' && (
            <div className={cx('icon')}>
              <Image src={diningIcon.src} alt="Dining Icon" fill sizes="100%" />
            </div>
          )}
          {chooseYourCategory == 'hotel' && (
            <div className={cx('icon')}>
              <Image src={hotelIcon.src} alt="Hotel Icon" fill sizes="100%" />
            </div>
          )}
          {chooseYourCategory == 'nightlife' && (
            <div className={cx('icon')}>
              <Image src={nightlifeIcon.src} alt="Nightlife Icon" fill sizes="100%" />
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
              <Image src={chooseIcon} alt="Attraction Icon" fill sizes="100%" />
            </div>
          )}
          {chooseYourCategory == 'dining' && (
            <div className={cx('icon')}>
              <Image src={chooseIcon} alt="Dining Icon" fill sizes="100%" />
            </div>
          )}
          {chooseYourCategory == 'hotel' && (
            <div className={cx('icon')}>
              <Image src={chooseIcon} alt="Hotel Icon" fill sizes="100%" />
            </div>
          )}
          {chooseYourCategory == 'nightlife' && (
            <div className={cx('icon')}>
              <Image src={chooseIcon} alt="Nightlife Icon" fill sizes="100%" />
            </div>
          )}
          {/* Label for category icon */}
          <div className={cx('category-label')}>{categoryLabel}</div>
        </div>
      )}
    </div>
  );
}
