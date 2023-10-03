import { gql } from '@apollo/client'

export const GetSpecificBannerAds = gql`
  query GetBannerAds($first: Int, $search: String) {
    bannerAds(first: $first, where: { search: $search }) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          content
          title
          acfBannerAds {
            anyOf {
              uri
            }
            pinAd
          }
        }
      }
    }
  }
`
