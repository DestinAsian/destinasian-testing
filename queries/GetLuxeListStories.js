import { gql } from '@apollo/client'

export const GetLuxeListStories = gql`
  query GetLuxeListStories(
    $first: Int
    $after: String
    $termTaxonomyId: [ID] = Int
  ) {
    children(
      where: {
        contentTypes: LUXE_LIST
        status: PUBLISH
        orderby: { field: MODIFIED, order: DESC }
      }
      first: 100
    ) {
      edges {
        node {
          ... on LuxeList {
            id
            title
            uri
            categories(where: {}) {
              edges {
                node {
                  id
                  name
                }
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
