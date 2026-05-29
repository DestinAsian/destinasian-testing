import { gql } from '@apollo/client'

export const GetHCMenu = gql`
  query GetHCMenu($first: Int, $hcHeaderLocation: MenuLocationEnum) {
    hcHeaderMenuItems: menuItems(
      where: { location: $hcHeaderLocation }
      first: $first
    ) {
      nodes {
        id
        path
        label
        parentId
        cssClasses
        __typename
      }
    }
  }
`
