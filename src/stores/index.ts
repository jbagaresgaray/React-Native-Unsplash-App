import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
  },
  rootReducer,
);

const setupReduxFlipper = <M>(middlewares: M[]) => {
  if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
  }

  return middlewares;
};

const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefault) {
    const defaultMiddlewares = getDefault({
      serializableCheck: false,
      immutableCheck: false,
    });
    return setupReduxFlipper([...defaultMiddlewares, thunk]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);
export { store, persistor };
