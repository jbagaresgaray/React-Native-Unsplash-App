import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigators from './src/navigations';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="default" />
      <RootNavigators />
    </SafeAreaProvider>
  );
};

export default App;
