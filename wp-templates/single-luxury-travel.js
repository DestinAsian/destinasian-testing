import { gql, useQuery } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  SingleLuxuryTravelHeader,
  Footer,
  Main,
  SingleLTContainer,
  SingleAdvertorialEntryHeader,
  FeaturedImage,
  SEO,
  ContentWrapperAdvertorial,
  LuxuryTravelStories,
  LuxuryTravelDirectory,
  TabsEditor,
  SingleAdvertorialSlider,
  BackToTop,
} from '../components'
import { GetMenus } from '../queries/GetMenus'
import { GetFooterMenus } from '../queries/GetFooterMenus'
import { GetLatestStories } from '../queries/GetLatestStories'
import { eb_garamond, rubik, rubik_mono_one } from '../styles/fonts/fonts'
import React, { useEffect, useState } from 'react'

export default function SingleLuxuryTravel(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const [isNavShown, setIsNavShown] = useState(false)

  // Stop scrolling pages when isNavShown
  useEffect(() => {
    if (isNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isNavShown])

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
  // const sliderLL = useRef(null)
  // const [isSliderMounted, setIsSliderMounted] = useState(false) // Track slider mount status

  // // scroll to section button
  // const scrollToSection2 = useCallback(() => {
  //   const section = document.querySelector('[data-id="section2"]')
  //   if (section) {
  //     section.scrollIntoView({ behavior: 'smooth' })
  //   }
  // }, [])

  // // scroll to section button
  // const scrollToSection3 = useCallback(() => {
  //   const section = document.querySelector('[data-id="section3"]')
  //   if (section) {
  //     section.scrollIntoView({ behavior: 'smooth' })
  //   }
  // }, [])

  const [directoryTitle, setDirectoryTitle] = useState('')
  // Function to extract directory title from HTML string
  useEffect(() => {
    const extractDirectoryTitle = () => {
      // Create a DOMParser
      const parser = new DOMParser()
      // Parse the HTML content
      const doc = parser.parseFromString(
        luxuryTravelDirectory?.directory,
        'text/html',
      )

      // Use querySelector to find the element with the class "directory-title"
      const directoryTitleElement = doc.querySelector('.directory-title')

      // Extract the content inside the element
      const directoryTitle = directoryTitleElement
        ? directoryTitleElement?.textContent?.trim()
        : null

      // // Set the transformed HTML content
      setDirectoryTitle(directoryTitle)
    }

    // Call the function to extract image data and replace <img>
    extractDirectoryTitle()
  }, [luxuryTravelDirectory?.directory])

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
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={featuredImage?.node?.sourceUrl}
        url={uri}
        focuskw={seo?.focuskw}
      />
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
        isNavShown={isNavShown}
        setIsNavShown={setIsNavShown}
        visibleComponent={visibleComponent}
      />
      <Main>
        <>
          <SingleLTContainer>
            <div
              className="scroll-snap-container relative h-screen w-screen snap-y snap-mandatory overflow-y-scroll bg-[#dbf2f1] sm:top-[4.5rem]"
              onScroll={handleScroll}
            >
              <section
                className="sm:snap-section relative pt-[3.5rem] sm:snap-start sm:snap-always sm:pt-0"
                data-id="section1"
              >
                <div className="overflow-y-scroll bg-[#dbf2f1]">
                  <SingleAdvertorialSlider
                    images={images?.map((image) => image[0])}
                    // captions={images?.map((caption) => caption[1])}
                    // // parent={parent?.node?.title}
                    // // nextUri={nextUri}
                    // slidersLL={sliderLL}
                    // isSliderMounted={isSliderMounted}
                    // setIsSliderMounted={setIsSliderMounted}
                  />
                  <SingleAdvertorialEntryHeader
                    title={title}
                    label={acfAdvertorialLabel?.advertorialLabel}
                    // luxuryTravelClass={'luxuryTravelClass'}
                  />
                  {/* <div className="hidden sm:fixed sm:bottom-0 sm:left-[50vw] sm:flex sm:min-h-16 sm:w-[50vw] sm:items-center sm:justify-between sm:bg-[#000000]">
                  <button
                    onClick={scrollToSection2}
                    aria-label="Scroll to Section 2"
                    className="h-full min-h-full w-1/2 p-[1rem] text-left"
                  >
                    {luxuryTravelPinPosts?.pinPostsTitle && (
                      <span className="uppercase text-[#ffffff]">
                        {luxuryTravelPinPosts?.pinPostsTitle}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={scrollToSection3}
                    aria-label="Scroll to Section 3"
                    className="h-full min-h-full w-1/2 p-[1rem] text-left"
                  >
                    {directoryTitle && (
                      <span className="uppercase text-[#ffffff]">
                        {directoryTitle}
                      </span>
                    )}
                  </button>
                </div> */}
                </div>
              </section>
              <section
                className="sm:snap-section relative sm:snap-start sm:snap-always sm:pt-[4.5rem]"
                data-id="section2"
                id="section2"
              >
                <div className="overflow-y-scroll">
                  <div className="sm:h-fit">
                    <ContentWrapperAdvertorial
                      content={content}
                      luxuryTravelClass={'luxuryTravelClass'}
                    />
                  </div>
                </div>
              </section>
              <section
                className="sm:snap-section relative sm:snap-start sm:snap-always sm:pt-[4.5rem]"
                data-id="section3"
              >
                <div className="overflow-y-scroll bg-[#dbf2f1] pt-[3.5rem] sm:pt-0">
                  <div className="sm:h-fit">
                    {(tabsEditor?.tabTitle1 && tabsEditor?.tab1) !== null && (
                      <TabsEditor
                        tabsEditor={tabsEditor}
                        // luxuryTravelClass={'luxuryTravelClass'}
                      />
                    )}
                  </div>
                </div>
              </section>
              <section
                className="sm:snap-section relative sm:snap-start sm:snap-always sm:pt-[4.5rem]"
                data-id="section4"
              >
                <div className="overflow-y-scroll bg-[#dbf2f1]">
                  <LuxuryTravelStories
                    luxuryTravelId={databaseId}
                    parent={parent?.node?.title}
                    luxuryTravelPinPosts={luxuryTravelPinPosts}
                    pinPostsTitle={luxuryTravelPinPosts?.pinPostsTitle}
                  />
                </div>
              </section>
              <section
                className="sm:snap-section relative sm:snap-start sm:snap-always sm:pt-[4.5rem]"
                data-id="section5"
              >
                <div className="overflow-y-scroll bg-[#dbf2f1]">
                  <LuxuryTravelDirectory
                    content={luxuryTravelDirectory?.directory}
                    parent={parent?.node?.title}
                    isAdvertorial={false}
                  />
                </div>
              </section>
              <section
                className="sm:snap-section relative pb-0 sm:snap-start sm:snap-always sm:pt-[4.5rem]"
                data-id="section6"
              >
                <div className="overflow-y-scroll bg-[#ffffff]">
                  <BackToTop />
                </div>
              </section>
              <section
                className="sm:snap-section relative pb-0 sm:snap-start sm:snap-always"
                data-id="section7"
              >
                <Footer footerMenu={footerMenu} />
              </section>
            </div>
          </SingleLTContainer>
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
        pinPostsTitle
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
