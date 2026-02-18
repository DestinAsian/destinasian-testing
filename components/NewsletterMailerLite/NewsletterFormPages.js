'use client'

import { useState, useEffect } from 'react'
import styles from './NewsletterForm.module.scss'

export default function NewsletterForm() {
  const [countries, setCountries] = useState([])
  const [segments, setSegments] = useState([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [segmentation, setSegmentation] = useState('')  // ← ubah dari position
  const [country, setCountry] = useState('')
  const [company, setCompany] = useState('')

  const [status, setStatus] = useState(null)
  const [segmentationError, setSegmentationError] = useState('')
  const [countryError, setCountryError] = useState('')

  const validSegmentations = segments.map((seg) =>
    seg.name.replace(/^Level -\s*/, '').trim()
  )
  const validCountries = countries

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name')
      .then((res) => res.json())
      .then((data) => {
        const list = data.map((c) => c.name.common).sort((a, b) => a.localeCompare(b))
        setCountries(list)
      })
      .catch(() => setCountries([]))
  }, [])

  useEffect(() => {
    fetch('/api/segments')
      .then((res) => res.json())
      .then((data) => setSegments(data || []))
      .catch(() => setSegments([]))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSegmentationError('')
    setCountryError('')

    let hasError = false

    const trimmedSegmentation = segmentation.trim()
    if (trimmedSegmentation !== '' && !validSegmentations.includes(trimmedSegmentation)) {
      setSegmentationError('Invalid selection. Please choose from the dropdown or clear the field.')
      hasError = true
    }

    const trimmedCountry = country.trim()
    if (trimmedCountry !== '' && !validCountries.includes(trimmedCountry)) {
      setCountryError('Invalid country. Please select from the dropdown or clear the field.')
      hasError = true
    }

    if (hasError) return

    setStatus({ type: 'loading', message: 'Processing your subscription...' })

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || null,
          country: trimmedCountry || null,
          segmentation: trimmedSegmentation || null,   // ← kirim sebagai 'segmentation'
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
        setSegmentation('')
        setCountry('')
        setCompany('')
        setSegmentationError('')
        setCountryError('')
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
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <span>*</span>
        </div>

        <div className={styles.inputRequired}>
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <span>*</span>
        </div>

        <div className={styles.fieldWrapper}>
          <input
            list="segmentation-list"
            placeholder="Position"
            value={segmentation}
            onChange={(e) => {
              setSegmentation(e.target.value)
              setSegmentationError('')
            }}
          />
          <datalist id="segmentation-list">
            {segments.map((seg) => {
              const label = seg.name.replace(/^Level -\s*/, '').trim()
              return <option key={seg.id} value={label} />
            })}
          </datalist>
          {segmentationError && <div className={styles.fieldError}>{segmentationError}</div>}
        </div>

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

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
            {countries.map((c) => <option key={c} value={c} />)}
          </datalist>
          {countryError && <div className={styles.fieldError}>{countryError}</div>}
        </div>

        <button type="submit" className={styles.submitButton}>Subscribe</button>
      </form>
    </div>
  )
}