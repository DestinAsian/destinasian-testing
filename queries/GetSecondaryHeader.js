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
          }
        }
      }
    }
    post(id: $id, idType: DATABASE_ID) {
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
    }
  }
`
