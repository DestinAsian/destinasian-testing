import { gql } from '@apollo/client'
import { getApolloClient } from '@faustwp/core'
import { checkRateLimit, getClientIp } from '@/lib/serverRateLimit'

const QUERY_BY_TYPE = {
  page: gql`
    query VerifyPagePassword($databaseId: ID!) {
      page(id: $databaseId, idType: DATABASE_ID) {
        passwordProtected {
          onOff
          password
        }
      }
    }
  `,
  post: gql`
    query VerifyPostPassword($databaseId: ID!) {
      post(id: $databaseId, idType: DATABASE_ID) {
        passwordProtected {
          onOff
          password
        }
      }
    }
  `,
  advertorial: gql`
    query VerifyAdvertorialPassword($databaseId: ID!) {
      advertorial(id: $databaseId, idType: DATABASE_ID) {
        passwordProtected {
          onOff
          password
        }
      }
    }
  `,
  editorial: gql`
    query VerifyEditorialPassword($databaseId: ID!) {
      editorial(id: $databaseId, idType: DATABASE_ID) {
        passwordProtected {
          onOff
          password
        }
      }
    }
  `,
  contest: gql`
    query VerifyContestPassword($databaseId: ID!) {
      contest(id: $databaseId, idType: DATABASE_ID) {
        passwordProtected {
          onOff
          password
        }
      }
    }
  `,
  contributor: gql`
    query VerifyContributorPassword($databaseId: ID!) {
      contributor(id: $databaseId, idType: DATABASE_ID) {
        passwordProtected {
          onOff
          password
        }
      }
    }
  `,
  luxeList: gql`
    query VerifyLuxeListPassword($databaseId: ID!) {
      luxeList(id: $databaseId, idType: DATABASE_ID) {
        passwordProtected {
          onOff
          password
        }
      }
    }
  `,
  honorsCircle: gql`
    query VerifyHonorsCirclePassword($databaseId: ID!) {
      honorsCircle(id: $databaseId, idType: DATABASE_ID) {
        passwordProtected {
          onOff
          password
        }
      }
    }
  `,
  luxuryTravel: gql`
    query VerifyLuxuryTravelPassword($databaseId: ID!) {
      luxuryTravel(id: $databaseId, idType: DATABASE_ID) {
        passwordProtected {
          onOff
          password
        }
      }
    }
  `,
  travelGuide: gql`
    query VerifyTravelGuidePassword($databaseId: ID!) {
      travelGuide(id: $databaseId, idType: DATABASE_ID) {
        passwordProtected {
          onOff
          password
        }
      }
    }
  `,
  update: gql`
    query VerifyUpdatePassword($databaseId: ID!) {
      update(id: $databaseId, idType: DATABASE_ID) {
        passwordProtected {
          onOff
          password
        }
      }
    }
  `,
  readersChoiceAward: gql`
    query VerifyReadersChoiceAwardPassword($databaseId: ID!) {
      readersChoiceAward(id: $databaseId, idType: DATABASE_ID) {
        passwordProtected {
          onOff
          password
        }
      }
    }
  `,
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const clientIp = getClientIp(req)
  const rateLimit = checkRateLimit({
    key: `verify-content-password:${clientIp}`,
    limit: 20,
    windowMs: 60 * 1000,
  })

  if (rateLimit.limited) {
    return res.status(429).json({ message: 'Too many attempts. Please try again later.' })
  }

  const { contentType, databaseId, password } = req.body || {}

  if (!contentType || !databaseId || typeof password !== 'string') {
    return res.status(400).json({ message: 'Invalid payload.' })
  }

  const query = QUERY_BY_TYPE[contentType]

  if (!query) {
    return res.status(400).json({ message: 'Unsupported content type.' })
  }

  try {
    const client = getApolloClient()
    const { data } = await client.query({
      query,
      variables: {
        databaseId: String(databaseId),
      },
      fetchPolicy: 'no-cache',
    })

    const contentNode = data?.[contentType]
    const expectedPassword = contentNode?.passwordProtected?.password
    const isProtected = contentNode?.passwordProtected?.onOff

    const valid = Boolean(
      isProtected &&
        typeof expectedPassword === 'string' &&
        expectedPassword.length > 0 &&
        password === expectedPassword,
    )

    return res.status(200).json({ valid })
  } catch (error) {
    console.error('Password verification error:', error)
    return res.status(500).json({ message: 'Server error while verifying password.' })
  }
}
