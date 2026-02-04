import { gql } from '@apollo/client'

export const GetSearchResults = gql`
  query GetSearchResults($first: Int!, $search: String, $year: Int!) {
    tags(first: 500, where: { search: $search, hideEmpty: true }) {
      edges {
        node {
          contentNodes(
            first: $first
            where: {
              status: PUBLISH
              contentTypes: [POST, EDITORIAL, UPDATE, ADVERTORIAL]
              dateQuery: { after: { month: 12, year: $year } }
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
              }
            }
          }
        }
        cursor
      }
    }
  }
`
