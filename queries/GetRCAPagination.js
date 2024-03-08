import { gql } from '@apollo/client'

export const GetRCAPagination = gql`
  query GetRCAPagination($first: Int, $after: String, $id: Int) {
    readersChoiceAwardBy(readersChoiceAwardId: $id) {
      menuOrder
      parent {
        node {
          ... on ReadersChoiceAward {
            id
            title
            children(
              first: $first
              after: $after
              where: { orderby: { field: MENU_ORDER, order: ASC } }
            ) {
              edges {
                node {
                  ... on ReadersChoiceAward {
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
      children(
        where: { orderby: { field: MENU_ORDER, order: ASC } }
        first: 1
      ) {
        edges {
          node {
            ... on ReadersChoiceAward {
              uri
            }
          }
        }
      }
    }
  }
`
