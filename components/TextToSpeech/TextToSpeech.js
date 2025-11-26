import { useState, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './TextToSpeech.module.scss'

const cx = classNames.bind(styles)

export default function TextToSpeech({ customClassName, textToSpeech }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const textToRead = textToSpeech?.audioFile?.mediaItemUrl ?? []

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

  const handlePlay = () => {
    if (!audioRef.current) return
    audioRef.current.play()
    setIsPlaying(true)
  }

  const handlePause = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }

  return (
    <div className={cx('component', customClassName)}>
      {textToRead && (
        <div className={cx('tts-button-wrapper')}>
          <audio ref={audioRef} src={textToRead} preload="none" />

          {!isPlaying ? (
            <button className={cx('tts-button')} onClick={handlePlay}>
              <svg
                width="50"
                height="69"
                viewBox="0 0 50 69"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Play Button */}
                <path
                  d="M50 34.5L0.499997 68.708L0.5 0.291994L50 34.5Z"
                  fill="#ffffff"
                />
              </svg>
              {'Listen to this story'}
            </button>
          ) : (
            <button className={cx('tts-button')} onClick={handlePause}>
              {' '}
              <svg
                width="34"
                height="44"
                viewBox="0 0 34 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Pause Button */}
                <path
                  d="M2.11088 0.486993H8.29661C8.61163 0.486993 8.88369 0.601543 9.11279 0.830643C9.34189 1.05974 9.45644 1.3318 9.45644 1.64682V42.2407C9.45644 42.5557 9.34189 42.8278 9.11279 43.0569C8.88369 43.286 8.61163 43.4005 8.29661 43.4005H2.11088C1.79587 43.4005 1.52381 43.286 1.29471 43.0569C1.06561 42.8278 0.951057 42.5557 0.951057 42.2407V1.64682C0.951057 1.3318 1.06561 1.05974 1.29471 0.830643C1.52381 0.601543 1.79587 0.486993 2.11088 0.486993ZM25.7202 0.486993H31.9059C32.2209 0.486993 32.493 0.601543 32.7221 0.830643C32.9512 1.05974 33.0657 1.3318 33.0657 1.64682V42.2407C33.0657 42.5557 32.9512 42.8278 32.7221 43.0569C32.493 43.286 32.2209 43.4005 31.9059 43.4005H25.7202C25.4051 43.4005 25.1331 43.286 24.904 43.0569C24.6749 42.8278 24.5603 42.5557 24.5603 42.2407V1.64682C24.5603 1.3318 24.6749 1.05974 24.904 0.830643C25.1331 0.601543 25.4051 0.486993 25.7202 0.486993Z"
                  fill="#ffffff"
                />
              </svg>
              {'Pause Reading'}
            </button>
          )}
          {/* <button
            className={cx('tts-button', {
              speaking: speechStatus === 'started',
            })}
            onClick={handleToggle}
          >
            {speechStatus === 'started' ? (
              <>
    
              </>
            ) : (
              <>
                
              </>
            )}
          </button> */}
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
