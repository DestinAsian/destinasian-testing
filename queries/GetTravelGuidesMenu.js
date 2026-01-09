import { gql } from '@apollo/client'

export const GetTravelGuidesMenu = gql`
  query GetTravelGuidesMenu(
    $first: Int
    $footerHeaderLocation: MenuLocationEnum
  ) {
    footerHeaderMenuItems: menuItems(
      where: { location: $footerHeaderLocation }
      first: $first
    ) {
      nodes {
        id
        path
        label
        parentId
        cssClasses
        connectedNode {
          node {
            ... on Category {
              name
              uri
              posts(
                first: 5
                where: {
                  orderby: { field: DATE, order: DESC }
                  status: PUBLISH
                }
              ) {
                edges {
                  node {
                    id
                    title
                    uri
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
