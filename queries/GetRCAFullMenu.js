import { gql } from '@apollo/client'

export const GetRCAFullMenu = gql`
  query GetRCAFullMenu($first: Int, $rcaHeaderLocation: MenuLocationEnum) {
    rcaHeaderMenuItems: menuItems(
      where: { location: $rcaHeaderLocation }
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
