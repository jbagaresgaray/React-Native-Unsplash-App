import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  RefreshControl,
} from 'react-native';
import AppCardItem from '../../components/AppCardItem/AppCardItem';
import AppCollectionDetailsHeader from './AppCollectionDetailsHeader/AppCollectionDetailsHeader';

import { COLORS } from '../../constants/Colors';
import {
  getCollection,
  getCollectionPhotos,
} from '../../stores/slices/collections/thunk';
import { useDispatch } from 'react-redux';
import { MAX_PER_PAGE } from '../../constants';
import { useCollections } from '../../hooks';

const CollectionDetails: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [collectionId, setCollectionId] = useState('');
  const navigation: any = useNavigation();
  const { params }: any = useRoute();
  const dispatch = useDispatch<any>();

  const { Collection, CollectionPhotos } = useCollections();

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (params && params.id) {
      setCollectionId(params.id);
      dispatch(getCollection(params.id));
      dispatch(
        getCollectionPhotos({
          id: params.id,
          params: { page: 1, per_page: MAX_PER_PAGE },
        }),
      );
    }
  }, [params]);

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

  const renderItem = ({ item }: any) => (
    <AppCardItem
      item={item}
      onUserPress={() => onUserPress(item?.user?.username)}
      onImagePress={() => onImagePress(item.id)}
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
            ListHeaderComponent={() => (
              <>
                <AppCollectionDetailsHeader
                  title={Collection?.title}
                  name={Collection?.user?.name}
                  username={Collection?.user?.username}
                  profile_image={Collection?.user?.profile_image}
                  onProfilePress={onUserPress}
                />
              </>
            )}
            data={CollectionPhotos}
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

export default CollectionDetails;
