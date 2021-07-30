import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Landing from '../pages/Landing/Landing';
import BottomTabNavigator from './tabs';

const RootStack = createStackNavigator<any>();
const navigationOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
  headerBackTitleVisible: false,
};

const RootNavigators = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        headerMode="none"
        screenOptions={navigationOptions}
        initialRouteName="Landing">
        <RootStack.Screen name="Landing" component={Landing} />
        <RootStack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigators;
