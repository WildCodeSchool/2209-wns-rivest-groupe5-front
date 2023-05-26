import { gql } from '@apollo/client'

export const SEARCH_USERS = gql`
  query SearchPublicUsers($searchString: String!) {
    searchPublicUsers(searchString: $searchString) {
      email
      firstname
      lastname
      userId
      visibility
      avatar
    }
  }
`
