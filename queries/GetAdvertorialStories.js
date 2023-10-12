import { gql } from '@apollo/client'

export const GetAdvertorialStories = gql`
  query GetAdvertorialStories($first: Int, $search: String) {
    advertorials(
      first: $first
      where: {
        status: PUBLISH
        search: $search
        orderby: { field: DATE, order: DESC }
      }
    ) {
      edges {
        node {
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
`
