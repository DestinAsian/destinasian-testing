import { gql } from '@apollo/client'
import { FeaturedImage } from '../components'

export const GetSearchResults = gql`
  query GetSearchResults($first: Int!, $after: String, $search: String) {
    tags(
      first: $first
      after: $after
      where: { search: $search, hideEmpty: true }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          contentNodes(
            where: {
              status: PUBLISH
              contentTypes: [
                POST
                EDITORIAL
                ADVERTORIAL
                HONORS_CIRCLE
                UPDATE
              ]
            }
          ) {
            edges {
              node {
                id
                uri
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
                  excerpt
                }
              }
            }
          }
        }
        cursor
      }
    }
  }
`
