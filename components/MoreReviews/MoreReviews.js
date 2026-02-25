import { useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './MoreReviews.module.scss'
import { GetMoreReviews } from '@/queries/GetMoreReviews'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// Import Components
const Button = dynamic(() => import('@/components/Button/Button'))
const CategoryIcon = dynamic(() =>
  import('@/components/CategoryIcon/CategoryIcon'),
)
const LocationIcon = dynamic(() =>
  import('@/components/LocationIcon/LocationIcon'),
)

let cx = classNames.bind(styles)

// Randomized Function
function seededRandom(seed) {
  // mulberry32 PRNG
  let t = seed >>> 0
  return function () {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function seededShuffle(array, seed) {
  const arr = [...array]
  const rand = seededRandom(seed)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function MoreReviews({ databaseId }) {
  // Initialize a state variable to hold shuffled more reviews
  const [shuffledMoreReviews, setShuffledMoreReviews] = useState([])

  // Get Stories
  const { data, error, loading } = useQuery(GetMoreReviews, {
    variables: {
      id: databaseId,
      notIn: databaseId,
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: "network-only",
  })

  const moreReviews = data?.post?.categories?.edges[0]?.node?.posts?.edges ?? []

  // Deterministic shuffle based on `databaseId` so SSR and client match
  const seed = typeof databaseId === 'number' ? databaseId : (typeof databaseId === 'string' ? databaseId.split('').reduce((s,c)=>s+ c.charCodeAt(0),0) : 1)
  const deterministicShuffled = React.useMemo(() => {
    if (!moreReviews || moreReviews.length === 0) return []
    return seededShuffle(moreReviews, Number(seed))
  }, [moreReviews, seed])

  useEffect(() => {
    setShuffledMoreReviews(deterministicShuffled)
  }, [deterministicShuffled])

  if (typeof error !== 'undefined' && error) {
    return <pre>{error && error.message ? error.message : JSON.stringify(error)}</pre>
  }

  if (loading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center	bg-white ">
          <Button className="gap-x-4 ">{'Loading...'}</Button>
        </div>
      </>
    )
  }

  // Show only the first 3 items from shuffledMoreReviews
  const firstThreeReviews = shuffledMoreReviews.slice(0, 3)

  return (
    <>
      {firstThreeReviews.map((post) => (
        <article className={cx('component')}>
          <div className={cx('content-wrapper')}>
            {post?.node?.uri && (
              <Link href={post?.node?.uri}>
                <div className={cx('row-wrapper')}>
                  <h2 className={cx('title')}>{post?.node?.title}</h2>
                  <div className={cx('icon-wrapper')}>
                    <CategoryIcon
                      chooseYourCategory={
                        post?.node?.acfCategoryIcon?.chooseYourCategory
                      }
                      chooseIcon={
                        post?.node?.acfCategoryIcon?.chooseIcon?.mediaItemUrl
                      }
                      categoryLabel={post?.node?.acfCategoryIcon?.categoryLabel}
                    />
                    <LocationIcon
                      locationValidation={
                        post?.node?.acfLocationIcon?.fieldGroupName
                      }
                      locationLabel={post?.node?.acfLocationIcon?.locationLabel}
                      locationUrl={post?.node?.acfLocationIcon?.locationUrl}
                    />
                  </div>
                </div>
              </Link>
            )}
          </div>
        </article>
      ))}
    </>
  )
}
