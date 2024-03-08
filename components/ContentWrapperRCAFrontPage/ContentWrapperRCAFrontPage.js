import className from 'classnames/bind'
import styles from './ContentWrapperRCAFrontPage.module.scss'
import React from 'react'

let cx = className.bind(styles)

export default function ContentWrapperRCAFrontPage({ content }) {

  return (
    <article className={cx('component')}>
      <div
        className={cx('content-wrapper')}
        dangerouslySetInnerHTML={{ __html: content ?? '' }}
      />
    </article>
  )
}
