import className from 'classnames/bind'
import styles from './ContentWrapperLL.module.scss'
import { SingleLLSlider, Button } from '../../components'
import { GetLuxeListPagination } from '../../queries/GetLuxeListPagination'
import { useQuery } from '@apollo/client'
import React from 'react'
import { useEffect, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Image from 'next/image'

let cx = className.bind(styles)

export default function ContentWrapperLL({ content, images, databaseId }) {
  const batchSize = 30
  const [transformedContent, setTransformedContent] = useState('')

  useEffect(() => {
    // Function to extract image data and replace <img> with <Image>
    const extractImageData = () => {
      // Create a DOMParser
      const parser = new DOMParser()

      // Parse the HTML content
      const doc = parser.parseFromString(content, 'text/html')

      // Get only image elements with src containing "testing.destinasian.com"
      const imageElements = doc.querySelectorAll('img[src*="testing.destinasian.com"]');

      // Replace <img> elements with <Image> components
      imageElements.forEach((img) => {
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        const width = img.getAttribute('width')
        const height = img.getAttribute('height')

        // Create Image component
        const imageComponent = (
          <Image
            src={src}
            alt={alt}
            width={width ? width : '500'}
            height={height ? height : '500'}
            style={{ objectFit: 'contain' }}
            priority
          />
        )

        // Render the Image component to HTML string
        const imageHtmlString = renderToStaticMarkup(imageComponent)

        // Replace the <img> element with the Image HTML string in the HTML content
        img.outerHTML = imageHtmlString
      })

      // Set the transformed HTML content
      setTransformedContent(doc.body.innerHTML)
    }

    // Call the function to extract image data and replace <img>
    extractImageData()
  }, [content])

  const { data, loading, error, fetchMore } = useQuery(GetLuxeListPagination, {
    variables: { first: batchSize, after: null, id: databaseId },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  const luxeListAll = data?.luxeListBy?.parent?.node?.children?.edges.map(
    (post) => post.node,
  )

  // Index number for each of Individual Page
  const indexOfLuxeList = data?.luxeListBy?.menuOrder

  // Total number of Luxe Lists in a year
  const numberOfLuxeLists = luxeListAll?.length

  // Navigation of luxe list individual page
  const prevIndex = indexOfLuxeList - 1 - 1
  const nextIndex = indexOfLuxeList - 1 + 1

  const prevUri = prevIndex >= 0 ? luxeListAll[prevIndex].uri : null
  const nextUri =
    nextIndex < numberOfLuxeLists ? luxeListAll[nextIndex].uri : null

  return (
    <article className={cx('component')}>
      {images[0] != null && (
        <div className={cx('with-slider-wrapper')}>
          <div className={cx('slider-wrapper')}>
            <SingleLLSlider images={images} />
          </div>
          <div
            className={cx('content-wrapper')}
            dangerouslySetInnerHTML={{ __html: transformedContent }}
          />
          <div className={cx('navigation-wrapper')}>
            <div className={cx('navigation-button')}>
              <a href={prevUri}>{'-'}</a>
            </div>
            <div className={cx('pagination-wrapper')}>
              {indexOfLuxeList}
              {' / '}
              {numberOfLuxeLists}
            </div>
            <div className={cx('navigation-button')}>
              <a href={nextUri}>{'+'}</a>
            </div>
          </div>
        </div>
      )}
      {images[0] == null && (
        <div className={cx('with-slider-wrapper')}>
          <div className={cx('slider-wrapper')}></div>
          <div
            className={cx('content-wrapper')}
            dangerouslySetInnerHTML={{ __html: transformedContent }}
          />
          <div className={cx('navigation-wrapper')}>
            <div className={cx('navigation-button')}>
              {prevUri && <a href={prevUri}>{'-'}</a>}
            </div>
            <div className={cx('pagination-wrapper')}>
              {indexOfLuxeList}
              {' / '}
              {numberOfLuxeLists}
            </div>
            <div className={cx('navigation-button')}>
              {nextUri && <a href={nextUri}>{'+'}</a>}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
