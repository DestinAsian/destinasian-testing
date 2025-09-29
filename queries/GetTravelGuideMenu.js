import { gql } from '@apollo/client'

export const GetTravelGuideMenu = gql`
  query GetTravelGuideMenu($first: Int, $after: String, $id: ID = "") {
    travelGuide(id: $id, idType: DATABASE_ID) {
      title
      uri
      children(
        first: $first
        after: $after
        where: { orderby: { field: MENU_ORDER, order: ASC } }
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            ... on TravelGuide {
              id
              title
              uri
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
      }
    }
  }
`
