import { gql } from '@apollo/client'

export const GetRCAPagination = gql`
  query GetRCAPagination($first: Int, $after: String, $id: Int) {
    readersChoiceAwardBy(readersChoiceAwardId: $id) {
      id
      title
      uri
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
        first: $first
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
      }
    }
  }
`
