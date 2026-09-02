import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import Landing from '../pages/Landing/Landing';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import OAuthRedirect from '../pages/OAuthRedirect/OAuthRedirect';
import BottomTabNavigator from './tabs';
import AppHeaderLogo from '../components/AppHeaderLogo/AppHeaderLogo';
import { COLORS } from '../constants/Colors';
import CollectionDetails from '../pages/CollectionDetails/CollectionDetails';
import ImageDetails from '../pages/ImageDetails/ImageDetails';
import UserProfile from '../pages/UserProfile/UserProfile';

const navigationOptions: StackNavigationOptions = {
  gestureEnabled: false,
};

const authScreenOptions: StackNavigationOptions = {
  headerTransparent: true,
  headerTintColor: '#111',
  headerTitle: () => null,
};

const mainScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  headerStyle: {
    backgroundColor: COLORS.white,
  },
  headerBackButtonDisplayMode: 'minimal',
  headerTintColor: COLORS.black,
  headerTitle: () => <AppHeaderLogo color="dark" height={30} width={115} />,
};

export const RootStack = createStackNavigator({
  initialRouteName: 'Landing',
  screenOptions: navigationOptions,
  screens: {
    Landing: {
      screen: Landing,
      options: { headerShown: false },
    },
    Register: {
      screen: Register,
      options: authScreenOptions,
    },
    Login: {
      screen: Login,
      options: authScreenOptions,
    },
    Main: {
      screen: BottomTabNavigator,
      options: { headerShown: false },
    },
    UserProfile: {
      screen: UserProfile,
      linking: 'users/:username',
      options: mainScreenOptions,
    },
    ImageDetails: {
      screen: ImageDetails,
      linking: 'photos/:id',
      options: {
        ...mainScreenOptions,
        headerTransparent: true,
      },
    },
    CollectionDetails: {
      screen: CollectionDetails,
      linking: 'collections/:id',
      options: mainScreenOptions,
    },
    OAuthRedirect: {
      screen: OAuthRedirect,
      linking: 'oauthredirect',
      options: { headerShown: false },
    },
  },
});

type RootStackType = typeof RootStack;

declare module '@react-navigation/core' {
  interface RootNavigator extends RootStackType {}
}

const Navigation = createStaticNavigation(RootStack);

const RootNavigators = () => (
  <Navigation
    linking={{
      enabled: 'auto',
      prefixes: ['unsplashapp://', 'exp+unsplashapp://'],
    }}
  />
);

export default RootNavigators;
