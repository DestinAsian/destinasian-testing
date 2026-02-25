import React, { useEffect, useState } from 'react'

export default function FormatDate({ date }) {
  const [formatted, setFormatted] = useState(null)

  useEffect(() => {
    const d = new Date(date)
    if (isNaN(d.valueOf())) {
      setFormatted(null)
      return
    }

    const timeformat = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: false,
    }

    setFormatted(d.toLocaleDateString('en-US', timeformat))
  }, [date])

  if (formatted === null) return null

  return <>{formatted}</>
}
