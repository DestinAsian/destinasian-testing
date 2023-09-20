import { gql } from '@apollo/client'

export const GetCategoryStories = gql`
  query GetCategoryStories($first: Int, $after: String, $termTaxonomyId: [ID] = Int) {
    categories(first: $first, after: $after, where: {termTaxonomyId: $termTaxonomyId}) {
      edges {
        node {
          contentNodes {
            edges {
              node {
                title
                excerpt
                content
                uri
              }
            }
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
