import { gql } from '@apollo/client'

export const GetGuidesMenu = gql`
  query GetGuidesMenu($first: Int, $footerHeaderLocation: MenuLocationEnum) {
    footerHeaderMenuItems: menuItems(
      where: { location: $footerHeaderLocation }
      first: $first
    ) {
      nodes {
        id
        path
        label
        parentId
        cssClasses
      }
    }
  }
`
