import { gql } from '@apollo/client'
import { ModuleAd } from '../components'

export const GetBannerAds = gql`
  query GetBannerAds($first: Int, $after: String) {
    bannerAds(first: 10, where: { search: "homepage" }) {
      ...ModuleAdFragment
    }
  }
`
