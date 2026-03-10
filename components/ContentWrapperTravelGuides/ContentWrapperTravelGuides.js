import className from 'classnames/bind'
import styles from './ContentWrapperTravelGuides.module.scss'
import dynamic from 'next/dynamic'
// Import Components
const TravelGuidesMenu = dynamic(() =>
  import('@/components/TravelGuidesMenu/TravelGuidesMenu'),
)

let cx = className.bind(styles)

export default function ContentWrapperTravelGuides({ content }) {
  return (
    <article className={cx('component')}>
      <div
        className={cx('content-wrapper')}
        dangerouslySetInnerHTML={{ __html: content ?? '' }}
      />
      <div className={cx('guides-list-wrapper')}>
        {/* {renderMenu(hierarchicalMenuItems)} */}
        <TravelGuidesMenu />
      </div>
    </article>
  )
}
