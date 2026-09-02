import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';

import { COLORS } from '../../constants/Colors';

import AppUserProfileSegment from './AppUserProfileSegment/AppUserProfileSegment';
import AppUserProfileDetail from './AppUserProfileDetail/AppUserProfileDetail';
import { AppSearchPhotos, AppSearchCollections } from '../../components';

import { usersSelectors } from '../../stores/slices/users';
import { useDispatch, useSelector } from 'react-redux';

import { MAX_PER_PAGE } from '../../constants';
import {
  getUserCollections,
  getUserLikedPhotos,
  getUserPhotos,
  getUserPublicProfile,
} from '../../stores/slices/users/thunk';
import { useUsers } from '../../hooks';
import type {
  AppNavigation,
  UserProfileScreenProps,
} from '../../navigations/types';
import AppIcon from '../../components/AppIcon/AppIcon';

const UserProfile: React.FC<UserProfileScreenProps> = ({
  route: { params },
}) => {
  const navigation = useNavigation<AppNavigation>();
  const [activeTab, setActiveTab] = useState(0);
  const [currentPhotoPage, setCurrentPhotoPage] = useState(1);
  const [currentLikedPhotoPage, setCurrentLikedPhotoPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [headerTitle, setHeaderTitle] = useState<string | null | undefined>('');
  const [userId, setUserId] = useState<string>('');

  const dispatch = useDispatch<any>();
  const { userProfile, Photos, Likes, Collections } = useUsers();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
      headerRight: () => (
        <Button
          type="clear"
          icon={
            <AppIcon
              family="feather"
              name="plus-circle"
              size={26}
              color="#111"
            />
          }
        />
      ),
    });
  }, [navigation, userProfile]);

  useEffect(() => {
    if (params && params.username) {
      setUserId(params.username);
      initProfile(params.username);
    }
  }, [params]);

  const initProfile = async (username: string, isRefreshing = false) => {
    await dispatch(getUserPublicProfile(username));

    dispatch(
      getUserPhotos({
        username,
        params: {
          page: currentPhotoPage,
          per_page: MAX_PER_PAGE,
          order_by: 'latest',
        },
      }),
    );

    dispatch(
      getUserLikedPhotos({
        username,
        params: {
          page: currentLikedPhotoPage,
          per_page: MAX_PER_PAGE,
          order_by: 'latest',
        },
      }),
    );

    dispatch(
      getUserCollections({
        username,
        params: {
          page: currentLikedPhotoPage,
          per_page: MAX_PER_PAGE,
        },
      }),
    );

    setHeaderTitle(userProfile?.name);
    console.log('userProfile: ', userProfile);
    if (isRefreshing) {
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    initProfile(userId, true);
  }, []);

  const onPressImage = (id: string) => {
    navigation.navigate('ImageDetails', { id });
  };

  const onCollectionPressImage = (id: string) => {
    navigation.navigate('CollectionDetails', { id });
  };

  const onCollectionPressTitle = (id: string) => {
    navigation.navigate('CollectionDetails', { id });
  };

  const getProfileProps = () => {
    return {
      name: userProfile?.name,
      username: userProfile?.username,
      bio: userProfile?.bio,
      location: userProfile?.location,
      tags: userProfile?.tags?.custom,
      followers_count: userProfile?.followers_count,
      following_count: userProfile?.following_count,
      profile_image: userProfile?.profile_image,
    };
  };

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={styles.SafeAreaView}
    >
      <AppUserProfileDetail {...getProfileProps()} />
      <AppUserProfileSegment
        total_collections={userProfile?.total_collections}
        total_likes={userProfile?.total_likes}
        total_photos={userProfile?.total_photos}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === 0 && (
        <AppSearchPhotos
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPressImage={onPressImage}
          PhotosArr={Photos!}
        />
      )}
      {activeTab === 1 && (
        <AppSearchPhotos
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPressImage={onPressImage}
          PhotosArr={Likes!}
        />
      )}
      {activeTab === 2 && (
        <AppSearchCollections
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPressImage={onCollectionPressImage}
          CollectionsArr={Collections}
          onPressTitle={onCollectionPressTitle}
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
  emptyView: { justifyContent: 'center', alignItems: 'center' },
});

export default UserProfile;
