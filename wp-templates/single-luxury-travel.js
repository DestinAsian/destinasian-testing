import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { GetMenus } from '../queries/GetMenus'
import { GetFooterMenus } from '../queries/GetFooterMenus'
import { GetLatestStories } from '../queries/GetLatestStories'
import {
  eb_garamond,
  poppins,
  rubik,
  rubik_mono_one,
} from '../styles/fonts/fonts'
import Cookies from 'js-cookie'
import { GetLatestRCA } from '../queries/GetLatestRCA'
import dynamic from 'next/dynamic'
// Import Components
const Header = dynamic(() => import('@/components/Header/Header'))
const SecondaryHeader = dynamic(() =>
  import('@/components/Header/SecondaryHeader/SecondaryHeader'),
)
const SingleLTContainer = dynamic(() =>
  import('@/components/SingleLTContainer/SingleLTContainer'),
)
const SingleAdvertorialEntryHeader = dynamic(() =>
  import(
    '@/components/SingleAdvertorialEntryHeader/SingleAdvertorialEntryHeader'
  ),
)
const Main = dynamic(() => import('@/components/Main/Main'))
const ContentWrapperAdvertorial = dynamic(() =>
  import('@/components/ContentWrapperAdvertorial/ContentWrapperAdvertorial'),
)
const LuxuryTravelStories = dynamic(() =>
  import('@/components/LuxuryTravelStories/LuxuryTravelStories'),
)
const LuxuryTravelDirectory = dynamic(() =>
  import('@/components/LuxuryTravelDirectory/LuxuryTravelDirectory'),
)
const TabsEditor = dynamic(() => import('@/components/TabsEditor/TabsEditor'))
const SingleAdvertorialSlider = dynamic(() =>
  import('@/components/SingleAdvertorialSlider/SingleAdvertorialSlider'),
)
const BackToTop = dynamic(() => import('@/components/BackToTop/BackToTop'))
const PasswordProtected = dynamic(() =>
  import('@/components/PasswordProtected/PasswordProtected'),
)
const Footer = dynamic(() => import('@/components/Footer/Footer'))

export default function SingleLuxuryTravel(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const [enteredPassword, setEnteredPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for stored password in cookies on mount
  useEffect(() => {
    const storedPassword = Cookies.get('luxuryTravelPassword')
    if (
      storedPassword &&
      storedPassword === props?.data?.luxuryTravel?.passwordProtected?.password
    ) {
      setIsAuthenticated(true)
    }
  }, [props?.data?.luxuryTravel?.passwordProtected?.password])

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
    passwordProtected,
  } = props?.data?.luxuryTravel

  // Search function content
  const [searchQuery, setSearchQuery] = useState('')
  // Scrolled Function
  const [isScrolled, setIsScrolled] = useState(false)
  // NavShown Function
  const [isSearchBarShown, setIsSearchBarShown] = useState(false)
  const [isNavShown, setIsNavShown] = useState(false)
  const [isGuidesNavShown, setIsGuidesNavShown] = useState(false)
  const [isRCANavShown, setIsRCANavShown] = useState(false)
  const [isMagNavShown, setIsMagNavShown] = useState(false)
  const [isBurgerNavShown, setIsBurgerNavShown] = useState(false)

  // Stop scrolling pages when searchQuery
  useEffect(() => {
    if (searchQuery !== '') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [searchQuery])

  // Add sticky header on scroll
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Stop scrolling pages when isNavShown
  useEffect(() => {
    if (isNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isNavShown])

  // Stop scrolling pages when isSearchBarShown
  useEffect(() => {
    if (isSearchBarShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isSearchBarShown])

  // Stop scrolling pages when isMagNavShown
  useEffect(() => {
    if (isMagNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isMagNavShown])

  // Stop scrolling pages when isRCANavShown
  useEffect(() => {
    if (isRCANavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isRCANavShown])

  // Stop scrolling pages when isGuidesNavShown
  useEffect(() => {
    if (isGuidesNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isGuidesNavShown])

  // Stop scrolling pages when isBurgerNavShown
  useEffect(() => {
    if (isBurgerNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isBurgerNavShown])

  const { data: rcaData } = useQuery(GetLatestRCA, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  const [latestRCA, setLatestRCA] = useState(null)

  useEffect(() => {
    if (rcaData?.readersChoiceAwards?.edges) {
      // Find the first RCA where parent is null
      const filteredRCA = rcaData.readersChoiceAwards.edges.find(
        (edge) => !edge.node.parent,
      )?.node
      setLatestRCA(filteredRCA || null)
    }
  }, [rcaData]) // Runs whenever rcaData changes

  const {
    // title: rcaTitle,
    databaseId: rcaDatabaseId,
    uri: rcaUri,
  } = latestRCA ?? []

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
      first: 30,
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
        first: 100,
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

  const posts = latestStories?.posts ?? []
  const editorials = latestStories?.editorials ?? []
  const updates = latestStories?.updates ?? []

  const mainPosts =
    posts?.edges
      ?.filter((post) => !post.node?.passwordProtected?.onOff)
      .map((post) => post.node) ?? []

  const mainEditorialPosts =
    editorials?.edges
      ?.filter((post) => !post.node?.passwordProtected?.onOff)
      .map((post) => post.node) ?? []

  const mainUpdatesPosts =
    updates?.edges
      ?.filter((post) => !post.node?.passwordProtected?.onOff)
      .map((post) => post.node) ?? []

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

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (enteredPassword === passwordProtected?.password) {
      setIsAuthenticated(true)
      Cookies.set('luxuryTravelPassword', enteredPassword, { expires: 1 }) // Set cookie to expire in 1 day
    } else {
      alert('Incorrect password. Please try again.')
    }
  }

  if (passwordProtected?.onOff && !isAuthenticated) {
    return (
      <main
        className={`${eb_garamond.variable} ${poppins.variable} ${rubik.variable}`}
      >
        <form onSubmit={handlePasswordSubmit}>
          <PasswordProtected
            enteredPassword={enteredPassword}
            setEnteredPassword={setEnteredPassword}
            title={seo?.title}
            description={seo?.metaDesc}
            imageUrl={featuredImage?.node?.sourceUrl}
            url={uri}
            focuskw={seo?.focuskw}
          />
        </form>
      </main>
    )
  }

  return (
    <main
      className={`${eb_garamond.variable} ${poppins.variable} ${rubik.variable} bg-[--wpe--color--teal]`}
    >
      <Header isScrolled={isScrolled} customClassName={'luxury-travel'} />
      <SecondaryHeader
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
        fourthMenuItems={fourthMenu}
        fifthMenuItems={fifthMenu}
        featureMenuItems={featureMenu}
        latestStories={allPosts}
        menusLoading={menusLoading}
        latestLoading={latestLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        rcaDatabaseId={rcaDatabaseId}
        rcaUri={rcaUri}
        isSearchBarShown={isSearchBarShown}
        setIsSearchBarShown={setIsSearchBarShown}
        isMagNavShown={isMagNavShown}
        setIsMagNavShown={setIsMagNavShown}
        isGuidesNavShown={isGuidesNavShown}
        setIsGuidesNavShown={setIsGuidesNavShown}
        isRCANavShown={isRCANavShown}
        setIsRCANavShown={setIsRCANavShown}
        isBurgerNavShown={isBurgerNavShown}
        setIsBurgerNavShown={setIsBurgerNavShown}
        isScrolled={isScrolled}
        customClassName={'luxury-travel'}
      />
      <Main className="mt-[-0.75rem] sm:mt-[-1rem]">
        <>
          <SingleLTContainer>
            <div className=" bg-[#dbf2f1] sm:top-[4.5rem]">
              <section className="relative" data-id="section1">
                <div className=" bg-[#dbf2f1]">
                  <SingleAdvertorialSlider
                    images={images?.map((image) => image[0])}
                  />
                  <SingleAdvertorialEntryHeader
                    title={title}
                    label={acfAdvertorialLabel?.advertorialLabel}
                    // luxuryTravelClass={'luxuryTravelClass'}
                  />
                </div>
              </section>
              {content && (
                <section
                  className="relative pt-4 sm:pt-6"
                  data-id="section2"
                  id="section2"
                >
                  <div className="">
                    <div className="sm:h-fit">
                      <ContentWrapperAdvertorial
                        content={content}
                        luxuryTravelClass={'luxuryTravelClass'}
                      />
                    </div>
                  </div>
                </section>
              )}
              {(tabsEditor?.tabTitle1 && tabsEditor?.tab1) !== null && (
                <section className="relative pt-4 sm:pt-6" data-id="section3">
                  <div className=" bg-[#dbf2f1] pt-[3.5rem] sm:pt-0">
                    <div className="sm:h-fit">
                      <TabsEditor
                        tabsEditor={tabsEditor}
                        // luxuryTravelClass={'luxuryTravelClass'}
                      />
                    </div>
                  </div>
                </section>
              )}
              {(luxuryTravelPinPosts?.pinPosts?.length &&
                luxuryTravelPinPosts?.moreStories?.length) !== 0 && (
                <section className="relative pt-4 sm:pt-6" data-id="section4">
                  <div className=" bg-[#dbf2f1]">
                    <LuxuryTravelStories
                      luxuryTravelId={databaseId}
                      name={title}
                      parent={parent?.node?.title}
                      luxuryTravelPinPosts={luxuryTravelPinPosts}
                      pinPostsTitle={luxuryTravelPinPosts?.pinPostsTitle}
                    />
                  </div>
                </section>
              )}
              {luxuryTravelDirectory?.directory && (
                <section className="relative pt-4 sm:pt-6" data-id="section5">
                  <div className=" bg-[#dbf2f1]">
                    <LuxuryTravelDirectory
                      content={luxuryTravelDirectory?.directory}
                      parent={parent?.node?.title}
                      isAdvertorial={false}
                    />
                  </div>
                </section>
              )}
              <section
                className="pb-e relative pt-4 sm:pt-6"
                data-id="section6"
              >
                <div className=" bg-[#ffffff]">
                  <BackToTop />
                </div>
              </section>
              <section className="relative pb-0" data-id="section7">
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
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    luxuryTravel(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      databaseId
      content
      date
      passwordProtected {
        onOff
        password
      }
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
          ... on Video {
            id
            contentTypeName
            title
            content
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
            videosAcf {
              videoLink
              guidesCategoryLink
              guidesCategoryText
              customLink
              customText
            }
          }
        }
        moreStories {
          ... on Post {
            id
            uri
            contentTypeName
            title
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
          ... on Video {
            id
            contentTypeName
            title
            content
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
            videosAcf {
              videoLink
              guidesCategoryLink
              guidesCategoryText
              customLink
              customText
            }
          }
        }
      }
    }
  }
`

SingleLuxuryTravel.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}
