import classNames from 'classnames/bind'
import styles from './SingleNavigation.module.scss'
import { useQuery } from '@apollo/client'
import { GetSingleNavigation } from '../../../../queries/GetSingleNavigation'
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

export default function SingleNavigation({
  databaseId,
  isMainNavShown,
  setIsMainNavShown,
  isNavShown,
  setIsNavShown,
  isScrolled,
  isActiveCategory,
  categoryName,
}) {
  const catPerPage = 4

  let catVariable = {
    first: catPerPage,
    id: databaseId,
  }

  // Get Category
  const { data } = useQuery(GetSingleNavigation, {
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
