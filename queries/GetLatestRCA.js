import { gql } from '@apollo/client'

export const GetLatestRCA = gql`
  query GetLatestRCA {
    readersChoiceAwards(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          databaseId
          uri
          parent {
            node {
              databaseId
              uri
            }
          }
        }
      }
    }
  }
`
