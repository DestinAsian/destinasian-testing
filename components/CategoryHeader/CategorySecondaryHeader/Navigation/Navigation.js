import dynamic from 'next/dynamic'
// Import Components
const MainCategoryMenu = dynamic(() =>
  import('@/components/TravelGuidesMenu/MainCategoryMenu/MainCategoryMenu'),
)

export default function Navigation({ categoryName }) {
  return (
    <>
      <MainCategoryMenu categoryName={categoryName} />
    </>
  )
}
