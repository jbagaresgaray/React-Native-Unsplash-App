import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import type {
  AppNavigation,
  CollectionDetailsScreenProps,
} from '../../navigations/types';

const CollectionDetails: React.FC<CollectionDetailsScreenProps> = ({
  route: { params },
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [collectionId, setCollectionId] = useState('');
  const navigation = useNavigation<AppNavigation>();
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
      <SafeAreaView
        edges={['left', 'right', 'bottom']}
        style={styles.SafeAreaView}
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingViewContainer}
          behavior="height"
        >
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
                  onProfilePress={() => {
                    if (Collection?.user?.username) {
                      onUserPress(Collection.user.username);
                    }
                  }}
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
