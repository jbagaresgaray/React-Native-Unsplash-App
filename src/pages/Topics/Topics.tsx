import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AppCardTopic from '../../components/AppCardTopic/AppCardTopic';
import { MAX_PER_PAGE } from '../../constants';
import { COLORS } from '../../constants/Colors';

import { fetchListTopics } from '../../stores/slices/topics/thunk';
import { useTopics } from '../../hooks';

const Topics = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const [refreshing, setRefreshing] = useState(false);
  const { Topics } = useTopics();

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
    setRefreshing(false);
  }, []);

  const onTopicPress = (id_or_slug: string) => {
    navigation.navigate('TopicDetail', {
      id_or_slug,
    });
  };

  const onUserPress = (username: string) => {
    navigation.navigate('UserProfile', {
      username,
    });
  };

  const renderItem = ({ item }: any) => (
    <AppCardTopic
      title={item.title}
      description={item.description}
      cover_photo={item.cover_photo}
      owners={item?.owners[0]}
      total_photos={item?.total_photos}
      status={item?.status}
      onPress={() => onTopicPress(item.id)}
      onUserPress={() => onUserPress(item?.user?.username)}
    />
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
            data={Topics}
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
  },
  keyboardAvoidingViewContainer: {
    position: 'relative',
    flex: 1,
  },
  emptyView: { justifyContent: 'center', alignItems: 'center' },
});

export default Topics;
