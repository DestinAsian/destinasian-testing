import { gql } from '@apollo/client'

export const GetPageRelatedStories = gql`
  query GetPageRelatedStories($id: ID = "") {
    page(id: $id, idType: DATABASE_ID) {
      relatedStories {
        stories {
          ... on Post {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
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
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
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
          ... on Update {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
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
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
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
          ... on HonorsCircle {
            id
            uri
            contentTypeName
            title
            excerpt
            contentType {
              node {
                label
              }
            }
            featuredImage {
              node {
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
          ... on Video {
            id
            contentTypeName
            title
            content
            featuredImage {
              node {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            videosAcf {
              videoLink
              guidesCategoryLink
              guidesCategoryText
              customLink
              customText
            }
          }
        }
      }
    }
  }
`
