import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '../../components/AppButton/AppButton';
import AppFacebookButton from '../../components/AppFacebookButton/AppFacebookButton';
import { COLORS } from '../../constants/Colors';

import landingImg from '../../assets/img/landing-unsplash.jpg';
import type { AppNavigation } from '../../navigations/types';
import { getAccessToken } from '../../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentUser,
  getUserCollections,
  getUserLikedPhotos,
  getUserPhotos,
  getUserPublicProfile,
} from '../../stores/slices/users/thunk';
import { usersSelectors } from '../../stores/slices/users';
import { MAX_PER_PAGE } from '../../constants';
import { useUsers } from '../../hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppUserProfileDetail from '../UserProfile/AppUserProfileDetail/AppUserProfileDetail';
import AppUserProfileSegment from '../UserProfile/AppUserProfileSegment/AppUserProfileSegment';
import { AppSearchPhotos, AppSearchCollections } from '../../components';

const TabAccount = () => {
  const navigation = useNavigation<AppNavigation>();
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch<any>();
  const { CurrentUser, Photos, Likes, Collections } = useUsers();
  const isLoadingUser = useSelector(usersSelectors.isLoadingUser);
  const isLoadingUserPhotos = useSelector(usersSelectors.isLoadingUserPhotos);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [currentPhotoPage, setCurrentPhotoPage] = useState(1);
  const [currentLikedPhotoPage, setCurrentLikedPhotoPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await getAccessToken();
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      if (!CurrentUser) {
        dispatch(getCurrentUser());
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (CurrentUser?.username) {
      loadUserContent();
    }
  }, [CurrentUser?.username]);

  useEffect(() => {
    setCurrentPhotoPage(1);
    setCurrentLikedPhotoPage(1);
  }, [activeTab]);

  const loadUserContent = async () => {
    if (!CurrentUser?.username) return;

    dispatch(getUserPublicProfile(CurrentUser.username));

    dispatch(
      getUserPhotos({
        username: CurrentUser.username,
        params: {
          page: currentPhotoPage,
          per_page: MAX_PER_PAGE,
          order_by: 'latest',
        },
      }),
    );

    dispatch(
      getUserLikedPhotos({
        username: CurrentUser.username,
        params: {
          page: currentLikedPhotoPage,
          per_page: MAX_PER_PAGE,
          order_by: 'latest',
        },
      }),
    );

    dispatch(
      getUserCollections({
        username: CurrentUser.username,
        params: {
          page: currentLikedPhotoPage,
          per_page: MAX_PER_PAGE,
        },
      }),
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadUserContent();
    setRefreshing(false);
  }, [CurrentUser]);

  const onSignUp = () => {
    navigation.navigate('Register');
  };

  const onLogin = () => {
    navigation.navigate('Login');
  };

  const onPressImage = (id: string) => {
    navigation.navigate('ImageDetails', { id });
  };

  const onCollectionPressImage = (id: string) => {
    navigation.navigate('CollectionDetails', { id });
  };

  const onCollectionPressTitle = (id: string) => {
    navigation.navigate('CollectionDetails', { id });
  };

  if (isLoggedIn === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.black} />
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <ImageBackground
        source={landingImg}
        style={{ width: '100%', height: '100%' }}>
        <View style={{ height: insets.top }} />
        <View style={styles.emptyView}></View>
        <View
          style={[
            styles.footerContainer,
            { height: 200 + insets.bottom, paddingBottom: insets.bottom },
          ]}>
          <View style={styles.buttonViews}>
            <AppFacebookButton />
            <AppButton title="Sign up with email" onPress={onSignUp} />
          </View>
          <View style={styles.haveAccountContainer}>
            <Text style={styles.haveAccountText}>Already have an account?</Text>
            <Pressable onPress={onLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    );
  }

  if (isLoadingUser && !CurrentUser) {
    return (
      <SafeAreaView
        edges={['left', 'right', 'bottom']}
        style={styles.SafeAreaView}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.black} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={styles.SafeAreaView}>
      <View style={styles.profileContainer}>
        <AppUserProfileDetail
          name={CurrentUser?.name}
          username={CurrentUser?.username}
          bio={CurrentUser?.bio}
          location={CurrentUser?.location}
          profile_image={CurrentUser?.profile_image}
        />
        <AppUserProfileSegment
          total_collections={CurrentUser?.total_collections}
          total_likes={CurrentUser?.total_likes}
          total_photos={CurrentUser?.total_photos}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyView: { flex: 1, justifyContent: 'flex-start', alignItems: 'center' },
  footerContainer: {
    height: 200,
    paddingStart: 16,
    paddingEnd: 16,
  },
  buttonViews: { paddingBottom: 8 },
  haveAccountContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  haveAccountText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.white,
  },
  loginButtonText: {
    paddingLeft: 6,
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profileContainer: {
    flex: 1,
  },
});

export default TabAccount;
