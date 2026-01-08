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
              dateQuery: { after: { month: 12, year: 2024 } }
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
                ... on TravelGuide {
                  title
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
