import className from 'classnames/bind'
import styles from './LocationIcon.module.scss'

import locationIcon from '../../assets/icons/icon-location.png'
import Image from "next/image"

let cx = className.bind(styles)

export default function LocationIcon({
  className,
  locationValidation,
  locationLabel,
  locationUrl,
}) {
  return (
    <div className={cx(['component', className])}>
      <div className={cx('icon-wrapper')}>
        {/* Location Icon */}
        {locationValidation == 'acfLocationIcon' && (
          <a href={locationUrl}>
            <div className={cx('icon')}>
              <Image src={locationIcon.src} alt="Location Icon" fill sizes="100%" />
            </div>
          </a>
        )}
        {/* Location label */}
        <a href={locationUrl}>
          <div className={cx('location-label')}>{locationLabel}</div>
        </a>
      </div>
    </div>
  );
}
