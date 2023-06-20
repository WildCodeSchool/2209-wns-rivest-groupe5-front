import { gql } from '@apollo/client'

const UPDATE_GOOD_DEAL = gql`
  mutation UpdateGoodDeal($data: UpdateGoodDealInput!, $goodDealId: Float!) {
    updateGoodDeal(data: $data, goodDealId: $goodDealId) {
      goodDealTitle
    }
  }
`

export default UPDATE_GOOD_DEAL
