import { gql, useQuery } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  SingleHeader,
  SingleLuxuryTravelHeader,
  Footer,
  Main,
  SingleAdvertorialContainer,
  SingleAdvertorialEntryHeader,
  FeaturedImage,
  SEO,
  ContentWrapperAdvertorial,
  LuxuryTravelStories,
  LuxuryTravelDirectory,
  TabsEditor,
  SingleLLSlider,
  SingleLTSlider,
} from '../components'
import { GetMenus } from '../queries/GetMenus'
import { GetFooterMenus } from '../queries/GetFooterMenus'
import { GetLatestStories } from '../queries/GetLatestStories'
import { eb_garamond, rubik, rubik_mono_one } from '../styles/fonts/fonts'
import React, { useEffect, useRef, useState } from 'react'

export default function SingleLuxuryTravel(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings
  const {
    title,
    databaseId,
    content,
    parent,
    featuredImage,
    acfPostSlider,
    acfAdvertorialLabel,
    seo,
    uri,
    luxuryTravelPinPosts,
    luxuryTravelDirectory,
    tabsEditor,
  } = props?.data?.luxuryTravel

  const [visibleComponent, setVisibleComponent] = useState(null)
  const sliderLL = useRef(null)
  const [isSliderMounted, setIsSliderMounted] = useState(false) // Track slider mount status

  // Get menus
  const { data: menusData, loading: menusLoading } = useQuery(GetMenus, {
    variables: {
      first: 20,
      headerLocation: MENUS.PRIMARY_LOCATION,
      secondHeaderLocation: MENUS.SECONDARY_LOCATION,
      thirdHeaderLocation: MENUS.THIRD_LOCATION,
      fourthHeaderLocation: MENUS.FOURTH_LOCATION,
      fifthHeaderLocation: MENUS.FIFTH_LOCATION,
      featureHeaderLocation: MENUS.FEATURE_LOCATION,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  // Header Menu
  const primaryMenu = menusData?.headerMenuItems?.nodes ?? []
  const secondaryMenu = menusData?.secondHeaderMenuItems?.nodes ?? []
  const thirdMenu = menusData?.thirdHeaderMenuItems?.nodes ?? []
  const fourthMenu = menusData?.fourthHeaderMenuItems?.nodes ?? []
  const fifthMenu = menusData?.fifthHeaderMenuItems?.nodes ?? []
  const featureMenu = menusData?.featureHeaderMenuItems?.nodes ?? []

  // Get Footer menus
  const { data: footerMenusData, loading: footerMenusLoading } = useQuery(
    GetFooterMenus,
    {
      variables: {
        first: 50,
        footerHeaderLocation: MENUS.FOOTER_LOCATION,
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    },
  )

  // Footer Menu
  const footerMenu = footerMenusData?.footerHeaderMenuItems?.nodes ?? []

  // Get latest travel stories
  const { data: latestStories, loading: latestLoading } = useQuery(
    GetLatestStories,
    {
      variables: {
        first: 5,
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    },
  )

  // Function to check if a section is in view
  const handleScroll = () => {
    const sections = document.querySelectorAll('.snap-section')
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        setVisibleComponent(section.dataset.id)
      }
    })
  }

  // Attach the scroll listener when component mounts
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-snap-container')
    scrollContainer.addEventListener('scroll', handleScroll)

    // Clean up event listener on unmount
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const posts = latestStories?.posts ?? []
  const editorials = latestStories?.editorials ?? []
  const updates = latestStories?.updates ?? []

  const mainPosts = []
  const mainEditorialPosts = []
  const mainUpdatesPosts = []

  // loop through all the main categories posts
  posts?.edges?.forEach((post) => {
    mainPosts.push(post.node)
  })

  // loop through all the main categories and their posts
  editorials?.edges?.forEach((post) => {
    mainEditorialPosts.push(post.node)
  })

  // loop through all the main categories and their posts
  updates?.edges?.forEach((post) => {
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

  const images = [
    [
      acfPostSlider.slide1 != null ? acfPostSlider.slide1.mediaItemUrl : null,
      acfPostSlider.slideCaption1 != null ? acfPostSlider.slideCaption1 : null,
    ],
    [
      acfPostSlider.slide2 != null ? acfPostSlider.slide2.mediaItemUrl : null,
      acfPostSlider.slideCaption2 != null ? acfPostSlider.slideCaption2 : null,
    ],
    [
      acfPostSlider.slide3 != null ? acfPostSlider.slide3.mediaItemUrl : null,
      acfPostSlider.slideCaption3 != null ? acfPostSlider.slideCaption3 : null,
    ],
    [
      acfPostSlider.slide4 != null ? acfPostSlider.slide4.mediaItemUrl : null,
      acfPostSlider.slideCaption4 != null ? acfPostSlider.slideCaption4 : null,
    ],
    [
      acfPostSlider.slide5 != null ? acfPostSlider.slide5.mediaItemUrl : null,
      acfPostSlider.slideCaption5 != null ? acfPostSlider.slideCaption5 : null,
    ],
  ]

  return (
    <main
      className={`${eb_garamond.variable} ${rubik_mono_one.variable} ${rubik.variable}`}
    >
      <SEO />
      <SingleLuxuryTravelHeader
        title={siteTitle}
        description={siteDescription}
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
        fourthMenuItems={fourthMenu}
        fifthMenuItems={fifthMenu}
        featureMenuItems={featureMenu}
        latestStories={allPosts}
        menusLoading={menusLoading}
        latestLoading={latestLoading}
        visibleComponent={visibleComponent}
      />
      <Main>
        <>
          <SingleAdvertorialContainer>
            <div
              className="scroll-snap-container relative top-[3.5rem] h-screen w-screen snap-y snap-mandatory overflow-y-scroll sm:top-[4.5rem]"
              onScroll={handleScroll}
            >
              <section
                className="snap-section relative snap-start snap-always overflow-y-scroll sm:left-[50vw] sm:h-[20vh] sm:w-[50vw]"
                data-id="section1"
              >
                <div className="overflow-hidden sm:fixed sm:bottom-0 sm:right-[50vw] sm:top-[4.5rem] sm:h-screen sm:w-[50vw]">
                  <SingleLTSlider
                    images={images?.map((image) => image[0])}
                    captions={images?.map((caption) => caption[1])}
                    // parent={parent?.node?.title}
                    // nextUri={nextUri}
                    sliderLL={sliderLL}
                    isSliderMounted={isSliderMounted}
                    setIsSliderMounted={setIsSliderMounted}
                  />
                </div>
                <div className="overflow-y-scroll sm:fixed sm:bottom-0 sm:left-[50vw] sm:top-[4.5rem] sm:w-[50vw]">
                  <div className="sm:h-fit sm:px-8 sm:pb-[4.5rem]">
                    <SingleAdvertorialEntryHeader
                      title={title}
                      label={acfAdvertorialLabel?.advertorialLabel}
                      luxuryClass={'luxuryClass'}
                    />
                    <ContentWrapperAdvertorial content={content} />
                    {(tabsEditor?.tabTitle1 && tabsEditor?.tab1) !== null && (
                      <TabsEditor tabsEditor={tabsEditor} />
                    )}
                  </div>
                </div>
              </section>
              <section
                className="snap-section relative snap-start snap-always sm:pt-[100vh]"
                data-id="section2"
              >
                <div className="overflow-y-scroll bg-[#f5f5f5]">
                  <div className="bg-green">
                    <LuxuryTravelStories
                      luxuryTravelId={databaseId}
                      parent={parent?.node?.title}
                      luxuryTravelPinPosts={luxuryTravelPinPosts}
                    />
                  </div>
                </div>
              </section>
              <section
                className="snap-section relative snap-start snap-always"
                data-id="section3"
              >
                <div className="overflow-y-scroll bg-[#f5f5f5]">
                  <div className="bg-green">
                    <LuxuryTravelDirectory
                      content={luxuryTravelDirectory?.directory}
                      parent={parent?.node?.title}
                    />
                  </div>
                </div>
              </section>
              <section
                className="snap-section relative snap-start snap-always pb-[3.5rem]"
                data-id="section4"
              >
                <Footer footerMenu={footerMenu} />
              </section>
            </div>
          </SingleAdvertorialContainer>
        </>
      </Main>
    </main>
  )
}

SingleLuxuryTravel.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    luxuryTravel(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      databaseId
      content
      date
      tabsEditor {
        tab1
        tab2
        tabTitle1
        tabTitle2
      }
      parent {
        node {
          ... on LuxuryTravel {
            title
          }
        }
      }
      ...FeaturedImageFragment
      author {
        node {
          name
        }
      }
      seo {
        title
        metaDesc
        focuskw
      }
      uri
      acfAdvertorialLabel {
        advertorialLabel
      }
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
        slideCaption1
        slideCaption2
        slideCaption3
        slideCaption4
        slideCaption5
      }
      luxuryTravelDirectory {
        directory
      }
      luxuryTravelPinPosts {
        pinPosts {
          ... on Post {
            id
            uri
            contentTypeName
            title
            content
            date
            excerpt
            featuredImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            categories(where: { childless: true }) {
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
              chooseIcon {
                mediaItemUrl
              }
            }
            acfLocationIcon {
              fieldGroupName
              locationLabel
              locationUrl
            }
          }
          ... on Editorial {
            id
            uri
            contentTypeName
            title
            content
            date
            excerpt
            featuredImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
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
          ... on Update {
            id
            uri
            contentTypeName
            title
            content
            date
            excerpt
            featuredImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
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
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
          ... on HonorsCircle {
            id
            uri
            contentTypeName
            title
            excerpt
            contentType {
              node {
                label
              }
            }
            featuredImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
        moreStories {
          ... on Post {
            id
            uri
            contentTypeName
            title
            content
            date
            excerpt
            categories(where: { childless: true }) {
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
              chooseIcon {
                mediaItemUrl
              }
            }
            acfLocationIcon {
              fieldGroupName
              locationLabel
              locationUrl
            }
          }
          ... on Editorial {
            id
            uri
            contentTypeName
            title
            content
            date
            excerpt
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
          ... on Update {
            id
            uri
            contentTypeName
            title
            content
            date
            excerpt
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
            uri
            contentTypeName
            title
            excerpt
          }
          ... on HonorsCircle {
            id
            uri
            contentTypeName
            title
            excerpt
            contentType {
              node {
                label
              }
            }
          }
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
  }
`

SingleLuxuryTravel.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}
