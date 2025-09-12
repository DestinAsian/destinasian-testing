import { gql } from '@apollo/client'

export const GetHomepageStories = gql`
  query GetHomepageStories($first: Int, $after: String) {
    contentNodes(
      first: $first
      after: $after
      where: {
        status: PUBLISH
        orderby: { field: DATE, order: DESC }
        contentTypes: [EDITORIAL]
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          uri
          ... on Editorial {
            title
            contentTypeName
            content
            date
            excerpt
            passwordProtected {
              onOff
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
        }
      }
    }
  }
`
