import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import { useState, useEffect } from 'react'
import {
  SingleHeader,
  Footer,
  Main,
  Container,
  SingleUpdateEntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
  SingleEditorialFeaturedImage,
  ContentWrapperEditorial,
  ModuleAd,
  RelatedStories,
  EntryRelatedStories,
  ContentWrapperUpdate,
} from '../components'

export default function SingleUpdate(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? []
  const secondaryMenu = props?.data?.secondHeaderMenuItems?.nodes ?? []
  const thirdMenu = props?.data?.thirdHeaderMenuItems?.nodes ?? []
  const fourthMenu = props?.data?.fourthHeaderMenuItems?.nodes ?? []
  const fifthMenu = props?.data?.fifthHeaderMenuItems?.nodes ?? []
  const featureMenu = props?.data?.featureHeaderMenuItems?.nodes ?? []
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? []
  const {
    title,
    content,
    featuredImage,
    author,
    date,
    contentType,
  } = props?.data?.update
  const categories = props?.data?.update?.categories?.edges ?? []
  const posts = props?.data?.posts ?? []
  const editorials = props?.data?.editorials ?? []
  const relatedStories = categories[0]?.node?.editorials ?? []

  const mainPosts = []
  const mainEditorialPosts = []
  const mainRelatedStories = []

  // Randomized Function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  // loop through all the main categories posts
  posts.edges.forEach((post) => {
    mainPosts.push(post.node)
  })

  // loop through all the main categories and their posts
  editorials.edges.forEach((post) => {
    mainEditorialPosts.push(post.node)
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
  ]

  // sortByDate mainCat & childCat Posts
  const allPosts = mainCatPosts.sort(sortPostsByDate)

  // const images = [
  //   acfSingleEditorialSlider.slide1 != null
  //     ? acfSingleEditorialSlider.slide1.mediaItemUrl
  //     : null,
  //   acfSingleEditorialSlider.slide2 != null
  //     ? acfSingleEditorialSlider.slide2.mediaItemUrl
  //     : null,
  //   acfSingleEditorialSlider.slide3 != null
  //     ? acfSingleEditorialSlider.slide3.mediaItemUrl
  //     : null,
  //   acfSingleEditorialSlider.slide4 != null
  //     ? acfSingleEditorialSlider.slide4.mediaItemUrl
  //     : null,
  //   acfSingleEditorialSlider.slide5 != null
  //     ? acfSingleEditorialSlider.slide5.mediaItemUrl
  //     : null,
  // ]

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
    <>
      <SEO
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
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
      />
      <Main>
        <>
          <Container>
            {/* <SingleEditorialFeaturedImage image={featuredImage?.node} /> */}
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
            {/* <ModuleAd banner1={}/> */}
            {/* <EntryRelatedStories /> */}
            {/* {shuffledRelatedStories.map((post) => (
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
            ))} */}
          </Container>
        </>
      </Main>
      <Footer />
    </>
  )
}

SingleUpdate.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPost(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $secondHeaderLocation: MenuLocationEnum
    $thirdHeaderLocation: MenuLocationEnum
    $fourthHeaderLocation: MenuLocationEnum
    $fifthHeaderLocation: MenuLocationEnum
    $featureHeaderLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
    $first: Int = 10
    $where: RootQueryToPostConnectionWhereArgs = { status: PUBLISH }
    $where1: RootQueryToEditorialConnectionWhereArgs = { status: PUBLISH }
  ) {
    update(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      contentType {
        node {
          graphqlPluralName
        }
      }
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
    posts(first: $first, where: $where) {
      edges {
        node {
          id
          title
          content
          date
          uri
          excerpt
          ...FeaturedImageFragment
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
          acfCategoryIcon {
            categoryLabel
            chooseYourCategory
          }
          acfLocationIcon {
            fieldGroupName
            locationLabel
            locationUrl
          }
        }
      }
    }
    editorials(first: $first, where: $where1) {
      edges {
        node {
          id
          title
          content
          date
          uri
          excerpt
          ...FeaturedImageFragment
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
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(
      where: { location: $headerLocation }
      first: 20
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    secondHeaderMenuItems: menuItems(
      where: { location: $secondHeaderLocation }
      first: 20
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    thirdHeaderMenuItems: menuItems(
      where: { location: $thirdHeaderLocation }
      first: $first
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    fourthHeaderMenuItems: menuItems(
      where: { location: $fourthHeaderLocation }
      first: $first
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    fifthHeaderMenuItems: menuItems(
      where: { location: $fifthHeaderLocation }
      first: $first
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    featureHeaderMenuItems: menuItems(
      where: { location: $featureHeaderLocation }
      first: $first
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`

SingleUpdate.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    headerLocation: MENUS.PRIMARY_LOCATION,
    secondHeaderLocation: MENUS.SECONDARY_LOCATION,
    thirdHeaderLocation: MENUS.THIRD_LOCATION,
    fourthHeaderLocation: MENUS.FOURTH_LOCATION,
    fifthHeaderLocation: MENUS.FIFTH_LOCATION,
    featureHeaderLocation: MENUS.FEATURE_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  }
}
