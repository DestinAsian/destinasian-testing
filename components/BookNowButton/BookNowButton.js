import className from 'classnames/bind'
import styles from './BookNowButton.module.scss'
import { useState } from 'react'
import Link from 'next/link'

let cx = className.bind(styles)

export default function BookNowButton({ bookNowButton, customClassName, id }) {
  // State to manage the visibility of the "Book Now" button.
  const [showBookNow, setShowBookNow] = useState(true)
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    if (isSharing) return // prevent double-clicks

    setIsSharing(true)
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (err) {
      alert('Sharing was canceled.')
    } finally {
      // allow another share after it completes (even if canceled)
      setIsSharing(false)
    }
  }

  return (
    <div
      className={cx('component', customClassName, bookNowButton?.bookNowColor)}
    >
      {bookNowButton?.bookNowLink && bookNowButton?.bookNowLabel && (
        <div
          className={cx('book-now-wrapper', showBookNow ? 'show' : 'hidden')}
        >
          <div className={cx('book-now-button')}>
            {/* {'Book Now Button'} */}
            <Link id={id} target="_blank" href={bookNowButton.bookNowLink}>
              {bookNowButton.bookNowLabel}
            </Link>
          </div>
          <button
            type="button"
            className={cx('share-button')}
            onClick={handleShare}
            disabled={isSharing}
          >
            <svg
              xmlns="https://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ffffff"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
