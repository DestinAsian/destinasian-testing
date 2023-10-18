import { gql, useQuery } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  Header,
  Footer,
  Main,
  Container,
  EntryHeader,
  NavigationMenu,
  FeaturedImage,
  Post,
  SEO,
} from '../components'
import { GetMenus } from '../queries/GetMenus'
import { GetLatestStories } from '../queries/GetLatestStories'

export default function Component(props) {
  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings
  const { name, posts } = props?.data?.nodeByUri

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

  // sortByDate mainCat & childCat Posts
  const allPosts = mainCatPosts.sort(sortPostsByDate)

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
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
      <Header
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
          <EntryHeader title={`Tag: ${name}`} />
          <Container>
            {posts.edges.map((post) => (
              <Post
                title={post.node.title}
                content={post.node.content}
                date={post.node.date}
                author={post.node.author?.node.name}
                uri={post.node.uri}
                featuredImage={post.node.featuredImage?.node}
              />
            ))}
          </Container>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  )
}

Component.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetTagPage($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Tag {
        name
        posts {
          edges {
            node {
              id
              title
              content
              date
              uri
              ...FeaturedImageFragment
              author {
                node {
                  name
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

Component.variables = ({ uri }) => {
  return {
    uri,
  }
}
