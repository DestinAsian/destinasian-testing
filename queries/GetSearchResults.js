import { gql } from '@apollo/client'

export const GetSearchResults = gql`
  query GetSearchResults($first: Int!, $after: String, $search: String) {
    contentNodes(first: $first, after: $after, where: { search: $search }) {
      edges {
        node {
          id
          uri
          date
          databaseId
          ... on Post {
            id
            title
            excerpt
            categories {
              edges {
                node {
                  name
                }
              }
            }
            contentType {
              node {
                graphqlPluralName
              }
            }
          }
          ... on HonorsCircle {
            id
            title
            excerpt
            contentType {
              node {
                label
                graphqlPluralName
              }
            }
          }
          ... on Editorial {
            id
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
            contentType {
              node {
                graphqlPluralName
              }
            }
          }
          ... on BannerAd {
            contentType {
              node {
                graphqlPluralName
              }
            }
          }
          ... on Advertorial {
            contentType {
              node {
                graphqlPluralName
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`
