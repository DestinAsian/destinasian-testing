import { gql } from '@apollo/client'

export const GetHomepageBannerAds = gql`
  query GetBannerAds($first: Int, $after: String) {
    bannerAds(first: $first, after: $after, where: { search: "homepage" }) {
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
