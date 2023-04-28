import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import ReactDOM from 'react-dom/client'
import { setContext } from '@apollo/client/link/context'
import './index.css'
import App from './App'
import { RecoilRoot } from 'recoil'

const getServerUri = () => {
  if (process.env.REACT_APP_DB === 'dbdev') {
    return 'http://localhost:5050/'
  } else if (process.env.REACT_APP_DB === 'dbprod') {
    return '/graphql'
  } else {
    return 'http://back:5050/'
  }
}
const httpLink = createHttpLink({
  uri: getServerUri(),
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ApolloProvider>
  </React.StrictMode>
)
