import { gql } from '@apollo/client'

const CREATE_GOOD_DEAL = gql`
  mutation Mutation($data: CreateGoodDealInput!) {
    createGoodDeal(data: $data) {
      goodDealTitle
      goodDealContent
      goodDealDescription
      image
    }
  }
`

export default CREATE_GOOD_DEAL
