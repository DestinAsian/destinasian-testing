import { gql } from '@apollo/client'

export const GetSearchResults = gql`
  query GetSearchResults($search: String) {
    tags(first: 1000, where: { search: $search, hideEmpty: true }) {
      edges {
        node {
          id
          uri
          contentNodes(
            first: 1000
            where: {
              status: PUBLISH
              contentTypes: [
                ADVERTORIAL
                EDITORIAL
                UPDATE
                POST
                READERS_CHOICE_AWARD
                LUXE_LIST
                LUXURY_TRAVEL
              ]
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
                  passwordProtected {
                    onOff
                  }
                  categories(first: 1, where: { childless: true }) {
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
                ... on Editorial {
                  title
                  passwordProtected {
                    onOff
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
                ... on Update {
                  title
                  passwordProtected {
                    onOff
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
                  passwordProtected {
                    onOff
                  }
                }
                ... on ReadersChoiceAward {
                  title
                  passwordProtected {
                    onOff
                  }
                }
                ... on LuxeList {
                  title
                  passwordProtected {
                    onOff
                  }
                }
                ... on LuxuryTravel {
                  title
                  passwordProtected {
                    onOff
                  }
                  parent {
                    node {
                      ... on LuxuryTravel {
                        title
                        uri
                      }
                    }
                  }
                }
                ... on TravelGuide {
                  title
                  passwordProtected {
                    onOff
                  }
                }
                ... on HonorsCircle {
                  title
                  passwordProtected {
                    onOff
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
