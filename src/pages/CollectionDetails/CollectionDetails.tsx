import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
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

import {COLORS} from '../../constants/Colors';

import Collection from '../../services/fake/collection.json';
import CollectionPhotosArr from '../../services/fake/collection_photos.json';

const CollectionDetails: React.FC = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

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
            ListHeaderComponent={() => (
              <>
                <AppCollectionDetailsHeader
                  title={Collection.title}
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
  emptyView: {justifyContent: 'center', alignItems: 'center'},
});

export default CollectionDetails;
