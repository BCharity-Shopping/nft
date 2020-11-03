/**
 * An application for Ecssen. Converting their market webapge into a mobile app
 *
 * @author Gary Li
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import BottomTab from './Assets/Navigation/BottomTabNav';
import MyDrawer from './Assets/Navigation/MyDrawer';
import AsyncStorage from '@react-native-community/async-storage';
import {persistCache} from 'apollo3-cache-persist';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'https://wax.api.atomicassets.io/graphql',
  cache,
  defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
});

const App = () => {
  const [loadingCache, setLoadingCache] = useState(true);
  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
      trigger: 'background',
    }).then(() => setLoadingCache(false));
  }, []);
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
