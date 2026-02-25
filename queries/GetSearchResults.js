import { gql } from '@apollo/client'

export const GetSearchResults = gql`
  query GetSearchResults($first: Int!, $search: String, $year: Int!) {
    posts(
      first: $first
      where: {
        status: PUBLISH
        search: $search
        orderby: { field: DATE, order: DESC }
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
      }
    }
    editorials(
      first: $first
      where: {
        status: PUBLISH
        search: $search
        orderby: { field: DATE, order: DESC }
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
      }
    }
    updates(
      first: $first
      where: {
        status: PUBLISH
        search: $search
        orderby: { field: DATE, order: DESC }
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
      }
    }
    advertorials(
      first: $first
      where: {
        status: PUBLISH
        search: $search
        orderby: { field: DATE, order: DESC }
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
          title
          passwordProtected {
            onOff
          }
        }
      }
    }
  }
`
