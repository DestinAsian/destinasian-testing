import { useEffect, useState, useRef } from 'react'
import { gql, useQuery } from '@apollo/client'
import * as MENUS from '@/constants/menus'
import { HEADER_NAV_INITIAL_STATE } from '@/constants/headerConfig'
import { GetMenus } from '@/queries/GetMenus'
import { GetLatestStories } from '@/queries/GetLatestStories'
import {  poppins } from '@/styles/fonts/fonts'
import { GetLatestRCA } from '@/queries/GetLatestRCA'
import { GetSecondaryHeader } from '@/queries/GetSecondaryHeader'
import { GetCategoryPinPosts } from '@/queries/GetCategoryPinPosts'
import dynamic from 'next/dynamic'

// Import Components
const Header = dynamic(() => import('@/components/Header/Header'))
const Main = dynamic(() => import('@/components/Main/Main'))
const CategoryEntryHeader = dynamic(() =>
  import('@/components/CategoryEntryHeader/CategoryEntryHeader'),
)
const Footer = dynamic(() => import('@/components/Footer/Footer'))
const CategoryStories = dynamic(() =>
  import('@/components/CategoryStories/CategoryStories'),
)
const SecondaryHeader = dynamic(() =>
  import('@/components/Header/SecondaryHeader/SecondaryHeader'),
)

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const {
    name,
    description,
    children,
    parent,
    categoryImages,
    destinationGuides,
    databaseId,
    countryCode,
  } = props?.data?.category ?? []

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

  const { data: rcaData, error: rcaError } = useQuery(GetLatestRCA, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
  })

  if (rcaError) {
    console.error('[Category RCA Error]', rcaError)
  }

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

  let catVariable = {
    first: 1,
    id: databaseId,
  }

  // Get Category
  const {
    data,
    loading,
    error: categoryError,
  } = useQuery(GetSecondaryHeader, {
    variables: catVariable,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
  })

  if (categoryError) {
    console.error('[Category Header Error]', categoryError)
  }

  // Logic for Guides Category
  const isGuidesCategory =
    (data?.category?.children?.edges?.length != 0 &&
      data?.category?.children != null &&
      data?.category?.children != undefined) ||
    (!data?.category?.children?.edges?.length &&
      data?.category?.parent?.node?.children?.edges?.length != 0 &&
      data?.category?.parent != null &&
      data?.category?.parent != undefined)

  // Get menus
  const {
    data: menusData,
    loading: menusLoading,
    error: menusError,
  } = useQuery(GetMenus, {
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

  if (menusError) {
    console.error('[Category Menus Error]', menusError)
  }

  // Header Menu
  const primaryMenu = menusData?.headerMenuItems?.nodes ?? []
  const secondaryMenu = menusData?.secondHeaderMenuItems?.nodes ?? []
  const thirdMenu = menusData?.thirdHeaderMenuItems?.nodes ?? []
  const fourthMenu = menusData?.fourthHeaderMenuItems?.nodes ?? []
  const fifthMenu = menusData?.fifthHeaderMenuItems?.nodes ?? []
  const featureMenu = menusData?.featureHeaderMenuItems?.nodes ?? []

  // Get pin posts stories
  const { data: pinPostsStories, error: pinPostsError } = useQuery(
    GetCategoryPinPosts,
    {
      variables: {
        id: databaseId,
      },
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'network-only',
    },
  )

  if (pinPostsError) {
    console.error('[Category Pin Posts Error]', pinPostsError)
  }

  // State variable of Category pin posts
  const pinPosts = pinPostsStories?.category?.pinPosts ?? []

  // Get latest travel stories
  const {
    data: latestStories,
    loading: latestLoading,
    error: latestStoriesError,
  } = useQuery(GetLatestStories, {
    variables: {
      first: 5,
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
  })

  if (latestStoriesError) {
    console.error('[Category Latest Stories Error]', latestStoriesError)
  }

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

  // Category Slider
  const categorySlider = [
    [
      categoryImages.categorySlide1 != null
        ? categoryImages.categorySlide1.mediaItemUrl
        : null,
      categoryImages.categorySlideCaption1 != null
        ? categoryImages?.categorySlideCaption1
        : null,
    ],
    [
      categoryImages.categorySlide2 != null
        ? categoryImages.categorySlide2.mediaItemUrl
        : null,
      categoryImages.categorySlideCaption2 != null
        ? categoryImages?.categorySlideCaption2
        : null,
    ],
    [
      categoryImages.categorySlide3 != null
        ? categoryImages.categorySlide3.mediaItemUrl
        : null,
      categoryImages.categorySlideCaption3 != null
        ? categoryImages?.categorySlideCaption3
        : null,
    ],
    [
      categoryImages.categorySlide4 != null
        ? categoryImages.categorySlide4.mediaItemUrl
        : null,
      categoryImages.categorySlideCaption4 != null
        ? categoryImages?.categorySlideCaption4
        : null,
    ],
    [
      categoryImages.categorySlide5 != null
        ? categoryImages.categorySlide5.mediaItemUrl
        : null,
      categoryImages.categorySlideCaption5 != null
        ? categoryImages?.categorySlideCaption5
        : null,
    ],
  ]

  if (loading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          {/* <Button className="gap-x-4	">{'Loading...'}</Button> */}
        </div>
      </>
    )
  }

  return (
    <main className={`${poppins.variable}`}>
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
        burgerButtonRef={burgerButtonRef}
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
        customClassName={'category'}
        burgerButtonRef={burgerButtonRef}
      />
      {/* EntryHeader category name */}
      <CategoryEntryHeader
        parent={parent?.node?.name}
        children={children?.edges}
        title={name}
        destinationGuides={destinationGuides?.destinationGuides}
        changeToSlider={categoryImages?.changeToSlider}
        guidesTitle={destinationGuides?.guidesTitle}
        categorySlider={categorySlider}
        image={categoryImages?.categoryImages?.mediaItemUrl}
        imageCaption={categoryImages?.categoryImagesCaption}
        description={description}
      />
      <Main>
        <>
          <CategoryStories
            categoryUri={databaseId}
            pinPosts={pinPosts}
            name={name}
            children={children}
            parent={parent?.node?.name}
          />
        </>
      </Main>
      <Footer />
    </main>
  )
}

Component.query = gql`
  query GetCategoryPage($databaseId: ID!) {
    category(id: $databaseId, idType: DATABASE_ID) {
      id
      name
      description
      databaseId
      uri
      countryCode {
        countryCode
      }
      seo {
        title
        metaDesc
        focuskw
      }
      categoryImages {
        changeToSlider
        categorySlide1 {
          mediaItemUrl
        }
        categorySlide2 {
          mediaItemUrl
        }
        categorySlide3 {
          mediaItemUrl
        }
        categorySlide4 {
          mediaItemUrl
        }
        categorySlide5 {
          mediaItemUrl
        }
        categoryImages {
          mediaItemUrl
        }
        categorySlideCaption1
        categorySlideCaption2
        categorySlideCaption3
        categorySlideCaption4
        categorySlideCaption5
        categoryImagesCaption
      }
      destinationGuides {
        destinationGuides
        guidesTitle
      }
      parent {
        node {
          name
          uri
          children(first: 1000, where: { childless: true }) {
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
          }
        }
      }
    }
  }
`

Component.variables = ({ databaseId }) => {
  return {
    databaseId,
  }
}
