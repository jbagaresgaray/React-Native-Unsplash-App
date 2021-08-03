import {
  NavigationHelpersContext,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {useSelector} from 'react-redux';

import {COLORS} from '../../constants/Colors';
import AppSearchSegment from './AppSearchSegment/AppSearchSegment';
import AppSearchPhotos from '../../components/AppSearchPhotos/AppSearchPhotos';
import AppSearchCollections from '../../components/AppSearchCollections/AppSearchCollections';
import AppSearchUsers from '../../components/AppSearchUsers/AppSearchUsers';

import {
  fetchListPhotos,
  photosSelectors,
} from '../../stores/slices/photosSlice';
import {useAppDispatch} from '../../stores';

import CollectionsArr from '../../services/fake/search_collections.json';
import UsersArr from '../../services/fake/search_users.json';
import {MAX_PER_PAGE} from '../../constants';

const TabSearch = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const PhotosArr = useSelector(photosSelectors.photos);

  const onSearching = (value: string): any => {
    setSearchText(value);
  };

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
      headerStyle: {shadowColor: 'transparent', elevation: 0},
      headerLeft: null,
      headerTitle: () => (
        <View style={{width: Dimensions.get('window').width}}>
          <SearchBar
            platform="ios"
            style={styles.searchBar}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
            inputStyle={styles.searchBarInput}
            cancelButtonProps={{
              buttonTextStyle: styles.searchBarInput,
            }}
            placeholder="Search photos"
            onChangeText={onSearching}
            value={searchText}
          />
        </View>
      ),
    });
  }, [navigation, searchText]);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <AppSearchSegment activeIndex={activeTab} onChange={setActiveTab} />
      {activeTab === 0 && (
        <AppSearchPhotos
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPressImage={onPressImage}
          PhotosArr={PhotosArr}
        />
      )}
      {activeTab === 1 && (
        <AppSearchCollections
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPressImage={onPressCollectionImage}
          onPressTitle={onPressCollectionTitle}
          CollectionsArr={CollectionsArr.results}
        />
      )}
      {activeTab === 2 && (
        <AppSearchUsers
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPressImage={onPressImage}
          UsersArr={UsersArr.results}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchBarInputContainer: {
    height: 30,
    backgroundColor: COLORS.white,
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
    padding: 0,
  },
  searchBarInput: {
    fontSize: 14,
  },
  searchBarContainer: {
    padding: 0,
    marginStart: 8,
    marginEnd: 8,
    // backgroundColor: 'red',
  },
  searchBar: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  emptyView: {justifyContent: 'center', alignItems: 'center'},
});

export default TabSearch;
