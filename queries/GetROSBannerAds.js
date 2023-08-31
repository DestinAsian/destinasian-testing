import { gql } from '@apollo/client'

export const GetROSBannerAds = gql`
  query GetBannerAds($first: Int) {
    bannerAds(first: $first, where: { search: "ros" }) {
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
