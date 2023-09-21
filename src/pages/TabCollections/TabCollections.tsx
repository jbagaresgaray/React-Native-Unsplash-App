import React, { useLayoutEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../../constants/Colors';
import AppCollectionsHeader from './AppCollectionsHeader/AppCollectionsHeader';
import AppCollectionItem from '../../components/AppCollectionItem/AppCollectionItem';

import { collectionsSelectors } from '../../stores/slices/collections';
import { MAX_PER_PAGE } from '../../constants';
import { fetchCollections } from '../../stores/slices/collections/thunk';

const TabCollections = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation: any = useNavigation();
  const dispatch = useDispatch(); 
  const CollectionsArr = useSelector(collectionsSelectors.collections);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

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
      <SafeAreaView style={styles.SafeAreaView}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingViewContainer}
          behavior="height">
          <FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={() => <AppCollectionsHeader />}
            data={CollectionsArr}
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
