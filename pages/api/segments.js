import fetch from 'node-fetch'
import { checkRateLimit, getClientIp } from '@/lib/serverRateLimit'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const clientIp = getClientIp(req)
  const rateLimit = checkRateLimit({
    key: `segments:${clientIp}`,
    limit: 30,
    windowMs: 10 * 60 * 1000,
  })

  if (rateLimit.limited) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' })
  }

  if (!process.env.MAILERLITE_API_KEY) {
    return res.status(500).json({ message: 'MailerLite is not configured.' })
  }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/segments', {
      headers: {
        Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Failed to fetch segments.' })
    }

    return res.status(200).json(data?.data || [])
  } catch {
    return res.status(500).json({ message: 'Server error.' })
  }
}
