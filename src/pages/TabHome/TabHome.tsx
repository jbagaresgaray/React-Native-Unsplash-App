import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';

import AppHomeCategories from './AppHomeCategories/AppHomeCategories';
import AppHomeCategoriesHeader from './AppHomeCategoriesHeader/AppHomeCategoriesHeader';
import AppHomeSegment from './AppHomeSegment/AppHomeSegment';
import AppCardItem from '../../components/AppCardItem/AppCardItem';

import { COLORS } from '../../constants/Colors';
import { useAppDispatch } from '../../stores';
import { topicsSelectors } from '../../stores/slices/topicsSlice';
import { photosSelectors } from '../../stores/slices/photosSlice';
import { MAX_PER_PAGE } from '../../constants';
import { fetchListTopics } from '../../stores/middleware/topic';
import { fetchListPhotos } from '../../stores/middleware/photos';
import { loadFakeData } from '../../utils';

const TabHome = () => {
  const fakePhotosArr = loadFakeData();
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const TopicsArr = useSelector(topicsSelectors.topics);
  const PhotosArr = useSelector(photosSelectors.photos);
  const isLoadingPhotos = useSelector(photosSelectors.isLoadingPhotos);
  // const isLoadingPhotos = true;
  const isLoadingTopics = useSelector(topicsSelectors.isLoadingTopics);

  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    dispatch(
      fetchListTopics({
        ids: null,
        page: 1,
        per_page: MAX_PER_PAGE,
        order_by: 'position',
      }),
    );
    dispatch(
      fetchListPhotos({
        page: 1,
        per_page: MAX_PER_PAGE,
        order_by: 'latest',
      }),
    );
    setRefreshing(false);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const onUserPress = (username: string) => {
    navigation.navigate('UserProfile', {
      username,
    });
  };

  const onImagePress = (id: string) => {
    navigation.navigate('ImageDetails', {
      id,
    });
  };

  const onViewAllPress = () => {
    navigation.navigate('Topics');
  };

  const onTopicPress = (id_or_slug: string) => {
    navigation.navigate('TopicDetail', {
      id_or_slug,
    });
  };

  const renderItem = ({ item }: any) => (
    <AppCardItem
      item={item}
      showLoading={isLoadingPhotos}
      onUserPress={() => onUserPress(item?.user?.username)}
      onImagePress={() => onImagePress(item.id)}
    />
  );

  const listHeaderComponent = () => (
    <>
      <AppHomeCategoriesHeader onViewAllPress={onViewAllPress} />
      <AppHomeCategories
        showLoading={isLoadingTopics}
        topics={TopicsArr}
        onPress={onTopicPress}
      />
    </>
  );

  const renderEditorial = () => (
    <FlatList
      contentContainerStyle={{ paddingBottom: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={listHeaderComponent()}
      data={isLoadingPhotos ? fakePhotosArr : PhotosArr}
      renderItem={renderItem}
      keyExtractor={(item, index) => 'key' + index}
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
  emptyView: { justifyContent: 'center', alignItems: 'center' },
});
export default TabHome;
