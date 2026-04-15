import { gql, useQuery } from '@apollo/client'
import * as MENUS from '@/constants/menus'
import React, { useEffect, useState } from 'react'
import { GetMenus } from '@/queries/GetMenus'
import { GetLatestStories } from '@/queries/GetLatestStories'
import { eb_garamond, poppins, rubik } from '@/styles/fonts/fonts'
import { GetLatestRCA } from '@/queries/GetLatestRCA'
import Cookies from 'js-cookie'
import { GetSecondaryHeader } from '@/queries/GetSecondaryHeader'
import dynamic from 'next/dynamic'
// Import Components
const SingleHeader = dynamic(() =>
  import('@/components/SingleHeader/SingleHeader'),
)
const CategorySecondaryHeader = dynamic(() =>
  import(
    '@/components/CategoryHeader/CategorySecondaryHeader/CategorySecondaryHeader'
  ),
)
const SingleEntryHeader = dynamic(() =>
  import('@/components/SingleEntryHeader/SingleEntryHeader'),
)
const Main = dynamic(() => import('@/components/Main/Main'))
const ContentWrapper = dynamic(() =>
  import('@/components/ContentWrapper/ContentWrapper'),
)
const SingleSlider = dynamic(() =>
  import('@/components/SingleSlider/SingleSlider'),
)
const EntryMoreReviews = dynamic(() =>
  import('@/components/EntryMoreReviews/EntryMoreReviews'),
)
const MoreReviews = dynamic(() =>
  import('@/components/MoreReviews/MoreReviews'),
)
const PartnerContent = dynamic(() =>
  import('@/components/PartnerContent/PartnerContent'),
)
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

  // Check for stored password in cookies on mount
  useEffect(() => {
    const storedPassword = Cookies.get('postPassword')
    if (
      storedPassword &&
      storedPassword === props?.data?.post?.passwordProtected?.password
    ) {
      setIsAuthenticated(true)
    }
  }, [props?.data?.post?.passwordProtected?.password])

  const {
    title,
    content,
    featuredImage,
    databaseId,
    acfPostSlider,
    acfCategoryIcon,
    acfLocationIcon,
    seo,
    uri,
    passwordProtected,
  } = props?.data?.post
  const categories = props?.data?.post.categories?.edges ?? []

  {console.log(props)}

  // Search function content
  const [searchQuery, setSearchQuery] = useState('')
  // Scrolled Function
  const [isScrolled, setIsScrolled] = useState(false)
  // NavShown Function
  const [isSearchBarShown, setIsSearchBarShown] = useState(false)
  const [isNavShown, setIsNavShown] = useState(false)
  const [isGuidesNavShown, setIsGuidesNavShown] = useState(false)
  const [isHCNavShown, setIsHCNavShown] = useState(false)
  const [isCustomNavShown, setIsCustomNavShown] = useState(false)
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

  let catVariable = {
    first: 1,
    id: databaseId,
  }

  // Get Category
  const { data, loading } = useQuery(GetSecondaryHeader, {
    variables: catVariable,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
  })

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
      acfPostSlider?.slide1 != null
        ? acfPostSlider?.slide1?.mediaItemUrl
        : null,
      acfPostSlider?.slideCaption1 != null
        ? acfPostSlider?.slideCaption1
        : null,
    ],
    [
      acfPostSlider?.slide2 != null
        ? acfPostSlider?.slide2?.mediaItemUrl
        : null,
      acfPostSlider?.slideCaption2 != null
        ? acfPostSlider?.slideCaption2
        : null,
    ],
    [
      acfPostSlider?.slide3 != null
        ? acfPostSlider?.slide3?.mediaItemUrl
        : null,
      acfPostSlider?.slideCaption3 != null
        ? acfPostSlider?.slideCaption3
        : null,
    ],
    [
      acfPostSlider?.slide4 != null
        ? acfPostSlider?.slide4?.mediaItemUrl
        : null,
      acfPostSlider?.slideCaption4 != null
        ? acfPostSlider?.slideCaption4
        : null,
    ],
    [
      acfPostSlider?.slide5 != null
        ? acfPostSlider?.slide5?.mediaItemUrl
        : null,
      acfPostSlider?.slideCaption5 != null
        ? acfPostSlider?.slideCaption5
        : null,
    ],
  ]

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (enteredPassword === passwordProtected?.password) {
      setIsAuthenticated(true)
      Cookies.set('postPassword', enteredPassword, { expires: 1 }) // Set cookie to expire in 1 day
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
      <SingleHeader isScrolled={isScrolled} />
      <CategorySecondaryHeader
        data={data}
        databaseId={databaseId}
        categoryUri={categories[0]?.node?.uri}
        parentCategory={categories[0]?.node?.parent?.node?.name}
        categoryCountryCode={
          categories[0]?.node?.parent?.node?.countryCode?.countryCode
        }
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
        customClassName={'category'}
      />
      <Main>
        <>
          <SingleSlider images={images} />
          <SingleEntryHeader
            title={title}
            categoryUri={categories[0]?.node?.uri}
            parentCategory={categories[0]?.node?.parent?.node?.name}
            categoryName={categories[0]?.node?.name}
            chooseYourCategory={acfCategoryIcon?.chooseYourCategory}
            chooseIcon={acfCategoryIcon?.chooseIcon?.mediaItemUrl}
            categoryLabel={acfCategoryIcon?.categoryLabel}
            locationValidation={acfLocationIcon?.fieldGroupName}
            locationLabel={acfLocationIcon?.locationLabel}
            locationUrl={acfLocationIcon?.locationUrl}
          />
          <>
            <ContentWrapper content={content} />
          </>
          <EntryMoreReviews
            parentName={categories[0]?.node?.parent?.node?.name}
            categoryName={categories[0]?.node?.name}
            categoryUri={categories[0]?.node?.uri}
          />
          <MoreReviews databaseId={databaseId} />
          <PartnerContent
            parentName={categories[0]?.node?.parent?.node?.name}
          />
        </>
      </Main>
      <Footer />
    </main>
  )
}

Component.query = gql`
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      id
      title
      databaseId
      content
      date
      passwordProtected {
        onOff
        password
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
      categories(where: { childless: true }) {
        edges {
          node {
            name
            uri
            parent {
              node {
                name
                uri
                slug
                countryCode {
                  countryCode
                }
                destinationGuides {
                  destinationGuides
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
        slideCaption3
        slideCaption2
        slideCaption4
        slideCaption5
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
`

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}
