import { gql } from '@apollo/client'

export const GetMoreReviews = gql`
  query GetMoreReviews($id: ID!, $notIn: [ID!]) {
    post(id: $id, idType: DATABASE_ID) {
      categories(first: 1) {
        edges {
          node {
            posts(first: 10, where: {notIn: $notIn}) {
              edges {
                node {
                  title
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
