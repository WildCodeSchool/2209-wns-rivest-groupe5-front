import { gql } from '@apollo/client'

export const GET_IS_USER_FOLLOWING = gql`
  query Query($targetUserId: Float!) {
    getIsUserIsFollowing(targetUserId: $targetUserId)
  }
`
