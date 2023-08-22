import React, { useState, useEffect } from 'react'
import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import { PostFragment } from '../fragments/PostFragment'
import {
  CategoryHeader,
  SecondaryHeader,
  Main,
  Container,
  CategoryEntryHeader,
  NavigationMenu,
  Post,
  FeaturedImage,
  SEO,
  ModuleAd,
  Button,
  Footer,
} from '../components'

// Randomized Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? []
  const secondaryMenu = props?.data?.secondHeaderMenuItems?.nodes ?? []
  const thirdMenu = props?.data?.thirdHeaderMenuItems?.nodes ?? []
  const fourthMenu = props?.data?.fourthHeaderMenuItems?.nodes ?? []
  const fifthMenu = props?.data?.fifthHeaderMenuItems?.nodes ?? []
  const featureMenu = props?.data?.featureHeaderMenuItems?.nodes ?? []
  // const footerMenu = props?.data?.footerMenuItems?.nodes ?? []
  const bannerAds = props?.data?.bannerAds ?? []
  const {
    name,
    uri,
    description,
    categoryImages,
    posts,
    editorials,
    updates,
    children,
    parent,
    pinPosts,
    countryCode,
    destinationGuides,
  } = props?.data?.nodeByUri ?? []

  // Rest of World validation
  const rowValidation =
    name !== 'Rest of World' && parent?.node?.name !== 'Rest of World'
      ? true
      : null

  // Latest Travel Stories
  const latestPosts = props?.data?.posts ?? []
  const latestEditorials = props?.data?.editorials ?? []

  const latestMainPosts = []
  const latestMainEditorialPosts = []

  // loop through all the latest categories posts
  latestPosts.edges.forEach((post) => {
    latestMainPosts.push(post.node)
  })

  // loop through all the latest categories and their posts
  latestEditorials.edges.forEach((post) => {
    latestMainEditorialPosts.push(post.node)
  })

  // define latestCatPostCards
  const latestMainCatPosts = [
    ...(latestMainPosts != null ? latestMainPosts : []),
    ...(latestMainEditorialPosts != null ? latestMainEditorialPosts : []),
  ]

  // Load More Function
  const [visiblePosts, setVisiblePosts] = useState(4)
  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 4)
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
  posts.edges.forEach((post) => {
    mainPosts.push(post.node)
  })

  // loop through all the child categories and their posts
  children.edges.forEach((childCategory) => {
    childCategory.node.posts.edges.forEach((post) => {
      childPosts.push(post.node)
    })

    childCategory.node.children.edges.forEach((grandChildCategory) => {
      grandChildCategory.node.posts.edges.forEach((post) => {
        childPosts.push(post.node)
      })
    })
  })

  // loop through all the main categories and their posts
  editorials.edges.forEach((post) => {
    mainEditorialPosts.push(post.node)
  })

  // loop through all the child editorial categories and their posts
  children.edges.forEach((childCategory) => {
    childCategory.node.editorials.edges.forEach((post) => {
      childEditorialPosts.push(post.node)
    })

    childCategory.node.children.edges.forEach((grandChildCategory) => {
      grandChildCategory.node.editorials.edges.forEach((post) => {
        childEditorialPosts.push(post.node)
      })
    })
  })

  // loop through all the main categories and their posts
  updates.edges.forEach((post) => {
    mainUpdatesPosts.push(post.node)
  })

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

  // sortByDate latestCat & childCat Posts
  const latestAllPosts = latestMainCatPosts.sort(sortPostsByDate)

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

  // Declare state for banner ads
  const [bannerAdsArray, setBannerAdsArray] = useState([])

  // Function to shuffle the banner ads and store them in state
  const shuffleBannerAds = () => {
    const bannerAdsArray = Object.values(bannerAds?.edges || [])

    // Shuffle the array
    const shuffledBannerAdsArray = shuffleArray(bannerAdsArray)

    setBannerAdsArray(shuffledBannerAdsArray)
  }

  useEffect(() => {
    // Shuffle the banner ads when the component mounts
    shuffleBannerAds()
  }, [])

  // Separate shuffled banner ads with <img> tags from those without
  const bannerAdsWithImg = bannerAdsArray.filter((bannerAd) =>
    !bannerAd?.node?.content.includes('<!--'),
  )
  const bannerAdsWithoutImg = bannerAdsArray.filter(
    (bannerAd) => bannerAd?.node?.content.includes('<!--'),
  )

  // Concatenate the arrays to place ads with <img> tags first
  const sortedBannerAdsArray = [...bannerAdsWithImg, ...bannerAdsWithoutImg]

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <CategoryHeader
        title={siteTitle}
        description={siteDescription}
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
        fourthMenuItems={fourthMenu}
        fifthMenuItems={fifthMenu}
        featureMenuItems={featureMenu}
        latestStories={latestAllPosts}
      />

      {rowValidation && (
        <SecondaryHeader
          parent={parent}
          children={children}
          name={name}
          uri={uri}
          countryCode={countryCode}
          parentUri={parent?.node?.uri}
          parentName={parent?.node?.name}
          parentCountryCode={parent?.node?.countryCode?.countryCode}
          titleUri={uri}
          titleName={name}
          titleCountryCode={countryCode?.countryCode}
          destinationGuides={destinationGuides?.destinationGuides}
          parentDestinationGuides={
            parent?.node?.destinationGuides?.destinationGuides
          }
        />
      )}

      {/* EntryHeader category name */}
      {rowValidation && (
        <Container>
          {destinationGuides?.destinationGuides == 'yes' && (
            <CategoryEntryHeader
              title={`The DA Guide to ${name}`}
              image={categoryImages?.categoryImages?.mediaItemUrl || null}
              description={description || null}
              children={children?.edges}
            />
          )}
          {destinationGuides?.destinationGuides == null && (
            <CategoryEntryHeader
              parent={parent?.node?.name}
              title={`${name}`}
              image={categoryImages?.categoryImages?.mediaItemUrl || null}
              description={description || null}
              children={children?.edges}
            />
          )}
        </Container>
      )}

      <Main>
        <>
          {/* All posts sorted by pinPosts then mainPosts & date */}
          {mergedPosts.length !== 0 &&
            mergedPosts.slice(0, visiblePosts).map((post, index) => (
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
        </>
      </Main>
      <Footer />
    </>
  )
}

Component.query = gql`
  ${BlogInfoFragment}
  ${PostFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  ${ModuleAd.fragments.entry}
  query GetCategoryPage(
    $uri: String!
    $headerLocation: MenuLocationEnum
    $secondHeaderLocation: MenuLocationEnum
    $thirdHeaderLocation: MenuLocationEnum
    $fourthHeaderLocation: MenuLocationEnum
    $fifthHeaderLocation: MenuLocationEnum
    $featureHeaderLocation: MenuLocationEnum
    $first: Int = 10
    $where: RootQueryToPostConnectionWhereArgs = { status: PUBLISH }
    $where1: RootQueryToEditorialConnectionWhereArgs = { status: PUBLISH }
  ) {
    nodeByUri(uri: $uri) {
      ... on Category {
        name
        uri
        description
        categoryImages {
          categoryImages {
            mediaItemUrl
          }
        }
        countryCode {
          countryCode
        }
        destinationGuides {
          destinationGuides
        }
        pinPosts {
          pinPost {
            ... on Post {
              id
              title
              content
              date
              uri
              excerpt
              ...FeaturedImageFragment
              author {
                node {
                  name
                }
              }
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
            ... on Editorial {
              id
              title
              content
              date
              uri
              excerpt
              ...FeaturedImageFragment
              author {
                node {
                  name
                }
              }
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
            ... on Advertorial {
              id
              title
              content
              date
              uri
              ...FeaturedImageFragment
              author {
                node {
                  name
                }
              }
            }
          }
        }
        posts(first: $first, where: { status: PUBLISH }) {
          edges {
            node {
              id
              title
              content
              date
              uri
              excerpt
              ...FeaturedImageFragment
              author {
                node {
                  name
                }
              }
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
        editorials(first: $first, where: { status: PUBLISH }) {
          edges {
            node {
              id
              title
              content
              date
              uri
              excerpt
              ...FeaturedImageFragment
              author {
                node {
                  name
                }
              }
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
        updates(first: $first, where: { status: PUBLISH}) {
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
        parent {
          node {
            name
            uri
            children(where: { childless: true }) {
              edges {
                node {
                  name
                  uri
                }
              }
            }
            countryCode {
              countryCode
            }
            destinationGuides {
              destinationGuides
            }
          }
        }
        children {
          edges {
            node {
              name
              uri
              posts {
                edges {
                  node {
                    ...PostFragment
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
              editorials {
                edges {
                  node {
                    id
                    title
                    content
                    date
                    uri
                    excerpt
                    ...FeaturedImageFragment
                    author {
                      node {
                        name
                      }
                    }
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
              children {
                edges {
                  node {
                    name
                    uri
                    posts {
                      edges {
                        node {
                          ...PostFragment
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
                    editorials {
                      edges {
                        node {
                          id
                          title
                          content
                          date
                          uri
                          excerpt
                          ...FeaturedImageFragment
                          author {
                            node {
                              name
                            }
                          }
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
                }
              }
            }
          }
        }
      }
    }
    posts(first: $first, where: $where) {
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
    editorials(first: $first, where: $where1) {
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
    bannerAds(first: 10, where: { search: "homepage" }) {
      ...ModuleAdFragment
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(
      where: { location: $headerLocation }
      first: 20
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    secondHeaderMenuItems: menuItems(
      where: { location: $secondHeaderLocation }
      first: 20
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    thirdHeaderMenuItems: menuItems(
      where: { location: $thirdHeaderLocation }
      first: $first
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    fourthHeaderMenuItems: menuItems(
      where: { location: $fourthHeaderLocation }
      first: $first
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    fifthHeaderMenuItems: menuItems(
      where: { location: $fifthHeaderLocation }
      first: $first
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    featureHeaderMenuItems: menuItems(
      where: { location: $featureHeaderLocation }
      first: $first
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`

Component.variables = ({ uri }) => {
  return {
    uri,
    headerLocation: MENUS.PRIMARY_LOCATION,
    secondHeaderLocation: MENUS.SECONDARY_LOCATION,
    thirdHeaderLocation: MENUS.THIRD_LOCATION,
    fourthHeaderLocation: MENUS.FOURTH_LOCATION,
    fifthHeaderLocation: MENUS.FIFTH_LOCATION,
    featureHeaderLocation: MENUS.FEATURE_LOCATION,
  }
}
