import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { COLORS } from '../constants/Colors';
import TabHome from '../pages/TabHome/TabHome';
import TabCollections from '../pages/TabCollections/TabCollections';
import TabSearch from '../pages/TabSearch/TabSearch';
import TabAccount from '../pages/TabAccount/TabAccount';
import AppHeaderLogo from '../components/AppHeaderLogo/AppHeaderLogo';
import Topics from '../pages/Topics/Topics';
import TopicDetail from '../pages/TopicDetail/TopicDetail';

const navigationOptions: StackNavigationOptions = {
  gestureEnabled: false,
  headerStyle: {
    backgroundColor: COLORS.white,
  },
  headerBackButtonDisplayMode: 'minimal',
  headerTintColor: COLORS.black,
  headerTitle: () => <AppHeaderLogo color="dark" height={30} width={115} />,
};

export const HomeStackNavigator = createStackNavigator({
  initialRouteName: 'Home',
  screenOptions: navigationOptions,
  screens: {
    Home: {
      screen: TabHome,
      options: { headerLeft: () => null },
    },
    Topics,
    TopicDetail: {
      screen: TopicDetail,
      linking: 'topics/:id_or_slug',
    },
  },
});

export const CollectionStackNavigator = createStackNavigator({
  screenOptions: navigationOptions,
  screens: {
    Collections: {
      screen: TabCollections,
      options: { headerLeft: () => null },
    },
  },
});

export const SearchStackNavigator = createStackNavigator({
  screenOptions: navigationOptions,
  screens: {
    Search: {
      screen: TabSearch,
      options: { headerShown: false },
    },
  },
});

export const AccountsStackNavigator = createStackNavigator({
  screenOptions: navigationOptions,
  screens: {
    Accounts: {
      screen: TabAccount,
      options: {
        headerTransparent: true,
        headerLeft: () => null,
        headerTitle: () => null,
      },
    },
  },
});
