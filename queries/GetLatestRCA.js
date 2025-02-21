import { gql } from '@apollo/client'

export const GetLatestRCA = gql`
  query GetLatestRCA {
    readersChoiceAwards(
      first: 1
      where: { orderby: { field: DATE, order: DESC }, search: "readers" }
    ) {
      edges {
        node {
          databaseId
          uri
        }
      }
    }
  }
`
