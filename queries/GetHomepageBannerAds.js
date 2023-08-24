import { gql } from '@apollo/client'

export const GetHomepageBannerAds = gql`
  query GetBannerAds($first: Int) {
    bannerAds(first: $first, where: { search: "homepage" }) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          content
          title
        }
      }
    }
  }
`
