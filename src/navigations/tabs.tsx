import React from 'react';
import {View} from 'react-native';
import {
  BottomTabBarOptions,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import {
  AccountsStackNavigator,
  HomeStackNavigator,
  CollectionStackNavigator,
  SearchStackNavigator,
} from './main';
import Main from '../pages/Main';
import {COLORS} from '../constants/Colors';
import AppTabBar from '../components/AppTabBar/AppTabBar';

const Tab = createBottomTabNavigator<any>();

const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: COLORS.black,
  inactiveTintColor: '#999999',
  labelStyle: {
    fontWeight: '500',
  },
};

const TabHomeBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({focused}) => (
    <Icon
      name="home"
      size={28}
      type="ionicon"
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const TabCollectionsBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({focused}) => (
    <Icon
      name="file-tray-full"
      size={28}
      type="ionicon"
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const TabSearchBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({focused}) => (
    <Icon
      name="search"
      size={28}
      type="ionicon"
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const TabAccountBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({focused}) => (
    <Icon
      name="person"
      size={28}
      type="ionicon"
      color={focused ? COLORS.black : '#999999'}
    />
  ),
};

const TabUploadBottomTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({focused}) => (
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
      tabBarOptions={tabBarOptions}
      tabBar={AppTabBar}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={TabHomeBottomTabOptions}
      />
      <Tab.Screen
        name="Collections"
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
        name="Search"
        component={SearchStackNavigator}
        options={TabSearchBottomTabOptions}
      />
      <Tab.Screen
        component={AccountsStackNavigator}
        name="Account"
        options={TabAccountBottomTabOptions}
        listeners={{
          tabPress: e => {
            e.preventDefault();
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
