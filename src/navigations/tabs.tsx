import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import {
  AccountsStackNavigator,
  HomeStackNavigator,
  CollectionStackNavigator,
  SearchStackNavigator,
} from './main';
import Main from '../pages/Main';
import { COLORS } from '../constants/Colors';
import AppTabBar from '../components/AppTabBar/AppTabBar';

const Tab = createBottomTabNavigator<any>();

const TabHomeBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      name="home"
      size={28}
      type="ionicon"
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const TabCollectionsBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      name="file-tray-full"
      size={28}
      type="ionicon"
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const TabSearchBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      name="search"
      size={28}
      type="ionicon"
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const TabAccountBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      name="person"
      size={28}
      type="ionicon"
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const TabUploadBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      name="plus-square"
      size={28}
      type="font-awesome"
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.black,
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: {
          fontWeight: '500',
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
      tabBar={AppTabBar}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={TabHomeBottomTabOptions}
      />
      <Tab.Screen
        name="CollectionsStack"
        component={CollectionStackNavigator}
        options={TabCollectionsBottomTabOptions}
      />
      <Tab.Screen
        name="Upload"
        component={Main}
        options={TabUploadBottomTabOptions}
        listeners={{
          tabPress: e => {
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStackNavigator}
        options={TabSearchBottomTabOptions}
      />
      <Tab.Screen
        component={AccountsStackNavigator}
        name="AccountStack"
        options={TabAccountBottomTabOptions}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
