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
import UserProfile from '../pages/UserProfile/UserProfile';
import ImageDetails from '../pages/ImageDetails/ImageDetails';
import CollectionDetails from '../pages/CollectionDetails/CollectionDetails';
import Topics from '../pages/Topics/Topics';
import TopicDetail from '../pages/TopicDetail/TopicDetail';

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
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="ImageDetails" component={ImageDetails} />
      <Stack.Screen name="CollectionDetails" component={CollectionDetails} />
      <Stack.Screen name="Topics" component={Topics} />
      <Stack.Screen name="TopicDetail" component={TopicDetail} />
    </Stack.Navigator>
  );
};

export const CollectionStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name="Collections" component={TabCollections} />
      <Stack.Screen name="CollectionDetails" component={CollectionDetails} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="ImageDetails" component={ImageDetails} />
    </Stack.Navigator>
  );
};

export const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name="Search" component={TabSearch} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="ImageDetails" component={ImageDetails} />
      <Stack.Screen name="CollectionDetails" component={CollectionDetails} />
    </Stack.Navigator>
  );
};

export const AccountsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name="Accounts" component={TabAccount} />
      <Stack.Screen name="ImageDetails" component={ImageDetails} />
    </Stack.Navigator>
  );
};
