import { gql } from '@apollo/client'

export const GetLatestStories = gql`
  query GetLatestStories($first: Int) {
    posts(first: $first, where: { status: PUBLISH }) {
      edges {
        node {
          id
          title
          content
          date
          uri
          excerpt
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
          acfCategoryIcon {
            categoryLabel
            chooseYourCategory
            chooseIcon {
              mediaItemUrl
            }
          }
          acfLocationIcon {
            fieldGroupName
            locationLabel
            locationUrl
          }
        }
      }
    }
    editorials(first: $first, where: { status: PUBLISH }) {
      edges {
        node {
          id
          title
          content
          date
          uri
          excerpt
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
    updates(first: $first, where: { status: PUBLISH }) {
      edges {
        node {
          id
          title
          content
          date
          uri
          excerpt
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
`
