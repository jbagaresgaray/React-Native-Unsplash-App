import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import { COLORS } from '../../constants/Colors';
import AppSearchSegment from './AppSearchSegment/AppSearchSegment';
import AppSearchPhotos from '../../components/AppSearchPhotos/AppSearchPhotos';
import AppSearchCollections from '../../components/AppSearchCollections/AppSearchCollections';
import AppSearchUsers from '../../components/AppSearchUsers/AppSearchUsers';
import AppNoFiles from '../../components/AppNoFiles/AppNoFiles';
import AppSearchHeaderBar from '../../components/AppSearchHeaderBar/AppSearchHeaderBar';

import { photosSelectors } from '../../stores/slices/photos';
import { collectionsSelectors } from '../../stores/slices/collections';
import { searchSelectors } from '../../stores/slices/search';
import { MAX_PER_PAGE } from '../../constants';
import { fetchListPhotos } from '../../stores/slices/photos/thunk';
import {
  searchCollectionsQry,
  searchPhotosQry,
  searchUsersQry,
} from '../../stores/slices/search/thunk';

const TabSearch = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch<any>();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const PhotosArr = useSelector(searchSelectors.searchPhotos);
  const CollectionsArr = useSelector(searchSelectors.searchCollections);
  const UsersArr = useSelector(searchSelectors.searchUsers);

  const isLoadingSearchUsers = useSelector(
    searchSelectors.isLoadingSearchUsers,
  );
  const isLoadingSearchCollections = useSelector(
    searchSelectors.isLoadingSearchCollections,
  );
  const isLoadingSearchPhotos = useSelector(
    searchSelectors.isLoadingSearchPhotos,
  );

  const onSearching = useCallback((value: string) => {
    setSearchText(value);
    onSearchingDebounce(value);
  }, []);

  const onSearchingDebounce = useCallback(
    debounce(async value => {
      console.log('Search to API Here : ', value);
      if (value && !isEmpty(value)) {
        console.log('searchUsers');
        dispatch(
          searchUsersQry({
            query: value,
            page: 1,
            per_page: MAX_PER_PAGE,
          }),
        );

        dispatch(
          searchPhotosQry({
            query: value,
            page: 1,
            per_page: MAX_PER_PAGE,
          }),
        );

        dispatch(
          searchCollectionsQry({
            query: value,
            page: 1,
            per_page: MAX_PER_PAGE,
          }),
        );
      }
    }, 600),
    [],
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dispatch(
      fetchListPhotos({
        page: 1,
        per_page: MAX_PER_PAGE,
        order_by: 'popular',
      }),
    );
    setRefreshing(false);
  }, []);

  const onPressImage = () => {
    navigation.navigate('ImageDetails');
  };

  const onPressCollectionImage = () => {
    navigation.navigate('CollectionDetails');
  };

  const onPressCollectionTitle = () => {
    navigation.navigate('CollectionDetails');
  };

  useEffect(() => {
    dispatch(
      fetchListPhotos({
        page: 1,
        per_page: MAX_PER_PAGE,
        order_by: 'popular',
      }),
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation, searchText]);

  const renderUsersSearch = () => {
    if (UsersArr?.results && UsersArr.results.length) {
      return (
        <AppSearchUsers
          refreshing={refreshing}
          onRefresh={onRefresh}
          UsersArr={UsersArr.results}
        />
      );
    } else {
      return (
        <AppNoFiles
          title="No results found"
          subTitle="Try adjusting your search or filter to find what you're looking for"
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <AppSearchHeaderBar onSearching={onSearching} value={searchText} />
      <AppSearchSegment activeIndex={activeTab} onChange={setActiveTab} />
      {activeTab === 0 && PhotosArr && PhotosArr.results && (
        <AppSearchPhotos
          refreshing={refreshing}
          onRefresh={onRefresh}
          PhotosArr={PhotosArr.results}
        />
      )}
      {activeTab === 1 && CollectionsArr && CollectionsArr.results && (
        <AppSearchCollections
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPressImage={onPressCollectionImage}
          onPressTitle={onPressCollectionTitle}
          CollectionsArr={CollectionsArr.results}
        />
      )}
      {activeTab === 2 && renderUsersSearch()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyView: { justifyContent: 'center', alignItems: 'center' },
});

export default TabSearch;
