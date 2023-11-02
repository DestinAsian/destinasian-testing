import { gql } from '@apollo/client'

export const GetEditorialStories = gql`
  query GetEditorialStories($first: Int, $search: String) {
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
              contentTypes: EDITORIAL
              status: PUBLISH
              orderby: { field: DATE, order: DESC }
            }
          ) {
            edges {
              node {
                id
                databaseId
                ... on Editorial {
                  title
                  excerpt
                  uri
                  categories {
                    edges {
                      node {
                        name
                        uri
                      }
                    }
                  }
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
