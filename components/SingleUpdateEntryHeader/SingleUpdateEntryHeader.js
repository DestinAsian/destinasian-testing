import className from 'classnames/bind'
import { Heading, FormatDate, Container } from '..'
import styles from './SingleUpdateEntryHeader.module.scss'
import { useState, useEffect } from 'react'

let cx = className.bind(styles)

export default function SingleUpdateEntryHeader({
  parent,
  title,
  contentTypeName,
  categoryUri,
  categoryName,
  author,
  date,
}) {
  return (
    <div className={cx('component')}>
      <div className={cx('header-wrapper')}>
        <a href={categoryUri}>
          <div className={cx('category-name')}>
            {contentTypeName}{' '}
            {categoryName && (
              <div className={cx('category-name')}>
                {'- '}{categoryName}
              </div>
            )}
          </div>
        </a>
        <Heading className={cx('title')}>
          {parent || null} {title}
        </Heading>
        <time className={cx('meta-wrapper')} dateTime={date}>
          {'By '} {author} {'-'} <FormatDate date={date} />
        </time>
      </div>
    </div>
  )
}
