import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import globalSlice, {globalLoadingType} from './globalSlice';
import infoSlice, {infoType} from './infoSlice';
import drawerSlice, {drawerType} from './drawerSlice';

import deviceSlice, {deviceType} from './deviceSlice'; // Import deviceSlice
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native

// Define the global store type
export type globalStore = {
  global: globalLoadingType;
  device: deviceType; // Adjust the type according to your deviceSlice structure,
  info: infoType;
  drawer: drawerType;
};

// Redux Persist config with blacklist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // or use 'storage' for web projects
  blacklist: ['global'], // Blacklist 'global' slice to prevent persistence
};

// Combine reducers
const rootReducer = combineReducers({
  global: globalSlice,
  device: deviceSlice, // Add deviceSlice to the root reducer,
  info: infoSlice,
  drawer: drawerSlice,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create/configure store
const store = configureStore({
  reducer: persistedReducer, // Use persisted reducer
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sagaMiddleware),
  // devTools: process.env.NODE_ENV !== 'production'
});

// Create persistor
export const persistor = persistStore(store);

export default store;
