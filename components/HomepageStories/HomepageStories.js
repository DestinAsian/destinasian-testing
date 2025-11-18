import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './HomepageStories.module.scss'
import { useQuery } from '@apollo/client'
import { GetHomepageStories } from '../../queries/GetHomepageStories'
import { GetHomepageBannerAds } from '../../queries/GetHomepageBannerAds'
import { GetAdvertorialHomepageStories } from '../../queries/GetAdvertorialHomepageStories'
import dynamic from 'next/dynamic'
// Import Components
const Button = dynamic(() => import('@/components/Button/Button'))
const PostTwoColumns = dynamic(() =>
  import('@/components/PostTwoColumns/PostTwoColumns'),
)
const ModuleAd = dynamic(() => import('@/components/ModuleAd/ModuleAd'))
const AdvertorialPostTwoColumns = dynamic(() =>
  import('@/components/AdvertorialPostTwoColumns/AdvertorialPostTwoColumns'),
)

let cx = classNames.bind(styles)

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function HomepageStories(pinPosts) {
  // Fetching Posts
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  // Declare state for banner ads
  const [bannerAdsArray, setBannerAdsArray] = useState([])
  const [AdvertorialArray, setAdvertorialArray] = useState([])
  // Post per fetching
  const postsPerPage = 4
  const bannerPerPage = 20
  const advertorialPerPage = 12

  // Get Stories / Posts
  const { data, error, loading, fetchMore } = useQuery(GetHomepageStories, {
    variables: {
      first: postsPerPage,
      after: null,
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: "network-only",
  })

  // Get Banner
  const {
    data: bannerData,
    error: bannerError,
    loading: bannerLoading,
  } = useQuery(GetHomepageBannerAds, {
    variables: {
      first: bannerPerPage,
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: "network-only",
  })

  // Get Advertorial Stories
  const {
    data: advertorialsData,
    error: advertorialsError,
    loading: advertorialsLoading,
    fetchMore: fetchMoreAdvertorials,
  } = useQuery(GetAdvertorialHomepageStories, {
    variables: {
      first: advertorialPerPage,
      after: null,
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: "network-only",
  })

  // Update for stories / posts
  const updateQuery = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev

    const prevEdges = data?.contentNodes?.edges || []
    const newEdges = fetchMoreResult?.contentNodes?.edges || []

    return {
      ...data,
      contentNodes: {
        ...data?.contentNodes,
        edges: [...prevEdges, ...newEdges],
        pageInfo: fetchMoreResult?.contentNodes?.pageInfo,
      },
    }
  }

  // Update for Advertorial stories
  const updateAdvertorialQuery = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev

    const merged = [
      ...prev.contentNodes.edges,
      ...fetchMoreResult.contentNodes.edges,
    ]

    const cleaned = merged
      .map((e) => e.node)
      .filter((node) => !node?.passwordProtected?.onOff)

    // 🔥 MUST update state so UI receives new items
    setAdvertorialArray((old) => [
      ...old,
      ...cleaned.filter((item) => !old.some((o) => o.id === item.id)),
    ])

    return {
      ...prev,
      contentNodes: {
        ...prev.contentNodes,
        edges: merged,
        pageInfo: fetchMoreResult.contentNodes.pageInfo,
      },
    }
  }

  // Function to shuffle the banner ads and store them in state
  useEffect(() => {
    const shuffleBannerAds = () => {
      const bannerAdsArrayObj = Object.values(
        bannerData?.bannerAds?.edges || [],
      )

      // Separate shuffled banner ads with <img> tags from those without
      const bannerAdsWithImg = bannerAdsArrayObj.filter(
        (bannerAd) => !bannerAd?.node?.content.includes('<!--'),
      )

      // Shuffle only the otherBannerAds array
      const shuffledBannerAds = shuffleArray(bannerAdsWithImg)

      // Concatenate the arrays with pinned ads first and shuffled other banner ads
      const shuffledBannerAdsArray = [...shuffledBannerAds]

      setBannerAdsArray(shuffledBannerAdsArray)
    }

    // Shuffle the banner ads when the component mounts
    shuffleBannerAds()

    // Shuffle the banner ads every 10 seconds
    const shuffleInterval = setInterval(() => {
      shuffleBannerAds()
    }, 60000) // 10000 milliseconds = 10 seconds

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(shuffleInterval)
    }
  }, [bannerData]) // Use bannerData as a dependency to trigger shuffling when new data arrives

  useEffect(() => {
    if (!advertorialsData) return

    const unique = []
    const seen = new Set()

    advertorialsData.contentNodes.edges.forEach((edge) => {
      const node = edge.node
      if (node.passwordProtected?.onOff) return
      if (seen.has(node.id)) return
      seen.add(node.id)
      unique.push(node)
    })

    // shuffle
    setAdvertorialArray(shuffleArray(unique))
  }, [advertorialsData])

  // Concatenate the arrays to place ads with <img> tags first
  const sortedBannerAdsArray = [...bannerAdsArray].reduce((uniqueAds, ad) => {
    if (!uniqueAds.some((uniqueAd) => uniqueAd?.node?.id === ad?.node?.id)) {
      uniqueAds.push(ad)
    }
    return uniqueAds
  }, [])

  const fetchMoreAll = () => {
    if (isFetchingMore) return

    const hasMorePosts = data?.contentNodes?.pageInfo?.hasNextPage
    const hasMoreAdvertorials =
      advertorialsData?.contentNodes?.pageInfo?.hasNextPage

    if (!hasMorePosts && !hasMoreAdvertorials) return

    setIsFetchingMore(true)

    const promises = []

    if (hasMorePosts) {
      promises.push(
        fetchMore({
          variables: {
            after: data?.contentNodes?.pageInfo?.endCursor,
          },
          updateQuery,
        }),
      )
    }

    if (hasMoreAdvertorials) {
      promises.push(
        fetchMoreAdvertorials({
          variables: {
            after: advertorialsData?.contentNodes?.pageInfo?.endCursor,
          },
          updateAdvertorialQuery,
        }),
      )
    }

    Promise.all(promises).finally(() => setIsFetchingMore(false))
  }

  // Scroll event listener to detect when user scrolls to the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight

      if (scrolledToBottom) {
        // Call the function to fetch more when scrolled to the bottom
        fetchMoreAll()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fetchMoreAll])

  if (error || bannerError || advertorialsError) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  if (loading || bannerLoading || advertorialsLoading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          <Button className="gap-x-4	">{'Loading...'}</Button>
        </div>
      </>
    )
  }

  // Declare all posts (exclude password protected)
  const allPosts = (data?.contentNodes?.edges || [])
    .map((post) => post.node)
    .filter((node) => !node?.passwordProtected?.onOff)

  // Declare all pin posts
  const allPinPosts = [
    pinPosts?.pinPosts?.pinPost1 ? pinPosts?.pinPosts?.pinPost1 : null,
    pinPosts?.pinPosts?.pinPost2 ? pinPosts?.pinPosts?.pinPost2 : null,
    pinPosts?.pinPosts?.pinPost3 ? pinPosts?.pinPosts?.pinPost3 : null,
  ].filter((pinPost) => pinPost !== null)

  // Merge All posts and Pin posts
  const mergedPosts = [...allPinPosts, ...allPosts].reduce(
    (uniquePosts, post) => {
      if (!uniquePosts.some((uniquePost) => uniquePost?.id === post?.id)) {
        uniquePosts.push(post)
      }
      return uniquePosts
    },
    [],
  )

  //   // Declare 2 Advertorial Post
  // const getAdvertorialPost = advertorialsData?.contentNodes?.edges
  //   ?.map((edge) => edge.node)
  //   ?.filter((node) => !node?.passwordProtected?.onOff) || []

  //   const numberOfAdvertorial = AdvertorialArray.length

  const numberOfBannerAds = sortedBannerAdsArray.length

  return (
    <div className={cx('component')}>
      {mergedPosts.length !== 0 &&
        mergedPosts.map((post, index) => (
          <React.Fragment key={post?.id}>
            {/* Post / Guides Stories */}
            {post?.contentTypeName === 'post' && (
              <div className={cx('post-wrapper')}>
                <PostTwoColumns
                  title={post?.title}
                  excerpt={post?.excerpt}
                  uri={post?.uri}
                  parentCategory={
                    post?.categories?.edges[0]?.node?.parent?.node?.name
                  }
                  category={post?.categories?.edges[0]?.node?.name}
                  categoryUri={post?.categories?.edges[0]?.node?.uri}
                  featuredImage={post?.featuredImage?.node}
                  chooseYourCategory={post?.acfCategoryIcon?.chooseYourCategory}
                  chooseIcon={post?.acfCategoryIcon?.chooseIcon?.mediaItemUrl}
                  categoryLabel={post?.acfCategoryIcon?.categoryLabel}
                  locationValidation={post?.acfLocationIcon?.fieldGroupName}
                  locationLabel={post?.acfLocationIcon?.locationLabel}
                  locationUrl={post?.acfLocationIcon?.locationUrl}
                />
              </div>
            )}
            {post?.contentTypeName === 'editorial' && (
              <div className={cx('post-wrapper')}>
                {/* Editorials Stories */}
                <PostTwoColumns
                  title={post?.title}
                  excerpt={post?.excerpt}
                  uri={post?.uri}
                  parentCategory={
                    post?.categories?.edges[0]?.node?.parent?.node?.name
                  }
                  category={post?.categories?.edges[0]?.node?.name}
                  categoryUri={post?.categories?.edges[0]?.node?.uri}
                  featuredImage={post?.featuredImage?.node}
                />
              </div>
            )}
            {/* Updates Stories */}
            {post?.contentTypeName === 'update' && (
              <div className={cx('post-wrapper')}>
                <PostTwoColumns
                  title={post?.title}
                  excerpt={post?.excerpt}
                  uri={post?.uri}
                  parentCategory={
                    post?.categories?.edges[0]?.node?.parent?.node?.name
                  }
                  category={post?.categories?.edges[0]?.node?.name}
                  categoryUri={post?.categories?.edges[0]?.node?.uri}
                  featuredImage={post?.featuredImage?.node}
                />
              </div>
            )}
            {post?.contentTypeName === 'honors-circle' && (
              <div className={cx('hc-wrapper')}>
                {/* Honors Circle Stories */}
                <PostTwoColumns
                  title={post?.title}
                  excerpt={post?.excerpt}
                  uri={post?.uri}
                  category={post?.contentType?.node?.label.slice(0, -1)}
                  categoryUri={post?.uri}
                  featuredImage={post?.featuredImage?.node}
                />
              </div>
            )}
            {post?.contentTypeName === 'luxury-travel' && (
              <div className={cx('post-wrapper')}>
                {/* Luxury Travel Stories */}
                <PostTwoColumns
                  title={post?.title}
                  excerpt={post?.excerpt}
                  uri={post?.uri}
                  category={post?.contentType?.node?.label.slice(0, -1)}
                  categoryUri={post?.uri}
                  featuredImage={post?.featuredImage?.node}
                />
              </div>
            )}
            {post?.contentTypeName === 'advertorial' && (
              <div className={cx('advertorial-wrapper')}>
                {/* Partner Content Stories */}
                <PostTwoColumns
                  title={post?.title}
                  excerpt={post?.excerpt}
                  uri={post?.uri}
                  category={'Partner Content'}
                  categoryUri={post?.uri}
                  featuredImage={post?.featuredImage?.node}
                  customClassName={'advertorial'}
                />
              </div>
            )}
            {(() => {
              const pos = (index - 1) % 8 // cycle through 8 slots

              // Show banner after 2 posts
              if (pos === 2) {
                return (
                  <div className={cx('banner-ad-wrapper')}>
                    <ModuleAd
                      bannerAd={
                        sortedBannerAdsArray[
                          Math.floor((index - 1) / 8) % numberOfBannerAds
                        ]?.node?.content
                      }
                    />
                  </div>
                )
              }

              // Show advertorials after another 2 posts
              if (pos === 6) {
                const cycle = Math.floor((index - 1) / 8) // which 8-post block
                const start = cycle * 2 // index in advertorial array
                const advertorialPost = AdvertorialArray.slice(start, start + 2)

                return (
                  // <>
                  //   <div className={cx('advertorial-wrapper')}>
                  //     {numberOfAdvertorial > 0 && (
                  //       <AdvertorialPostTwoColumns
                  //         title={getAdvertorialPost[0]?.title}
                  //         excerpt={getAdvertorialPost[0]?.excerpt}
                  //         uri={getAdvertorialPost[0]?.uri}
                  //         featuredImage={
                  //           getAdvertorialPost[0]?.featuredImage?.node
                  //         }
                  //       />
                  //     )}
                  //   </div>

                  //   <div className={cx('advertorial-wrapper')}>
                  //     {numberOfAdvertorial > 1 && (
                  //       <AdvertorialPostTwoColumns
                  //         title={getAdvertorialPost[1]?.title}
                  //         excerpt={getAdvertorialPost[1]?.excerpt}
                  //         uri={getAdvertorialPost[1]?.uri}
                  //         featuredImage={
                  //           getAdvertorialPost[1]?.featuredImage?.node
                  //         }
                  //       />
                  //     )}
                  //   </div>
                  // </>
                  <>
                    {advertorialPost.map((item, i) => (
                      <div key={i} className={cx('advertorial-wrapper')}>
                        <AdvertorialPostTwoColumns
                          title={item?.title}
                          excerpt={item?.excerpt}
                          uri={item?.uri}
                          featuredImage={item?.featuredImage?.node}
                        />
                      </div>
                    ))}
                  </>
                )
              }

              return null // nothing extra
            })()}
          </React.Fragment>
        ))}
      {mergedPosts.length > 0 && (
        <div className="mx-auto my-0 flex w-[100vw] justify-center">
          {(data?.contentNodes?.pageInfo?.hasNextPage ||
            advertorialsData?.contentNodes?.pageInfo?.hasNextPage) && (
            <Button
              onClick={() => {
                if (!isFetchingMore) {
                  fetchMoreAll()
                }
              }}
              disabled={isFetchingMore}
              className="gap-x-4"
            >
              {isFetchingMore ? (
                'Loading...'
              ) : (
                <>
                  Load More{' '}
                  <svg
                    className="h-auto w-8 origin-center rotate-90"
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="512.000000pt"
                    height="512.000000pt"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path d="M1387 5110 c-243 -62 ... 248 20z" />
                    </g>
                  </svg>
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
