// lib/graphqlFetcher.js
import { getApolloClient } from '@faustwp/core'

export const graphQLFetcher = async (query, variables = {}) => {
  try {
    const client = getApolloClient()
    const { data, errors } = await client.query({ query, variables })
    
    // Log GraphQL errors if present (even if data exists)
    if (errors && errors.length > 0) {
      console.warn('[GraphQL Errors]', errors)
    }
    
    return data
  } catch (err) {
    // Enhanced error logging
    const errorMsg = err?.message || 'Unknown GraphQL error'
    const networkError = err?.networkError
    const graphQLErrors = err?.graphQLErrors
    
    console.error('[GraphQL Fetch Failed]', {
      message: errorMsg,
      networkError: networkError ? {
        statusCode: networkError.statusCode || 'N/A',
        message: networkError.message || 'Unknown network error'
      } : 'No network error',
      graphQLErrors: graphQLErrors ? graphQLErrors.map(e => e.message) : 'No GraphQL errors'
    })
    
    throw err
  }
}
