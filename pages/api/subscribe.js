import fetch from 'node-fetch'
import { checkRateLimit, getClientIp } from '@/lib/serverRateLimit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitizeText(value, maxLength = 100) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const clientIp = getClientIp(req)
  const rateLimit = checkRateLimit({
    key: `subscribe:${clientIp}`,
    limit: 20,
    windowMs: 15 * 60 * 1000,
  })

  if (rateLimit.limited) {
    return res.status(429).json({ message: 'Terlalu banyak request. Coba lagi nanti.' })
  }

  const {
    email,
    name = '',
    company = '',
    country = '',
    segmentation = '',
  } = req.body || {}

  const normalizedEmail =
    typeof email === 'string' ? email.trim().toLowerCase() : ''

  if (!normalizedEmail || !EMAIL_REGEX.test(normalizedEmail)) {
    return res.status(400).json({ message: 'Format email tidak valid' })
  }

  if (!process.env.MAILERLITE_GROUP_ID || !process.env.MAILERLITE_API_KEY) {
    return res.status(500).json({ message: 'MailerLite belum dikonfigurasi' })
  }

  const sanitizedName = sanitizeText(name, 120)
  const sanitizedCompany = sanitizeText(company, 120)
  const sanitizedCountry = sanitizeText(country, 120)
  const sanitizedSegmentation = sanitizeText(segmentation, 120)

  let location = {
    city: '',
    country: sanitizedCountry,
    state: '',
    zip: '',
  }

  try {
    const geoRes = await fetch(`https://ipapi.co/${clientIp}/json/`)
    const geoData = await geoRes.json()

    location = {
      city: sanitizeText(geoData?.city, 120),
      country: sanitizedCountry || sanitizeText(geoData?.country_name, 120),
      state: sanitizeText(geoData?.region, 120),
      zip: sanitizeText(geoData?.postal, 20),
    }
  } catch {
    // Ignore geolocation lookup failures.
  }

  try {
    const createRes = await fetch(
      `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUP_ID}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
        },
        body: JSON.stringify({
          email: normalizedEmail,
          name: sanitizedName,
          fields: {
            ...location,
            segmentation: sanitizedSegmentation,
            company: sanitizedCompany,
          },
        }),
      },
    )

    const subscriber = await createRes.json()

    if (!createRes.ok) {
      return res.status(createRes.status).json({
        message: subscriber?.error || 'Gagal subscribe',
      })
    }

    return res.status(200).json({
      message: 'Berhasil subscribe!',
      subscriber,
    })
  } catch (error) {
    console.error('MAILERLITE ERROR:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}








// import fetch from 'node-fetch'

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' })
//   }

//   const {
//     email,
//     name = '',
//     company = '',
//     country = '',
//     segmentation = null,
//   } = req.body

//   if (!email) {
//     return res.status(400).json({ message: 'Email wajib diisi' })
//   }

//   try {
//     /* ================= GET CLIENT IP ================= */

//     const forwarded = req.headers['x-forwarded-for']
//     const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress

//     /* ================= GEO LOCATION ================= */

//     let location = {
//       city: '',
//       country,
//       state: '',
//       zip: '',
//     }

//     try {
//       const geoRes = await fetch(`https://ipapi.co/${ip}/json/`)
//       const geoData = await geoRes.json()

//       location = {
//         city: geoData.city || '',
//         country: country || geoData.country_name || '',
//         state: geoData.region || '',
//         zip: geoData.postal || '',
//       }
//     } catch {
//       // silent geo fail
//     }

//     /* ================= CREATE SUBSCRIBER ================= */

//     const createRes = await fetch(
//       `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUP_ID}/subscribers`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
//         },
//         body: JSON.stringify({
//           email,
//           name,
//           fields: {
//             ...location,
//             segmentation: segmentation || '',
//             company: company || '',
//           },
//         }),
//       },
//     )

//     const subscriber = await createRes.json()

//     if (!createRes.ok) {
//       return res.status(createRes.status).json({
//         message: subscriber?.error || 'Gagal subscribe',
//       })
//     }

//     return res.status(200).json({
//       message: 'Berhasil subscribe!',
//       subscriber,
//     })
//   } catch (err) {
//     console.error('MAILERLITE ERROR:', err)

//     return res.status(500).json({
//       message: 'Server error',
//     })
//   }
// }
