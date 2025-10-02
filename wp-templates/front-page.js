import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { GetMenus } from '../queries/GetMenus'
import { GetLatestStories } from '../queries/GetLatestStories'
import { eb_garamond, poppins } from '../styles/fonts/fonts'
import { GetHomepagePinPosts } from '../queries/GetHomepagePinPosts'
import { GetLatestRCA } from '../queries/GetLatestRCA'
import dynamic from 'next/dynamic'
// Import Components
const HomepageHeader = dynamic(() =>
  import('@/components/HomepageHeader/HomepageHeader'),
)
const HomepageSecondaryHeader = dynamic(() =>
  import(
    '@/components/HomepageHeader/HomepageSecondaryHeader/HomepageSecondaryHeader'
  ),
)
const Main = dynamic(() => import('@/components/Main/Main'))
const FeatureWell = dynamic(() =>
  import('@/components/FeatureWell/FeatureWell'),
)
const HomepageStories = dynamic(() =>
  import('@/components/HomepageStories/HomepageStories'),
)

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const { acfHomepageSlider, content } = props?.data?.page ?? []
  const { databaseId, asPreview } = props?.__TEMPLATE_VARIABLES__ ?? []

  const [currentFeatureWell, setCurrentFeatureWell] = useState(null)
  // Search function content
  const [searchQuery, setSearchQuery] = useState('')
  // Scrolled Function
  const [isScrolled, setIsScrolled] = useState(false)
  // NavShown Function
  const [isSearchBarShown, setIsSearchBarShown] = useState(false)
  const [isMagNavShown, setIsMagNavShown] = useState(false)
  const [isGuidesNavShown, setIsGuidesNavShown] = useState(false)
  const [isCustomNavShown, setIsCustomNavShown] = useState(false)
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

  const featureWell = [
    {
      type: acfHomepageSlider?.typeSlide1,
      videoSrc: acfHomepageSlider?.video1?.mediaItemUrl,
      desktopSrc: acfHomepageSlider?.desktopSlide1?.mediaItemUrl,
      mobileSrc: acfHomepageSlider?.mobileSlide1?.mediaItemUrl,
      url: acfHomepageSlider?.slideLink1,
      category: acfHomepageSlider?.slideCategory1,
      categoryLink: acfHomepageSlider?.slideCategoryLink1,
      caption: acfHomepageSlider?.slideCaption1,
      standFirst: acfHomepageSlider?.slideStandFirst1,
    },
    {
      type: acfHomepageSlider?.typeSlide2,
      desktopSrc: acfHomepageSlider?.desktopSlide2?.mediaItemUrl,
      mobileSrc: acfHomepageSlider?.mobileSlide2?.mediaItemUrl,
      videoSrc: acfHomepageSlider?.video2?.mediaItemUrl,
      url: acfHomepageSlider?.slideLink2,
      category: acfHomepageSlider?.slideCategory2,
      categoryLink: acfHomepageSlider?.slideCategoryLink2,
      caption: acfHomepageSlider?.slideCaption2,
      standFirst: acfHomepageSlider?.slideStandFirst2,
    },
    {
      type: acfHomepageSlider?.typeSlide3,
      desktopSrc: acfHomepageSlider?.desktopSlide3?.mediaItemUrl,
      mobileSrc: acfHomepageSlider?.mobileSlide3?.mediaItemUrl,
      videoSrc: acfHomepageSlider?.video3?.mediaItemUrl,
      url: acfHomepageSlider?.slideLink3,
      category: acfHomepageSlider?.slideCategory3,
      categoryLink: acfHomepageSlider?.slideCategoryLink3,
      caption: acfHomepageSlider?.slideCaption3,
      standFirst: acfHomepageSlider?.slideStandFirst3,
    },
  ]

  useEffect(() => {
    const filteredFeatureWell = featureWell.filter((item) => item.type !== null)

    if (filteredFeatureWell.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredFeatureWell.length)
      setCurrentFeatureWell(filteredFeatureWell[randomIndex])
    }
  }, [])

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

  const primaryMenu = menusData?.headerMenuItems?.nodes ?? []
  const secondaryMenu = menusData?.secondHeaderMenuItems?.nodes ?? []
  const thirdMenu = menusData?.thirdHeaderMenuItems?.nodes ?? []
  const fourthMenu = menusData?.fourthHeaderMenuItems?.nodes ?? []
  const fifthMenu = menusData?.fifthHeaderMenuItems?.nodes ?? []
  const featureMenu = menusData?.featureHeaderMenuItems?.nodes ?? []

  // Get pin posts stories
  const { data: pinPostsStories } = useQuery(GetHomepagePinPosts, {
    variables: {
      id: databaseId,
      asPreview: asPreview,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  // State variable of homepage pin posts
  const homepagePinPosts = pinPostsStories?.page?.homepagePinPosts ?? []

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

  return (
    <main
      className={`${eb_garamond.variable} ${poppins.variable}`}
    >
      <HomepageHeader isScrolled={isScrolled} />
      <HomepageSecondaryHeader
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
        fourthMenuItems={fourthMenu}
        fifthMenuItems={fifthMenu}
        featureMenuItems={featureMenu}
        latestStories={allPosts}
        menusLoading={menusLoading}
        latestLoading={latestLoading}
        rcaDatabaseId={rcaDatabaseId}
        rcaUri={rcaUri}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchBarShown={isSearchBarShown}
        setIsSearchBarShown={setIsSearchBarShown}
        isMagNavShown={isMagNavShown}
        setIsMagNavShown={setIsMagNavShown}
        isGuidesNavShown={isGuidesNavShown}
        setIsGuidesNavShown={setIsGuidesNavShown}
        isCustomNavShown={isCustomNavShown}
        setIsCustomNavShown={setIsCustomNavShown}
        isBurgerNavShown={isBurgerNavShown}
        setIsBurgerNavShown={setIsBurgerNavShown}
        isScrolled={isScrolled}
      />
      <Main>
        <>
          {/* <NavigationHeader menuItems={navigationMenu}/> */}
          <div className="bg-black">
            {currentFeatureWell && (
              <>
                <FeatureWell featureWells={featureWell} content={content} />
              </>
            )}
          </div>
          <div className="pt-16">
            {/* All posts sorted by pinPosts then mainPosts & date */}
            <HomepageStories pinPosts={homepagePinPosts} />
          </div>
        </>
      </Main>
      {/* <Footer /> */}
    </main>
  )
}

Component.query = gql`
  query GetPageData($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      uri
      seo {
        title
        metaDesc
        focuskw
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
        slideStandFirst1
        slideStandFirst2
        slideStandFirst3
        slideCategory1
        slideCategory2
        slideCategory3
        slideCategoryLink1
        slideCategoryLink2
        slideCategoryLink3
        slideLink1
        slideLink2
        slideLink3
        typeSlide1
        typeSlide2
        typeSlide3
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
