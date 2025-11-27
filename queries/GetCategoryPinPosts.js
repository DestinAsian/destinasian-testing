import { gql } from '@apollo/client'

export const GetCategoryPinPosts = gql`
  query GetCategoryPinPosts($id: ID!) {
    category(id: $id, idType: DATABASE_ID) {
      pinPosts {
        pinPost {
          ... on Editorial {
            id
            title
            uri
            excerpt
            featuredImage {
              node {
                id
                sourceUrl
                altText
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
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on HonorsCircle {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on ReadersChoiceAward {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on LuxeList {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
        }
        pinPost2 {
          ... on Editorial {
            id
            title
            uri
            excerpt
            featuredImage {
              node {
                id
                sourceUrl
                altText
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
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on HonorsCircle {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on ReadersChoiceAward {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on LuxeList {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
        }
        pinPost3 {
          ... on Editorial {
            id
            title
            uri
            excerpt
            featuredImage {
              node {
                id
                sourceUrl
                altText
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
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on HonorsCircle {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on ReadersChoiceAward {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on LuxeList {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
        }
        pinPost4 {
          ... on Editorial {
            id
            title
            uri
            excerpt
            featuredImage {
              node {
                id
                sourceUrl
                altText
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
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on HonorsCircle {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on ReadersChoiceAward {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on LuxeList {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  }
`
