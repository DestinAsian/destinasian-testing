import classNames from 'classnames/bind'
import styles from './ChildrenNavigation.module.scss'
import { useQuery } from '@apollo/client'
import { GetChildrenNavigation } from '../../../../queries/GetChildrenNavigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// Import Components
const DaGuideMenu = dynamic(() =>
  import('@/components/DaGuideMenu/DaGuideMenu'),
)
const TravelGuidesMenu = dynamic(() =>
  import('@/components/TravelGuidesMenu/TravelGuidesMenu'),
)
const MainCategoryMenu = dynamic(() =>
  import('@/components/TravelGuidesMenu/MainCategoryMenu/MainCategoryMenu'),
)

let cx = classNames.bind(styles)

export default function ChildrenNavigation({
  databaseId,
  isMainNavShown,
  setIsMainNavShown,
  isNavShown,
  setIsNavShown,
  isScrolled,
  isActive,
  categoryName,
}) {
  const catPerPage = 4

  let catVariable = {
    first: catPerPage,
    id: databaseId,
  }

  // Get Category
  const { data } = useQuery(GetChildrenNavigation, {
    variables: catVariable,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  return (
    <>
      <MainCategoryMenu categoryName={categoryName} />
    </>
  )
}
