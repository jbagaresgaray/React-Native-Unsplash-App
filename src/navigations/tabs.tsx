import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  AccountsStackNavigator,
  HomeStackNavigator,
  CollectionStackNavigator,
  SearchStackNavigator,
} from './main';
import Main from '../pages/Main';
import { COLORS } from '../constants/Colors';
import AppTabBar from '../components/AppTabBar/AppTabBar';
import AppIcon from '../components/AppIcon/AppIcon';

const TabHomeBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <AppIcon
      family="ionicons"
      name="home"
      size={28}
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const TabCollectionsBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <AppIcon
      family="ionicons"
      name="file-tray-full"
      size={28}
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const TabSearchBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <AppIcon
      family="ionicons"
      name="search"
      size={28}
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const TabAccountBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <AppIcon
      family="ionicons"
      name="person"
      size={28}
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const TabUploadBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <AppIcon
      family="fontawesome"
      name="plus-square"
      size={28}
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const BottomTabNavigator = createBottomTabNavigator({
  initialRouteName: 'HomeStack',
  screenOptions: {
    tabBarActiveTintColor: COLORS.black,
    tabBarInactiveTintColor: '#999999',
    tabBarLabelStyle: {
      fontWeight: '500',
    },
    tabBarShowLabel: false,
    headerShown: false,
  },
  tabBar: AppTabBar,
  screens: {
    HomeStack: {
      screen: HomeStackNavigator,
      options: TabHomeBottomTabOptions,
    },
    CollectionsStack: {
      screen: CollectionStackNavigator,
      options: TabCollectionsBottomTabOptions,
    },
    Upload: {
      screen: Main,
      options: TabUploadBottomTabOptions,
      listeners: {
        tabPress: e => {
          e.preventDefault();
        },
      },
    },
    SearchStack: {
      screen: SearchStackNavigator,
      options: TabSearchBottomTabOptions,
    },
    AccountStack: {
      screen: AccountsStackNavigator,
      options: TabAccountBottomTabOptions,
    },
  },
});

export default BottomTabNavigator;
