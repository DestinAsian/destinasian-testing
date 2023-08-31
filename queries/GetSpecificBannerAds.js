import { gql } from '@apollo/client'

export const GetSpecificBannerAds = gql`
  query GetBannerAds($first: Int) {
    bannerAds(first: $first, where: { search: "specific" }) {
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
