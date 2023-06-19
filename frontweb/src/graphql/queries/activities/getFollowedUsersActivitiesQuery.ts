import { gql } from '@apollo/client'

export const GET_FOLLOWED_USERS_ACTIVITIES = gql`
  query GetAllUsersFollowedLastSevenDaysActivities($page: Float) {
    getAllUsersFollowedLastSevenDaysActivities(page: $page) {
      total
      totalPages
      pageSize
      currentPage
      data {
        title
        createdAt
        user {
          firstname
          lastname
          userId
          avatar
        }
        activityDate
        activityType {
          backgroundColor
          emoji
          label
          name
          activityTypeId
        }
        carbonQuantity
      }
    }
  }
`
