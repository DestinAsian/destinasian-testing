// lib/graphqlFetcher.js
import { print } from 'graphql'

const getGraphQLEndpoint = () => {
  if (process.env.NEXT_PUBLIC_USE_WORDPRESS_PROXY === 'true') {
    return '/api/graphql'
  }

  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL

  if (!baseUrl) {
    return '/api/graphql'
  }

  return `${baseUrl.replace(/\/$/, '')}/index.php?graphql`
}

export const graphQLFetcher = async (
  query,
  variables = {},
  queryOptions = {},
) => {
  try {
    const response = await fetch(getGraphQLEndpoint(), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(queryOptions.headers || {}),
      },
      body: JSON.stringify({
        query: typeof query === 'string' ? query : print(query),
        variables,
      }),
      cache: 'no-store',
    })

    const payload = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(
        payload?.message || payload?.error || `GraphQL request failed (${response.status})`,
      )
    }

    if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
      console.warn('[GraphQL Errors]', payload.errors)
    }

    return payload?.data
  } catch (err) {
    const errorMsg = err?.message || 'Unknown GraphQL error'

    console.error('[GraphQL Fetch Failed]', {
      message: errorMsg,
      networkError: err?.networkError || 'No network error',
      graphQLErrors: err?.graphQLErrors
        ? err.graphQLErrors.map((e) => e.message)
        : 'No GraphQL errors',
    })

    throw err
  }
}
