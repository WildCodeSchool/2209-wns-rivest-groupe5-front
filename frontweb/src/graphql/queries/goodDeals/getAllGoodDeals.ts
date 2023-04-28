import { gql } from '@apollo/client'

export const GET_ALL_GOOD_DEALS = gql`
  query getAllGoodDeals($limit: Float, $order: FindOptionsOrderValue) {
    getAllGoodDeals(limit: $limit, order: $order) {
      goodDealId
      goodDealTitle
      goodDealLink
      goodDealContent
      image
      createdAt
      user {
        userId
        email
        firstname
        lastname
        avatar
      }
    }
  }
`
