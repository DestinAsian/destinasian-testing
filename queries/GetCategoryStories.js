import { gql } from '@apollo/client'
import { FeaturedImage } from '../components'

export const GetCategoryStories = gql`
  ${FeaturedImage.fragments.entry}
  query GetCategoryStories($first: Int, $after: String) {
    contentNodes(
      first: $first
      after: $after
      where: { 
        status: PUBLISH, 
        orderby: { field: DATE, order: DESC }
        contentTypes: [POST, EDITORIAL, UPDATE]
      }
    ) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          uri
          ... on Post {
            title
            content
            date
            excerpt
            ...FeaturedImageFragment
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
            }
            acfLocationIcon {
              fieldGroupName
              locationLabel
              locationUrl
            }
          }
          ... on Editorial {
            title
            content
            date
            excerpt
            ...FeaturedImageFragment
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
          ... on Update {
            title
            content
            date
            excerpt
            ...FeaturedImageFragment
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
