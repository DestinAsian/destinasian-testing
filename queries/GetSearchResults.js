import { gql } from '@apollo/client'

export const GetSearchResults = gql`
  query GetSearchResults($first: Int!, $after: String, $search: String) {
    tags(
      first: $first
      after: $after
      where: { search: $search, hideEmpty: true }
    ) {
      edges {
        node {
          contentNodes(
            first: 1000
            where: {
              status: PUBLISH
              contentTypes: [
                POST
                EDITORIAL
                ADVERTORIAL
                READERS_CHOICE_AWARD
                TRAVEL_GUIDES
              ]
              dateQuery: { after: { month: 1, year: 2024 } }
            }
          ) {
            edges {
              node {
                id
                uri
                date
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
                  passwordProtected {
                    onOff
                  }
                  featuredImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                  categories(first: 10, where: { childless: true }) {
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
                  title
                  excerpt
                  passwordProtected {
                    onOff
                  }
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
                      }
                    }
                  }
                }
                ... on Advertorial {
                  title
                  excerpt
                  passwordProtected {
                    onOff
                  }
                  featuredImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                }
                ... on ReadersChoiceAward {
                  title
                  excerpt
                  passwordProtected {
                    onOff
                  }
                  featuredImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                }
                ... on TravelGuide {
                  title
                  excerpt
                  featuredImage {
                    node {
                      sourceUrl
                      altText
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
