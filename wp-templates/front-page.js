import React, { useState, useEffect } from 'react'
import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import { PostFragment } from '../fragments/PostFragment'
import { useMediaQuery } from 'react-responsive'
import {
  HomepageHeader,
  Main,
  Container,
  NavigationMenu,
  FeaturedImage,
  SEO,
  FeatureWell,
  HomepageStories,
} from '../components'

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
  const updates = props?.data?.updates ?? []
  const {
    content,
    featuredImage,
    acfHomepageSlider,
    homepagePinPosts,
    uri,
    seo,
  } = props?.data?.page ?? []

  const mainPosts = []
  const mainEditorialPosts = []
  const mainUpdatesPosts = []

  // loop through all the main categories posts
  posts.edges.forEach((post) => {
    mainPosts.push(post.node)
  })

  // loop through all the main categories and their posts
  editorials.edges.forEach((post) => {
    mainEditorialPosts.push(post.node)
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

  // sortByDate mainCat & childCat Posts
  const allPosts = mainCatPosts.sort(sortPostsByDate)

  // Feature Well
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

  return (
    <>
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={featuredImage?.node?.sourceUrl}
        url={uri}
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
          <div 
          // className="snap-y snap-mandatory"
          >
            <div 
            // className="snap-start"
            >
              {currentFeatureWell && (
                <Container>
                  {/* {isDesktop && (
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
                  )} */}

                  <FeatureWell featureWells={featureWell} />
                </Container>
              )}
            </div>
            <div id="snapStart" className="snap-start pt-16">
              {/* All posts sorted by pinPosts then mainPosts & date */}
              <HomepageStories pinPosts={homepagePinPosts} />
            </div>
          </div>
        </>
      </Main>
      {/* <Footer /> */}
    </>
  )
}

Component.query = gql`
  ${BlogInfoFragment}
  ${PostFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
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
    $first2: Int = 5
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      uri
      seo {
        title
        metaDesc
      }
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
            ...PostFragment
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
            ...PostFragment
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
            ...PostFragment
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
            ...PostFragment
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
            ...PostFragment
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
    posts(first: $first2, where: { status: PUBLISH }) {
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
    editorials(first: $first2, where: { status: PUBLISH }) {
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
    updates(first: $first2, where: { status: PUBLISH }) {
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
      first: 15
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    secondHeaderMenuItems: menuItems(
      where: { location: $secondHeaderLocation }
      first: 15
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
