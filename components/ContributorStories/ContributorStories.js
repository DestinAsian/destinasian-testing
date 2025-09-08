import React from 'react'
import classNames from 'classnames/bind'
import styles from './ContributorStories.module.scss'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import dynamic from 'next/dynamic'
// Import Components
const PostTwoColumns = dynamic(() =>
  import('@/components/PostTwoColumns/PostTwoColumns'),
)
const AdvertorialPostTwoColumns = dynamic(() =>
  import('@/components/AdvertorialPostTwoColumns/AdvertorialPostTwoColumns'),
)

let cx = classNames.bind(styles)

export default function ContributorStories(contributorPostId) {
  const contributorPosts = contributorPostId?.contributorPosts

  // Declare all posts
  const allPosts = contributorPosts?.recentStories
  const allMoreStories = contributorPosts?.moreStories

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

  return (
    <div className={cx('component')}>
      <>
        {mergedPosts[0]?.length !== 0 && (
          <>
            <div className={cx('pin-posts-wrapper')}>
              <div className={cx('pin-posts-content')}>
                {mergedPosts[0]?.length !== 0 &&
                  mergedPosts[0]?.map((post, index) => (
                    <React.Fragment key={post?.id}>
                      {post?.contentTypeName === 'post' && (
                        <div className={cx('post-wrapper')}>
                          {/* Post / Guides Stories */}
                          <PostTwoColumns
                            title={post?.title}
                            excerpt={post?.excerpt}
                            uri={post?.uri}
                            parentCategory={
                              post?.categories?.edges[0]?.node?.parent?.node
                                ?.name
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
                          {/* Editorials Stories */}
                          <PostTwoColumns
                            title={post?.title}
                            excerpt={post?.excerpt}
                            uri={post?.uri}
                            parentCategory={
                              post?.categories?.edges[0]?.node?.parent?.node
                                ?.name
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
                      {post?.contentTypeName === 'update' && (
                        <div className={cx('post-wrapper')}>
                          {/* Updates Stories */}
                          <PostTwoColumns
                            title={post?.title}
                            excerpt={post?.excerpt}
                            uri={post?.uri}
                            parentCategory={
                              post?.categories?.edges[0]?.node?.parent?.node
                                ?.name
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
                    </React.Fragment>
                  ))}
              </div>
            </div>
            <div
              className={cx(
                'border-bottom',
                mergedPosts[0] === null ? 'hide' : '',
              )}
            ></div>
          </>
        )}
        {moreStories[0]?.length !== 0 && (
          <>
            <div className={cx('more-stories-wrapper')}>
              {/* <div className={cx('more-stories-title')}>
                <div className={cx('title')}>{'More Stories'}</div>
              </div> */}
              <div className={cx('more-stories-content')}>
                {moreStories[0]?.length !== 0 &&
                  moreStories[0]?.map((post, index) => (
                    <React.Fragment key={post?.id}>
                      {post?.contentTypeName === 'post' && (
                        <div className={cx('post-wrapper')}>
                          {/* Post / Guides Stories */}
                          <PostTwoColumns
                            title={post?.title}
                            excerpt={post?.excerpt}
                            uri={post?.uri}
                            parentCategory={
                              post?.categories?.edges[0]?.node?.parent?.node
                                ?.name
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
                          {/* Editorials Stories */}
                          <PostTwoColumns
                            title={post?.title}
                            excerpt={post?.excerpt}
                            uri={post?.uri}
                            parentCategory={
                              post?.categories?.edges[0]?.node?.parent?.node
                                ?.name
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
                      {post?.contentTypeName === 'update' && (
                        <div className={cx('post-wrapper')}>
                          {/* Updates Stories */}
                          <PostTwoColumns
                            title={post?.title}
                            excerpt={post?.excerpt}
                            uri={post?.uri}
                            parentCategory={
                              post?.categories?.edges[0]?.node?.parent?.node
                                ?.name
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
                            luxuryTravelClass={'luxuryTravelClass'}
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
            <div
              className={cx(
                'border-bottom',
                moreStories[0] === null ? 'hide' : '',
              )}
            ></div>
          </>
        )}
      </>
    </div>
  )
}
