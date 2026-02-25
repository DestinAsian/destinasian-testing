import React from 'react'
import classNames from 'classnames/bind'
import styles from './ErrorFallback.module.scss'

let cx = classNames.bind(styles)

export default function ErrorFallback({ error, onRetry, title = 'Unable to Load Content' }) {
  const getErrorMessage = () => {
    if (!error) return 'An unknown error occurred'
    
    if (error.networkError?.statusCode === 520) {
      return 'The server encountered an error. Please try again in a few moments.'
    }
    
    if (error.message && error.message.includes('Failed to fetch')) {
      return 'Network connection failed. Please check your internet connection.'
    }
    
    if (error.message) {
      return error.message
    }
    
    return 'Failed to load content. Please try again.'
  }

  return (
    <div className={cx('component')}>
      <div className={cx('error-container')}>
        <h2 className={cx('title')}>{title}</h2>
        <p className={cx('message')}>{getErrorMessage()}</p>
        {onRetry && (
          <button className={cx('retry-button')} onClick={onRetry}>
            Try Again
          </button>
        )}
        <p className={cx('support-text')}>
          If the problem persists, please contact support or try again later.
        </p>
      </div>
    </div>
  )
}
