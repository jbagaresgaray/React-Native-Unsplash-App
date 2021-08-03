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
import AppCardTopic from '../../components/AppCardTopic/AppCardTopic';
import {COLORS} from '../../constants/Colors';

import TopicsArr from '../../services/fake/topics.json';

const Topics = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
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
