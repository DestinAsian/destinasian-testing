import Image from 'next/image'
import className from 'classnames/bind'
import styles from './SingleRCAContainer.module.scss'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button, RCAFullMenu } from '../../components'

let cx = className.bind(styles)

export default function SingleRCAContainer({
  children,
  parent,
  image,
  databaseId,
  uri,
  isNavShown,
  setIsNavShown,
}) {
  const isParent = parent == null
  const [imageLoaded, setImageLoaded] = useState(false)

  // Show RCA Menu after image is fully loaded
  useEffect(() => {
    if (imageLoaded) {
      const timeout = setTimeout(() => {
        setIsNavShown(true)
      }, 3000) // Change the timeframe (in milliseconds) as per your requirement

      return () => clearTimeout(timeout)
    }
  }, [imageLoaded, setIsNavShown])

  return (
    <>
      {isParent ? (
        <div className={styles.component}>
          <button
            type="button"
            className={cx('menu-icon')}
            onClick={() => {
              setIsNavShown(!isNavShown)
            }}
            aria-label="Toggle navigation"
            aria-controls={cx('full-menu-wrapper')}
            aria-expanded={!isNavShown}
          >
            <Image
              src={image}
              alt={'RCA Image'}
              fill
              sizes="100%"
              priority
              onLoad={() => setImageLoaded(true)}
            />
          </button>
          <div
            className={cx([
              'rca-menu-wrapper',
              isNavShown ? 'show' : undefined,
            ])}
          >
            <RCAFullMenu
              databaseId={databaseId}
              uri={uri}
              isNavShown={isNavShown}
              setIsNavShown={setIsNavShown}
            />
          </div>
        </div>
      ) : (
        <div className={styles.component}>{children}</div>
      )}
    </>
  )
}
