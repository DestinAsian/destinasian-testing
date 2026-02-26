import React, { useState, useEffect, useCallback } from 'react'
import classNames from 'classnames/bind'
import styles from './CategoryStories.module.scss'
import * as CONTENT_TYPES from '@/constants/contentTypes'
import { GetCategoryStories } from '@/queries/GetCategoryStories'
import { GetROSBannerAds } from '@/queries/GetROSBannerAds'
import { GetSpecificBannerAds } from '@/queries/GetSpecificBannerAds'
import { GetAdvertorialStories } from '@/queries/GetAdvertorialStories'
import { useSWRGraphQL } from '@/lib/useSWRGraphQL'
import dynamic from 'next/dynamic'
// Import Components
const Button = dynamic(() => import('@/components/Button/Button'))
const PostTwoColumns = dynamic(() =>
  import('@/components/PostTwoColumns/PostTwoColumns'),
)
const AdvertorialPostTwoColumns = dynamic(() =>
  import('@/components/AdvertorialPostTwoColumns/AdvertorialPostTwoColumns'),
)
const ModuleAd = dynamic(() => import('@/components/ModuleAd/ModuleAd'))
const ErrorFallback = dynamic(() =>
  import('@/components/ErrorFallback/ErrorFallback'),
)

let cx = classNames.bind(styles)

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function CategoryStories(categoryUri) {
  const postsPerPage = 4
  const bannerPerPage = 20
  const advertorialPerPage = 12

  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const [posts, setPosts] = useState([])
  const [postsCursor, setPostsCursor] = useState(null)

  const [advertorials, setAdvertorials] = useState([])
  const [advertorialCursor, setAdvertorialCursor] = useState(null)

  const [ROSAdsArray, setROSAdsArray] = useState([])
  const [SpecificAdsArray, setSpecificAdsArray] = useState([])

  const [hasMorePosts, setHasMorePosts] = useState(true)
  const [hasMoreAdvertorials, setHasMoreAdvertorials] = useState(true)

  const uri = categoryUri?.categoryUri
  const pinPosts = categoryUri?.pinPosts
  const name = categoryUri?.name
  const children = categoryUri?.children
  const parent = categoryUri?.parent

  let storiesVariable = {
    first: postsPerPage,
    after: null,
    id: uri,
    contentTypes: [CONTENT_TYPES.EDITORIAL, CONTENT_TYPES.POST],
  }

  // Editorial & Updates Stories
  if (
    (parent === null || parent === undefined) &&
    children?.edges?.length === 0
  ) {
    storiesVariable = {
      first: postsPerPage,
      after: null,
      id: uri,
      contentTypes: [CONTENT_TYPES.EDITORIAL, CONTENT_TYPES.UPDATE],
    }
  }

  // Get Stories / Posts
  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
  } = useSWRGraphQL(['category-posts', uri, postsCursor, retryCount], GetCategoryStories, {
    ...storiesVariable,
    after: postsCursor,
  })

  useEffect(() => {
    const contentNodes = postsData?.category?.contentNodes
    if (!contentNodes) return

    const { edges, pageInfo } = contentNodes

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

    if (incoming.length === 0 && pageInfo?.hasNextPage) {
      fetchMorePosts() // whatever your pagination function is
    }

    // 🔑 These MUST run even if incoming is empty
    setHasMorePosts(Boolean(pageInfo?.hasNextPage))
    setIsFetchingMore(false)
  }, [postsData])

  // Get ROS Banner
  const { data: bannerROSData, error: bannerROSError } = useSWRGraphQL(
    ['ros-banners', retryCount],
    GetROSBannerAds,
    { first: bannerPerPage },
  )


  let bannerVariable = {
    first: bannerPerPage,
    search: null,
  }

  // Advertorial Var
  let queryVariables = {
    first: advertorialPerPage,
    search: null,
  }

  // Main Category
  if (!parent) {
    // Modify the variables based on the condition
    bannerVariable = {
      search: name,
    }
    queryVariables = {
      search: name,
    }
  }

  // Sub Category
  if (children?.edges?.length !== 0 && parent != null) {
    // Modify the variables based on the condition
    bannerVariable = {
      search: name,
    }
    queryVariables = {
      search: name,
    }
  }

  // Child of Sub Category
  if (children?.edges?.length === 0 && parent != null) {
    // Modify the variables based on the condition
    bannerVariable = {
      search: parent,
    }
    queryVariables = {
      search: parent,
    }
  }

  // Specific Category with no sub category
  if (['Trade Talk', 'Airline News', 'Travel News'].includes(name)) {
    // Modify the variables based on the condition
    bannerVariable = {
      search: name,
    }
  }

  // Get Specific Banner
  const { data: bannerSpecificData, error: bannerSpecificError } =
    useSWRGraphQL(
      ['specific-banners', bannerVariable.search, retryCount],
      GetSpecificBannerAds,
      bannerVariable,
    )


  // Get Advertorial Stories
  const {
    data: advertorialsData,
    isLoading: advertorialsLoading,
    error: advertorialsError,
  } = useSWRGraphQL(
    ['category-advertorials', queryVariables.search, retryCount],
    GetAdvertorialStories,
    queryVariables,
  )

  // Function to shuffle the banner ads and store them in state
  // ROS Banner
  useEffect(() => {
    if (!bannerROSData?.bannerAds?.edges?.length) return

    const shuffleBannerAds = () => {
      const adsWithImg = bannerROSData.bannerAds.edges.filter(
        (ad) => !ad?.node?.content?.includes('<!--'),
      )

      setROSAdsArray(shuffleArray([...adsWithImg]))
    }

    shuffleBannerAds()

    const interval = setInterval(shuffleBannerAds, 60000)

    return () => clearInterval(interval)
  }, [bannerROSData])

  // Function to shuffle the banner ads and store them in state
  // Specific Banner
  useEffect(() => {
    if (!bannerSpecificData?.bannerAds?.edges?.length) return

    const shuffleBannerAds = () => {
      const adsWithImg = bannerSpecificData.bannerAds.edges.filter(
        (ad) => !ad?.node?.content?.includes('<!--'),
      )

      setSpecificAdsArray(shuffleArray([...adsWithImg]))
    }

    shuffleBannerAds()

    const interval = setInterval(shuffleBannerAds, 60000)

    return () => clearInterval(interval)
  }, [bannerSpecificData])

  // Advertorial Stories
  useEffect(() => {
    if (!advertorialsData?.tags?.edges?.length) return

    const map = new Map()

    advertorialsData.tags.edges.forEach((tag) => {
      tag?.node?.contentNodes?.edges?.forEach(({ node }) => {
        if (!node?.databaseId) return
        if (node?.passwordProtected?.onOff) return

        if (!map.has(node.databaseId)) {
          map.set(node.databaseId, node)
        }
      })
    })

    const sorted = [...map.values()].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    )

    setAdvertorials((prev) => {
      const seen = new Set(prev.map((p) => p.databaseId))
      const uniqueIncoming = sorted.filter((p) => !seen.has(p.databaseId))

      return uniqueIncoming.length ? [...prev, ...uniqueIncoming] : prev
    })

    setHasMoreAdvertorials(
      Boolean(advertorialsData?.tags?.pageInfo?.hasNextPage),
    )

    setIsFetchingMore(false)
  }, [advertorialsData])

  // Function to fetch more posts
  const fetchMorePosts = useCallback(() => {
    if (isFetchingMore) return
    if (!hasMorePosts) return

    const endCursor = postsData?.category?.contentNodes?.pageInfo?.endCursor

    if (!endCursor) return

    setIsFetchingMore(true)
    setPostsCursor(endCursor)
  }, [isFetchingMore, hasMorePosts, postsData])

  if (postsError || advertorialsError) {
    return (
      <ErrorFallback
        error={postsError || advertorialsError}
        onRetry={() => setRetryCount((c) => c + 1)}
        title="Failed to Load Stories"
      />
    )
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

  // Declare Pin Posts
  const allPinPosts = [
    pinPosts?.pinPost ? pinPosts?.pinPost : null,
    pinPosts?.pinPost2 ? pinPosts?.pinPost2 : null,
    pinPosts?.pinPost3 ? pinPosts?.pinPost3 : null,
    pinPosts?.pinPost4 ? pinPosts?.pinPost4 : null,
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

  // Concatenate the arrays to place ads specificAds first
  const sortedBannerAdsArray = [...SpecificAdsArray, ...ROSAdsArray].reduce(
    (uniqueAds, ad) => {
      if (
        !uniqueAds.some((uniqueAd) => uniqueAd?.node?.id === ad?.node?.id) &&
        !/(focus on|spotlight on)/i.test(ad?.node?.title || '')
      ) {
        uniqueAds.push(ad)
      }
      return uniqueAds
    },
    [],
  )

  // // Declare 2 Advertorial Post
  // const getAdvertorialPost = [...AdvertorialArray]
  // const numberOfAdvertorial = AdvertorialArray.length

  const numberOfBannerAds = sortedBannerAdsArray.length

  return (
    <div className={cx('component')}>
      {mergedPosts?.length !== 0 &&
        mergedPosts?.map((post, index) => (
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
            {/* Editorials Stories */}
            {post?.contentTypeName === 'editorial' && (
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
      {mergedPosts?.length === 0 && (
        <div className="mx-auto my-0 flex min-h-60 max-w-[100vw] items-center justify-center md:max-w-[700px]">
          {'There is no results in this category...'}
        </div>
      )}
      {mergedPosts?.length !== 0 && mergedPosts?.length && (
        <div className="mx-auto my-0 flex w-[100vw] justify-center	">
          {hasMorePosts && (
            <Button
              onClick={() => {
                if (!isFetchingMore) {
                  fetchMorePosts()
                }
              }}
              className="gap-x-4	"
            >
              {isFetchingMore ? (
                'Loading...' // Display loading text when fetching
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
