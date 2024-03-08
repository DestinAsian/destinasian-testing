import { gql } from '@apollo/client'
import { NavigationMenu } from '../components'

export const GetRCAMenu = gql`
  ${NavigationMenu.fragments.entry}
  query GetRCAMenu($first: Int, $rcaMenuLocation: MenuLocationEnum) {
    rcaMenuItems: menuItems(
      where: { location: $rcaMenuLocation }
      first: $first
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`
