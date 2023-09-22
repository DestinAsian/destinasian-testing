import { gql } from '@apollo/client'

export const GetLuxeListPagination = gql`
  query GetLuxeListPagination($first: Int, $after: String, $id: ID!) {
    luxeList(id: $id, idType: DATABASE_ID) {
      parent {
        node {
          ... on LuxeList {
            title
            uri
            children(first: $first, after: $after) {
              edges {
                node {
                  ... on LuxeList {
                    id
                    title
                    content
                    uri
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
                    categories {
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
        }
      }
    }
  }
`
