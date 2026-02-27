'use client'

import { useState } from 'react'
import styles from './NewsletterFeedback.module.scss'

export default function NewsletterFeedbackRCA() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validateForm = () => {
    if (!rating) return 'Please select a rating.'
    if (!message.trim()) return 'Message is required.'
    if (message.length > 255)
      return 'Message cannot exceed 255 characters.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return

    const error = validateForm()
    if (error) {
      setErrorMessage(error)
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/newsletter-feedback-rca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, message }),
      })

      if (!res.ok) throw new Error('Submission failed.')

      setStatus('success')
      setRating(0)
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          How was your DestinAsian experience?
        </h1>

        <p className={styles.subtitle}>
          Your feedback helps us shape exceptional journeys in hotels,
          dining, nightlife, and more.
        </p>

        <div className={styles.rating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`${styles.star} ${
                star <= rating ? styles.active : ''
              } ${star <= hover && !rating ? styles.hover : ''}`}
            >
              ★
            </span>
          ))}
        </div>

        <div className={styles.selectedText}>
          Selected rating: {rating} / 5
        </div>

        {status === 'error' && (
          <div className={styles.error}>{errorMessage}</div>
        )}

        {status === 'success' && (
          <div className={styles.success}>
            Thank you for your feedback.
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.formRow}>
          <div className={styles.textareaWrapper}>
            <textarea
              className={styles.textarea}
              placeholder="Share what stood out, and how we can elevate your next DestinAsian experience."
              maxLength={255}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className={styles.counter}>
              {message.length} / 255
            </div>
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  )
}