import React from 'react';
import AppNavigation from './app/navigations';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './app/store/store';
import {NotificationProvider} from './app/context/NotificationContext';
import {PrinterProvider} from './app/context/PrinterHandler';
import {ApolloProvider} from '@apollo/client';
import {AppState, Platform} from 'react-native';
import {AppStateProvider} from './app/context/AppStateContext';
// import {useGraphQLClient} from './app/api/useGraphqlClient';

import {setupCachePersistor, setupGraphQlClient} from './app/api/client';

const persistor = setupCachePersistor();
const client = setupGraphQlClient();

const useGraphQLClient = () => {
  React.useEffect(() => {
    const loadCache = async () => {
      await persistor.restore();
    };

    loadCache();
  }, []);

  return client;
};

const App = () => {
  React.useEffect(() => {
   
  }, []);

  const client = useGraphQLClient();
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NotificationProvider>
          <PrinterProvider>
            <AppStateProvider>
              <NavigationContainer>
                <AppNavigation />
              </NavigationContainer>
            </AppStateProvider>
          </PrinterProvider>
        </NotificationProvider>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
