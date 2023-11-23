import { gql } from '@apollo/client'

export const GetSearchResults = gql`
  query GetSearchResults($first: Int!, $after: String, $search: String) {
    tags(
      first: $first
      after: $after
      where: { search: $search, hideEmpty: true }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          contentNodes(
            where: {
              status: PUBLISH
              contentTypes: [
                POST
                EDITORIAL
                ADVERTORIAL
                HONORS_CIRCLE
                UPDATE
                CONTEST
                LUXE_LIST
              ]
            }
          ) {
            edges {
              node {
                id
                uri
                databaseId
                contentType {
                  node {
                    label
                    graphqlPluralName
                  }
                }
                ... on Post {
                  title
                  excerpt
                  date
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
                ... on HonorsCircle {
                  title
                  excerpt
                  date
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
                ... on Editorial {
                  title
                  excerpt
                  date
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
                      }
                    }
                  }
                }
                ... on Advertorial {
                  title
                  excerpt
                  date
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
                ... on LuxeList {
                  title
                  excerpt
                  date
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
                ... on Contest {
                  title
                  excerpt
                  date
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
              }
            }
          }
        }
        cursor
      }
    }
  }
`
