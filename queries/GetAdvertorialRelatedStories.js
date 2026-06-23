import { gql } from '@apollo/client'

export const GetAdvertorialRelatedStories = gql`
  query GetAdvertorialRelatedStories($id: ID = "") {
    advertorial(id: $id, idType: DATABASE_ID) {
      relatedStories {
        stories {
          ... on Post {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
            categories(where: { childless: true }) {
              edges {
                node {
                  name
                  uri
                }
              }
            }
          }
          ... on Editorial {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                id
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
          ... on Update {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                id
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
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                id
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
          ... on HonorsCircle {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on ReadersChoiceAward {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on LuxeList {
            id
            title
            excerpt
            contentTypeName
            uri
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
          ... on LuxuryTravel {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                id
                sourceUrl
                altText
              }
            }
            acfAdvertorialLabel {
              advertorialLabel
            }
          }
          ... on TravelGuide {
            id
            uri
            contentTypeName
            title
            excerpt
            featuredImage {
              node {
                id
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
        }
      }
    }
  }
`
