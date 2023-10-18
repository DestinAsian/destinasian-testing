import { gql, useQuery } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import { GetSpecificBannerAds } from '../queries/GetSpecificBannerAds'
import {
  SingleHeader,
  Footer,
  Main,
  Container,
  SingleUpdateEntryHeader,
  FeaturedImage,
  SEO,
  ModuleAd,
  ContentWrapperUpdate,
} from '../components'
import { GetMenus } from '../queries/GetMenus'
import { GetLatestStories } from '../queries/GetLatestStories'

// Randomized Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function SingleUpdate(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const bannerPerPage = 20

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings
  const { title, content, featuredImage, author, date, contentType, seo, uri } =
    props?.data?.update
  const categories = props?.data?.update?.categories?.edges ?? []
  const relatedStories = categories[0]?.node?.editorials ?? []

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

  const posts = latestStories?.posts ?? []
  const editorials = latestStories?.editorials ?? []
  const updates = latestStories?.updates ?? []

  const mainPosts = []
  const mainEditorialPosts = []
  const mainUpdatesPosts = []

  // loop through all the main categories posts
  posts?.edges?.forEach((post) => {
    mainPosts.push(post.node)
  })

  // loop through all the main categories and their posts
  editorials?.edges?.forEach((post) => {
    mainEditorialPosts.push(post.node)
  })

  // loop through all the main categories and their posts
  updates?.edges?.forEach((post) => {
    mainUpdatesPosts.push(post.node)
  })

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

  // Get Specific Banner
  const {
    data: bannerSpecificData,
    error: bannerSpecificError,
    fetchMore: fetchMoreSpecificBanner,
  } = useQuery(GetSpecificBannerAds, {
    variables: {
      first: bannerPerPage,
      after: null,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  if (bannerSpecificError) {
    return <pre>{JSON.stringify(error)}</pre>
  }

  // Specific Banner Ads
  const bannerSpecificAdsArray = bannerSpecificData?.bannerAds?.edges || []
  const bannerSpecificAdsWithImg = bannerSpecificAdsArray.filter(
    (bannerAd) => !bannerAd?.node?.content.includes('<!--'),
  )

  const matchingBannerAdsWithImg = bannerSpecificAdsWithImg.filter(
    (bannerAd) => {
      const anyOfUris = bannerAd?.node?.acfBannerAds?.anyOf?.map(
        (anyOfItem) => anyOfItem.uri,
      )
      return anyOfUris && anyOfUris.includes(categories[0]?.node?.uri)
    },
  )

  const sortedBannerAdsArray = [...matchingBannerAdsWithImg]

  return (
    <>
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={featuredImage?.node?.sourceUrl}
        url={uri}
        focuskw={seo?.focuskw}
      />
      <SingleHeader
        title={siteTitle}
        description={siteDescription}
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
        fourthMenuItems={fourthMenu}
        fifthMenuItems={fifthMenu}
        featureMenuItems={featureMenu}
        latestStories={allPosts}
        menusLoading={menusLoading}
        latestLoading={latestLoading}
      />
      <Main>
        <>
          <Container>
            <SingleUpdateEntryHeader
              image={featuredImage?.node}
              title={title}
              categoryUri={categories[0]?.node?.uri}
              contentTypeName={contentType?.node?.graphqlPluralName}
              categoryName={categories[0]?.node?.name}
              author={author.node.name}
              date={date}
            />
            <ContentWrapperUpdate content={content} />
            {sortedBannerAdsArray.map((bannerAd) => (
              <ModuleAd bannerAd={bannerAd?.node?.content} />
            ))}
          </Container>
        </>
      </Main>
      <Footer />
    </>
  )
}

SingleUpdate.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    update(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      contentType {
        node {
          graphqlPluralName
        }
      }
      seo {
        title
        metaDesc
        focuskw
      }
      uri
      ...FeaturedImageFragment
      author {
        node {
          name
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
                uri
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
            updates {
              edges {
                node {
                  title
                  excerpt
                  uri
                  ...FeaturedImageFragment
                  categories {
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
          }
        }
      }
      ...FeaturedImageFragment
    }
    generalSettings {
      ...BlogInfoFragment
    }
  }
`

SingleUpdate.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}
