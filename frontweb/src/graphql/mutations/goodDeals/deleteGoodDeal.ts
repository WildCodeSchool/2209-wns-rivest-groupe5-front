import { gql } from '@apollo/client'

const DELETE_GOOD_DEAL = gql`
  mutation DeleteGoodDeal($goodDealId: Float!) {
    deleteGoodDeal(goodDealId: $goodDealId)
  }
`

export default DELETE_GOOD_DEAL
