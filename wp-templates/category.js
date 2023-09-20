import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import { PostFragment } from '../fragments/PostFragment'
import { GetROSBannerAds } from '../queries/GetROSBannerAds'
import { GetSpecificBannerAds } from '../queries/GetSpecificBannerAds'
import {
  CategoryHeader,
  SecondaryHeader,
  Main,
  Container,
  CategoryEntryHeader,
  NavigationMenu,
  Post,
  FeaturedImage,
  SEO,
  ModuleAd,
  Button,
  Footer,
  CategoryStories,
} from '../components'

// Randomized Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

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
  const {
    name,
    uri,
    databaseId,
    description,
    categoryImages,
    posts,
    editorials,
    updates,
    children,
    parent,
    pinPosts,
    countryCode,
    destinationGuides,
  } = props?.data?.nodeByUri ?? []

  // Declare state for banner ads
  const [bannerAdsArray, setBannerAdsArray] = useState([])
  const bannerPerPage = 15

  // // Post per fetching
  // const postsPerPage = 4

  // // Get Posts
  // const { data, error, loading, fetchMore } = useQuery(Component.query, {
  //   variables: {
  //     uri
  //   },
  //   fetchPolicy: 'network-only',
  //   nextFetchPolicy: 'cache-and-network',
  // })

  // Get ROS Banner
  const {
    data: bannerROSData,
    error: bannerROSError,
    fetchMore: fetchMoreROSBanner,
  } = useQuery(GetROSBannerAds, {
    variables: {
      first: bannerPerPage,
      after: null,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })

  if (bannerROSError) {
    return <pre>{JSON.stringify(error)}</pre>
  }

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

  // Rest of World validation
  const rowValidation =
    name !== 'Rest of World' && parent?.node?.name !== 'Rest of World'
      ? true
      : null

  // Latest Travel Stories
  const latestPosts = props?.data?.posts ?? []
  const latestEditorials = props?.data?.editorials ?? []

  const latestMainPosts = []
  const latestMainEditorialPosts = []

  // loop through all the latest categories posts
  latestPosts.edges.forEach((post) => {
    latestMainPosts.push(post.node)
  })

  // loop through all the latest categories and their posts
  latestEditorials.edges.forEach((post) => {
    latestMainEditorialPosts.push(post.node)
  })

  // define latestCatPostCards
  const latestMainCatPosts = [
    ...(latestMainPosts != null ? latestMainPosts : []),
    ...(latestMainEditorialPosts != null ? latestMainEditorialPosts : []),
  ]

  // sort posts by date
  const sortPostsByDate = (a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA // Sort in descending order
  }

  // sortByDate latestCat & childCat Posts
  const latestAllPosts = latestMainCatPosts.sort(sortPostsByDate)

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <CategoryHeader
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

      {rowValidation && (
        <SecondaryHeader
          parent={parent}
          children={children}
          name={name}
          uri={uri}
          countryCode={countryCode}
          parentUri={parent?.node?.uri}
          parentName={parent?.node?.name}
          parentCountryCode={parent?.node?.countryCode?.countryCode}
          titleUri={uri}
          titleName={name}
          titleCountryCode={countryCode?.countryCode}
          destinationGuides={destinationGuides?.destinationGuides}
          parentDestinationGuides={
            parent?.node?.destinationGuides?.destinationGuides
          }
        />
      )}

      {/* EntryHeader category name */}
      {rowValidation && (
        <Container>
          {destinationGuides?.destinationGuides == 'yes' && (
            <CategoryEntryHeader
              title={`The DA Guide to ${name}`}
              image={categoryImages?.categoryImages?.mediaItemUrl || null}
              description={description || null}
              children={children?.edges}
            />
          )}
          {destinationGuides?.destinationGuides == null && (
            <CategoryEntryHeader
              parent={parent?.node?.name}
              title={`${name}`}
              image={categoryImages?.categoryImages?.mediaItemUrl || null}
              description={description || null}
              children={children?.edges}
            />
          )}
        </Container>
      )}

      <Main>
        <>
          <CategoryStories pinPosts={pinPosts} uri={uri} databaseId={databaseId}/>
        </>
      </Main>
      <Footer />
    </>
  )
}

Component.query = gql`
  ${BlogInfoFragment}
  ${PostFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetCategoryPage(
    $uri: String!
    $headerLocation: MenuLocationEnum
    $secondHeaderLocation: MenuLocationEnum
    $thirdHeaderLocation: MenuLocationEnum
    $fourthHeaderLocation: MenuLocationEnum
    $fifthHeaderLocation: MenuLocationEnum
    $featureHeaderLocation: MenuLocationEnum
    $first: Int
    $where: RootQueryToPostConnectionWhereArgs = { status: PUBLISH }
    $where1: RootQueryToEditorialConnectionWhereArgs = { status: PUBLISH }
  ) {
    nodeByUri(uri: $uri) {
      ... on Category {
        name
        databaseId
        uri
        description
        categoryImages {
          categoryImages {
            mediaItemUrl
          }
        }
        countryCode {
          countryCode
        }
        destinationGuides {
          destinationGuides
        }
        pinPosts {
          pinPost {
            ... on Post {
              id
              title
              content
              date
              uri
              excerpt
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
              title
              content
              date
              uri
              excerpt
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
                      }
                    }
                  }
                }
              }
            }
            ... on Advertorial {
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
        posts(first: $first, where: { status: PUBLISH }) {
          edges {
            node {
              id
              title
              content
              date
              uri
              excerpt
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
          }
        }
        editorials(first: $first, where: { status: PUBLISH }) {
          edges {
            node {
              id
              title
              content
              date
              uri
              excerpt
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
                      }
                    }
                  }
                }
              }
            }
          }
        }
        updates(first: $first, where: { status: PUBLISH }) {
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
        parent {
          node {
            name
            uri
            children(where: { childless: true }) {
              edges {
                node {
                  name
                  uri
                }
              }
            }
            countryCode {
              countryCode
            }
            destinationGuides {
              destinationGuides
            }
          }
        }
        children {
          edges {
            node {
              name
              uri
              posts {
                edges {
                  node {
                    ...PostFragment
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
                }
              }
              editorials {
                edges {
                  node {
                    id
                    title
                    content
                    date
                    uri
                    excerpt
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
                            }
                          }
                        }
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
                    posts {
                      edges {
                        node {
                          ...PostFragment
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
                      }
                    }
                    editorials {
                      edges {
                        node {
                          id
                          title
                          content
                          date
                          uri
                          excerpt
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
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
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
  }
`

Component.variables = ({ uri }) => {
  return {
    uri,
    headerLocation: MENUS.PRIMARY_LOCATION,
    secondHeaderLocation: MENUS.SECONDARY_LOCATION,
    thirdHeaderLocation: MENUS.THIRD_LOCATION,
    fourthHeaderLocation: MENUS.FOURTH_LOCATION,
    fifthHeaderLocation: MENUS.FIFTH_LOCATION,
    featureHeaderLocation: MENUS.FEATURE_LOCATION,
  }
}
