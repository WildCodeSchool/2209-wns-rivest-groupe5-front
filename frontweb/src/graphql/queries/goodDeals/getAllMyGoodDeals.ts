import { gql } from '@apollo/client'

export const GET_ALL_MY_GOOD_DEALS = gql`
  query GetAllMyGoodDeals {
    getAllMyGoodDeals {
      goodDealId
      goodDealTitle
      goodDealLink
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
    }
  }
`
