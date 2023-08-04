import React, { useState, useEffect } from 'react'
import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import { useMediaQuery } from 'react-responsive'
import {
  HomepageHeader,
  Main,
  Container,
  Post,
  NavigationMenu,
  FeaturedImage,
  SEO,
  ModuleAd,
  FeatureWell,
  Button,
  SecondaryHeader,
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
  const posts = props?.data?.posts ?? []
  const editorials = props?.data?.editorials ?? []
  const bannerAds = props?.data?.bannerAds ?? []
  const { content, featuredImage, acfHomepageSlider, homepagePinPosts, uri } =
    props?.data?.page ?? []

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
  const mainEditorialPosts = []
  const mainAdvertorialPosts = []

  // loop through all the main categories posts
  posts.edges.forEach((post) => {
    mainPosts.push(post.node)
  })

  // loop through all the main categories and their posts
  editorials.edges.forEach((post) => {
    mainEditorialPosts.push(post.node)
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
  ]

  // sortByDate mainCat & childCat Posts
  const allPosts = mainCatPosts.sort(sortPostsByDate)

  const isDesktop = useMediaQuery({ minWidth: 640 })
  const isMobile = useMediaQuery({ maxWidth: 639 })

  const featureWell = [
    {
      type: acfHomepageSlider?.typeSlide1,
      videoSrc: acfHomepageSlider?.video1?.mediaItemUrl,
      desktopSrc: acfHomepageSlider?.desktopSlide2?.mediaItemUrl,
      mobileSrc: acfHomepageSlider?.mobileSlide2?.mediaItemUrl,
      url: acfHomepageSlider?.slideLink1,
      caption: acfHomepageSlider?.slideCaption1,
    },
    {
      type: acfHomepageSlider?.typeSlide2,
      desktopSrc: acfHomepageSlider?.desktopSlide2?.mediaItemUrl,
      mobileSrc: acfHomepageSlider?.mobileSlide2?.mediaItemUrl,
      videoSrc: acfHomepageSlider?.video2?.mediaItemUrl,
      url: acfHomepageSlider?.slideLink2,
      caption: acfHomepageSlider?.slideCaption2,
    },
    {
      type: acfHomepageSlider?.typeSlide3,
      desktopSrc: acfHomepageSlider?.desktopSlide3?.mediaItemUrl,
      mobileSrc: acfHomepageSlider?.mobileSlide3?.mediaItemUrl,
      videoSrc: acfHomepageSlider?.video3?.mediaItemUrl,
      url: acfHomepageSlider?.slideLink3,
      caption: acfHomepageSlider?.slideCaption3,
    },
  ]

  const [currentFeatureWell, setCurrentFeatureWell] = useState(null)

  useEffect(() => {
    const filteredFeatureWell = featureWell.filter((item) => item.type !== null)

    if (filteredFeatureWell.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredFeatureWell.length)
      setCurrentFeatureWell(filteredFeatureWell[randomIndex])
    }
  }, [])

  // Declare Pin Posts
  const allPinPosts = [
    homepagePinPosts?.pinPost1 ? homepagePinPosts?.pinPost1 : null,
    homepagePinPosts?.pinPost2 ? homepagePinPosts?.pinPost2 : null,
    homepagePinPosts?.pinPost3 ? homepagePinPosts?.pinPost3 : null,
    homepagePinPosts?.pinPost4 ? homepagePinPosts?.pinPost4 : null,
    homepagePinPosts?.pinPost5 ? homepagePinPosts?.pinPost5 : null,
  ].filter((pinPost) => pinPost !== null)

  // Merge All posts and Pin posts
  const mergedPosts = [
    ...allPinPosts,
    ...allPosts.filter(
      (post) => !allPinPosts.some((pinPost) => pinPost?.id === post?.id),
    ),
  ]

  const [isNavShown, setIsNavShown] = useState(false)

  // Stop scrolling pages when isNavShown
  useEffect(() => {
    if (isNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isNavShown])

  // Declare state for shuffled banner ads
  const [shuffledBannerAds, setShuffledBannerAds] = useState({})

  // Function to shuffle the banner ads and store them in state
  const shuffleBannerAds = () => {
    // Assuming bannerAds is an object containing all available bannerAds
    const bannerAdsArray = Object.values(bannerAds?.edges || [])
    const shuffledBannerAdsArray = shuffleArray(bannerAdsArray)

    // Convert the shuffled array back to an object
    const shuffledAds = shuffledBannerAdsArray.reduce((acc, curr, index) => {
      acc[index] = curr
      return acc
    }, {})

    setShuffledBannerAds(shuffledAds)
  }

  useEffect(() => {
    // Shuffle the banner ads when the component mounts
    shuffleBannerAds()
  }, [])

  return (
    <>
      <SEO
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <HomepageHeader
        title={siteTitle}
        description={siteDescription}
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
        fourthMenuItems={fourthMenu}
        fifthMenuItems={fifthMenu}
        featureMenuItems={featureMenu}
        latestStories={allPosts}
        home={uri}
      />
      {/* <SecondaryHeader
        home={uri}
      /> */}
      <Main>
        <>
          {/* <NavigationHeader menuItems={navigationMenu}/> */}
          <div className="snap-y snap-mandatory">
            <div className="snap-start">
              {currentFeatureWell && (
                <Container>
                  {isDesktop && (
                    <FeatureWell
                      type={currentFeatureWell?.type}
                      videoSrc={currentFeatureWell?.videoSrc}
                      desktopSrc={currentFeatureWell?.desktopSrc}
                      url={currentFeatureWell?.url}
                      caption={currentFeatureWell?.caption}
                    />
                  )}
                  {isMobile && (
                    <FeatureWell
                      type={currentFeatureWell?.type}
                      videoSrc={currentFeatureWell?.videoSrc}
                      mobileSrc={currentFeatureWell?.mobileSrc}
                      url={currentFeatureWell?.url}
                      caption={currentFeatureWell?.caption}
                    />
                  )}
                </Container>
              )}
            </div>
            <div id="snapStart" className="snap-start pt-16">
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
                      chooseYourCategory={
                        post?.acfCategoryIcon?.chooseYourCategory
                      }
                      categoryLabel={post?.acfCategoryIcon?.categoryLabel}
                      locationValidation={post?.acfLocationIcon?.fieldGroupName}
                      locationLabel={post?.acfLocationIcon?.locationLabel}
                      locationUrl={post?.acfLocationIcon?.locationUrl}
                    />
                    {/* Banner Ads */}
                    {/* {index === 1 && (
                      <ModuleAd
                        bannerAd={shuffledBannerAds[0]?.node?.content}
                      />
                    )}
                    {index === 5 && (
                      <ModuleAd
                        bannerAd={shuffledBannerAds[1]?.node?.content}
                      />
                    )}
                    {index === 9 && (
                      <ModuleAd
                        bannerAd={shuffledBannerAds[2]?.node?.content}
                      />
                    )}
                    {index === 13 && (
                      <ModuleAd
                        bannerAd={shuffledBannerAds[3]?.node?.content}
                      />
                    )}
                    {index === 17 && (
                      <ModuleAd
                        bannerAd={shuffledBannerAds[4]?.node?.content}
                      />
                    )}
                    {index === 21 && (
                      <ModuleAd
                        bannerAd={shuffledBannerAds[5]?.node?.content}
                      />
                    )}
                    {index === 25 && (
                      <ModuleAd
                        bannerAd={shuffledBannerAds[6]?.node?.content}
                      />
                    )}
                    {index === 29 && (
                      <ModuleAd
                        bannerAd={shuffledBannerAds[7]?.node?.content}
                      />
                    )}
                    {index === 33 && (
                      <ModuleAd
                        bannerAd={shuffledBannerAds[8]?.node?.content}
                      />
                    )}
                    {index === 37 && (
                      <ModuleAd
                        bannerAd={shuffledBannerAds[9]?.node?.content}
                      />
                    )} */}
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
          </div>
        </>
      </Main>
    </>
  )
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  ${ModuleAd.fragments.entry}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $secondHeaderLocation: MenuLocationEnum
    $thirdHeaderLocation: MenuLocationEnum
    $fourthHeaderLocation: MenuLocationEnum
    $fifthHeaderLocation: MenuLocationEnum
    $featureHeaderLocation: MenuLocationEnum
    $asPreview: Boolean = false
    $first: Int = 10
    $where: RootQueryToPostConnectionWhereArgs = { status: PUBLISH }
    $where1: RootQueryToEditorialConnectionWhereArgs = { status: PUBLISH }
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      uri
      ...FeaturedImageFragment
      acfHomepageSlider {
        desktopSlide1 {
          mediaItemUrl
        }
        desktopSlide2 {
          mediaItemUrl
        }
        desktopSlide3 {
          mediaItemUrl
        }
        mobileSlide1 {
          mediaItemUrl
        }
        mobileSlide2 {
          mediaItemUrl
        }
        mobileSlide3 {
          mediaItemUrl
        }
        video1 {
          mediaItemUrl
        }
        video2 {
          mediaItemUrl
        }
        video3 {
          mediaItemUrl
        }
        slideCaption1
        slideCaption2
        slideCaption3
        slideLink1
        slideLink2
        slideLink3
        typeSlide1
        typeSlide2
        typeSlide3
      }
      homepagePinPosts {
        pinPost1 {
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
        }
        pinPost2 {
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
        }
        pinPost3 {
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
        }
        pinPost4 {
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
        }
        pinPost5 {
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

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    secondHeaderLocation: MENUS.SECONDARY_LOCATION,
    thirdHeaderLocation: MENUS.THIRD_LOCATION,
    fourthHeaderLocation: MENUS.FOURTH_LOCATION,
    fifthHeaderLocation: MENUS.FIFTH_LOCATION,
    featureHeaderLocation: MENUS.FEATURE_LOCATION,
    asPreview: ctx?.asPreview,
  }
}
