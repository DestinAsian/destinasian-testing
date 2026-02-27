import { google } from 'googleapis'
import { checkRateLimit, getClientIp } from '@/lib/serverRateLimit'

function sanitizeForSheets(value) {
  const text = typeof value === 'string' ? value.trim() : ''

  if (!text) return ''

  if (/^[=+\-@]/.test(text)) {
    return `'${text}`
  }

  return text
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const clientIp = getClientIp(req)
  const rateLimit = checkRateLimit({
    key: `newsletter-feedback:${clientIp}`,
    limit: 10,
    windowMs: 10 * 60 * 1000,
  })

  if (rateLimit.limited) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' })
  }

  try {
    const { rating, message } = req.body || {}
    const ratingNumber = Number(rating)

    if (!Number.isInteger(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      return res.status(400).json({ message: 'Rating must be an integer from 1 to 5.' })
    }

    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ message: 'Message is required.' })
    }

    if (message.length > 255) {
      return res.status(400).json({ message: 'Message cannot exceed 255 characters.' })
    }

    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      return res.status(500).json({ message: 'Missing GOOGLE_SHEETS_CLIENT_EMAIL' })
    }

    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      return res.status(500).json({ message: 'Missing GOOGLE_SHEETS_PRIVATE_KEY' })
    }

    if (!process.env.GOOGLE_SHEET_ID) {
      return res.status(500).json({ message: 'Missing GOOGLE_SHEET_ID' })
    }

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    await auth.authorize()

    const sheets = google.sheets({
      version: 'v4',
      auth,
    })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'DA-newsletter-feedback!A:C',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[String(ratingNumber), sanitizeForSheets(message), new Date().toISOString()]],
      },
    })

    return res.status(200).json({
      success: true,
      message: 'Feedback stored successfully.',
    })
  } catch (error) {
    console.error('Sheets error:', error?.message || error)

    return res.status(500).json({
      message: 'Server error while saving feedback. Please contact support.',
    })
  }
}
