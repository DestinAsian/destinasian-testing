import { gql, useQuery } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import { useState, useEffect } from 'react'
import {
  SingleHeader,
  Footer,
  Main,
  Container,
  SingleEditorialEntryHeader,
  FeaturedImage,
  SEO,
  SingleEditorialFeaturedImage,
  ContentWrapperEditorial,
  RelatedStories,
  EntryRelatedStories,
} from '../components'
import { GetMenus } from '../queries/GetMenus'
import { GetFooterMenus } from '../queries/GetFooterMenus'
import { GetLatestStories } from '../queries/GetLatestStories'
import { eb_garamond, rubik_mono_one } from '../styles/fonts/fonts'

// Randomized Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function SingleEditorial(props) {
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
    author,
    date,
    acfSingleEditorialSlider,
    seo,
    uri,
  } = props?.data?.editorial
  const categories = props?.data?.editorial?.categories?.edges ?? []
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

  // Header Menu
  const primaryMenu = menusData?.headerMenuItems?.nodes ?? []
  const secondaryMenu = menusData?.secondHeaderMenuItems?.nodes ?? []
  const thirdMenu = menusData?.thirdHeaderMenuItems?.nodes ?? []
  const fourthMenu = menusData?.fourthHeaderMenuItems?.nodes ?? []
  const fifthMenu = menusData?.fifthHeaderMenuItems?.nodes ?? []
  const featureMenu = menusData?.featureHeaderMenuItems?.nodes ?? []

  // Get Footer menus
  const { data: footerMenusData, loading: footerMenusLoading } = useQuery(
    GetFooterMenus,
    {
      variables: {
        first: 50,
        footerHeaderLocation: MENUS.FOOTER_LOCATION,
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    },
  )

  // Footer Menu
  const footerMenu = footerMenusData?.footerHeaderMenuItems?.nodes ?? []

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

  const images = [
    acfSingleEditorialSlider.slide1 != null
      ? acfSingleEditorialSlider.slide1.mediaItemUrl
      : null,
    acfSingleEditorialSlider.slide2 != null
      ? acfSingleEditorialSlider.slide2.mediaItemUrl
      : null,
    acfSingleEditorialSlider.slide3 != null
      ? acfSingleEditorialSlider.slide3.mediaItemUrl
      : null,
    acfSingleEditorialSlider.slide4 != null
      ? acfSingleEditorialSlider.slide4.mediaItemUrl
      : null,
    acfSingleEditorialSlider.slide5 != null
      ? acfSingleEditorialSlider.slide5.mediaItemUrl
      : null,
  ]

  // Randomized slice function
  function getRandomSlice(array, count) {
    const shuffledArray = shuffleArray([...array])
    return shuffledArray.slice(0, count)
  }

  // Shuffle the relatedStories before rendering
  const [shuffledRelatedStories, setShuffledRelatedStories] = useState([])

  useEffect(() => {
    if (relatedStories && relatedStories.edges) {
      const shuffledSlice = getRandomSlice(relatedStories.edges, 5)
      setShuffledRelatedStories(shuffledSlice)
    }
  }, [relatedStories])

  return (
    <main className={`${eb_garamond.variable} ${rubik_mono_one.variable}`}>
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
            <SingleEditorialFeaturedImage image={featuredImage?.node} />
            <SingleEditorialEntryHeader
              image={featuredImage?.node}
              title={title}
              categoryUri={categories[0]?.node?.uri}
              parentCategory={categories[0]?.node?.parent?.node?.name}
              categoryName={categories[0]?.node?.name}
              author={author.node.name}
              date={date}
            />
            <ContentWrapperEditorial content={content} images={images} />
            <EntryRelatedStories />
            {shuffledRelatedStories.map((post) => (
              <Container>
                {post.node.title !== title && (
                  // Render the merged posts here
                  <RelatedStories
                    key={post.node.id}
                    title={post.node.title}
                    excerpt={post.node.excerpt}
                    uri={post.node.uri}
                    category={post.node.categories.edges[0]?.node?.name}
                    categoryUri={post.node.categories.edges[0]?.node?.uri}
                    featuredImage={post.node.featuredImage?.node}
                  />
                )}
              </Container>
            ))}
          </Container>
        </>
      </Main>
      <Footer footerMenu={footerMenu} />
    </main>
  )
}

SingleEditorial.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    editorial(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      ...FeaturedImageFragment
      author {
        node {
          name
        }
      }
      seo {
        title
        metaDesc
      }
      uri
      acfSingleEditorialSlider {
        slide1 {
          mediaItemUrl
        }
        slide2 {
          mediaItemUrl
        }
        slide3 {
          mediaItemUrl
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
            editorials {
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

SingleEditorial.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}
