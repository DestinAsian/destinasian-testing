import className from 'classnames/bind'
import styles from './CategoryIcon.module.scss'

import attractionIcon from '../../assets/icons/icon-attraction.png'
import diningIcon from '../../assets/icons/icon-dining.png'
import hotelIcon from '../../assets/icons/icon-hotel.png'
import nightlifeIcon from '../../assets/icons/icon-nightlife.png'

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
              <img src={attractionIcon.src} />
            </div>
          )}
          {chooseYourCategory == 'dining' && (
            <div className={cx('icon')}>
              <img src={diningIcon.src} />
            </div>
          )}
          {chooseYourCategory == 'hotel' && (
            <div className={cx('icon')}>
              <img src={hotelIcon.src} />
            </div>
          )}
          {chooseYourCategory == 'nightlife' && (
            <div className={cx('icon')}>
              <img src={nightlifeIcon.src} />
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
              <img src={chooseIcon} />
            </div>
          )}
          {chooseYourCategory == 'dining' && (
            <div className={cx('icon')}>
              <img src={chooseIcon} />
            </div>
          )}
          {chooseYourCategory == 'hotel' && (
            <div className={cx('icon')}>
              <img src={chooseIcon} />
            </div>
          )}
          {chooseYourCategory == 'nightlife' && (
            <div className={cx('icon')}>
              <img src={chooseIcon} />
            </div>
          )}
          {/* Label for category icon */}
          <div className={cx('category-label')}>{categoryLabel}</div>
        </div>
      )}
    </div>
  )
}
