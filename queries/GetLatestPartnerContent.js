import { gql } from '@apollo/client'

export const GetLatestPartnerContent = gql`
  query GetLatestPartnerContent($first: Int) {
    advertorials(
      first: $first
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      edges {
        node {
          id
          title
          excerpt
          uri
          passwordProtected {
            onOff
          }
        }
      }
    }
  }
`
