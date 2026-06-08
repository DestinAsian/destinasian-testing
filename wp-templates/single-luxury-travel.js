import React, { useEffect, useState, useRef } from 'react'
import { gql, useQuery } from '@apollo/client'
import * as MENUS from '@/constants/menus'
import { HEADER_NAV_INITIAL_STATE } from '@/constants/headerConfig'
import { GetMenus } from '@/queries/GetMenus'
import { GetLatestStories } from '@/queries/GetLatestStories'
import { poppins, rubik } from '@/styles/fonts/fonts'
import Cookies from 'js-cookie'
import { GetLatestRCA } from '@/queries/GetLatestRCA'
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
const SingleFeaturedImage = dynamic(() =>
  import('@/components/SingleFeaturedImage/SingleFeaturedImage'),
)
const SingleSlider = dynamic(() =>
  import('@/components/SingleSlider/SingleSlider'),
)
const BackToTop = dynamic(() => import('@/components/BackToTop/BackToTop'))
const PasswordProtected = dynamic(() =>
  import('@/components/PasswordProtected/PasswordProtected'),
)
const Footer = dynamic(() => import('@/components/Footer/Footer'))

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const [enteredPassword, setEnteredPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for stored auth flag in cookies on mount
  useEffect(() => {
    const contentDatabaseId = props?.data?.luxuryTravel?.databaseId
    if (!contentDatabaseId) return

    const storedAuth = Cookies.get(`pp-${contentDatabaseId}`)
    if (storedAuth === '1') {
      setIsAuthenticated(true)
    }
  }, [props?.data?.luxuryTravel?.databaseId])

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
  const [isSearchBarShown, setIsSearchBarShown] = useState(
    HEADER_NAV_INITIAL_STATE.isSearchBarShown,
  )
  const [isMagNavShown, setIsMagNavShown] = useState(
    HEADER_NAV_INITIAL_STATE.isMagNavShown,
  )
  const [isGuidesNavShown, setIsGuidesNavShown] = useState(
    HEADER_NAV_INITIAL_STATE.isGuidesNavShown,
  )
  const [isHCNavShown, setIsHCNavShown] = useState(
    HEADER_NAV_INITIAL_STATE.isHCNavShown,
  )
  const [isCustomNavShown, setIsCustomNavShown] = useState(
    HEADER_NAV_INITIAL_STATE.isCustomNavShown,
  )
  const [isBurgerNavShown, setIsBurgerNavShown] = useState(
    HEADER_NAV_INITIAL_STATE.isBurgerNavShown,
  )

  const burgerButtonRef = useRef(null)

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

  // Stop scrolling pages when isHCNavShown
  useEffect(() => {
    if (isHCNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isHCNavShown])

  // Stop scrolling pages when isCustomNavShown
  useEffect(() => {
    if (isCustomNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isCustomNavShown])

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
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
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
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
  })

  // Header Menu
  const primaryMenu = menusData?.headerMenuItems?.nodes ?? []
  const secondaryMenu = menusData?.secondHeaderMenuItems?.nodes ?? []
  const thirdMenu = menusData?.thirdHeaderMenuItems?.nodes ?? []
  const fourthMenu = menusData?.fourthHeaderMenuItems?.nodes ?? []
  const fifthMenu = menusData?.fifthHeaderMenuItems?.nodes ?? []
  const featureMenu = menusData?.featureHeaderMenuItems?.nodes ?? []

  // Get latest travel stories
  const { data: latestStories, loading: latestLoading } = useQuery(
    GetLatestStories,
    {
      variables: {
        first: 5,
      },
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'network-only',
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
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    const contentType = Object.keys(props?.data || {}).find(
      (key) => props?.data?.[key]?.passwordProtected,
    )
    const contentDatabaseId = contentType
      ? props?.data?.[contentType]?.databaseId
      : null

    if (!contentType || !contentDatabaseId || !enteredPassword) {
      alert('Incorrect password. Please try again.')
      return
    }

    try {
      const response = await fetch('/api/verify-content-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType,
          databaseId: contentDatabaseId,
          password: enteredPassword,
        }),
      })

      const payload = await response.json()

      if (response.ok && payload?.valid) {
        setIsAuthenticated(true)
        Cookies.set(`pp-${contentDatabaseId}`, '1', {
          expires: 1,
          sameSite: 'Lax',
        })
        return
      }
    } catch (error) {
      console.error('Password verification failed:', error)
    }

    alert('Incorrect password. Please try again.')
  }

  if (passwordProtected?.onOff && !isAuthenticated) {
    return (
      <main className={`${poppins.variable} ${rubik.variable}`}>
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
      className={`${poppins.variable} ${rubik.variable} bg-[--wpe--color--light--yellow]`}
    >
      <Header
        isScrolled={isScrolled}
        isBurgerNavShown={isBurgerNavShown}
        setIsBurgerNavShown={setIsBurgerNavShown}
        isSearchBarShown={isSearchBarShown}
        setIsSearchBarShown={setIsSearchBarShown}
        isGuidesNavShown={isGuidesNavShown}
        setIsGuidesNavShown={setIsGuidesNavShown}
        isMagNavShown={isMagNavShown}
        setIsMagNavShown={setIsMagNavShown}
        isCustomNavShown={isCustomNavShown}
        setIsCustomNavShown={setIsCustomNavShown}
        isHCNavShown={isHCNavShown}
        setIsHCNavShown={setIsHCNavShown}
        setSearchQuery={setSearchQuery}
        customClassName={
          parent?.node?.title?.toLowerCase().includes('spotlight')
            ? 'luxury-travel-spotlight'
            : 'luxury-travel'
        }
        burgerButtonRef={burgerButtonRef}
      />
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
        isHCNavShown={isHCNavShown}
        setIsHCNavShown={setIsHCNavShown}
        isCustomNavShown={isCustomNavShown}
        setIsCustomNavShown={setIsCustomNavShown}
        isBurgerNavShown={isBurgerNavShown}
        setIsBurgerNavShown={setIsBurgerNavShown}
        isScrolled={isScrolled}
        customClassName={
          parent?.node?.title?.toLowerCase().includes('spotlight')
            ? 'luxury-travel-spotlight'
            : 'luxury-travel'
        }
        burgerButtonRef={burgerButtonRef}
      />
      <Main className="mt-[-0.75rem] sm:mt-[-1rem]">
        <>
          <SingleLTContainer>
            <div
              className={
                parent?.node?.title?.toLowerCase().includes('spotlight')
                  ? ' bg-[#f5f5f5] sm:top-[4.5rem]'
                  : ' bg-[#fdf5e0] sm:top-[4.5rem]'
              }
            >
              <section className="relative" data-id="section1">
                <div
                  className={
                    parent?.node?.title?.toLowerCase().includes('spotlight')
                      ? ' bg-[#f5f5f5]'
                      : ' bg-[#fdf5e0]'
                  }
                >
                  <SingleFeaturedImage
                    image={featuredImage?.node}
                    customClassName={'luxury-travel'}
                  />
                  <SingleAdvertorialEntryHeader
                    title={title}
                    label={acfAdvertorialLabel?.advertorialLabel}
                    customClassName={
                      parent?.node?.title?.toLowerCase().includes('spotlight')
                        ? 'luxury-travel-spotlight'
                        : 'luxury-travel'
                    }
                  />
                </div>
              </section>
              {content && (
                <section
                  className="relative pt-4 lg:mx-auto lg:max-w-[800px] lg:pt-0"
                  data-id="section2"
                  id="section2"
                >
                  <div
                    className={
                      parent?.node?.title?.toLowerCase().includes('spotlight')
                        ? ' bg-[#f5f5f5]'
                        : ' bg-[#fdf5e0]'
                    }
                  >
                    <div className="w-full lg:h-fit lg:px-4">
                      <SingleSlider
                        images={images?.map((image) => image[0])}
                        customClassName={'luxury-travel'}
                      />
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
                  <div
                    className={
                      parent?.node?.title?.toLowerCase().includes('spotlight')
                        ? ' bg-[#f5f5f5] pt-[3.5rem] sm:pt-0'
                        : ' bg-[#fdf5e0] pt-[3.5rem] sm:pt-0'
                    }
                  >
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
                  <div
                    className={
                      parent?.node?.title?.toLowerCase().includes('spotlight')
                        ? ' bg-[#f5f5f5]'
                        : ' bg-[#fdf5e0]'
                    }
                  >
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
                  <div
                    className={
                      parent?.node?.title?.toLowerCase().includes('spotlight')
                        ? ' bg-[#f5f5f5]'
                        : ' bg-[#fdf5e0]'
                    }
                  >
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
                <Footer />
              </section>
            </div>
          </SingleLTContainer>
        </>
      </Main>
    </main>
  )
}

Component.query = gql`
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    luxuryTravel(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      id
      title
      databaseId
      content
      date
      passwordProtected {
        onOff
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

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}
