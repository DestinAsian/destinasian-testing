import { useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './PartnerContent.module.scss'
import { GetAdvertorialStories } from '../../queries/GetAdvertorialStories'
import { Button, FeaturedImage } from '../../components'

let cx = classNames.bind(styles)

// Randomized Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// Function to truncate the text
function truncateText(text) {
  const MAX_EXCERPT_LENGTH = 100 // Adjust the maximum length as needed

  if (text.length <= MAX_EXCERPT_LENGTH) {
    return text
  }

  const truncatedText = text.substring(0, MAX_EXCERPT_LENGTH)
  const lastSpaceIndex = truncatedText.lastIndexOf(' ')

  if (lastSpaceIndex !== -1) {
    return truncatedText.substring(0, lastSpaceIndex) + '...'
  }

  return truncatedText + '...'
}

export default function PartnerContent({ parentName }) {
  // Initialize a state variable to hold shuffled more reviews
  const [shuffledPartnerContent, setShuffledPartnerContent] = useState([])

  const contentPerPage = 10

  // Get Stories
  const { data, error, loading } = useQuery(GetAdvertorialStories, {
    variables: {
      first: contentPerPage,
      search: parentName,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  console.log(data)

  const partnerContent = data?.advertorials?.edges ?? []

  // Use an effect to shuffle more reviews when data changes
  useEffect(() => {
    if (partnerContent && partnerContent.length > 0) {
      // Clone the partnerContent array to avoid modifying the original data
      const clonedPartnerContent = [...partnerContent]
      // Shuffle the cloned array
      const shuffledArray = shuffleArray(clonedPartnerContent)
      // Set the shuffled array in state
      setShuffledPartnerContent(shuffledArray)
    }
  }, [partnerContent]) // Trigger shuffling when partnerContent changes

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  if (loading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          <Button className="gap-x-4	">{'Loading...'}</Button>
        </div>
      </>
    )
  }

  // Show only the first 3 items from shuffledPartnerContent
  const firstFiveContent = shuffledPartnerContent.slice(0, 5)

  return (
    <div className={cx('component')}>
      {firstFiveContent.map((post) => (
        <>
          <article className={cx('main-wrapper')}>
            <div className={cx('left-wrapper')}>
              {post?.node?.featuredImage && (
                <a href={post?.node?.uri}>
                  <div className={cx('content-wrapper-image')}>
                    <FeaturedImage
                      image={post?.node?.featuredImage?.node}
                      layout={'responsive'}
                      className={cx('image')}
                    />
                  </div>
                </a>
              )}
            </div>
            <div className={cx('right-wrapper')}>
              <div className={cx('content-wrapper')}>
                <a href={post?.node?.uri}>
                  <h2 className={cx('title')}>{post?.node?.title}</h2>
                </a>
              </div>
              {post?.node?.excerpt !== undefined &&
                post?.node?.excerpt !== null && (
                  <div className={cx('content-wrapper')}>
                    <a href={post?.node?.uri}>
                      <div
                        className={cx('excerpt', 'truncate-text')} // Add the class here
                        dangerouslySetInnerHTML={{
                          __html: truncateText(post?.node?.excerpt),
                        }}
                      />
                    </a>
                  </div>
                )}
            </div>
          </article>
          <div className={cx('border-bottom')}></div>
        </>
      ))}
    </div>
  )
}