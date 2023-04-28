import { gql } from '@apollo/client'

export const UPDATE_MY_INFOS = gql`
  mutation Mutation($lastname: String!, $firstname: String!) {
    updateMyUserInformations(lastname: $lastname, firstname: $firstname) {
      firstname
      lastname
      userId
      email
      avatar
      visibility
    }
  }
`
