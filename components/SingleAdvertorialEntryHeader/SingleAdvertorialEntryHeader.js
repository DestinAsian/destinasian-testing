import className from 'classnames/bind'
import styles from './SingleAdvertorialEntryHeader.module.scss'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// Import Components
const Heading = dynamic(() => import('@/components/Heading/Heading'))

let cx = className.bind(styles)

export default function SingleAdvertorialEntryHeader({
  title,
  label,
  customClassName,
  categoryUri,
  categoryName,
}) {
  const [isMaximized, setIsMaximized] = useState(false)

  // Maximized EntryHeader when page load
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMaximized(true)
    }, 2000) // Change the timeframe (in milliseconds) as per your requirement

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className={cx(
        className,
        customClassName === 'luxury-travel' ? 'luxury-travel' : 'component',
        customClassName === 'luxury-travel-spotlight'
          ? 'luxury-travel-spotlight'
          : 'component',
        { maximized: isMaximized },
      )}
    >
      <div className={cx('header-wrapper')}>
        {categoryName && categoryUri && (
          <div className={cx('category-wrapper')}>
            <Link href={categoryUri}>
              <Heading level={'h3'} className={cx('category')}>
                {categoryName}
              </Heading>
            </Link>
          </div>
        )}
        <Heading className={cx('title')}>{title}</Heading>
        <Heading level={'h3'} className={cx('sponsored')}>
          {label}
        </Heading>
      </div>
    </div>
  )
}
