/**
 * An application for Ecssen. Converting their market webapge into a mobile app
 *
 * @author Gary Li
 */

import {NavigationContainer} from '@react-navigation/native';
import {
  AppearanceProvider,
  useColorScheme,
  Appearance,
} from 'react-native-appearance';
import React from 'react';
import MyDrawer from './src/Navigation/BottomTabNav';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {inflate} from 'graphql-deduplicator';
import {ApolloLink, concat} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';
import {offsetLimitPagination} from '@apollo/client/utilities';
import MyDarkTheme from './src/Styles/DarkThemes';
import MyLightTheme from './src/Styles/LightTheme';

Appearance.getColorScheme();
const httpLink = new HttpLink({
  credentials: 'include',
  uri: 'https://wax.api.atomicassets.io/graphql?deduplicate=1',
});

const inflateLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    return inflate(response);
  });
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          atomicassets_assets: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          //Uncomment this will fix the apollo client out of date warning, but it will break the search functionality
          // atomicassets_assets: offsetLimitPagination(),
        },
      },
    },
  }),
  link: concat(inflateLink, httpLink),
});

const App = () => {
  const scheme = useColorScheme();
  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
          <PaperProvider>
            <StatusBar
              backgroundColor={scheme === 'dark' ? `#696969` : `#00bfff`}
              barStyle={scheme === 'dark' ? 'dark-content' : 'light-content'}
            />
            <MyDrawer />
          </PaperProvider>
        </NavigationContainer>
      </AppearanceProvider>
    </ApolloProvider>
  );
};

export default App;
