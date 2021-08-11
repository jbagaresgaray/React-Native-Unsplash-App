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

import { useAppDispatch } from '../../stores';
import {
  getCollection,
  getCollectionPhotos,
} from '../../stores/middleware/collection';
import { useSelector } from 'react-redux';
import { collectionsSelectors } from '../../stores/slices/collectionsSlice';
import { MAX_PER_PAGE } from '../../constants';

const CollectionDetails: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [collectionId, setCollectionId] = useState('');
  const navigation: any = useNavigation();
  const { params }: any = useRoute();
  const dispatch = useAppDispatch();

  const Collection = useSelector(collectionsSelectors.collection);
  const CollectionPhotosArr = useSelector(
    collectionsSelectors.collectionPhotos,
  );

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

  const onUserPress = () => {
    navigation.navigate('UserProfile');
  };

  const onImagePress = () => {
    navigation.navigate('ImageDetails');
  };

  const renderItem = ({ item }: any) => (
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
            data={CollectionPhotosArr}
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
