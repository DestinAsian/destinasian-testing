import { gql } from '@apollo/client'

export const GetEditorialStories = gql`
  query GetEditorialStories($first: Int, $search: String) {
    editorials(
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
`
