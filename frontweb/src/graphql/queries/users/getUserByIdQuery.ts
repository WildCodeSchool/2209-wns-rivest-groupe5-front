import { gql } from '@apollo/client'

export const GET_USER_BY_ID = gql`
  query getUserById($userId: Float!) {
    getUserById(userId: $userId) {
      email
      firstname
      lastname
      avatar
    }
  }
`
