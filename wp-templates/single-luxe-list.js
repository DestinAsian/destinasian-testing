import React, { useState, useEffect } from 'react'
import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  Footer,
  Main,
  NavigationMenu,
  FeaturedImage,
  SEO,
  Header,
  SingleLLContainer,
  ContentWrapperLLFrontPage,
  SingleLLFeaturedImage,
  SingleAdvertorialEntryHeader,
  LLPost,
  Button,
} from '../components'
import { ContentWrapperLL } from '../components/ContentWrapperLL'

export default function SingleLuxeList(props) {
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
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? []
  const {
    title,
    content,
    featuredImage,
    acfPostSlider,
    parent,
    hcLocation,
    hcCaption,
    seo,
    uri,
    children,
  } = props?.data?.luxeList
  // Latest Travel Stories
  const latestPosts = props?.data?.posts ?? []
  const latestEditorials = props?.data?.editorials ?? []

  const latestMainPosts = []
  const latestMainEditorialPosts = []

  const luxeListPosts = []

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

  // loop through all luxe list posts
  children.edges.forEach((post) => {
    luxeListPosts.push(post.node)
  })

  console.log(luxeListPosts)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     checkScrollBottom()
  //   }

  //   // Attach the event listener
  //   window.addEventListener('scroll', handleScroll)

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])

  // sort posts by date
  const sortPostsByDate = (a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA // Sort in descending order
  }

  // sortByDate latestCat & childCat Posts
  const latestAllPosts = latestMainCatPosts.sort(sortPostsByDate)

  const images = [
    acfPostSlider.slide1 != null ? acfPostSlider.slide1.mediaItemUrl : null,
    acfPostSlider.slide2 != null ? acfPostSlider.slide2.mediaItemUrl : null,
    acfPostSlider.slide3 != null ? acfPostSlider.slide3.mediaItemUrl : null,
    acfPostSlider.slide4 != null ? acfPostSlider.slide4.mediaItemUrl : null,
    acfPostSlider.slide5 != null ? acfPostSlider.slide5.mediaItemUrl : null,
  ]

  return (
    <>
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={featuredImage?.node?.sourceUrl}
        url={uri}
      />
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5BJVGS"
          height="0"
          width="0"
          className="invisible hidden"
        ></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      {/* Year pages */}
      {parent == null && (
        <Header
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
      )}
      {parent == null && (
        <Main>
          <>
            <SingleLLContainer>
              {/* {'countries'} */}
              {/* All posts sorted by mainPosts & date */}
              <SingleLLFeaturedImage image={featuredImage?.node} />
              <ContentWrapperLLFrontPage content={content} />
              {luxeListPosts.length !== 0 &&
                luxeListPosts.slice(0, visiblePosts).map((post, index) => (
                  <React.Fragment key={post?.id}>
                    <LLPost
                      title={post?.title}
                      uri={post?.uri}
                      category={post?.categories?.edges[0]?.node?.name}
                      categoryUri={post?.categories?.edges[0]?.node?.uri}
                      featuredImage={post?.featuredImage?.node}
                      parentTitle={title}
                    />
                  </React.Fragment>
                ))}
              {visiblePosts < luxeListPosts.length && (
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
            </SingleLLContainer>
          </>
        </Main>
      )}

      {/* Hotel pages */}
      {parent != null && (
        <Header
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
      )}
      {parent != null && (
        <Main>
          <>
            <SingleLLContainer>
              {/* {'hotel'} */}
              <SingleAdvertorialEntryHeader
                title={title}
              />
              {/* <SingleHCSlider images={images} /> */}
              <ContentWrapperLL content={content} images={images} />
            </SingleLLContainer>
          </>
        </Main>
      )}
      {/* <Footer /> */}
    </>
  )
}

SingleLuxeList.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPost(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $secondHeaderLocation: MenuLocationEnum
    $thirdHeaderLocation: MenuLocationEnum
    $fourthHeaderLocation: MenuLocationEnum
    $fifthHeaderLocation: MenuLocationEnum
    $featureHeaderLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
    $first: Int = 10
    $where: RootQueryToPostConnectionWhereArgs = { status: PUBLISH }
    $where1: RootQueryToEditorialConnectionWhereArgs = { status: PUBLISH }
  ) {
    luxeList(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
      author {
        node {
          name
        }
      }
      seo {
        title
        metaDesc
      }
      uri
      acfPostSlider {
        slide1 {
          mediaItemUrl
        }
        slide2 {
          mediaItemUrl
        }
        slide3 {
          mediaItemUrl
        }
        slide4 {
          mediaItemUrl
        }
        slide5 {
          mediaItemUrl
        }
      }
      ...FeaturedImageFragment
      children(
        where: {
          contentTypes: LUXE_LIST
          status: PUBLISH
          orderby: { field: MODIFIED, order: DESC }
        }
        first: $first
      ) {
        edges {
          node {
            ... on LuxeList {
              id
              title
              content
              uri
              ...FeaturedImageFragment
              categories(where: {}) {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
      parent {
        node {
          ... on HonorsCircle {
            title
            content
            date
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
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`

SingleLuxeList.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    headerLocation: MENUS.PRIMARY_LOCATION,
    secondHeaderLocation: MENUS.SECONDARY_LOCATION,
    thirdHeaderLocation: MENUS.THIRD_LOCATION,
    fourthHeaderLocation: MENUS.FOURTH_LOCATION,
    fifthHeaderLocation: MENUS.FIFTH_LOCATION,
    featureHeaderLocation: MENUS.FEATURE_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  }
}
