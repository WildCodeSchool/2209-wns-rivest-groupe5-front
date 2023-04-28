import { gql } from '@apollo/client'

export const GET_USER_ACTIVITIES = gql`
  query GetPublicOrFollowedUserLastSevenDaysActivities($userId: Float!) {
    getPublicOrFollowedUserLastSevenDaysActivities(userId: $userId) {
      activityDate
      activityId
      activityType {
        label
        name
        emoji
        backgroundColor
        activityTypeId
      }
      carbonQuantity
      createdAt
      description
      title
      user {
        firstname
        lastname
        userId
      }
    }
  }
`
