'use client'
import { useState, useEffect } from 'react'
import styles from './NewsletterForm.module.scss'

export default function NewsletterForm() {
  const [countries, setCountries] = useState([])
  const [segments, setSegments] = useState([])

  const [name, setName] = useState('')
  const [position, setPosition] = useState('') // <-- position field
  const [country, setCountry] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  // LOAD COUNTRIES
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name')
      .then((res) => res.json())
      .then((data) => {
        const list = data
          .map((c) => c.name.common)
          .sort((a, b) => a.localeCompare(b))
        setCountries(list)
      })
  }, [])

  // LOAD SEGMENTS
  useEffect(() => {
    fetch('/api/segments')
      .then((res) => res.json())
      .then((data) => setSegments(data || []))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Processing your subscription...' })

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          country: country || null,
          position: position || null,
        }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you for subscribing to DestinAsian!',
        })
        setEmail('')
        setName('')
        setCountry('')
        setPosition('')
      } else {
        setStatus({
          type: 'error',
          message: `Subscription failed: ${data.message}`,
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
      <h1>Stay inspired with our DestinAsian newsletters</h1>

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

        {/* POSITION (segment) */}
        <input
          list="position-list"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <datalist id="position-list">
          {segments.map((seg) => {
            const cleanLabel = seg.name.replace(/^Level -\s*/, '')
            return <option key={seg.id} value={cleanLabel} />
          })}
        </datalist>

        <input
          list="country-list"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <datalist id="country-list">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        <div className={styles.emailButtonWrapper}>
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

          <button type="submit">SUBSCRIBE</button>
        </div>
      </form>
    </div>
  )
}
