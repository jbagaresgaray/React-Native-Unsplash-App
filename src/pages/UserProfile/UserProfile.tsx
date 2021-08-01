import React, {useState, useLayoutEffect} from 'react';
import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Icon} from 'react-native-elements';

import {COLORS} from '../../constants/Colors';

import AppUserProfileSegment from './AppUserProfileSegment/AppUserProfileSegment';
import AppUserProfileDetail from './AppUserProfileDetail/AppUserProfileDetail';
import AppSearchPhotos from '../../components/AppSearchPhotos/AppSearchPhotos';
import AppSearchCollections from '../../components/AppSearchCollections/AppSearchCollections';

import userProfile from '../../services/fake/user/profile.json';
import PhotosArr from '../../services/fake/user/photos.json';
import LikesArr from '../../services/fake/user/likes.json';
import CollectionsArr from '../../services/fake/user/collections.json';

const UserProfile = () => {
  const navigation: any = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: userProfile.name,
      headerRight: () => (
        <Button
          type="clear"
          icon={
            <Icon name="plus-circle" size={26} color="#111" type="feather" />
          }
        />
      ),
    });
  }, [navigation, userProfile]);

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onPressImage = () => {};

  const getProfileProps = () => {
    return {
      name: userProfile.name,
      username: userProfile.username,
      bio: userProfile.bio,
      location: userProfile.location,
      tags: userProfile.tags.custom,
      followers_count: userProfile.followers_count,
      following_count: userProfile.following_count,
      profile_image: userProfile.profile_image,
    };
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <AppUserProfileDetail {...getProfileProps()} />
      <AppUserProfileSegment
        total_collections={userProfile.total_collections}
        total_likes={userProfile.total_likes}
        total_photos={userProfile.total_photos}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === 0 && (
        <AppSearchPhotos
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPressImage={onPressImage}
          PhotosArr={PhotosArr}
        />
      )}
      {activeTab === 1 && (
        <AppSearchPhotos
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPressImage={onPressImage}
          PhotosArr={LikesArr}
        />
      )}
      {activeTab === 2 && (
        <AppSearchCollections
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPressImage={onPressImage}
          CollectionsArr={CollectionsArr}
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
  emptyView: {justifyContent: 'center', alignItems: 'center'},
});

export default UserProfile;
