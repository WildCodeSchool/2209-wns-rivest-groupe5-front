import { gql } from '@apollo/client'

export const TOGGLE_USER_VISIBILITY = gql`
  mutation Mutation {
    toggleUserVisibility
  }
`
