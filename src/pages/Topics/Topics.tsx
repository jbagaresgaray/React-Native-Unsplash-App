import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import AppCardTopic from '../../components/AppCardTopic/AppCardTopic';
import {MAX_PER_PAGE} from '../../constants';
import {COLORS} from '../../constants/Colors';

import {useAppDispatch} from '../../stores';
import {
  fetchListTopics,
  topicsSelectors,
} from '../../stores/slices/topicsSlice';

const Topics = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const TopicsArr = useSelector(topicsSelectors.topics);

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

  const onTopicPress = () => {
    navigation.navigate('TopicDetail');
  };

  const onUserPress = () => {
    navigation.navigate('UserProfile');
  };

  const renderItem = ({item}: any) => (
    <AppCardTopic
      title={item.title}
      description={item.description}
      cover_photo={item.cover_photo}
      owners={item?.owners[0]}
      total_photos={item?.total_photos}
      status={item?.status}
      onPress={onTopicPress}
      onUserPress={onUserPress}
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
            contentContainerStyle={{paddingBottom: 20}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={TopicsArr}
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
  emptyView: {justifyContent: 'center', alignItems: 'center'},
});

export default Topics;
