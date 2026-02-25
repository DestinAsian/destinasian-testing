// lib/fetchMonitor.js - Simple request monitoring for debugging
export const logFetchAttempt = ({
  key,
  timestamp = new Date().toISOString(),
  status = 'pending',
  error = null,
  attempt = 1,
}) => {
  if (typeof window === 'undefined') {
    // Server-side: log to console
    console.log(`[FetchMonitor] ${timestamp} - ${key} - ${status} (attempt ${attempt})`, error ? `Error: ${error}` : '')
  } else {
    // Client-side: optionally store in sessionStorage for debugging
    try {
      const existing = sessionStorage.getItem('fetch_log') ? JSON.parse(sessionStorage.getItem('fetch_log')) : []
      existing.push({ key, timestamp, status, error: error ? error.toString() : null, attempt })
      // Keep only last 50 entries
      if (existing.length > 50) existing.shift()
      sessionStorage.setItem('fetch_log', JSON.stringify(existing))
    } catch (e) {
      // Silently fail if sessionStorage not available
    }
  }
}

export const getFetchLog = () => {
  if (typeof window === 'undefined') return null
  try {
    return JSON.parse(sessionStorage.getItem('fetch_log')) || []
  } catch (e) {
    return null
  }
}
