import React, { useEffect, useState, useRef } from 'react'
import { gql, useQuery } from '@apollo/client'
import * as MENUS from '@/constants/menus'
import { GetMenus } from '@/queries/GetMenus'
import { GetLatestStories } from '@/queries/GetLatestStories'
import { eb_garamond, poppins, rubik } from '@/styles/fonts/fonts'
import Cookies from 'js-cookie'
import { GetLatestRCA } from '@/queries/GetLatestRCA'
import dynamic from 'next/dynamic'
// Import Components
const Header = dynamic(() => import('@/components/Header/Header'))
const SecondaryHeader = dynamic(() =>
  import('@/components/Header/SecondaryHeader/SecondaryHeader'),
)
const SingleTGContainer = dynamic(() =>
  import('@/components/SingleTGContainer/SingleTGContainer'),
)
const SingleTGFeaturedImage = dynamic(() =>
  import('@/components/SingleTGFeaturedImage/SingleTGFeaturedImage'),
)
const Main = dynamic(() => import('@/components/Main/Main'))
const ContentWrapperTG = dynamic(() =>
  import('@/components/ContentWrapperTG/ContentWrapperTG'),
)
const PasswordProtected = dynamic(() =>
  import('@/components/PasswordProtected/PasswordProtected'),
)

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const [enteredPassword, setEnteredPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for stored password in cookies on mount
  useEffect(() => {
    const storedPassword = Cookies.get('travelGuidePassword')
    if (
      storedPassword &&
      storedPassword === props?.data?.travelGuide?.passwordProtected?.password
    ) {
      setIsAuthenticated(true)
    }
  }, [props?.data?.travelGuide?.passwordProtected?.password])

  const {
    title,
    content,
    featuredImage,
    acfPostSlider,
    children,
    parent,
    seo,
    uri,
    databaseId,
    travelGuidesLogo,
    categories,
    passwordProtected,
  } = props?.data?.travelGuide

  // Search function content
  const [searchQuery, setSearchQuery] = useState('')
  // Scrolled Function
  const [isScrolled, setIsScrolled] = useState(false)
  // NavShown Function
  const [isSearchBarShown, setIsSearchBarShown] = useState(false)
  const [isNavShown, setIsNavShown] = useState(false)
  const [isTGNavShown, setIsTGNavShown] = useState(false)
  const [isGuidesNavShown, setIsGuidesNavShown] = useState(false)
  const [isHCNavShown, setIsHCNavShown] = useState(false)
  const [isCustomNavShown, setIsCustomNavShown] = useState(false)
  const [isMagNavShown, setIsMagNavShown] = useState(false)
  const [isBurgerNavShown, setIsBurgerNavShown] = useState(false)

  // Slider Autoplay state
  const sliderTG = useRef(null)
  // const [isAutoplayRunning, setIsAutoplayRunning] = useState(true)

  // const toggleAutoplay = () => {
  //   const swiperInstance = sliderTG?.current?.swiper
  //   if (swiperInstance) {
  //     if (isAutoplayRunning) {
  //       swiperInstance.autoplay?.stop()
  //     } else {
  //       swiperInstance.autoplay?.start()
  //       // ➕ Advance to next slide immediately
  //       swiperInstance.slideNext(300) // optional speed in ms
  //     }
  //     setIsAutoplayRunning(!isAutoplayRunning)
  //   }
  // }

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

  // Stop scrolling pages when searchQuery
  useEffect(() => {
    if (searchQuery !== '') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [searchQuery])

  // Stop scrolling pages when isMagNavShown
  useEffect(() => {
    if (isMagNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isMagNavShown])

  // Stop scrolling pages when isCustomNavShown
  useEffect(() => {
    if (isCustomNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isCustomNavShown])

  // Stop scrolling pages when isHCNavShown
  useEffect(() => {
    if (isHCNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isHCNavShown])

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

  // Latest Travel Stories
  const latestPosts = latestStories?.posts ?? []
  const latestEditorials = latestStories?.editorials ?? []
  const latestUpdates = latestStories?.updates ?? []

  const latestMainPosts =
    latestPosts?.edges
      ?.filter((post) => !post.node?.passwordProtected?.onOff)
      .map((post) => post.node) ?? []

  const latestMainEditorialPosts =
    latestEditorials?.edges
      ?.filter((post) => !post.node?.passwordProtected?.onOff)
      .map((post) => post.node) ?? []

  const latestMainUpdatesPosts =
    latestUpdates?.edges
      ?.filter((post) => !post.node?.passwordProtected?.onOff)
      .map((post) => post.node) ??
    []
      ?.filter((post) => !post.node?.passwordProtected?.onOff)
      .map((post) => post.node) ??
    []

  // define latestCatPostCards
  const latestMainCatPosts = [
    ...(latestMainPosts != null ? latestMainPosts : []),
    ...(latestMainEditorialPosts != null ? latestMainEditorialPosts : []),
    ...(latestMainUpdatesPosts != null ? latestMainUpdatesPosts : []),
  ]

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

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (enteredPassword === passwordProtected?.password) {
      setIsAuthenticated(true)
      Cookies.set('travelGuidePassword', enteredPassword, { expires: 1 }) // Set cookie to expire in 1 day
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
    <main className={`${eb_garamond.variable} ${poppins.variable}`}>
      <Header
        isNavShown={isNavShown}
        setIsNavShown={setIsNavShown}
        isScrolled={isScrolled}
        customClassName={'travel-guide'}
      />
      <SecondaryHeader
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
        fourthMenuItems={fourthMenu}
        fifthMenuItems={fifthMenu}
        featureMenuItems={featureMenu}
        latestStories={latestAllPosts}
        menusLoading={menusLoading}
        latestLoading={latestLoading}
        rcaDatabaseId={rcaDatabaseId}
        rcaUri={rcaUri}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchBarShown={isSearchBarShown}
        setIsSearchBarShown={setIsSearchBarShown}
        isGuidesNavShown={isGuidesNavShown}
        setIsGuidesNavShown={setIsGuidesNavShown}
        isHCNavShown={isHCNavShown}
        setIsHCNavShown={setIsHCNavShown}
        isMagNavShown={isMagNavShown}
        setIsMagNavShown={setIsMagNavShown}
        isCustomNavShown={isCustomNavShown}
        setIsCustomNavShown={setIsCustomNavShown}
        isBurgerNavShown={isBurgerNavShown}
        setIsBurgerNavShown={setIsBurgerNavShown}
        isScrolled={isScrolled}
        customClassName={'travel-guide'}
      />
      <Main>
        <>
          {/* {'hotel'} */}
          <SingleTGContainer>
            <div className="lg:fixed lg:flex lg:w-[100w] lg:flex-col">
              <div className="w-full lg:relative lg:flex lg:h-[100vh] lg:flex-row-reverse lg:flex-nowrap lg:overflow-y-auto">
                {/* First wrapper */}
                <SingleTGFeaturedImage
                  mainLogo={
                    parent != null && children?.edges?.length === 0
                      ? parent?.node?.travelGuidesLogo?.mainLogo
                      : parent != null && children?.edges?.length !== 0
                      ? travelGuidesLogo?.mainLogo
                      : null
                  }
                  secondaryLogo={
                    parent != null && children?.edges?.length === 0
                      ? parent?.node?.travelGuidesLogo?.secondaryLogo
                      : parent != null && children?.edges?.length !== 0
                      ? travelGuidesLogo?.secondaryLogo
                      : null
                  }
                  databaseId={
                    parent != null && children?.edges?.length === 0
                      ? parent?.node?.databaseId
                      : parent != null && children?.edges?.length !== 0
                      ? databaseId
                      : null
                  }
                  uri={
                    parent != null && children?.edges?.length === 0
                      ? parent?.node?.uri
                      : parent != null && children?.edges?.length !== 0
                      ? uri
                      : null
                  }
                  isTGNavShown={isTGNavShown}
                  setIsTGNavShown={setIsTGNavShown}
                />
                {/* Second wrapper */}
                <div className="w-full lg:relative lg:pt-20">
                  <ContentWrapperTG
                    router={props?.router}
                    title={title}
                    category={categories?.edges[0]?.node?.name}
                    content={content}
                    images={images}
                    mainLogo={
                      parent != null && children?.edges?.length === 0
                        ? parent?.node?.travelGuidesLogo?.mainLogo
                        : parent != null && children?.edges?.length !== 0
                        ? travelGuidesLogo?.mainLogo
                        : null
                    }
                    guidesTitle={
                      parent != null && children?.edges?.length === 0
                        ? parent?.node?.title
                        : parent != null && children?.edges?.length !== 0
                        ? title
                        : null
                    }
                    guidesUri={
                      parent != null && children?.edges?.length === 0
                        ? parent?.node?.uri
                        : parent != null && children?.edges?.length !== 0
                        ? uri
                        : null
                    }
                    databaseId={databaseId}
                    isNavShown={isNavShown}
                    isTGNavShown={isTGNavShown}
                    setIsTGNavShown={setIsTGNavShown}
                    sliderTG={sliderTG}
                  />
                </div>
              </div>
            </div>
          </SingleTGContainer>
        </>
      </Main>
      {/* <Footer /> */}
    </main>
  )
}

Component.query = gql`
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    travelGuide(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      uri
      content
      databaseId
      passwordProtected {
        onOff
        password
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
      travelGuidesLogo {
        mainLogo {
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
      children(first: 1) {
        edges {
          node {
            id
          }
        }
      }
      parent {
        node {
          ... on TravelGuide {
            title
            uri
            databaseId
            travelGuidesLogo {
              mainLogo {
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
