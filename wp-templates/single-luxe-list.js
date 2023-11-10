import { gql, useQuery } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  Main,
  FeaturedImage,
  SEO,
  Header,
  SingleLLContainer,
  SingleLLFrontPageContainer,
  ContentWrapperLLFrontPage,
  SingleLLFeaturedImage,
  ContentWrapperLL,
  SingleLLFrontPageFeaturedImage,
  SingleLLEntryHeader,
} from '../components'
import { GetMenus } from '../queries/GetMenus'
import { GetLatestStories } from '../queries/GetLatestStories'

export default function SingleLuxeList(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings
  const {
    title,
    content,
    featuredImage,
    acfPostSlider,
    parent,
    seo,
    uri,
    databaseId,
    luxeListLogo,
    categories,
  } = props?.data?.luxeList

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

  const images = [
    acfPostSlider.slide1 != null ? acfPostSlider.slide1.mediaItemUrl : null,
    acfPostSlider.slide2 != null ? acfPostSlider.slide2.mediaItemUrl : null,
    acfPostSlider.slide3 != null ? acfPostSlider.slide3.mediaItemUrl : null,
    acfPostSlider.slide4 != null ? acfPostSlider.slide4.mediaItemUrl : null,
    acfPostSlider.slide5 != null ? acfPostSlider.slide5.mediaItemUrl : null,
  ]

  return (
    <>
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={featuredImage?.node?.sourceUrl}
        url={uri}
        focuskw={seo?.focuskw}
      />
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5BJVGS"
          height="0"
          width="0"
          className="invisible hidden"
        ></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      {/* Year pages */}
      {parent == null && (
        <Header
          title={siteTitle}
          description={siteDescription}
          primaryMenuItems={primaryMenu}
          secondaryMenuItems={secondaryMenu}
          thirdMenuItems={thirdMenu}
          fourthMenuItems={fourthMenu}
          fifthMenuItems={fifthMenu}
          featureMenuItems={featureMenu}
          latestStories={latestAllPosts}
          menusLoading={menusLoading}
          latestLoading={latestLoading}
        />
      )}
      {parent == null && (
        <Main>
          <>
            <SingleLLFrontPageContainer>
              {/* {'countries'} */}
              {/* All posts sorted by mainPosts & date */}
              <SingleLLFrontPageFeaturedImage
                mainLogo={luxeListLogo?.mainLogo}
                secondaryLogo={luxeListLogo?.secondaryLogo}
                databaseId={databaseId}
                uri={uri}
              />
              <ContentWrapperLLFrontPage
                content={content}
                databaseId={databaseId}
                parentTitle={title}
              />
            </SingleLLFrontPageContainer>
          </>
        </Main>
      )}

      {/* Hotel pages */}
      {parent != null && (
        <Header
          title={siteTitle}
          description={siteDescription}
          primaryMenuItems={primaryMenu}
          secondaryMenuItems={secondaryMenu}
          thirdMenuItems={thirdMenu}
          fourthMenuItems={fourthMenu}
          fifthMenuItems={fifthMenu}
          featureMenuItems={featureMenu}
          latestStories={latestAllPosts}
          menusLoading={menusLoading}
          latestLoading={latestLoading}
        />
      )}
      {parent != null && (
        <Main>
          <>
            {/* {'hotel'} */}
            <SingleLLContainer>
              <div className="sm:fixed sm:left-[50vw] sm:flex sm:w-[50vw] sm:flex-col">
                <div className="sm:relative sm:h-[100vh] sm:flex-row sm:flex-wrap sm:overflow-y-auto">
                  {/* First wrapper */}
                  <SingleLLFeaturedImage
                    mainLogo={parent?.node?.luxeListLogo?.mainLogo}
                    secondaryLogo={parent?.node?.luxeListLogo?.secondaryLogo}
                    databaseId={parent?.node?.databaseId}
                    uri={parent?.node?.uri}
                  />
                  {/* Second wrapper */}
                  <div className="sm:relative sm:mx-auto">
                    <SingleLLEntryHeader
                      title={title}
                      category={categories?.edges[0]?.node?.name}
                    />
                    <ContentWrapperLL
                      content={content}
                      images={images}
                      databaseId={databaseId}
                    />
                  </div>
                </div>
              </div>
            </SingleLLContainer>
          </>
        </Main>
      )}
      {/* <Footer /> */}
    </>
  )
}

SingleLuxeList.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetPost(
    $databaseId: ID!
    $asPreview: Boolean = false
  ) {
    luxeList(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      databaseId
      ...FeaturedImageFragment
      luxeListLogo {
        mainLogo {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        secondaryLogo {
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
      ...FeaturedImageFragment
      parent {
        node {
          ... on LuxeList {
            uri
            databaseId
            luxeListLogo {
              mainLogo {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
              secondaryLogo {
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
    generalSettings {
      ...BlogInfoFragment
    }
  }
`

SingleLuxeList.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}
