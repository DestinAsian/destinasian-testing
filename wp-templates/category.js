import React from 'react'
import { gql, useQuery } from '@apollo/client'
import * as MENUS from '../constants/menus'
import { BlogInfoFragment } from '../fragments/GeneralSettings'
import {
  CategoryHeader,
  SecondaryHeader,
  Main,
  CategoryEntryHeader,
  FeaturedImage,
  SEO,
  Footer,
  CategoryStories,
} from '../components'
import { GetMenus } from '../queries/GetMenus'
import { GetFooterMenus } from '../queries/GetFooterMenus'
import { GetLatestStories } from '../queries/GetLatestStories'
import { eb_garamond, rubik_mono_one } from '../styles/fonts/fonts'

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings
  const {
    name,
    description,
    children,
    parent,
    pinPosts,
    categoryImages,
    destinationGuides,
    databaseId,
    seo,
    uri,
  } = props?.data?.category ?? []

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

  // Category Slider
  const categorySlider = [
    [
      categoryImages.categorySlide1 != null
        ? categoryImages.categorySlide1.mediaItemUrl
        : null,
      categoryImages.categorySlideCaption1 != null
        ? categoryImages?.categorySlideCaption1
        : null,
    ],
    [
      categoryImages.categorySlide2 != null
        ? categoryImages.categorySlide2.mediaItemUrl
        : null,
      categoryImages.categorySlideCaption2 != null
        ? categoryImages?.categorySlideCaption2
        : null,
    ],
    [
      categoryImages.categorySlide3 != null
        ? categoryImages.categorySlide3.mediaItemUrl
        : null,
      categoryImages.categorySlideCaption3 != null
        ? categoryImages?.categorySlideCaption3
        : null,
    ],
    [
      categoryImages.categorySlide4 != null
        ? categoryImages.categorySlide4.mediaItemUrl
        : null,
      categoryImages.categorySlideCaption4 != null
        ? categoryImages?.categorySlideCaption4
        : null,
    ],
    [
      categoryImages.categorySlide5 != null
        ? categoryImages.categorySlide5.mediaItemUrl
        : null,
      categoryImages.categorySlideCaption5 != null
        ? categoryImages?.categorySlideCaption5
        : null,
    ],
  ]

  return (
    <main className={`${eb_garamond.variable} ${rubik_mono_one.variable}`}>
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={
          categorySlider[0]
            ? categorySlider[0]
            : categoryImages?.categoryImages?.mediaItemUrl
        }
        url={uri}
        focuskw={seo?.focuskw}
      />
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
        menusLoading={menusLoading}
        latestLoading={latestLoading}
      />
      <SecondaryHeader databaseId={databaseId} />
      {/* EntryHeader category name */}
      <CategoryEntryHeader
        parent={parent?.node?.name}
        children={children?.edges}
        title={name}
        destinationGuides={destinationGuides?.destinationGuides}
        changeToSlider={categoryImages?.changeToSlider}
        guidesTitle={destinationGuides?.guidesTitle}
        categorySlider={categorySlider}
        image={categoryImages?.categoryImages?.mediaItemUrl}
        imageCaption={categoryImages?.categoryImagesCaption}
        description={description}
      />
      <Main>
        <>
          <CategoryStories
            categoryUri={databaseId}
            pinPosts={pinPosts}
            name={name}
            children={children}
            parent={parent?.node?.name}
          />
        </>
      </Main>
      <Footer footerMenu={footerMenu} />
    </main>
  )
}

Component.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetCategoryPage($databaseId: ID!) {
    category(id: $databaseId, idType: DATABASE_ID) {
      name
      description
      databaseId
      uri
      seo {
        title
        metaDesc
        focuskw
      }
      categoryImages {
        changeToSlider
        categorySlide1 {
          mediaItemUrl
        }
        categorySlide2 {
          mediaItemUrl
        }
        categorySlide3 {
          mediaItemUrl
        }
        categorySlide4 {
          mediaItemUrl
        }
        categorySlide5 {
          mediaItemUrl
        }
        categoryImages {
          mediaItemUrl
        }
        categorySlideCaption1
        categorySlideCaption2
        categorySlideCaption3
        categorySlideCaption4
        categorySlideCaption5
        categoryImagesCaption
      }
      destinationGuides {
        destinationGuides
        guidesTitle
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
          }
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
  }
`

Component.variables = ({ databaseId }) => {
  return {
    databaseId,
  }
}
