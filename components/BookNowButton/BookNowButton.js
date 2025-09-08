import className from 'classnames/bind'
import styles from './BookNowButton.module.scss'
import { useState } from 'react'
import Link from 'next/link'

let cx = className.bind(styles)

export default function BookNowButton({ bookNowButton, className, id }) {
  // State to manage the visibility of the "Book Now" button.
  const [showBookNow, setShowBookNow] = useState(true)

  return (
    <div className={cx('component', className)}>
      {bookNowButton?.bookNowLink && bookNowButton?.bookNowLabel && (
        <div
          className={cx('book-now-wrapper', showBookNow ? 'show' : 'hidden')}
        >
          <div className={cx('book-now-button')}>
            {/* {'Book Now Button'} */}
            <Link id={id} target="_blank" href={bookNowButton.bookNowLink}>
              {bookNowButton.bookNowLabel}
            </Link>
            {/* {'Close Button'} */}
            <button
              className={cx('close-button')}
              onClick={() => setShowBookNow(false)}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
