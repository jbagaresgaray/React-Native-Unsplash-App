import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  FlatList,
  RefreshControl,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { AppCardItem } from '../../components';

import { MAX_PER_PAGE } from '../../constants';
import { COLORS } from '../../constants/Colors';

import { getTopic, getTopicPhotos } from '../../stores/slices/topics/thunk';
import { topicsSelectors } from '../../stores/slices/topics';
import TopicDetailInformation from './TopicDetailInformation';
import TopicDetailStatus from './TopicDetailStatus';

const TopicDetail = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [idSlug, setIdSlug] = useState('');
  const navigation: any = useNavigation();
  const { params }: any = useRoute();
  const dispatch = useDispatch<any>();

  const topic = useSelector(topicsSelectors.topic);
  const TopicPhotos = useSelector(topicsSelectors.topicPhotos);
  const isLoadingTopic = useSelector(topicsSelectors.isLoadingTopic);
  const isLoadingTopicPhotos = useSelector(
    topicsSelectors.isLoadingTopicPhotos,
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(getTopic(idSlug));
    dispatch(
      getTopicPhotos({
        id_or_slug: idSlug,
        params: {
          page: currentPage,
          per_page: MAX_PER_PAGE,
          order_by: 'latest',
        },
      }),
    );
    setRefreshing(false);
  }, []);

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

  useEffect(() => {
    if (params && params.id_or_slug) {
      setIdSlug(params.id_or_slug);

      dispatch(getTopic(params.id_or_slug));
      dispatch(
        getTopicPhotos({
          id_or_slug: params.id_or_slug,
          params: {
            page: currentPage,
            per_page: MAX_PER_PAGE,
            order_by: 'latest',
          },
        }),
      );
    }
  }, [params]);

  const renderItem = ({ item }: any) => (
    <AppCardItem
      item={item}
      showLoading={isLoadingTopicPhotos}
      onUserPress={() => onUserPress(item?.user?.username)}
      onImagePress={() => onImagePress(item.id)}
    />
  );

  const listHeaderComponent = () => (
    <View style={styles.detailView}>
      <TopicDetailInformation topic={topic} showLoading={isLoadingTopic} />
      <TopicDetailStatus
        topic={topic}
        showLoading={isLoadingTopic}
        onUserPress={onUserPress}
      />
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.SafeAreaView}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingViewContainer}
          behavior="height">
          <FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={listHeaderComponent}
            data={TopicPhotos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: 'relative',
  },
  keyboardAvoidingViewContainer: {
    position: 'relative',
    flex: 1,
  },
  detailView: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingStart: 12,
    paddingEnd: 12,
  },

  topicDescription: {
    fontSize: 15,
    fontWeight: '400',
    color: '#111',
  },
});

export default TopicDetail;
