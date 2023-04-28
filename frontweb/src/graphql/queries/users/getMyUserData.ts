import { gql } from '@apollo/client'

export const GET_MY_USER_DATA = gql`
  query GetMyUserData {
    getMyUserData {
      email
      visibility
      lastname
      firstname
      userId
    }
  }
`
