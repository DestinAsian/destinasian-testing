import fetch from 'node-fetch'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const {
    email,
    name = '',
    company = '',
    country = '',
    segmentation = null,
  } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email wajib diisi' })
  }

  try {
    /* ================= GET CLIENT IP ================= */

    const forwarded = req.headers['x-forwarded-for']
    const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress

    /* ================= GEO LOCATION ================= */

    let location = {
      city: '',
      country,
      state: '',
      zip: '',
    }

    try {
      const geoRes = await fetch(`https://ipapi.co/${ip}/json/`)
      const geoData = await geoRes.json()

      location = {
        city: geoData.city || '',
        country: country || geoData.country_name || '',
        state: geoData.region || '',
        zip: geoData.postal || '',
      }
    } catch {

    }

    /* ================= CREATE SUBSCRIBER ================= */

    const createRes = await fetch(
      `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUP_ID}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
        },
        body: JSON.stringify({
          email,
          name,
          fields: {
            ...location,
            segmentation: segmentation || '',
            company: company || '',
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
  } catch (err) {
    console.error('MAILERLITE ERROR:', err)

    return res.status(500).json({
      message: 'Server error',
    })
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
