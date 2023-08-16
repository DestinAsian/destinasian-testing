import { gql } from '@apollo/client'
import { FeaturedImage } from '../components'

export const GetSearchResults = gql`
  query GetSearchResults($first: Int!, $after: String, $search: String) {
    contentNodes(
      first: $first
      after: $after
      where: { search: $search, status: PUBLISH }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          uri
          date
          databaseId
          contentType {
            node {
              label
              graphqlPluralName
            }
          }
          ... on Post {
            title
            excerpt
            categories {
              edges {
                node {
                  name
                  uri
                  parent {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
          ... on HonorsCircle {
            title
            excerpt
          }
          ... on Editorial {
            title
            excerpt
            categories {
              edges {
                node {
                  name
                  uri
                }
              }
            }
          }
          ... on Advertorial {
            title
          }
        }
        cursor
      }
    }
  }
`
