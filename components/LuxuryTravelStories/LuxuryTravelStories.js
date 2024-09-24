import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './LuxuryTravelStories.module.scss'
import { useQuery } from '@apollo/client'
import * as CONTENT_TYPES from '../../constants/contentTypes'
import { GetCategoryStories } from '../../queries/GetCategoryStories'
import { GetSpecificBannerAds } from '../../queries/GetSpecificBannerAds'
import { GetAdvertorialStories } from '../../queries/GetAdvertorialStories'
import {
  Button,
  PostTwoColumns,
  AdvertorialPostTwoColumns,
  ModuleAd,
} from '../../components'

let cx = classNames.bind(styles)

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function LuxuryTravelStories(luxuryTravelId) {
  // Declare state for banner ads
  const [SpecificAdsArray, setSpecificAdsArray] = useState([])
  // Post per fetching
  const postsPerPage = 10
  const bannerPerPage = 1

  const databaseId = luxuryTravelId?.luxuryTravelId
  const parent = luxuryTravelId?.parent
  const luxuryTravelPinPosts = luxuryTravelId?.luxuryTravelPinPosts

  if (!parent) {
    return null
  }

  let bannerVariable = {
    first: bannerPerPage,
    // search: name,
    search: null, // for testing
  }

  // // Main Category
  // if (!parent) {
  //   // Modify the variables based on the condition
  //   bannerVariable = {
  //     search: name,
  //   }
  //   queryVariables = {
  //     search: name,
  //   }
  // }

  // // Sub Category
  // if (children?.edges?.length !== 0 && parent !== (null || undefined)) {
  //   // Modify the variables based on the condition
  //   bannerVariable = {
  //     search: name,
  //   }
  //   queryVariables = {
  //     search: name,
  //   }
  // }

  // // Child of Sub Category
  // if (children?.edges?.length === 0 && parent !== (null || undefined)) {
  //   // Modify the variables based on the condition
  //   bannerVariable = {
  //     search: parent,
  //   }
  //   queryVariables = {
  //     search: parent,
  //   }
  // }

  // // Specific Category with no sub category
  // if (name === ('Trade Talk' || 'Airline News' || 'Travel News')) {
  //   // Modify the variables based on the condition
  //   bannerVariable = {
  //     search: name,
  //   }
  // }

  // Get Specific Banner
  const { data: bannerSpecificData, error: bannerSpecificError } = useQuery(
    GetSpecificBannerAds,
    {
      variables: bannerVariable,
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    },
  )

  if (bannerSpecificError) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  // Function to shuffle the banner ads and store them in state
  // Specific Banner
  useEffect(() => {
    const shuffleBannerAds = () => {
      const bannerAdsArrayObj = Object.values(
        bannerSpecificData?.bannerAds?.edges || [],
      )

      // Separate shuffled banner ads with <img> tags from those without
      const bannerSpecificAdsWithImg = bannerAdsArrayObj.filter(
        (bannerAd) => !bannerAd?.node?.content.includes('<!--'),
      )

      // Shuffle only the otherBannerAds array
      const SpecificBannerAds = shuffleArray(bannerSpecificAdsWithImg)

      // Concatenate the arrays with pinned ads first and shuffled other banner ads
      const shuffledBannerAdsArray = [...SpecificBannerAds]

      setSpecificAdsArray(shuffledBannerAdsArray)
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
  }, [bannerSpecificData])

  // // Scroll event listener to detect when user scrolls to the bottom
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrolledToBottom =
  //       window.scrollY + window.innerHeight >=
  //       document.documentElement.scrollHeight

  //     if (scrolledToBottom) {
  //       // Call the function to fetch more when scrolled to the bottom
  //       fetchMorePosts()
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [fetchMorePosts])

  // Declare all posts
  const allPosts = luxuryTravelPinPosts?.pinPosts
  const allMoreStories = luxuryTravelPinPosts?.moreStories

  // All posts
  const mergedPosts = [allPosts].reduce((uniquePosts, post) => {
    if (!uniquePosts.some((uniquePost) => uniquePost?.id === post?.id)) {
      uniquePosts.push(post)
    }
    return uniquePosts
  }, [])

  // More Stories posts
  const moreStories = [allMoreStories].reduce((uniquePosts, post) => {
    if (!uniquePosts.some((uniquePost) => uniquePost?.id === post?.id)) {
      uniquePosts.push(post)
    }
    return uniquePosts
  }, [])

  // Concatenate the arrays to place ads specificAds first
  const sortedBannerAdsArray = [...SpecificAdsArray].reduce((uniqueAds, ad) => {
    if (!uniqueAds.some((uniqueAd) => uniqueAd?.node?.id === ad?.node?.id)) {
      uniqueAds.push(ad)
    }
    return uniqueAds
  }, [])

  const numberOfBannerAds = sortedBannerAdsArray.length

  return (
    <div className={cx('component')}>
      {!!parent && (
        <>
          <div className={cx('pin-posts-wrapper')}>
            {mergedPosts[0].length !== 0 &&
              mergedPosts[0].map((post, index) => (
                <React.Fragment key={post?.id}>
                  {post?.contentTypeName === 'post' && (
                    <div className={cx('post-wrapper')}>
                      {/* Post / Guides Stories */}
                      <PostTwoColumns
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
                        chooseYourCategory={
                          post?.acfCategoryIcon?.chooseYourCategory
                        }
                        chooseIcon={
                          post?.acfCategoryIcon?.chooseIcon?.mediaItemUrl
                        }
                        categoryLabel={post?.acfCategoryIcon?.categoryLabel}
                        locationValidation={
                          post?.acfLocationIcon?.fieldGroupName
                        }
                        locationLabel={post?.acfLocationIcon?.locationLabel}
                        locationUrl={post?.acfLocationIcon?.locationUrl}
                      />
                    </div>
                  )}
                  {post?.contentTypeName === 'editorial' && (
                    <div className={cx('post-wrapper')}>
                      {/* Editorials, Updates Stories */}
                      <PostTwoColumns
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
                        chooseYourCategory={
                          post?.acfCategoryIcon?.chooseYourCategory
                        }
                        chooseIcon={
                          post?.acfCategoryIcon?.chooseIcon?.mediaItemUrl
                        }
                        categoryLabel={post?.acfCategoryIcon?.categoryLabel}
                        locationValidation={
                          post?.acfLocationIcon?.fieldGroupName
                        }
                        locationLabel={post?.acfLocationIcon?.locationLabel}
                        locationUrl={post?.acfLocationIcon?.locationUrl}
                      />
                    </div>
                  )}
                  {post?.contentTypeName === 'advertorial' && (
                    <div className={cx('advertorial-wrapper')}>
                      {/* Advertorial Stories */}
                      <AdvertorialPostTwoColumns
                        title={post?.title}
                        excerpt={post?.excerpt}
                        uri={post?.uri}
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
                        category={post?.contentType?.node?.label}
                        categoryUri={post?.uri}
                        featuredImage={post?.featuredImage?.node}
                      />
                    </div>
                  )}
                  {/* Show 1st banner after 4 posts and then every 4 posts */}
                  {(index - 1) % 4 === 2 && (
                    <div className={cx('banner-ad-wrapper')}>
                      <ModuleAd
                        bannerAd={
                          sortedBannerAdsArray[
                            Math.floor((index - 1) / 4) % numberOfBannerAds
                          ]?.node?.content
                        }
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>
          <div className={cx('border-bottom')}></div>
          <div className={cx('more-stories-wrapper')}>
            <div className={cx('more-stories-title')}>{'More Stories'}</div>
            <div className={cx('more-stories-content')}>
              {moreStories[0].length !== 0 &&
                moreStories[0].map((post, index) => (
                  <React.Fragment key={post?.id}>
                    {post?.contentTypeName === 'post' && (
                      <div className={cx('post-wrapper')}>
                        {/* Post / Guides Stories */}
                        <PostTwoColumns
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
                          chooseYourCategory={
                            post?.acfCategoryIcon?.chooseYourCategory
                          }
                          chooseIcon={
                            post?.acfCategoryIcon?.chooseIcon?.mediaItemUrl
                          }
                          categoryLabel={post?.acfCategoryIcon?.categoryLabel}
                          locationValidation={
                            post?.acfLocationIcon?.fieldGroupName
                          }
                          locationLabel={post?.acfLocationIcon?.locationLabel}
                          locationUrl={post?.acfLocationIcon?.locationUrl}
                        />
                      </div>
                    )}
                    {post?.contentTypeName === 'editorial' && (
                      <div className={cx('post-wrapper')}>
                        {/* Editorials, Updates Stories */}
                        <PostTwoColumns
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
                          chooseYourCategory={
                            post?.acfCategoryIcon?.chooseYourCategory
                          }
                          chooseIcon={
                            post?.acfCategoryIcon?.chooseIcon?.mediaItemUrl
                          }
                          categoryLabel={post?.acfCategoryIcon?.categoryLabel}
                          locationValidation={
                            post?.acfLocationIcon?.fieldGroupName
                          }
                          locationLabel={post?.acfLocationIcon?.locationLabel}
                          locationUrl={post?.acfLocationIcon?.locationUrl}
                        />
                      </div>
                    )}
                    {post?.contentTypeName === 'advertorial' && (
                      <div className={cx('advertorial-wrapper')}>
                        {/* Advertorial Stories */}
                        <AdvertorialPostTwoColumns
                          title={post?.title}
                          excerpt={post?.excerpt}
                          uri={post?.uri}
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
                          category={post?.contentType?.node?.label}
                          categoryUri={post?.uri}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
            </div>
          </div>
          <div className={cx('border-bottom')}></div>
        </>
      )}
    </div>
  )
}
