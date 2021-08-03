import {useNavigation} from '@react-navigation/core';
import React, {useLayoutEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import AppHomeCategories from './AppHomeCategories/AppHomeCategories';
import AppHomeCategoriesHeader from './AppHomeCategoriesHeader/AppHomeCategoriesHeader';
import AppHomeSegment from './AppHomeSegment/AppHomeSegment';
import AppCardItem from '../../components/AppCardItem/AppCardItem';

import {COLORS} from '../../constants/Colors';
import CategoriesArr from '../../services/fake/topics.json';
import PhotosArr from '../../services/fake/photos.json';

const TabHome = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const navigation: any = useNavigation();

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const onUserPress = () => {
    navigation.navigate('UserProfile');
  };

  const onImagePress = () => {
    navigation.navigate('ImageDetails');
  };

  const onViewAllPress = () => {
    navigation.navigate('Topics');
  };

  const onTopicPress = () => {
    navigation.navigate('TopicDetail');
  };

  const renderItem = ({item}: any) => (
    <AppCardItem
      item={item}
      onUserPress={onUserPress}
      onImagePress={onImagePress}
    />
  );

  const renderEditorial = () => (
    <FlatList
      contentContainerStyle={{paddingBottom: 20}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={() => (
        <>
          <AppHomeCategoriesHeader onViewAllPress={onViewAllPress} />
          <AppHomeCategories
            categories={CategoriesArr}
            onPress={onTopicPress}
          />
        </>
      )}
      data={PhotosArr}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.SafeAreaView}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingViewContainer}
          behavior="height">
          <AppHomeSegment activeIndex={activeTab} onChange={setActiveTab} />
          {activeTab === 0 && renderEditorial()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardAvoidingViewContainer: {
    position: 'relative',
    flex: 1,
  },
  emptyView: {justifyContent: 'center', alignItems: 'center'},
});
export default TabHome;
