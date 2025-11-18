import { gql } from '@apollo/client'

export const GetAdvertorialHomepageStories = gql`
  query GetAdvertorialHomepageStories($first: Int, $after: String) {
    contentNodes(
      first: $first
      after: $after
      where: {
        contentTypes: ADVERTORIAL
        status: PUBLISH
        orderby: { field: DATE, order: DESC }
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          databaseId
          ... on Advertorial {
            passwordProtected {
              onOff
            }
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
`
