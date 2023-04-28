import { gql } from '@apollo/client'

export const TOGGLE_FOLLOW_USER = gql`
  mutation Mutation($userIdToFollow: Float!) {
    toggleFollowUser(userIdToFollow: $userIdToFollow) {
      user
      userFollowed
    }
  }
`
