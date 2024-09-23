import React from 'react';

import {setupCachePersistor, setupGraphQlClient} from './client';

const persistor = setupCachePersistor();
const client = setupGraphQlClient();

export const useGraphQLClient = () => {
  React.useEffect(() => {
    const loadCache = async () => {
      await persistor.restore();
    };

    loadCache();
  }, []);

  return client;
};
