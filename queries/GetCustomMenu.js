import { gql } from '@apollo/client'

export const GetCustomMenu = gql`
  query GetCustomMenu($id: ID = "") {
    menu(id: $id, idType: LOCATION) {
      id
      customMenuFields {
        menuDescription
        menuImage {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      menuItems(first: 30, where: { location: CUSTOM }) {
        nodes {
          id
          path
          label
          cssClasses
          customMenuFields {
            menuDescription
            menuImage {
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
