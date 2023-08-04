import className from 'classnames/bind'
import { Heading, FormatDate } from '..'
import styles from './SingleAdvertorialEntryHeader.module.scss'
import { useState, useEffect } from 'react'

let cx = className.bind(styles)

export default function SingleAdvertorialEntryHeader({
  title,
}) {

  return (
    <div className={cx('component', className)}>
      <div className={cx('header-wrapper')}>
      <Heading className={cx('sponsored')}>
          {'Sponsored Post'}
        </Heading>
        <Heading className={cx('title')}>
          {title}
        </Heading>
      </div>
    </div>
  )
}
