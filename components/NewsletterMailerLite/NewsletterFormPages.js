'use client'

import { useState, useEffect } from 'react'
import styles from './NewsletterForm.module.scss'

export default function NewsletterFormPages() {
  const [countries, setCountries] = useState([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')

  const [status, setStatus] = useState(null)
  const [countryError, setCountryError] = useState('')

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name')
      .then((res) => res.json())
      .then((data) => {
        const list = data
          .map((c) => c.name.common)
          .sort((a, b) => a.localeCompare(b))
        setCountries(list)
      })
      .catch(() => setCountries([]))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setCountryError('')

    const trimmedCountry = country.trim()
    if (trimmedCountry && !countries.includes(trimmedCountry)) {
      setCountryError(
        'Invalid country. Please select from the dropdown or clear the field.',
      )
      return
    }

    setStatus({ type: 'loading', message: 'Processing your subscription...' })

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          country: trimmedCountry || null,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you for subscribing to DestinAsian!',
        })
        setName('')
        setEmail('')
        setCountry('')
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Subscription failed. Please try again.',
        })
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Unable to connect to the server. Please try again later.',
      })
    }
  }

  return (
    <div className={styles.newsletterWrapper}>

      <form onSubmit={handleSubmit} className={styles.newsletterForm}>
        {status && (
          <div className={`${styles.alert} ${styles[status.type]}`}>
            {status.message}
          </div>
        )}

        <div className={styles.inputRequired}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span>*</span>
        </div>

        <div className={styles.inputRequired}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>*</span>
        </div>

        <div className={styles.fieldWrapper}>
          <input
            list="country-list"
            placeholder="Country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value)
              setCountryError('')
            }}
          />
          <datalist id="country-list">
            {countries.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>

          {countryError && (
            <div className={styles.fieldError}>{countryError}</div>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Subscribe
        </button>
      </form>
    </div>
  )
}