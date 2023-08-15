import { gql } from '@apollo/client'
import { FeaturedImage, ModuleAd } from '../components'

export const GetStories = gql`
  ${FeaturedImage.fragments.entry}
  query GetStories($first: Int, $after: String) {
    contentNodes(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          ... on Post {
            id
            contentTypeName
            title
            content
            date
            uri
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
            id
            contentTypeName
            title
            content
            date
            uri
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
