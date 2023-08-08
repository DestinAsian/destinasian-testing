import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './HomepageStories.module.scss'
import { gql, useQuery } from '@apollo/client'
import {
  Post,
  ModuleAd,
  Button,
} from '..'

// Define the GraphQL query for initial posts and nextPage
const GET_INITIAL_POSTS_QUERY = gql`
  query GetInitialPosts($first2: Int!) {
    posts(first: $first2, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          content
          date
          uri
          excerpt
          ...FeaturedImageFragment
          categories {
            edges {
              node {
                name
                uri
                parent {
                  node {
                    name
                  }
                }
              }
            }
          }
          acfCategoryIcon {
            categoryLabel
            chooseYourCategory
          }
          acfLocationIcon {
            fieldGroupName
            locationLabel
            locationUrl
          }
        }
      }
    }
    editorials(first: $first2, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          content
          date
          uri
          excerpt
          ...FeaturedImageFragment
          categories {
            edges {
              node {
                name
                uri
                parent {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

let cx = classNames.bind(styles)

// Randomized Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function HomepageStories() {
  // Load More Function
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 4

  // Fetch initial posts
  const { loading, data } = useQuery(GET_INITIAL_POSTS_QUERY, {
    variables: { first2: postsPerPage },
  })

  const loadMorePosts = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  if (loading) {
    return <>Loading...</>
  }

  const initialPosts = data.posts.edges.map((edge) => edge.node)
  const initialEndCursor = data.posts.pageInfo.endCursor

  // Calculate startIndex and endIndex based on currentPage
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage

  // Paginate posts based on startIndex and endIndex
  const paginatedPosts = initialPosts.slice(startIndex, endIndex)

  console.log(paginatedPosts)

  return (
    <div className={cx('component')}>
      {/* All posts sorted by pinPosts then mainPosts & date */}
      {paginatedPosts.length !== 0 &&
        paginatedPosts.map((post, index) => (
          // Render the merged posts here
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
              categoryLabel={post?.acfCategoryIcon?.categoryLabel}
              locationValidation={post?.acfLocationIcon?.fieldGroupName}
              locationLabel={post?.acfLocationIcon?.locationLabel}
              locationUrl={post?.acfLocationIcon?.locationUrl}
            />
            {/* Banner Ads */}
            {index === 1 && (
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
            )}
          </React.Fragment>
        ))}
      {paginatedPosts < initialPosts.length && (
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
