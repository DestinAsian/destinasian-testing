import { gql } from '@apollo/client'

export const GetCategoryStories = gql`
  query GetCategoryStories($first: Int, $after: String, $id: ID!) {
    category(id: $id, idType: URI) {
      name
      contentNodes(
        first: $first
        after: $after
        where: {
          status: PUBLISH
          contentTypes: [POST, EDITORIAL, UPDATE]
          orderby: { field: DATE, order: DESC }
        }
      ) {
        edges {
          node {
            ... on Post {
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
            ... on Update {
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
      children {
        edges {
          node {
            name
            uri
            contentNodes(
              first: $first
              after: $after
              where: {
                status: PUBLISH
                contentTypes: [POST, EDITORIAL, UPDATE]
                orderby: { field: DATE, order: DESC }
              }
            ) {
              edges {
                node {
                  ... on Post {
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
                  ... on Update {
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
            children {
              edges {
                node {
                  name
                  uri
                  contentNodes(
                    first: $first
                    after: $after
                    where: {
                      status: PUBLISH
                      contentTypes: [POST, EDITORIAL, UPDATE]
                      orderby: { field: DATE, order: DESC }
                    }
                  ) {
                    edges {
                      node {
                        ... on Post {
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
                        ... on Update {
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
  }
`
