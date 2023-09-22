import { gql } from '@apollo/client'

export const GetLuxeListStories = gql`
  query GetLuxeListStories($first: Int, $after: String, $id: ID!) {
    luxeList(id: $id, idType: DATABASE_ID) {
      children(
        first: $first
        after: $after
        where: { orderby: { field: MENU_ORDER, order: ASC } }
      ) {
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
`
