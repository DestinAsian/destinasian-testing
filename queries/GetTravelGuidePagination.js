import { gql } from '@apollo/client'

export const GetTravelGuidePagination = gql`
  query GetTravelGuidePagination($first: Int, $after: String, $id: Int) {
    travelGuideBy(travelGuideId: $id) {
      id
      title
      uri
      menuOrder
      parent {
        node {
          ... on TravelGuide {
            id
            title
            uri
            children(
              first: $first
              after: $after
              where: { orderby: { field: MENU_ORDER, order: ASC } }
            ) {
              edges {
                node {
                  ... on TravelGuide {
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
            ... on TravelGuide {
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
