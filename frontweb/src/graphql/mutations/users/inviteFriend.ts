import { gql } from '@apollo/client'

export const INVITE_FRIEND = gql`
  mutation InviteFriend($email: String!) {
    inviteFriend(email: $email)
  }
`
