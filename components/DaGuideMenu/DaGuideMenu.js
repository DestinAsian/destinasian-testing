import React, { useState, useEffect } from 'react'
import className from 'classnames/bind'
import { Heading, Container } from '..'
import styles from './DaGuideMenu.module.scss'

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
  // destinationGuides,
  // children,
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
              {!!title && (
                // <button
                //   type="button"
                //   className={cx('menu-icon')}
                //   onClick={() => setIsNavShown(!isNavShown)}
                //   aria-label="Toggle navigation"
                //   aria-controls={cx('index-menu-wrapper')}
                //   aria-expanded={!isNavShown}
                // >
                <a href={titleUri}>
                  <Heading className={cx('title')}>{title}</Heading>
                </a>
                // </button>
              )}
              <div
                className={cx([
                  'index-menu-wrapper',
                  isNavShown ? 'show' : undefined,
                ])}
              >
                {/* Index menu */}
                <div className={cx('index-menu-content')}>
                  <div className={cx('first-wrapper')}>
                    <a href={titleUri}>
                      {'The DA Guide to '}
                      {titleName}
                    </a>
                  </div>
                  <div className={cx('second-wrapper')}>
                    {/* Secondary Menu {Destinations Menu} */}
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}

        {/* Children category navigation */}
        {hasParent && (
          <div className={cx('text')}>
            <Container>
              {!!parent && (
                // <button
                //   type="button"
                //   className={cx('menu-icon')}
                //   onClick={() => setIsNavShown(!isNavShown)}
                //   aria-label="Toggle navigation"
                //   aria-controls={cx('index-menu-wrapper')}
                //   aria-expanded={!isNavShown}
                // >
                <a href={parentUri}>
                  <Heading className={cx('title')}>{parent}</Heading>
                </a>
                // </button>
              )}
              <div
                className={cx([
                  'index-menu-wrapper',
                  isNavShown ? 'show' : undefined,
                ])}
              >
                {/* Index menu */}
                <div className={cx('index-menu-content')}>
                  <div className={cx('first-wrapper')}>
                    {parentDestinationGuides == 'yes' && (
                      <a href={parentUri}>
                        {'The DA Guide to '}
                        {parentName}
                      </a>
                    )}
                    {parentDestinationGuides == null && (
                      <a href={parentUri}>{parentName}</a>
                    )}
                  </div>
                  <div className={cx('second-wrapper')}>
                    {/* still got an error double the pages */}
                    {/* {children?.edges?.map((post) => (
                      <li key={post.node.uri} className={cx('nav-link')}>
                        <a href={post.node.uri}>
                          <h2 className={cx('nav-name')}>{post.node.name}</h2>
                          <h2 className={cx('nav-post')}>{'Sample post 1'}</h2>
                          <h2 className={cx('nav-post')}>{'Sample post 2'}</h2>
                          <h2 className={cx('nav-post')}>{'Sample post 3'}</h2>
                        </a>
                      </li>
                    ))} */}
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}

        {/* Single post navigation */}
        {hasCategory && (
          <div className={cx('text')}>
            <Container>
              {!!categories && (
                // <button
                //   type="button"
                //   className={cx('menu-icon')}
                //   onClick={() => setIsNavShown(!isNavShown)}
                //   aria-label="Toggle navigation"
                //   aria-controls={cx('index-menu-wrapper')}
                //   aria-expanded={!isNavShown}
                // >
                <a href={categoryUri}>
                  <Heading className={cx('title')}>{categories}</Heading>
                </a>
                // </button>
              )}
              <div
                className={cx([
                  'index-menu-wrapper',
                  isNavShown ? 'show' : undefined,
                ])}
              >
                {/* Index menu */}
                <div className={cx('index-menu-content')}>
                  <div className={cx('first-wrapper')}>
                    <a href={categoryUri}>
                      {'The DA Guide to '}
                      {categoryName}
                    </a>
                  </div>
                  <div className={cx('second-wrapper')}>
                    {/* Secondary Menu {Destinations Menu} */}
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}
      </div>
    </li>
  )
}
