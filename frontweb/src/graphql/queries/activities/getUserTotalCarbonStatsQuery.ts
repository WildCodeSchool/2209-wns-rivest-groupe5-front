import { gql } from '@apollo/client'

export const GET_USER_TOTAL_CARBON_STATS = gql`
  query GetPublicOrFollowedUserTotalCarbonPerActivityType(
    $userIdToGetStats: Float!
  ) {
    getPublicOrFollowedUserTotalCarbonPerActivityType(
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
