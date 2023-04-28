import { ApolloError } from '@apollo/client/errors'

export interface IChartDataState {
  data: any
  loading: boolean
  error: ApolloError | undefined
}
