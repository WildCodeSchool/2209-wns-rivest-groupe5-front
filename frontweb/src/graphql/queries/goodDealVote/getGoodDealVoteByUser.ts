import { gql } from '@apollo/client'

export const GET_GOOD_DEAL_VOTE_BY_USER = gql`
  query getGoodDealVoteByUser($id : Float!) {
    getGoodDealVoteByUser(goodDealId: $id) {
      value
    }
  }
`
