'use client'
import { useState, useEffect } from 'react'
import styles from './NewsletterForm.module.scss'

export default function NewsletterForm() {
  const [countries, setCountries] = useState([])
  const [segments, setSegments] = useState([])
  const [selectedSegments, setSelectedSegments] = useState([])

  const [name, setName] = useState('')
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

  const toggleSegment = (id) => {
    setSelectedSegments((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedSegments.length) {
      return setStatus({
        type: 'error',
        message: 'Please select at least one segment to subscribe.',
      })
    }

    setStatus({ type: 'loading', message: 'Processing your subscription...' })

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          country,
          segments: selectedSegments,
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
        setSelectedSegments([])
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

        {/* SEGMENTS */}
        <div className={styles.segments}>
          {segments.map((seg) => {
            const active = selectedSegments.includes(seg.id)
            // Hapus "Level - " dari label
            const cleanLabel = seg.name.replace(/^Level -\s*/, '')

            return (
              <div
                key={seg.id}
                className={`${styles.segmentItem} ${
                  active ? styles.active : ''
                }`}
                onClick={() => toggleSegment(seg.id)}
              >
                <span className={styles.dot}></span>
                <span className={styles.label}>{cleanLabel}</span>
              </div>
            )
          })}
        </div>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          list="country-list"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <datalist id="country-list">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        {/* EMAIL + BUTTON SEJARAH */}
        <div className={styles.emailButtonWrapper}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">SUBSCRIBE</button>
        </div>
      </form>
    </div>
  )
}
