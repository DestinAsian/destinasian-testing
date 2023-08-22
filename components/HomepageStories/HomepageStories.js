import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './HomepageStories.module.scss'
import { useQuery } from '@apollo/client'
import { GetStories } from '../../queries/GetStories'
import { GetBannerAds } from '../../queries/GetBannerAds'
import { Post, ModuleAd, Button } from '..'

let cx = classNames.bind(styles)

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function HomepageStories(bannerAds, homepagePinPosts) {
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const postsPerPage = 10

  const { data, error, loading, fetchMore } = useQuery(GetStories, {
    variables: {
      first: postsPerPage,
      after: null,
    },
  })

  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult.contentNodes.edges.length) {
      return previousResult.contentNodes
    }

    return {
      contentNodes: {
        ...previousResult.contentNodes,
        edges: [
          ...previousResult.contentNodes.edges,
          ...fetchMoreResult.contentNodes.edges,
        ],
        pageInfo: fetchMoreResult.contentNodes.pageInfo,
      },
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight

      if (
        scrolledToBottom &&
        !isFetchingMore &&
        data?.contentNodes?.pageInfo?.hasNextPage
      ) {
        fetchMore({
          variables: {
            first: postsPerPage,
            after: data?.contentNodes?.pageInfo?.endCursor,
          },
          updateQuery,
        })
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [data, fetchMore])

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  if (loading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[50vw]	">
          <Button className="gap-x-4	">{'Loading...'}</Button>
        </div>
      </>
    )
  }

  // sort posts by date
  const sortPostsByDate = (a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA // Sort in descending order
  }

  const mainPosts = data?.contentNodes?.edges.map((post) => post.node) || []

  const allPosts = [...mainPosts].sort(sortPostsByDate)

  // const mainPosts = []
  // const mainEditorialPosts = []

  // // loop through all the main categories posts
  // data.posts.edges.forEach((post) => {
  //   mainPosts.push(post.node)
  // })

  // // loop through all the main categories and their posts
  // data.editorials.edges.forEach((post) => {
  //   mainEditorialPosts.push(post.node)
  // })

  // // sort posts by date
  // const sortPostsByDate = (a, b) => {
  //   const dateA = new Date(a.date)
  //   const dateB = new Date(b.date)
  //   return dateB - dateA // Sort in descending order
  // }

  // // define mainCatPostCards
  // const mainCatPosts = [
  //   ...(mainPosts != null ? mainPosts : []),
  //   ...(mainEditorialPosts != null ? mainEditorialPosts : []),
  // ]

  // // sortByDate mainCat & childCat Posts
  // const allPosts = mainCatPosts.sort(sortPostsByDate)

  // // Declare Pin Posts
  // const allPinPosts = [
  //   homepagePinPosts?.pinPost1 ? homepagePinPosts?.pinPost1 : null,
  //   homepagePinPosts?.pinPost2 ? homepagePinPosts?.pinPost2 : null,
  //   homepagePinPosts?.pinPost3 ? homepagePinPosts?.pinPost3 : null,
  //   homepagePinPosts?.pinPost4 ? homepagePinPosts?.pinPost4 : null,
  //   homepagePinPosts?.pinPost5 ? homepagePinPosts?.pinPost5 : null,
  // ].filter((pinPost) => pinPost !== null)

  // // Merge All posts and Pin posts
  // const mergedPosts = [
  //   ...allPinPosts,
  //   ...allPosts.filter(
  //     (post) => !allPinPosts.some((pinPost) => pinPost?.id === post?.id),
  //   ),
  // ]

  // // Declare state for banner ads
  // const [bannerAdsArray, setBannerAdsArray] = useState([])

  // // Function to shuffle the banner ads and store them in state
  // const shuffleBannerAds = () => {
  //   const bannerAdsArray = Object.values(bannerAds?.edges || [])

  //   // Shuffle the array
  //   const shuffledBannerAdsArray = shuffleArray(bannerAdsArray)

  //   setBannerAdsArray(shuffledBannerAdsArray)
  // }

  // useEffect(() => {
  //   // Shuffle the banner ads when the component mounts
  //   shuffleBannerAds()
  // }, [])

  // // Separate shuffled banner ads with <img> tags from those without
  // const bannerAdsWithImg = bannerAdsArray.filter(
  //   (bannerAd) => !bannerAd?.node?.content.includes('<!--'),
  // )
  // const bannerAdsWithoutImg = bannerAdsArray.filter((bannerAd) =>
  //   bannerAd?.node?.content.includes('<!--'),
  // )

  // // Concatenate the arrays to place ads with <img> tags first
  // const sortedBannerAdsArray = [...bannerAdsWithImg, ...bannerAdsWithoutImg]

  return (
    <div className={cx('component')}>
      {allPosts.length !== 0 &&
        allPosts.map((post, index) => (
          <React.Fragment key={post?.id}>
            {/* {console.log(post?.contentTypeName)} */}
            {post?.contentTypeName === ('post' || 'editorial') && (
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
                categoryLabel={post?.acfCategoryIcon?.categoryLabel}
                locationValidation={post?.acfLocationIcon?.fieldGroupName}
                locationLabel={post?.acfLocationIcon?.locationLabel}
                locationUrl={post?.acfLocationIcon?.locationUrl}
              />
            )}

            {/* {index === 1 && (
              <ModuleAd bannerAd={sortedBannerAdsArray[0]?.node?.content} />
            )}
            {index === 5 && (
              <ModuleAd bannerAd={sortedBannerAdsArray[1]?.node?.content} />
            )}
            {index === 9 && (
              <ModuleAd bannerAd={sortedBannerAdsArray[2]?.node?.content} />
            )}
            {index === 13 && (
              <ModuleAd bannerAd={sortedBannerAdsArray[3]?.node?.content} />
            )}
            {index === 17 && (
              <ModuleAd bannerAd={sortedBannerAdsArray[4]?.node?.content} />
            )}
            {index === 21 && (
              <ModuleAd bannerAd={sortedBannerAdsArray[5]?.node?.content} />
            )}
            {index === 25 && (
              <ModuleAd bannerAd={sortedBannerAdsArray[6]?.node?.content} />
            )}
            {index === 29 && (
              <ModuleAd bannerAd={sortedBannerAdsArray[7]?.node?.content} />
            )}
            {index === 33 && (
              <ModuleAd bannerAd={sortedBannerAdsArray[8]?.node?.content} />
            )}
            {index === 37 && (
              <ModuleAd bannerAd={sortedBannerAdsArray[9]?.node?.content} />
            )} */}
          </React.Fragment>
        ))}
      {allPosts.length && (
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[50vw]	">
          {data?.contentNodes?.pageInfo?.hasNextPage &&
            data?.contentNodes?.pageInfo?.endCursor && (
              <Button
                // onClick={() => {
                //   if (
                //     !isFetchingMore &&
                //     data?.contentNodes?.pageInfo?.hasNextPage
                //   ) {
                //     setIsFetchingMore(true)
                //     fetchMore({
                //       variables: {
                //         first: postsPerPage,
                //         after: data?.contentNodes?.pageInfo?.endCursor,
                //       },
                //       updateQuery,
                //     }).then(() => {
                //       setIsFetchingMore(false) // Reset the flag after fetch is done
                //     })
                //   }
                // }}
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
