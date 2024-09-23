import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CachePersistor} from 'apollo3-cache-persist';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {END_POINT, ACCESS_TOKEN} from './config';

const httpLink = new HttpLink({
  uri: `${END_POINT}/graphql`,
});
const authLink = setContext(async (_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : '',
      'App-Version': 3.1,
      'Content-Type': 'application/json',
    },
  };
});

const apolloCache = new InMemoryCache();

export const setupCachePersistor = (): CachePersistor<any> =>
  new CachePersistor({
    cache: apolloCache,
    storage: AsyncStorage,
    debug: false,
  });
const errorLink = onError(error => {
  console.log('error', error);
});
const link = ApolloLink.from([errorLink, httpLink]);

export const setupGraphQlClient = (): ApolloClient<any> =>
  new ApolloClient({
    link: authLink.concat(link),
    cache: apolloCache,
    queryDeduplication: false,
  });
