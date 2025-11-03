import className from 'classnames/bind'
import styles from './BookNowButton.module.scss'
import { useState } from 'react'
import Link from 'next/link'

let cx = className.bind(styles)

export default function BookNowButton({ bookNowButton, className, id }) {
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
    <div className={cx('component', className)}>
      {bookNowButton?.bookNowLink && bookNowButton?.bookNowLabel && (
        <div
          className={cx('book-now-wrapper', showBookNow ? 'show' : 'hidden')}
        >
          <div
            className={cx('book-now-button')}
            style={{
              ...(bookNowButton?.bookNowBackgroundColor && {
                backgroundColor: bookNowButton.bookNowBackgroundColor,
              }),
            }}
          >
            {/* {'Book Now Button'} */}
            <Link
              id={id}
              target="_blank"
              href={bookNowButton.bookNowLink}
              style={{
                ...(bookNowButton?.bookNowTextColor && {
                  color: bookNowButton.bookNowTextColor,
                }),
              }}
            >
              {bookNowButton.bookNowLabel}
            </Link>
            {/* {'Close Button'} */}
            {/* <button
              className={cx('close-button')}
              onClick={() => setShowBookNow(false)}
              aria-label="Close"
              style={{
                ...(bookNowButton?.bookNowTextColor && {
                  color: bookNowButton.bookNowTextColor,
                }),
              }}
            >
              &times;
            </button> */}
          </div>
           <button
            type="button"
            className={cx('share-button')}
            onClick={handleShare}
            disabled={isSharing}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ffffff"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
