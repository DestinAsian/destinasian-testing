// lib/useSWRGraphQL.js
import useSWR from 'swr'
import { graphQLFetcher } from './graphqlFetcher'

export const useSWRGraphQL = (key, query, variables = {}) => {
  return useSWR(
    key ? [key, variables] : null,
    ([, vars]) => graphQLFetcher(query, vars),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
      // Retry failures: 3 attempts with exponential backoff
      errorRetryCount: 3,
      errorRetryInterval: 1000, // 1s, 2s, 4s progression
      // Optionally: shouldRetryOnError: (error) => {...}
      onError: (error) => {
        console.error(`[SWR Error] Key: ${key}`, error)
      }
    }
  )
}

