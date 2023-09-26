import { gql } from '@apollo/client'

export const GetLuxeListPagination = gql`
  query GetLuxeListPagination($first: Int, $after: String, $id: Int) {
    luxeListBy(luxeListId: $id) {
      menuOrder
      parent {
        node {
          ... on LuxeList {
            id
            title
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
                    uri
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        }
      }
    }
  }
`
