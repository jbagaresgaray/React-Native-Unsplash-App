import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { COLORS } from '../../constants/Colors';
import AppCollectionsHeader from './AppCollectionsHeader/AppCollectionsHeader';
import { AppCollectionItem } from '../../components';

import { MAX_PER_PAGE } from '../../constants';
import { fetchCollections } from '../../stores/slices/collections/thunk';
import { useCollections } from '../../hooks';
import type { AppNavigation } from '../../navigations/types';

const TabCollections = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<AppNavigation>();
  const dispatch = useDispatch<any>();
  const { Collections } = useCollections();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dispatch(
      fetchCollections({
        page: 1,
        per_page: MAX_PER_PAGE,
      }),
    );
    setRefreshing(false);
  }, []);

  const onPressImage = (id: string) => {
    navigation.navigate('CollectionDetails', {
      id,
    });
  };

  const onPressTitle = (id: string) => {
    navigation.navigate('CollectionDetails', {
      id,
    });
  };

  const renderItem = ({ item }: any) => (
    <AppCollectionItem
      item={item}
      onPressImage={() => onPressImage(item.id)}
      onPressTitle={() => onPressTitle(item.id)}
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
            ListHeaderComponent={() => <AppCollectionsHeader />}
            data={Collections}
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

export default TabCollections;
