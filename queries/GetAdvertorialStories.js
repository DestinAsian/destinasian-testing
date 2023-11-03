import { gql } from '@apollo/client'

export const GetAdvertorialStories = gql`
  query GetAdvertorialStories($first: Int, $search: String) {
    tags(first: $first, where: { search: $search, hideEmpty: true }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          contentNodes(
            first: 10
            where: {
              contentTypes: ADVERTORIAL
              status: PUBLISH
              orderby: { field: DATE, order: DESC }
            }
          ) {
            edges {
              node {
                id
                databaseId
                ... on Advertorial {
                  title
                  excerpt
                  uri
                  featuredImage {
                    node {
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
        }
      }
    }
  }
`
