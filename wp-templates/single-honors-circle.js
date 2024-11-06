import { gql, useQuery } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  HCHeader,
  Main,
  Container,
  EntryHeader,
  FeaturedImage,
  SEO,
  SingleHCFeaturedImage,
  SingleHCEntryHeader,
  SingleHCContainer,
  ContentWrapperHCFrontPage,
  ContentWrapperHC,
} from '../components'
import { GetMenus } from '../queries/GetMenus'
import { GetLatestStories } from '../queries/GetLatestStories'
import { eb_garamond, rubik_mono_one } from '../styles/fonts/fonts'

export default function SingleHonorsCircle(props) {
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
    acfHCSlider,
    parent,
    hcLocation,
    hcCaption,
    seo,
    uri,
  } = props?.data?.honorsCircle

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
    acfHCSlider.slide1 != null ? acfHCSlider.slide1.mediaItemUrl : null,
    acfHCSlider.slide2 != null ? acfHCSlider.slide2.mediaItemUrl : null,
    acfHCSlider.slide3 != null ? acfHCSlider.slide3.mediaItemUrl : null,
    acfHCSlider.slide4 != null ? acfHCSlider.slide4.mediaItemUrl : null,
    acfHCSlider.slide5 != null ? acfHCSlider.slide5.mediaItemUrl : null,
  ]

  return (
    <main className={`${eb_garamond.variable} ${rubik_mono_one.variable}`}>
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={featuredImage?.node?.sourceUrl}
        url={uri}
        focuskw={seo?.focuskw}
      />
      {/* Countries pages */}
      {parent == null && (
        <HCHeader
          title={siteTitle}
          description={siteDescription}
          primaryMenuItems={primaryMenu}
          secondaryMenuItems={secondaryMenu}
          thirdMenuItems={thirdMenu}
          fourthMenuItems={fourthMenu}
          fifthMenuItems={fifthMenu}
          featureMenuItems={featureMenu}
          latestStories={latestAllPosts}
        />
      )}
      {parent == null && (
        <Main>
          <>
            <Container>
              {/* {'countries'} */}
              {/* All posts sorted by mainPosts & date */}
              <EntryHeader
                hcCountryTitle={title}
                hcCaption={hcCaption?.hcCaption}
              />
              <ContentWrapperHCFrontPage content={content} />
            </Container>
          </>
        </Main>
      )}

      {/* Hotel pages */}
      {parent != null && (
        <HCHeader
          title={siteTitle}
          description={siteDescription}
          primaryMenuItems={primaryMenu}
          secondaryMenuItems={secondaryMenu}
          thirdMenuItems={thirdMenu}
          fourthMenuItems={fourthMenu}
          fifthMenuItems={fifthMenu}
          featureMenuItems={featureMenu}
          latestStories={latestAllPosts}
        />
      )}
      {parent != null && (
        <Main>
          <>
            <SingleHCContainer>
              {/* {'hotel'} */}
              <SingleHCFeaturedImage image={featuredImage?.node} />
              <SingleHCEntryHeader
                title={title}
                locationLabel={hcLocation?.hcLocation}
              />
              {/* <SingleHCSlider images={images} /> */}
              <ContentWrapperHC content={content} images={images} />
            </SingleHCContainer>
          </>
        </Main>
      )}
      {/* <Footer /> */}
    </main>
  )
}

SingleHonorsCircle.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    honorsCircle(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
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
      hcLocation {
        hcLocation
      }
      hcCaption {
        hcCaption
      }
      acfHCSlider {
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
      children {
        edges {
          node {
            ... on HonorsCircle {
              id
              title
              content
              uri
              ...FeaturedImageFragment
            }
          }
        }
      }
      parent {
        node {
          ... on HonorsCircle {
            title
            content
            date
          }
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
  }
`

SingleHonorsCircle.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}
