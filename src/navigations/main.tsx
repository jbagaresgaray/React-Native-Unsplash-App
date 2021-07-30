import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {COLORS} from '../constants/Colors';
import TabHome from '../pages/TabHome/TabHome';
import TabCollections from '../pages/TabCollections/TabCollections';
import TabSearch from '../pages/TabSearch/TabSearch';
import TabAccount from '../pages/TabAccount/TabAccount';
import AppHeaderLogo from '../components/AppHeaderLogo/AppHeaderLogo';

const Stack = createStackNavigator<any>();

const navigationOptions: StackNavigationOptions = {
  gestureEnabled: false,
  headerStyle: {
    backgroundColor: COLORS.white,
  },
  headerBackTitleVisible: false,
  headerTintColor: COLORS.black,
  headerTitle: () => <AppHeaderLogo color="dark" height={30} width={115} />,
};

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name="Home" component={TabHome} />
    </Stack.Navigator>
  );
};

export const CollectionStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name="Collections" component={TabCollections} />
    </Stack.Navigator>
  );
};

export const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name="Search" component={TabSearch} />
    </Stack.Navigator>
  );
};

export const AccountsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name="Accounts" component={TabAccount} />
    </Stack.Navigator>
  );
};
