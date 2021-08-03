import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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
import {ListItem, Icon, Avatar} from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import AppCardItem from '../../components/AppCardItem/AppCardItem';
import AppStatus from '../../components/AppStatus/AppStatus';
import {COLORS} from '../../constants/Colors';

import Topic from '../../services/fake/topic.json';
import TopicPhotos from '../../services/fake/topic_photos.json';

const TopicDetail = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [topic, setTopic] = useState(Topic);
  const navigation: any = useNavigation();

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onUserPress = () => {
    navigation.navigate('UserProfile');
  };

  const onImagePress = () => {
    navigation.navigate('ImageDetails');
  };

  const renderItem = ({item}: any) => (
    <AppCardItem
      item={item}
      onUserPress={onUserPress}
      onImagePress={onImagePress}
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
            ListHeaderComponent={
              <View style={styles.detailView}>
                <View>
                  <Text style={styles.topicTitle}>{topic?.title}</Text>
                  {/* <Text style={styles.topicDescription}>
                    {topic?.description}
                  </Text> */}
                  <HTMLView value={topic?.description} stylesheet={styles} />
                </View>
                <View style={styles.listView}>
                  <ListItem bottomDivider>
                    <Icon
                      name="offline-bolt"
                      type="materialicons"
                      color="#d1d1d1"
                      size={18}
                    />
                    <ListItem.Content style={styles.listContent}>
                      <ListItem.Title style={styles.listLabel}>
                        Status
                      </ListItem.Title>
                      <ListItem.Subtitle>
                        {topic?.status === 'open' && <AppStatus />}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                  <ListItem bottomDivider>
                    <Icon
                      name="account-circle"
                      type="material-community"
                      color="#d1d1d1"
                      size={18}
                    />
                    <ListItem.Content style={styles.listContent}>
                      <ListItem.Title style={styles.listLabel}>
                        Curator
                      </ListItem.Title>
                      <ListItem.Subtitle>
                        <Avatar
                          rounded
                          source={{
                            uri: topic?.owners[0]?.profile_image?.small,
                          }}
                          size={28}
                          containerStyle={styles.topicAvatar}
                          onPress={onUserPress}
                        />
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                  <ListItem bottomDivider>
                    <Icon
                      name="image"
                      type="material-community"
                      color="#d1d1d1"
                      size={18}
                    />
                    <ListItem.Content style={styles.listContent}>
                      <ListItem.Title style={styles.listLabel}>
                        Contributions
                      </ListItem.Title>
                      <ListItem.Subtitle style={styles.textContribution}>
                        {topic?.total_photos}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                  <ListItem bottomDivider>
                    <Icon
                      name="account-group"
                      type="material-community"
                      color="#d1d1d1"
                      size={18}
                    />
                    <ListItem.Content style={styles.listContent}>
                      <ListItem.Title style={styles.listLabel}>
                        Top contributors
                      </ListItem.Title>
                      <ListItem.Subtitle>
                        {topic?.top_contributors &&
                          topic?.top_contributors.map(
                            (item: any, index: number) => (
                              <Avatar
                                rounded
                                source={{
                                  uri: item.profile_image?.small,
                                }}
                                key={index}
                                containerStyle={styles.topicContributor}
                                size={18}
                                onPress={onUserPress}
                              />
                            ),
                          )}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                </View>
              </View>
            }
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
  topicTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    marginBottom: 16,
  },
  topicDescription: {
    fontSize: 15,
    fontWeight: '400',
    color: '#111',
  },
  topicAvatar: {
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
  topicContributor: {
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 999,
  },
  listView: {
    marginTop: 40,
  },
  listContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listLabel: {
    fontSize: 14,
    color: '#111',
  },
  textContribution: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  a: {
    fontSize: 15,
    fontWeight: '400',
    color: '#767676',
    textDecorationLine: 'underline',
  },
});

export default TopicDetail;
