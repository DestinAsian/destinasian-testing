import React, { useState, useEffect } from 'react'
import className from 'classnames/bind'
import { Heading, Container } from '../../components'
import styles from './DaGuideMenu.module.scss'
import Link from 'next/link'

let cx = className.bind(styles)

export default function DaGuideMenu({
  parent,
  title,
  categories,
  className,
  parentUri,
  titleUri,
  categoryUri,
  parentName,
  titleName,
  categoryName,
  parentDestinationGuides,
}) {
  const [isNavShown, setIsNavShown] = useState(false)

  // Stop scrolling pages when isNavShown
  useEffect(() => {
    if (isNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isNavShown])

  const hasParent = parent
  const hasTitle = title
  const hasCategory = categories

  return (
    <li className={cx(['component', className])}>
      <div className={cx('container-wrapper')}>
        {/* Parent category navigation */}
        {hasTitle && (
          <div className={cx('text')}>
            <Container>
              {!!title && titleUri && (
                <Link href={titleUri}>
                  <Heading className={cx('title')}>{title}</Heading>
                </Link>
              )}
            </Container>
          </div>
        )}

        {/* Children category navigation */}
        {hasParent && (
          <div className={cx('text')}>
            <Container>
              {!!parent && parentUri && (
                <Link href={parentUri}>
                  <Heading className={cx('title')}>{parent}</Heading>
                </Link>
              )}
            </Container>
          </div>
        )}

        {/* Single post navigation */}
        {hasCategory && (
          <div className={cx('text')}>
            <Container>
              {!!categories && categoryUri && (
                <Link href={categoryUri}>
                  <Heading className={cx('title')}>{categories}</Heading>
                </Link>
              )}
              {/* <div
                className={cx([
                  'index-menu-wrapper',
                  isNavShown ? 'show' : undefined,
                ])}
              >
                <div className={cx('index-menu-content')}>
                  <div className={cx('first-wrapper')}>
                    {categoryUri && (
                      <Link href={categoryUri}>
                        <>
                          {'The DA Guide to '}
                          {categoryName}
                        </>
                      </Link>
                    )}
                  </div>
                  <div className={cx('second-wrapper')}>
                  </div>
                </div>
              </div> */}
            </Container>
          </div>
        )}
      </div>
    </li>
  )
}
