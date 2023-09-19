import { gql } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  HCHeader,
  Main,
  Container,
  NavigationMenu,
  FeaturedImage,
  SEO,
  ContentWrapperHCFrontPage,
  EntryHeader,
  SingleContestEntryHeader,
  ContentWrapperContestFrontPage,
} from '../components'

export default function Component(props) {
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
  const { title, content, featuredImage, hcCaption, seo, uri } = props?.data?.page ?? []
  const posts = props?.data?.posts ?? []
  const editorials = props?.data?.editorials ?? []

  const mainPosts = []
  const mainEditorialPosts = []

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

  return (
    <>
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={featuredImage?.node?.sourceUrl}
        url={uri}
      />
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5BJVGS"
          height="0"
          width="0"
          className="hidden invisible"
        ></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      <HCHeader
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
            <SingleContestEntryHeader title={title}/>
            <ContentWrapperContestFrontPage/>
          </Container>
        </>
      </Main>
    </>
  )
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPageData(
    $databaseId: ID = "147"
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
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
      hcCaption {
        hcCaption
      }
      seo {
        title
        metaDesc
      }
      uri
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
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
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
  }
`

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    secondHeaderLocation: MENUS.SECONDARY_LOCATION,
    thirdHeaderLocation: MENUS.THIRD_LOCATION,
    fourthHeaderLocation: MENUS.FOURTH_LOCATION,
    fifthHeaderLocation: MENUS.FIFTH_LOCATION,
    featureHeaderLocation: MENUS.FEATURE_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  }
}
