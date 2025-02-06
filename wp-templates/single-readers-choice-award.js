import { gql, useQuery } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  Main,
  FeaturedImage,
  SEO,
  SingleRCAContainer,
  ContentWrapperRCA,
  SingleRCAEntryHeader,
  RCAHeader,
  ContentWrapperRCAFrontPage,
  PasswordProtected,
} from '../components'
import { GetMenus } from '../queries/GetMenus'
import { GetLatestStories } from '../queries/GetLatestStories'
import { GetRCASlider } from '../queries/GetRCASlider'
import { GetRCAPagination } from '../queries/GetRCAPagination'
import React, { useEffect, useState } from 'react'
import { eb_garamond, rubik, rubik_mono_one } from '../styles/fonts/fonts'
import Cookies from 'js-cookie'

export default function singleRca(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const [enteredPassword, setEnteredPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for stored password in cookies on mount
  useEffect(() => {
    const storedPassword = Cookies.get('readersChoiceAwardPassword')
    if (
      storedPassword &&
      storedPassword ===
        props?.data?.readersChoiceAward?.passwordProtected?.password
    ) {
      setIsAuthenticated(true)
    }
  }, [props?.data?.readersChoiceAward?.passwordProtected?.password])

  const batchSize = 100
  const [isNavShown, setIsNavShown] = useState(false)
  const [isRCANavShown, setIsRCANavShown] = useState(false)

  // Stop scrolling pages when isNavShown
  useEffect(() => {
    if (isNavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isNavShown])

  // Stop scrolling pages when isNavShown
  useEffect(() => {
    if (isRCANavShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isRCANavShown])

  const {
    title,
    featuredImage,
    content,
    ancestors,
    parent,
    children,
    seo,
    uri,
    databaseId,
    categories,
    passwordProtected,
  } = props?.data?.readersChoiceAward

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
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    },
  )

  // Latest Travel Stories
  const latestPosts = latestStories?.posts ?? []
  const latestEditorials = latestStories?.editorials ?? []
  const latestUpdates = latestStories?.updates ?? []

  const latestMainPosts = []
  const latestMainEditorialPosts = []
  const latestMainUpdatesPosts = []

  // loop through all the latest categories posts
  latestPosts?.edges?.forEach((post) => {
    latestMainPosts.push(post.node)
  })

  // loop through all the latest categories and their posts
  latestEditorials?.edges?.forEach((post) => {
    latestMainEditorialPosts.push(post.node)
  })

  // loop through all the latest categories and their posts
  latestUpdates?.edges?.forEach((post) => {
    latestMainUpdatesPosts.push(post.node)
  })

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

  // Get menus
  const { data: sliderData, loading: sliderLoading } = useQuery(GetRCASlider, {
    variables: {
      id: databaseId,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  const rcaSliderItem = sliderData?.readersChoiceAward?.rcaSlider ?? []

  const rcaImages = [
    rcaSliderItem?.propertyImage1 != null
      ? rcaSliderItem?.propertyImage1?.mediaItemUrl
      : null,
    rcaSliderItem?.propertyImage2 != null
      ? rcaSliderItem?.propertyImage2?.mediaItemUrl
      : null,
    rcaSliderItem?.propertyImage3 != null
      ? rcaSliderItem?.propertyImage3?.mediaItemUrl
      : null,
    rcaSliderItem?.propertyImage4 != null
      ? rcaSliderItem?.propertyImage4?.mediaItemUrl
      : null,
    rcaSliderItem?.propertyImage5 != null
      ? rcaSliderItem?.propertyImage5?.mediaItemUrl
      : null,
    rcaSliderItem?.propertyImage6 != null
      ? rcaSliderItem?.propertyImage6?.mediaItemUrl
      : null,
    rcaSliderItem?.propertyImage7 != null
      ? rcaSliderItem?.propertyImage7?.mediaItemUrl
      : null,
    rcaSliderItem?.propertyImage8 != null
      ? rcaSliderItem?.propertyImage8?.mediaItemUrl
      : null,
    rcaSliderItem?.propertyImage9 != null
      ? rcaSliderItem?.propertyImage9?.mediaItemUrl
      : null,
    rcaSliderItem?.propertyImage10 != null
      ? rcaSliderItem?.propertyImage10?.mediaItemUrl
      : null,
  ]

  const rcaNames = [
    rcaSliderItem?.propertyName1 != null ? rcaSliderItem?.propertyName1 : null,
    rcaSliderItem?.propertyName2 != null ? rcaSliderItem?.propertyName2 : null,
    rcaSliderItem?.propertyName3 != null ? rcaSliderItem?.propertyName3 : null,
    rcaSliderItem?.propertyName4 != null ? rcaSliderItem?.propertyName4 : null,
    rcaSliderItem?.propertyName5 != null ? rcaSliderItem?.propertyName5 : null,
    rcaSliderItem?.propertyName6 != null ? rcaSliderItem?.propertyName6 : null,
    rcaSliderItem?.propertyName7 != null ? rcaSliderItem?.propertyName7 : null,
    rcaSliderItem?.propertyName8 != null ? rcaSliderItem?.propertyName8 : null,
    rcaSliderItem?.propertyName9 != null ? rcaSliderItem?.propertyName9 : null,
    rcaSliderItem?.propertyName10 != null
      ? rcaSliderItem?.propertyName10
      : null,
  ]

  const rcaUrls = [
    rcaSliderItem?.propertyUrl1 != null ? rcaSliderItem?.propertyUrl1 : null,
    rcaSliderItem?.propertyUrl2 != null ? rcaSliderItem?.propertyUrl2 : null,
    rcaSliderItem?.propertyUrl3 != null ? rcaSliderItem?.propertyUrl3 : null,
    rcaSliderItem?.propertyUrl4 != null ? rcaSliderItem?.propertyUrl4 : null,
    rcaSliderItem?.propertyUrl5 != null ? rcaSliderItem?.propertyUrl5 : null,
    rcaSliderItem?.propertyUrl6 != null ? rcaSliderItem?.propertyUrl6 : null,
    rcaSliderItem?.propertyUrl7 != null ? rcaSliderItem?.propertyUrl7 : null,
    rcaSliderItem?.propertyUrl8 != null ? rcaSliderItem?.propertyUrl8 : null,
    rcaSliderItem?.propertyUrl9 != null ? rcaSliderItem?.propertyUrl9 : null,
    rcaSliderItem?.propertyUrl10 != null ? rcaSliderItem?.propertyUrl10 : null,
  ]

  const rcaIds = [
    rcaSliderItem?.propertyId1 != null ? rcaSliderItem?.propertyId1 : null,
    rcaSliderItem?.propertyId2 != null ? rcaSliderItem?.propertyId2 : null,
    rcaSliderItem?.propertyId3 != null ? rcaSliderItem?.propertyId3 : null,
    rcaSliderItem?.propertyId4 != null ? rcaSliderItem?.propertyId4 : null,
    rcaSliderItem?.propertyId5 != null ? rcaSliderItem?.propertyId5 : null,
    rcaSliderItem?.propertyId6 != null ? rcaSliderItem?.propertyId6 : null,
    rcaSliderItem?.propertyId7 != null ? rcaSliderItem?.propertyId7 : null,
    rcaSliderItem?.propertyId8 != null ? rcaSliderItem?.propertyId8 : null,
    rcaSliderItem?.propertyId9 != null ? rcaSliderItem?.propertyId9 : null,
    rcaSliderItem?.propertyId10 != null ? rcaSliderItem?.propertyId10 : null,
  ]

  // Merging arrays into an array of objects
  const rcaIndexData = rcaImages.map((url, index) => ({
    imageUrl: url,
    name: rcaNames[index],
    url: rcaUrls[index],
    id: rcaIds[index],
  }))

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (enteredPassword === passwordProtected?.password) {
      setIsAuthenticated(true)
      Cookies.set('readersChoiceAwardPassword', enteredPassword, { expires: 1 }) // Set cookie to expire in 1 day
    } else {
      alert('Incorrect password. Please try again.')
    }
  }

  if (passwordProtected?.onOff && !isAuthenticated) {
    return (
      <main
        className={`${eb_garamond.variable} ${rubik_mono_one.variable} ${rubik.variable}`}
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
    <main className={`${eb_garamond.variable} ${rubik_mono_one.variable}`}>
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={featuredImage?.node?.sourceUrl}
        url={uri}
        focuskw={seo?.focuskw}
      />
      <RCAHeader
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
        fourthMenuItems={fourthMenu}
        fifthMenuItems={fifthMenu}
        featureMenuItems={featureMenu}
        latestStories={latestAllPosts}
        menusLoading={menusLoading}
        latestLoading={latestLoading}
        parent={parent}
        isNavShown={isNavShown}
        setIsNavShown={setIsNavShown}
        isRCANavShown={isRCANavShown}
        setIsRCANavShown={setIsRCANavShown}
      />
      <Main>
        <>
          {/* {'hotel'} */}
          <SingleRCAContainer parent={parent}>
            <div className="sm:fixed sm:left-[60vw] sm:flex sm:w-[40vw] sm:flex-col">
              <div className="sm:relative sm:h-[100vh] sm:flex-row sm:flex-wrap sm:overflow-y-auto">
                {/* First wrapper */}
                <div className="sm:relative sm:mx-auto">
                  <ContentWrapperRCA
                    router={props?.router}
                    title={
                      parent?.node?.title !== ancestors?.edges[0]?.node?.title
                        ? title
                        : null
                    }
                    parentTitle={
                      parent?.node?.title !== ancestors?.edges[0]?.node?.title
                        ? parent?.node?.title
                        : title
                    }
                    category={categories?.edges[0]?.node?.name}
                    images={rcaImages}
                    content={content}
                    databaseId={databaseId}
                    rcaDatabaseId={
                      parent != null
                        ? children?.edges?.length == 0
                          ? ancestors?.edges[0]?.node?.databaseId
                          : parent?.node?.databaseId
                        : databaseId
                    }
                    uri={parent != null ? parent?.node?.uri : uri}
                    rcaIndexData={rcaIndexData}
                    sliderLoading={sliderLoading}
                    isNavShown={isRCANavShown}
                    setIsNavShown={setIsRCANavShown}
                  />
                </div>
              </div>
            </div>
          </SingleRCAContainer>
        </>
      </Main>
      {/* <Footer /> */}
    </main>
  )
}

singleRca.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    readersChoiceAward(
      id: $databaseId
      idType: DATABASE_ID
      asPreview: $asPreview
    ) {
      title
      databaseId
      content
      uri
      passwordProtected {
        onOff
        password
      }
      ...FeaturedImageFragment
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
      ancestors(
        first: 1
        where: {
          status: PUBLISH
          contentTypes: READERS_CHOICE_AWARD
          search: "Readers"
        }
      ) {
        edges {
          node {
            ... on ReadersChoiceAward {
              title
              uri
              databaseId
            }
          }
        }
      }
      parent {
        node {
          ... on ReadersChoiceAward {
            title
            uri
            databaseId
          }
        }
      }
      children(
        first: 1
        where: { status: PUBLISH, contentTypes: READERS_CHOICE_AWARD }
      ) {
        edges {
          node {
            ... on ReadersChoiceAward {
              title
              uri
              databaseId
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

singleRca.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}
