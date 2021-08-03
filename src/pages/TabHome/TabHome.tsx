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
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../stores';
import {
  fetchListTopics,
  topicsSelectors,
} from '../../stores/slices/topicsSlice';
import {
  fetchListPhotos,
  photosSelectors,
} from '../../stores/slices/photosSlice';
import {MAX_PER_PAGE} from '../../constants';

const TabHome = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const TopicsArr = useSelector(topicsSelectors.topics);
  const PhotosArr = useSelector(photosSelectors.photos);

  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dispatch(
      fetchListTopics({
        ids: null,
        page: 1,
        per_page: MAX_PER_PAGE,
        order_by: 'position',
      }),
    );
    await dispatch(
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

  const onUserPress = () => {
    navigation.navigate('UserProfile');
  };

  const onImagePress = () => {
    navigation.navigate('ImageDetails');
  };

  const onViewAllPress = () => {
    navigation.navigate('Topics');
  };

  const onTopicPress = (id_or_slug: string) => {
    console.log('onTopicPress: ', id_or_slug);
    navigation.navigate('TopicDetail', {
      id_or_slug,
    });
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
          <AppHomeCategories topics={TopicsArr} onPress={onTopicPress} />
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
