import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import RootNavigators from './src/navigations';
import { persistor, store } from './src/stores';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

declare var console: any;
declare var global: any;

const App = () => {
  if (__DEV__) {
    console.disableYellowBox = true;
    if (
      global.location &&
      (global.location?.pathname?.includes('/debugger-ui') ||
        global.location?.pathname?.includes('Debugger'))
    ) {
      global.XMLHttpRequest = global.originalXMLHttpRequest
        ? global.originalXMLHttpRequest
        : global.XMLHttpRequest;
      global.FormData = global.originalFormData
        ? global.originalFormData
        : global.FormData;
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <StatusBar barStyle="default" />
            <RootNavigators />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
