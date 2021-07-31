import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import {SearchBar} from 'react-native-elements';

import {COLORS} from '../../constants/Colors';
import AppSearchSegment from './AppSearchSegment/AppSearchSegment';
import AppSearchPhotos from './AppSearchPhotos/AppSearchPhotos';
import AppSearchCollections from './AppSearchCollections/AppSearchCollections';
import AppSearchUsers from './AppSearchUsers/AppSearchUsers';

import CollectionsArr from '../../services/fake/search_collections.json';
import PhotosArr from '../../services/fake/search_photo.json';
import UsersArr from '../../services/fake/search_users.json';

const TabSearch = () => {
  const navigation: any = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {shadowColor: 'transparent', elevation: 0},
      headerLeft: null,
      headerTitle: SeachbarHeader,
    });
  }, [navigation, searchText]);

  const onSearching = (value: string): any => {
    setSearchText(value);
  };

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onPressImage = () => {};

  const SeachbarHeader = () => (
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
  );

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View></View>
      <AppSearchSegment activeIndex={activeTab} onChange={setActiveTab} />
      {activeTab === 0 && (
        <AppSearchPhotos
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPressImage={onPressImage}
          PhotosArr={PhotosArr.results}
        />
      )}
      {activeTab === 1 && (
        <AppSearchCollections
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPressImage={onPressImage}
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
