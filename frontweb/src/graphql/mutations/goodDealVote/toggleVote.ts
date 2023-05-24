import { gql } from '@apollo/client'

export const TOGGLE_VOTE = gql`
  mutation Mutation($goodDealId: Float!, $value: Float!) {
    createGoodDealVote(goodDealId: $goodDealId, value: $value) {
      goodDealVoteId
    }
  }
`
