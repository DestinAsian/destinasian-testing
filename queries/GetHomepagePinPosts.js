import { gql } from '@apollo/client'

export const GetHomepagePinPosts = gql`
  query GetHomepagePinPosts($id: ID!, $asPreview: Boolean = false) {
    page(id: $id, idType: DATABASE_ID, asPreview: $asPreview) {
      homepagePinPosts {
        pinPost1 {
          ... on Post {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
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
          ... on Update {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
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
          ... on HonorsCircle {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
          ... on LuxuryTravel {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
          ... on Advertorial {
            id
            title
            excerpt
            uri
            contentTypeName
            featuredImage {
              node {
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
        }
        pinPost2 {
          ... on Post {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
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
          ... on Update {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
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
          ... on HonorsCircle {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
          ... on LuxuryTravel {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
          ... on Advertorial {
            id
            title
            excerpt
            uri
            contentTypeName
            featuredImage {
              node {
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
        }
        pinPost3 {
          ... on Post {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
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
          ... on Update {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
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
          ... on HonorsCircle {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
          ... on LuxuryTravel {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
          ... on Advertorial {
            id
            title
            excerpt
            uri
            contentTypeName
            featuredImage {
              node {
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
        }
      }
    }
  }
`
