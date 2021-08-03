import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import RootNavigators from './src/navigations';
import {persistor, store} from './src/stores';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle="default" />
          <RootNavigators />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
