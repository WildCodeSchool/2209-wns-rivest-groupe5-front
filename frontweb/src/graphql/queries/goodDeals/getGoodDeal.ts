import { gql } from '@apollo/client'

export const GET_GOOD_DEAL = gql`
  query getGoodDeal($id: Float!) {
    getGoodDeal(goodDealId: $id) {
      goodDealId
      goodDealTitle
      goodDealLink
      goodDealContent
      goodDealDescription
      image
      createdAt
      user {
        userId
        email
        firstname
        lastname
        avatar
      }
      total
    }
  }
`
