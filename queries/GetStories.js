import { gql } from '@apollo/client'
import { FeaturedImage, ModuleAd } from '../components'

export const GetStories = gql`
  ${FeaturedImage.fragments.entry}
  query GetStories($first: Int, $after: String) {
    contentNodes(first: $first, after: $after, where: { status: PUBLISH, orderby: {field: DATE, order: DESC} }) {
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
            contentTypeName
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
            contentTypeName
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
