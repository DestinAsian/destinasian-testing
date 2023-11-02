import { gql } from '@apollo/client'

export const GetSecondaryHeader = gql`
  query GetSecondaryHeader($id: ID!) {
    category(id: $id, idType: DATABASE_ID) {
      name
      uri
      countryCode {
        countryCode
      }
      destinationGuides {
        destinationGuides
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
          parent {
            node {
              name
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
                  id
                  title
                  content
                  date
                  uri
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
    post(id: $id, idType: DATABASE_ID) {
      title
      databaseId
      content
      date
      author {
        node {
          name
        }
      }
      seo {
        title
        metaDesc
        focuskw
      }
      uri
      categories(where: { childless: true }) {
        edges {
          node {
            name
            uri
            parent {
              node {
                name
                uri
                countryCode {
                  countryCode
                }
                destinationGuides {
                  destinationGuides
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
        }
      }
      acfPostSlider {
        slide1 {
          mediaItemUrl
        }
        slide2 {
          mediaItemUrl
        }
        slide3 {
          mediaItemUrl
        }
        slide4 {
          mediaItemUrl
        }
        slide5 {
          mediaItemUrl
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
`
