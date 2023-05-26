import { gql } from '@apollo/client'

const CREATE_ACTIVITY = gql`
  mutation Mutation($data: CreateActivityInput!) {
    createActivity(data: $data) {
      title
      description
      carbonQuantity
      activityDate
    }
  }
`

export default CREATE_ACTIVITY
