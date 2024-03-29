import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect, useState, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  RefreshControl,
  View,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';

import AppHomeCategories from './AppHomeCategories/AppHomeCategories';
import AppHomeCategoriesHeader from './AppHomeCategoriesHeader/AppHomeCategoriesHeader';
import AppHomeSegment from './AppHomeSegment/AppHomeSegment';
import { AppCardItem } from '../../components';

import { COLORS } from '../../constants/Colors';
import { MAX_PER_PAGE } from '../../constants';
import { fetchListTopics } from '../../stores/slices/topics/thunk';
import { fetchListPhotos } from '../../stores/slices/photos/thunk';
import { loadFakeData } from '../../utils';
import { usePhotos, useTopics } from '../../hooks';

const TabHome = () => {
  const fakePhotosArr = loadFakeData();
  const [activeTab, setActiveTab] = useState(0);
  const [photosPage, setPhotosPage] = useState(1);
  const [topicsPage, setTopicsPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingTopicMore, setLoadingTopicMore] = useState(false);

  const { isLoadingTopics, Topics } = useTopics();
  const { isLoadingPhotos, Photos } = usePhotos();

  const navigation: any = useNavigation();
  const dispatch = useDispatch<any>();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setLoadingMore(false);

    setPhotosPage(1);
    setTopicsPage(1);

    await Promise.all([
      dispatch(
        fetchListTopics({
          ids: null,
          page: 1,
          per_page: MAX_PER_PAGE,
          order_by: 'position',
        }),
      ),
      dispatch(
        fetchListPhotos({
          page: 1,
          per_page: MAX_PER_PAGE,
          order_by: 'latest',
        }),
      ),
    ]);

    setRefreshing(false);
  }, []);

  const loadMorePhotos = useCallback(async () => {
    setLoadingMore(true);
    setPhotosPage(page => page + 1);
    await dispatch(
      fetchListPhotos({
        page: photosPage,
        per_page: MAX_PER_PAGE,
        order_by: 'latest',
      }),
    );
    setLoadingMore(false);
  }, []);

  const loadMoreTopics = useCallback(async () => {
    setLoadingTopicMore(true);
    setTopicsPage(page => page + 1);
    await dispatch(
      fetchListTopics({
        ids: null,
        page: topicsPage,
        per_page: MAX_PER_PAGE,
        order_by: 'position',
      }),
    );
    setLoadingTopicMore(false);
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

  const renderItem = useCallback(
    ({ item }: any) => (
      <AppCardItem
        item={item}
        showLoading={isLoadingPhotos}
        onUserPress={() => onUserPress(item?.user?.username)}
        onImagePress={() => onImagePress(item.id)}
      />
    ),
    [],
  );

  const listHeaderComponent = () => (
    <>
      <AppHomeCategoriesHeader onViewAllPress={onViewAllPress} />
      <AppHomeCategories
        showLoading={isLoadingTopics}
        topics={Topics}
        onPress={onTopicPress}
      />
    </>
  );

  const listFooterComponent = () => {
    if (!loadingMore) return null;

    return (
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: 60,
          paddingVertical: 20,
          marginTop: 10,
          marginBottom: 10,
          justifyContent: 'center',
        }}>
        <ActivityIndicator animating size="large" color="#bbb" />
      </View>
    );
  };

  const renderEditorial = () => (
    <FlatList
      contentContainerStyle={{ paddingBottom: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={listHeaderComponent}
      ListFooterComponent={listFooterComponent}
      data={isLoadingPhotos ? fakePhotosArr : Photos}
      renderItem={renderItem}
      keyExtractor={(item, index) => 'key' + index}
      onEndReached={loadMorePhotos}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
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
