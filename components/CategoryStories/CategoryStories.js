import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './CategoryStories.module.scss'
import { useQuery } from '@apollo/client'
import { GetCategoryStories } from '../../queries/GetCategoryStories'
import { GetROSBannerAds } from '../../queries/GetROSBannerAds'
import { GetSpecificBannerAds } from '../../queries/GetSpecificBannerAds'
import { Post, ModuleAd, Button } from '..'

let cx = classNames.bind(styles)

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function CategoryStories(pinPosts, uri, databaseId) {
  // Fetching Posts
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  // Declare state for banner ads
  const [bannerAdsArray, setBannerAdsArray] = useState([])
  // Post per fetching
  const postsPerPage = 4
  const bannerPerPage = 15

  // Get Stories / Posts
  const { data, error, loading, fetchMore } = useQuery(GetCategoryStories, {
    variables: {
      first: postsPerPage,
      after: null,
      termTaxonomy: 5,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult.categories.edges.length) {
      return previousResult.categories
    }

    return {
      categories: {
        ...previousResult.categories,
        edges: [
          ...previousResult.categories.edges,
          ...fetchMoreResult.categories.edges,
        ],
        pageInfo: fetchMoreResult.categories.pageInfo,
      },
    }
  }

  // Get ROS Banner
  const {
    data: bannerROSData,
    error: bannerROSError,
    fetchMore: fetchMoreROSBanner,
  } = useQuery(GetROSBannerAds, {
    variables: {
      first: bannerPerPage,
      after: null,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  if (bannerROSError) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  // Get Specific Banner
  const {
    data: bannerSpecificData,
    error: bannerSpecificError,
    fetchMore: fetchMoreSpecificBanner,
  } = useQuery(GetSpecificBannerAds, {
    variables: {
      first: bannerPerPage,
      after: null,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  console.log(bannerSpecificData)
  console.log(data)

  if (bannerSpecificError) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  // Rest of World validation
  // const rowValidation =
  //   name !== 'Rest of World' && parent?.node?.name !== 'Rest of World'
  //     ? true
  //     : null

  // Load More Function
  const [visiblePosts, setVisiblePosts] = useState(4)
  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 4)

    // // Call the fetchMoreROSBanner function to load additional banner ads
    // fetchMoreROSBanner({
    //   variables: {
    //     first: bannerPerPage,
    //     after: bannerROSData?.bannerAds?.pageInfo?.endCursor,
    //   },
    //   updateQuery: (prev, { fetchMoreResult }) => {
    //     if (!fetchMoreResult) return prev
    //     return {
    //       ...prev,
    //       bannerAds: {
    //         ...fetchMoreResult.bannerAds,
    //         edges: [
    //           ...prev.bannerAds.edges,
    //           ...fetchMoreResult.bannerAds.edges,
    //         ],
    //       },
    //     }
    //   },
    // })

    // fetchMoreSpecificBanner({
    //   variables: {
    //     first: bannerPerPage,
    //     after: bannerSpecificData?.bannerAds?.pageInfo?.endCursor,
    //   },
    //   updateQuery: (prev, { fetchMoreResult }) => {
    //     if (!fetchMoreResult) return prev
    //     return {
    //       ...prev,
    //       bannerAds: {
    //         ...fetchMoreResult.bannerAds,
    //         edges: [
    //           ...prev.bannerAds.edges,
    //           ...fetchMoreResult.bannerAds.edges,
    //         ],
    //       },
    //     }
    //   },
    // })
  }

  // load more posts when scrolled to bottom
  const checkScrollBottom = () => {
    const scrolledToBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight

    if (scrolledToBottom) {
      // Call the loadMorePosts function to load additional posts
      loadMorePosts()
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      checkScrollBottom()
    }

    // Attach the event listener
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const mainPosts = []
  const childPosts = []
  const mainEditorialPosts = []
  const childEditorialPosts = []
  const mainUpdatesPosts = []

  // loop through all the main categories posts
  data?.categories?.edges?.forEach((post) => {
    mainPosts.push(post.node)
  })

  // // loop through all the child categories and their posts
  // children.edges.forEach((childCategory) => {
  //   childCategory.node.posts.edges.forEach((post) => {
  //     childPosts.push(post.node)
  //   })

  //   childCategory.node.children.edges.forEach((grandChildCategory) => {
  //     grandChildCategory.node.posts.edges.forEach((post) => {
  //       childPosts.push(post.node)
  //     })
  //   })
  // })

  // // loop through all the main categories and their posts
  // editorials.edges.forEach((post) => {
  //   mainEditorialPosts.push(post.node)
  // })

  // // loop through all the child editorial categories and their posts
  // children.edges.forEach((childCategory) => {
  //   childCategory.node.editorials.edges.forEach((post) => {
  //     childEditorialPosts.push(post.node)
  //   })

  //   childCategory.node.children.edges.forEach((grandChildCategory) => {
  //     grandChildCategory.node.editorials.edges.forEach((post) => {
  //       childEditorialPosts.push(post.node)
  //     })
  //   })
  // })

  // // loop through all the main categories and their posts
  // updates.edges.forEach((post) => {
  //   mainUpdatesPosts.push(post.node)
  // })

  // sort posts by date
  const sortPostsByDate = (a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA // Sort in descending order
  }

  // define mainCatPostCards
  const mainCatPosts = [
    ...(mainPosts != null ? mainPosts : []),
    ...(mainEditorialPosts != null ? mainEditorialPosts : []),
    ...(mainUpdatesPosts != null ? mainUpdatesPosts : []),
  ]

  // define childCatPostCards
  const childCatPosts = [
    ...(childPosts != null ? childPosts : []),
    ...(childEditorialPosts != null ? childEditorialPosts : []),
  ]

  // sortByDate mainCat & childCat Posts
  const sortedMainPosts = mainCatPosts.sort(sortPostsByDate)
  const sortedChildPosts = childCatPosts.sort(sortPostsByDate)

  // define allPosts
  const allPosts = [
    ...(sortedMainPosts != null ? sortedMainPosts : []),
    ...(sortedChildPosts != null ? sortedChildPosts : []),
  ]

  // Declare Pin Posts
  const allPinPosts = pinPosts?.pinPost ? [pinPosts?.pinPost] : []

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

  // Function to shuffle the banner ads and store them in state
  useEffect(() => {
    const shuffleBannerAds = () => {
      const bannerAdsArrayObj = Object.values(
        bannerROSData?.bannerAds?.edges || [],
      )

      // Shuffle the array
      const shuffledBannerAdsArray = shuffleArray(bannerAdsArrayObj)

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
  }, [bannerROSData]) // Use bannerROSData as a dependency to trigger shuffling when new data arrives

  // Separate shuffled banner ads with <img> tags from those without
  const bannerROSAdsWithImg = bannerAdsArray.filter(
    (bannerAd) => !bannerAd?.node?.content.includes('<!--'),
  )

  // Specific Banner Ads
  const bannerSpecificAdsArray = bannerSpecificData?.bannerAds?.edges || []
  const bannerSpecificAdsWithImg = bannerSpecificAdsArray.filter(
    (bannerAd) => !bannerAd?.node?.content.includes('<!--'),
  )

  const matchingBannerAdsWithImg = bannerSpecificAdsWithImg.filter(
    (bannerAd) => {
      const anyOfUris = bannerAd?.node?.acfBannerAds?.anyOf?.map(
        (anyOfItem) => anyOfItem.uri,
      )
      return anyOfUris && anyOfUris.includes(uri)
    },
  )

  const pinROSAds = bannerROSAdsWithImg.filter(
    (bannerAd) => !bannerAd?.node?.acfBannerAds?.pinAd === false || null,
  )

  const pinSpecificAds = matchingBannerAdsWithImg.filter(
    (bannerAd) => !bannerAd?.node?.acfBannerAds?.pinAd === false || null,
  )

  // Concatenate the arrays to place ads specificAds first
  const sortedBannerAdsArray = [
    ...matchingBannerAdsWithImg,
    ...bannerROSAdsWithImg,
  ].reduce((uniqueAds, ad) => {
    if (!uniqueAds.some((uniqueAd) => uniqueAd?.node?.id === ad?.node?.id)) {
      uniqueAds.push(ad)
    }
    return uniqueAds
  }, [])

  const pinAds = [...pinSpecificAds, ...pinROSAds]

  const numberOfBannerAds = sortedBannerAdsArray.length
  const numberOfPinAds = pinAds.length

  const sortedBannerWithPin = [...pinAds, ...sortedBannerAdsArray].reduce(
    (uniqueAds, ad) => {
      if (!uniqueAds.some((uniqueAd) => uniqueAd?.node?.id === ad?.node?.id)) {
        uniqueAds.push(ad)
      }
      return uniqueAds
    },
    [],
  )

  const numberOfSortedPinAds = sortedBannerWithPin.length

  return (
    <div className={cx('component')}>
      {mergedPosts.length !== 0 &&
        mergedPosts.slice(0, visiblePosts).map((post, index) => (
          <React.Fragment key={post?.id}>
            <Post
              title={post?.title}
              excerpt={post?.excerpt}
              content={post?.content}
              date={post?.date}
              author={post?.author?.node?.name}
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
            {/* Check if pinAds is not an empty array */}
            {numberOfPinAds > 0 && (
              <>
                {/* Loop through the rest of the banner ads */}
                {(index - 1) % 4 === 0 && (
                  <ModuleAd
                    bannerAd={
                      sortedBannerWithPin[(index - 1) / 4]?.node?.content
                    }
                  />
                )}
              </>
            )}
            {/* Check if pinAds is an empty array */}
            {numberOfPinAds === 0 && (
              <>
                {(index - 1) % 4 === 0 && (
                  <>
                    <ModuleAd
                      bannerAd={
                        sortedBannerAdsArray[(index - 1) / 4]?.node?.content
                      }
                    />
                  </>
                )}
              </>
            )}
          </React.Fragment>
        ))}
      {visiblePosts < mergedPosts.length && (
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[50vw]	">
          <Button onClick={loadMorePosts} className="gap-x-4	">
            Load More{' '}
            <svg
              className="h-auto w-8 origin-center rotate-90	"
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
          </Button>
        </div>
      )}
    </div>
  )
}
