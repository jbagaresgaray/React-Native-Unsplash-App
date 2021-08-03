import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Landing from '../pages/Landing/Landing';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import BottomTabNavigator from './tabs';

const RootStack = createStackNavigator<any>();
const navigationOptions: StackNavigationOptions = {
  gestureEnabled: false,
  headerBackTitleVisible: false,
};

const RootNavigators = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={navigationOptions}
        initialRouteName="Landing">
        <RootStack.Screen
          name="Landing"
          component={Landing}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Register"
          options={{
            headerTransparent: true,
            headerTintColor: '#111',
            headerTitle: () => null,
          }}
          component={Register}
        />
        <RootStack.Screen
          name="Login"
          options={{
            headerTransparent: true,
            headerTintColor: '#111',
            headerTitle: () => null,
          }}
          component={Login}
        />
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
