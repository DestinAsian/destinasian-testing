import React, { useState, useEffect, useCallback } from 'react'
import classNames from 'classnames/bind'
import styles from './HomepageStories.module.scss'
import { GetHomepageStories } from '@/queries/GetHomepageStories'
import { GetHomepageBannerAds } from '@/queries/GetHomepageBannerAds'
import { GetAdvertorialHomepageStories } from '@/queries/GetAdvertorialHomepageStories'
import dynamic from 'next/dynamic'
import { useSWRGraphQL } from '@/lib/useSWRGraphQL'
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
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function HomepageStories(pinPosts) {
  const postsPerPage = 4
  const bannerPerPage = 20
  const advertorialPerPage = 12

  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const [posts, setPosts] = useState([])
  const [postsCursor, setPostsCursor] = useState(null)

  const [advertorials, setAdvertorials] = useState([])
  const [advertorialCursor, setAdvertorialCursor] = useState(null)

  const [bannerAdsArray, setBannerAdsArray] = useState([])

  const [hasMorePosts, setHasMorePosts] = useState(true)
  const [hasMoreAdvertorials, setHasMoreAdvertorials] = useState(true)

  /* ---------------- POSTS ---------------- */

  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
  } = useSWRGraphQL(['homepage-posts', postsCursor], GetHomepageStories, {
    first: postsPerPage,
    after: postsCursor,
  })

  useEffect(() => {
    if (!postsData?.contentNodes) return

    const { edges, pageInfo } = postsData.contentNodes

    const incoming = edges
      .filter(({ node }) => !node?.passwordProtected?.onOff)
      .map(({ node }) => node)

    if (incoming.length > 0) {
      setPosts((prev) => {
        const seen = new Set(prev.map((p) => p.id))
        const uniqueIncoming = incoming.filter((p) => !seen.has(p.id))
        return uniqueIncoming.length ? [...prev, ...uniqueIncoming] : prev
      })
    }

    // ⛳️ Skip empty (all-password-protected) pages
    if (incoming.length === 0 && pageInfo?.hasNextPage) {
      fetchMoreAll()
    }

    setHasMorePosts(Boolean(pageInfo?.hasNextPage))
  }, [postsData])

  /* ---------------- BANNERS ---------------- */

  const {
    data: bannerData,
    isLoading: bannerLoading,
    error: bannerError,
  } = useSWRGraphQL('homepage-banners', GetHomepageBannerAds, {
    first: bannerPerPage,
  })

  useEffect(() => {
    if (!bannerData?.bannerAds?.edges) return

    const shuffleBannerAds = () => {
      const bannerAdsArrayObj = Object.values(bannerData.bannerAds.edges || [])

      // Only banners WITHOUT HTML comments
      const bannerAdsWithImg = bannerAdsArrayObj.filter(
        (bannerAd) => !bannerAd?.node?.content?.includes('<!--'),
      )

      const shuffledBannerAds = shuffleArray([...bannerAdsWithImg])

      setBannerAdsArray(shuffledBannerAds)
    }

    // Initial shuffle
    shuffleBannerAds()

    // Re-shuffle every 60 seconds
    const shuffleInterval = setInterval(() => {
      shuffleBannerAds()
    }, 60000)

    return () => clearInterval(shuffleInterval)
  }, [bannerData])

  /* ---------------- ADVERTORIALS ---------------- */

  const {
    data: advertorialData,
    isLoading: advertorialLoading,
    error: advertorialError,
  } = useSWRGraphQL(
    ['homepage-advertorials', advertorialCursor],
    GetAdvertorialHomepageStories,
    {
      first: advertorialPerPage,
      after: advertorialCursor,
    },
  )

  useEffect(() => {
    if (!advertorialData?.contentNodes) return

    const { edges, pageInfo } = advertorialData.contentNodes

    const incoming = edges
      .map((e) => e.node)
      .filter((n) => !n?.passwordProtected?.onOff)

    setAdvertorials((prev) => {
      const seen = new Set(prev.map((p) => p.id))
      return [...prev, ...incoming.filter((p) => !seen.has(p.id))]
    })

    setHasMoreAdvertorials(Boolean(pageInfo?.hasNextPage))
  }, [advertorialData])

  /* ---------------- LOAD MORE ---------------- */

  useEffect(() => {
    if (!isFetchingMore) return

    // Wait until BOTH queries are done loading
    if (!postsLoading && !advertorialLoading) {
      setIsFetchingMore(false)
    }
  }, [isFetchingMore, postsLoading, advertorialLoading])

  const fetchMoreAll = useCallback(() => {
    if (isFetchingMore) return
    if (!hasMorePosts && !hasMoreAdvertorials) return

    setIsFetchingMore(true)

    if (hasMorePosts && postsData?.contentNodes?.pageInfo?.endCursor) {
      setPostsCursor(postsData.contentNodes.pageInfo.endCursor)
    }

    if (
      hasMoreAdvertorials &&
      advertorialData?.contentNodes?.pageInfo?.endCursor
    ) {
      setAdvertorialCursor(advertorialData.contentNodes.pageInfo.endCursor)
    }
  }, [
    isFetchingMore,
    hasMorePosts,
    hasMoreAdvertorials,
    postsData,
    advertorialData,
  ])

  /* ---------------- SCROLL ---------------- */

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200
      ) {
        fetchMoreAll()
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [fetchMoreAll])

  /* ---------------- STATES ---------------- */

  if (postsError || bannerError || advertorialError) {
    return <pre>{typeof error !== 'undefined' && error ? (error.message ? error.message : JSON.stringify(error)) : 'Unknown error'}</pre>
  }

  const isInitialLoading = postsLoading && posts.length === 0

  if (isInitialLoading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          <Button className="gap-x-4	">{'Loading...'}</Button>
        </div>
      </>
    )
  }

  // Declare all posts
  const allPosts = posts

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
  // const getAdvertorialPost = advertorialData?.contentNodes?.edges
  //   ?.map((edge) => edge.node)
  //   ?.filter((node) => !node?.passwordProtected?.onOff) || []

  //   const numberOfAdvertorial = AdvertorialArray.length

  const numberOfBannerAds = bannerAdsArray.length

  return (
    <div className={cx('component')}>
      {mergedPosts.length !== 0 &&
        mergedPosts.map((post, index) => (
          <React.Fragment key={post?.id}>
            {/* Editorials Stories */}
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
            {(() => {
              const pos = (index - 1) % 8 // cycle through 8 slots

              // Show banner after 2 posts
              if (pos === 2) {
                return (
                  <div className={cx('banner-ad-wrapper')}>
                    <ModuleAd
                      bannerAd={
                        bannerAdsArray[
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
                const advertorialPost = advertorials.slice(start, start + 2)

                return (
                  <>
                    {advertorialPost.map((item, i) => (
                      <div key={i} className={cx('advertorial-wrapper')}>
                        <AdvertorialPostTwoColumns
                          title={item?.title}
                          excerpt={item?.excerpt}
                          uri={item?.uri}
                          featuredImage={item?.featuredImage?.node}
                          bookNowButton={item?.bookNowButton}
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
          {(hasMorePosts || hasMoreAdvertorials) && (
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
                    xmlns="https://www.w3.org/2000/svg"
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
                      <path
                        d="M1387 5110 c-243 -62 -373 -329 -272 -560 27 -62 77 -114 989 -1027
l961 -963 -961 -963 c-912 -913 -962 -965 -989 -1027 -40 -91 -46 -200 -15
-289 39 -117 106 -191 220 -245 59 -28 74 -31 160 -30 74 0 108 5 155 23 58
22 106 70 1198 1160 1304 1302 1202 1185 1202 1371 0 186 102 69 -1202 1371
-1102 1101 -1140 1137 -1198 1159 -67 25 -189 34 -248 20z"
                      />
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
