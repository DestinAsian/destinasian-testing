import { gql } from '@apollo/client'

export const GetContestPages = gql`
  query GetContestPages($first: Int) {
    contests(
      first: $first
      where: { status: PUBLISH, orderby: { field: DATE, order: ASC } }
    ) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          uri
          title
          content
          date
          excerpt
          featuredImage {
            node {
              id
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
    }
  }
`
