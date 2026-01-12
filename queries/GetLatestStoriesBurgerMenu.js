import { gql } from '@apollo/client'

export const GetLatestStoriesBurgerMenu = gql`
  query GetLatestStoriesBurgerMenu($first: Int) {
    editorials(
      first: $first
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      edges {
        node {
          id
          title
          uri
          passwordProtected {
            onOff
          }
        }
      }
    }
  }
`
