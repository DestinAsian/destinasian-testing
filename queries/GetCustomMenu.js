import { gql } from '@apollo/client'

export const GetCustomMenu = gql`
  query GetCustomMenu($id: ID = "") {
    menu(id: $id, idType: LOCATION) {
      id
      customMenuFields {
        menuDescription
      }
      menuItems(first: 30, where: { location: CUSTOM }) {
        nodes {
          uri
          label
          connectedNode {
            node {
              uri
              ... on Post {
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
              ... on Update {
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
              ... on HonorsCircle {
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
              ... on LuxuryTravel {
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
    }
  }
`
