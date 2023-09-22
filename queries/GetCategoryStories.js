import { gql } from '@apollo/client'

export const GetCategoryStories = gql`
  query GetCategoryStories($first: Int, $after: String, $id: ID!) {
    category(id: $id, idType: DATABASE_ID) {
      contentNodes(
        first: $first
        after: $after
      ) {
        edges {
          node {
            title
            excerpt
            content
            uri
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
