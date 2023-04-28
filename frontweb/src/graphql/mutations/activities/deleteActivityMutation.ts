import { gql } from '@apollo/client'

export const DELETE_ACTIVITY = gql`
  mutation DeleteActivity($activityId: Float!) {
    deleteActivity(activityId: $activityId)
  }
`
