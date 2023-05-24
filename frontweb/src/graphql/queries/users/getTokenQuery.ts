import { gql } from '@apollo/client'

export const GET_TOKEN_LOGIN = gql`
  query GetToken($email: String!, $password: String!) {
    getToken(email: $email, password: $password) {
      token
      userFromDB {
        userId
        email
        firstname
        lastname
        visibility
        avatar
      }
    }
  }
`
