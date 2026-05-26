// lib/graphqlFetcher.js
import { print } from 'graphql'

export const graphQLFetcher = async (
  query,
  variables = {},
  queryOptions = {},
) => {
  try {
    const response = await fetch('/api/graphql', {
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
        payload?.message ||
          payload?.error ||
          `GraphQL request failed (${response.status})`,
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
