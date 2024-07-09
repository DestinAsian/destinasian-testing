import { useQuery, useApolloClient } from '@apollo/client'
import { PRIMARY_LOCATION } from '../../constants/menus'
import className from 'classnames/bind'
import styles from './ContentWrapperTravelGuides.module.scss'
import React, { useEffect, useState } from 'react'
import { GetPrimaryMenu } from '../../queries/GetPrimaryMenu'
import Link from 'next/link'
import { Container } from '../../components'
import { Accordion } from 'flowbite-react'
import { GetTravelGuides } from '../../queries/GetTravelGuides'

let cx = className.bind(styles)

export default function ContentWrapperTravelGuides({ content }) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const client = useApolloClient() // Use Apollo Client instance

  // Get menus
  const { data: menusData, loading: menusLoading } = useQuery(GetPrimaryMenu, {
    variables: {
      first: 20,
      headerLocation: PRIMARY_LOCATION,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  // Primary Menu
  const primaryMenu = menusData?.headerMenuItems?.edges ?? []
  // Main category labels array
  const mainCategoryLabels = primaryMenu
    .map((post) => post?.node?.connectedNode?.node?.name)
    .filter(Boolean)

  // ProcessResults on Advertorials & HonorsCircles
  const processResults = (posts) => {
    const advertorials = []
    const uniqueAdvertorialIds = new Set()
    const honorsCircles = []
    const uniqueHonorsCircleIds = new Set()

    posts.forEach((post) => {
      if (advertorials.length < 5 && post?.node?.advertorials?.edges?.length) {
        post.node.advertorials.edges.forEach((innerPost) => {
          const databaseId = innerPost.node.databaseId
          if (
            advertorials.length < 5 &&
            !uniqueAdvertorialIds.has(databaseId)
          ) {
            uniqueAdvertorialIds.add(databaseId)
            advertorials.push(innerPost.node)
          }
        })
      }

      if (
        honorsCircles.length < 5 &&
        post?.node?.honorsCircles?.edges?.length
      ) {
        post.node.honorsCircles.edges.forEach((innerPost) => {
          const databaseId = innerPost.node.databaseId
          if (
            honorsCircles.length < 5 &&
            !uniqueHonorsCircleIds.has(databaseId)
          ) {
            uniqueHonorsCircleIds.add(databaseId)
            honorsCircles.push(innerPost.node)
          }
        })
      }
    })

    advertorials.sort((a, b) => new Date(b.date) - new Date(a.date))
    honorsCircles.sort((a, b) => new Date(b.date) - new Date(a.date))

    return { advertorials, honorsCircles }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const allResults = []
        for (let i = 0; i < mainCategoryLabels.length; i++) {
          const category = mainCategoryLabels[i]
          const response = await client.query({
            query: GetTravelGuides,
            variables: { search: category },
            fetchPolicy: 'network-only',
          })
          const processedData = processResults(response.data.tags.edges)
          allResults.push({ category, data: processedData })
        }
        setResults(allResults)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
    setLoading(false)
  }, [client, mainCategoryLabels])

  // Loading state
  if (loading || menusLoading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]">
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 h-[80vh] w-8 animate-spin fill-black text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </>
    )
  }

  console.log(results)

  return (
    <article className={cx('component')}>
      <div
        className={cx('content-wrapper')}
        dangerouslySetInnerHTML={{ __html: content ?? '' }}
      />
      <div className={cx('guides-list-wrapper')}>
        {primaryMenu.map((category, index) => (
          <Container>
            <div className={cx('main-guides-title')}>
              {category?.node?.connectedNode?.node?.uri &&
                category?.node?.connectedNode?.node?.name && (
                  <Link href={category?.node?.connectedNode?.node?.uri}>
                    <span className={cx('title')}>
                      {category?.node?.connectedNode?.node?.name}
                    </span>
                  </Link>
                )}
            </div>
            <Accordion collapseAll>
              <Accordion.Panel>
                <Accordion.Title>
                  <div className={cx('main-guides-title')}>
                    {category?.node?.connectedNode?.node?.uri &&
                      category?.node?.connectedNode?.node?.name && (
                        <button className={cx('title')}>
                          {'See more of ' +
                            category?.node?.connectedNode?.node?.name +
                            '...'}
                        </button>
                      )}
                  </div>
                </Accordion.Title>
                <Accordion.Content>
                  {category?.node?.connectedNode?.node?.children?.edges?.map(
                    (category) => (
                      <>
                        <div className={cx('sub-guides-title')}>
                          {category?.node?.uri && category?.node?.name && (
                            <Link href={category?.node?.uri}>
                              <span className={cx('content-title')}>
                                {category?.node?.name}
                              </span>
                            </Link>
                          )}
                        </div>
                        {category?.node?.posts?.edges?.map((post) => (
                          <div className={cx('posts-wrapper')}>
                            {post?.node?.title && post?.node?.uri && (
                              <Link href={post?.node?.uri}>
                                <span className={cx('name')}>
                                  {post?.node?.title}
                                </span>
                              </Link>
                            )}
                          </div>
                        ))}
                      </>
                    ),
                  )}
                  <div className={cx('partner-content-title')}>
                    <span className={cx('content-title')}>
                      {'Partner Content'}
                    </span>
                  </div>
                  {results[index]?.data?.advertorials?.map((advertorial) => (
                    <div
                      className={cx('partner-content-wrapper')}
                      key={advertorial?.databaseId}
                    >
                      {advertorial?.title && advertorial?.uri && (
                        <Link href={advertorial?.uri}>
                          <span className={cx('name')}>
                            {advertorial?.title}
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                  <div className={cx('honors-circle-title')}>
                    <span className={cx('content-title')}>
                      {'Honors Circle'}
                    </span>
                  </div>
                  {results[index]?.data?.honorsCircles?.map((honorsCircle) => (
                    <div
                      className={cx('honors-circle-wrapper')}
                      key={honorsCircle?.databaseId}
                    >
                      {honorsCircle?.title && honorsCircle?.uri && (
                        <Link href={honorsCircle?.uri}>
                          <span className={cx('name')}>
                            {honorsCircle?.title}
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                  {/* {honorsCircles?.map((honorsCircle) => (
                    <div className={cx('honors-circle-wrapper')}>
                      {honorsCircle?.title && honorsCircle?.uri && (
                        <Link href={honorsCircle?.uri}>
                          <span className={cx('name')}>
                            {honorsCircle?.title}
                          </span>
                        </Link>
                      )}
                    </div>
                  ))} */}
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </Container>
        ))}
      </div>
    </article>
  )
}
