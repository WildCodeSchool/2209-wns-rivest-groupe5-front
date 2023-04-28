import { gql } from '@apollo/client'

export const GET_USER_ACTIVITIES_STATS = gql`
  query GetPublicOrFollowedUserLastWeekActivities($userIdToGetStats: Float!) {
    getPublicOrFollowedUserLastWeekActivities(
      userIdToGetStats: $userIdToGetStats
    ) {
      datasets {
        backgroundColor
        data
        emoji
        id
        label
        name
      }
      labels
    }
  }
`
