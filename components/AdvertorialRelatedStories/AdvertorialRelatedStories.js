import React from 'react'
import classNames from 'classnames/bind'
import styles from './AdvertorialRelatedStories.module.scss'
import { useQuery } from '@apollo/client'
import { GetAdvertorialRelatedStories } from '@/queries/GetAdvertorialRelatedStories'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import dynamic from 'next/dynamic'
// Import Components
const RelatedStories = dynamic(() =>
  import('@/components/RelatedStories/RelatedStories'),
)

let cx = classNames.bind(styles)

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function PageRelatedStories(databaseId) {
  const pageId = databaseId?.databaseId

  // Get Page Related Stories
  const { data } = useQuery(GetAdvertorialRelatedStories, {
    variables: {
      id: pageId,
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
  })

  // Declare all posts
  const allPosts = data?.advertorial?.relatedStories?.stories

  // All posts
  const mergedPosts = [allPosts].reduce((uniquePosts, post) => {
    if (!uniquePosts.some((uniquePost) => uniquePost?.id === post?.id)) {
      uniquePosts.push(post)
    }
    return uniquePosts
  }, [])

  return (
    <div className={cx('component')}>
      <>
        {mergedPosts[0] !== null && (
          <>
            <div className={cx('entry-wrapper')}>
              <div className={cx('entry-title')}>{'Related Stories'}</div>
              <div className={cx('entry-border')}></div>
            </div>
            <div className={cx('pin-posts-wrapper')}>
              <div className={cx('pin-posts-content')}>
                {mergedPosts[0] !== null &&
                  mergedPosts[0]?.map((post, index) => (
                    <React.Fragment key={post?.id}>
                      {post?.contentTypeName === 'post' && (
                        <div className={cx('post-wrapper')}>
                          {/* Post / Guides Stories */}
                          <RelatedStories
                            title={post?.title}
                            uri={post?.uri}
                            parentCategory={
                              post?.categories?.edges[0]?.node?.parent?.node
                                ?.name
                            }
                            category={post?.categories?.edges[0]?.node?.name}
                            categoryUri={post?.categories?.edges[0]?.node?.uri}
                            featuredImage={post?.featuredImage?.node}
                          />
                        </div>
                      )}
                      {post?.contentTypeName === 'editorial' && (
                        <div className={cx('post-wrapper')}>
                          {/* Editorials Stories */}
                          <RelatedStories
                            title={post?.title}
                            uri={post?.uri}
                            category={post?.categories?.edges[0]?.node?.name}
                            categoryUri={post?.categories?.edges[0]?.node?.uri}
                            featuredImage={post?.featuredImage?.node}
                          />
                        </div>
                      )}
                      {post?.contentTypeName === 'update' && (
                        <div className={cx('post-wrapper')}>
                          {/* Updates Stories */}
                          <RelatedStories
                            title={post?.title}
                            uri={post?.uri}
                            category={post?.categories?.edges[0]?.node?.name}
                            categoryUri={post?.categories?.edges[0]?.node?.uri}
                            featuredImage={post?.featuredImage?.node}
                          />
                        </div>
                      )}
                      {post?.contentTypeName === 'advertorial' && (
                        <div className={cx('post-wrapper')}>
                          {/* Advertorial Stories */}
                          <RelatedStories
                            title={post?.title}
                            uri={post?.uri}
                            category={post?.categories?.edges[0]?.node?.name}
                            categoryUri={post?.categories?.edges[0]?.node?.uri}
                            featuredImage={post?.featuredImage?.node}
                            customClassName={'advertorial'}
                          />
                        </div>
                      )}
                      {post?.contentTypeName === 'honors-circle' && (
                        <div className={cx('post-wrapper')}>
                          {/* Honors Circle Stories */}
                          <RelatedStories
                            title={post?.title}
                            uri={post?.uri}
                            category={'Honors Circle'}
                            categoryUri={post?.uri}
                            featuredImage={post?.featuredImage?.node}
                            customClassName={'honors-circle'}
                          />
                        </div>
                      )}
                      {post?.contentTypeName === 'luxe-list' && (
                        <div className={cx('post-wrapper')}>
                          {/* Luxe List Stories */}
                          <RelatedStories
                            title={post?.title}
                            uri={post?.uri}
                            category={'Luxe List'}
                            categoryUri={post?.uri}
                            featuredImage={post?.featuredImage?.node}
                            customClassName={'luxe-list'}
                          />
                        </div>
                      )}
                      {post?.contentTypeName === 'readers-choice-award' && (
                        <div className={cx('post-wrapper')}>
                          {/* RCA Stories */}
                          <RelatedStories
                            title={post?.title}
                            uri={post?.uri}
                            category={'Readers Choice Award'}
                            categoryUri={post?.uri}
                            featuredImage={post?.featuredImage?.node}
                            customClassName={'rca'}
                          />
                        </div>
                      )}
                      {post?.contentTypeName === 'luxury-travel' && (
                        <div className={cx('post-wrapper')}>
                          {/* Luxury Travel Stories */}
                          <RelatedStories
                            title={post?.title}
                            uri={post?.uri}
                            category={
                              post?.acfAdvertorialLabel?.advertorialLabel
                            }
                            categoryUri={post?.uri}
                            featuredImage={post?.featuredImage?.node}
                            customClassName={'luxury-travel'}
                          />
                        </div>
                      )}
                      {post?.contentTypeName === 'travel-guides' && (
                        <div className={cx('post-wrapper')}>
                          {/* Travel Guides Stories */}
                          <RelatedStories
                            title={post?.title}
                            uri={post?.uri}
                            category={post?.categories?.edges[0]?.node?.name}
                            categoryUri={post?.categories?.edges[0]?.node?.uri}
                            featuredImage={post?.featuredImage?.node}
                            customClassName={'travel-guide'}
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
      </>
    </div>
  )
}
