import React, { useEffect, useState, useRef } from 'react'
import { gql, useQuery } from '@apollo/client'
import * as MENUS from '@/constants/menus'
import { HEADER_NAV_INITIAL_STATE } from '@/constants/headerConfig'
import { GetMenus } from '@/queries/GetMenus'
import { GetLatestStories } from '@/queries/GetLatestStories'
import { eb_garamond, poppins, rubik } from '@/styles/fonts/fonts'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { GetLatestRCA } from '@/queries/GetLatestRCA'
import dynamic from 'next/dynamic'
import SingleContributorEntryHeader from '@/components/SingleContributorEntryHeader/SingleContributorEntryHeader'
// Import Components
const Header = dynamic(() => import('@/components/Header/Header'))
const SecondaryHeader = dynamic(() =>
  import('@/components/Header/SecondaryHeader/SecondaryHeader'),
)
const Main = dynamic(() => import('@/components/Main/Main'))
const ContributorStories = dynamic(() =>
  import('@/components/ContributorStories/ContributorStories'),
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

  // Check for stored auth flag in cookies on mount
  useEffect(() => {
    const contentDatabaseId = props?.data?.contributor?.databaseId
    if (!contentDatabaseId) return

    const storedAuth = Cookies.get(`pp-${contentDatabaseId}`)
    if (storedAuth === '1') {
      setIsAuthenticated(true)
    }
  }, [props?.data?.contributor?.databaseId])

  const {
    title,
    databaseId,
    content,
    parent,
    featuredImage,
    seo,
    uri,
    contributorPosts,
    passwordProtected,
  } = props?.data?.contributor

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
      className={`${eb_garamond.variable} ${poppins.variable} ${rubik.variable} bg-[--wpe--color--light--yellow]`}
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
        burgerButtonRef={burgerButtonRef}
      />
      <Main className="mt-[-0.75rem] sm:mt-[-1rem]">
        <>
          <div className="relative mx-auto flex max-w-full flex-col items-start gap-4 pb-4 pt-8 sm:max-w-[700px] sm:flex-row sm:gap-8 sm:pt-16">
            <div className="h-auto w-full sm:w-2/6">
              {featuredImage && (
                <div className="w-full pl-4 pr-[70vw] sm:pl-0 sm:pr-0">
                  <Image
                    src={featuredImage?.node?.sourceUrl}
                    alt={
                      featuredImage?.node?.altText
                        ? featuredImage?.node?.altText
                        : ''
                    }
                    width={500}
                    height={500}
                    className="aspect-square h-auto w-full rounded-full border object-cover"
                    priority
                  />
                </div>
              )}
            </div>
            <div className="h-auto w-full sm:w-4/6">
              <SingleContributorEntryHeader
                name={title}
                title={contributorPosts?.title}
                content={content}
              />
            </div>
          </div>
          {(contributorPosts?.recentStories?.length &&
            contributorPosts?.moreStories?.length) !== 0 && (
            <div className="py-4">
              <ContributorStories contributorPosts={contributorPosts} />
            </div>
          )}
          <section className="relative pb-0" data-id="section7">
            <Footer />
          </section>
        </>
      </Main>
    </main>
  )
}

Component.query = gql`
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    contributor(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      id
      title
      databaseId
      content
      date
      passwordProtected {
        onOff
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
      contributorPosts {
        title
        recentStories {
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
