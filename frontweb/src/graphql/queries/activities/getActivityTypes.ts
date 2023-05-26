import { gql } from '@apollo/client'

const GET_ACTIVITY_TYPE = gql`
  query GetAllActivityTypes {
    getAllActivityTypes {
      emoji
      activityTypeId
      label
      name
    }
  }
`

export default GET_ACTIVITY_TYPE
