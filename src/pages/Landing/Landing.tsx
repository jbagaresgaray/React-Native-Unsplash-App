import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';

import landingImg from '../../assets/img/landing-unsplash.jpg';

import AppButton from '../../components/AppButton/AppButton';
import AppFacebookButton from '../../components/AppFacebookButton/AppFacebookButton';
import AppHeaderLogo from '../../components/AppHeaderLogo/AppHeaderLogo';

import { MAX_PER_PAGE } from '../../constants';
import { COLORS } from '../../constants/Colors';

import { fetchCollections } from '../../stores/slices/collections/thunk';
import { fetchListPhotos } from '../../stores/slices/photos/thunk';
import { fetchListTopics } from '../../stores/slices/topics/thunk';
import { PhotosState } from '../../stores/slices/photos';
import { TopicsState } from '../../stores/slices/topics';
import { useDispatch } from 'react-redux';

const Landing: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const skipLanding = () => {
    navigation.navigate('Main', {
      screen: 'HomeStack',
    });
  };

  const onSignUp = () => {
    navigation.navigate('Register');
  };

  const onLogin = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    dispatch(
      fetchListTopics({
        ids: null,
        page: 1,
        per_page: MAX_PER_PAGE,
        order_by: 'position',
      }),
    );
    dispatch(
      fetchListPhotos({
        page: 1,
        per_page: MAX_PER_PAGE,
        order_by: 'latest',
      }),
    );
    dispatch(
      fetchCollections({
        page: 1,
        per_page: MAX_PER_PAGE,
      }),
    );
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={landingImg}
        style={{ width: '100%', height: '100%' }}>
        <SafeAreaView />
        <View style={styles.headerContainer}>
          <Pressable style={styles.skipButton} onPress={skipLanding}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <AppHeaderLogo />
          <Text style={styles.logoText}>Creation starts here</Text>
        </View>
        <View style={styles.footerContainer}>
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
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 32,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer: {
    height: 44,
    justifyContent: 'center',
    paddingStart: 16,
    paddingEnd: 16,
  },
  footerContainer: {
    height: 200,
    paddingStart: 16,
    paddingEnd: 16,
  },
  logoText: {
    marginTop: 14,
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '500',
  },
  skipButton: {
    alignSelf: 'flex-end',
  },
  skipButtonText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '500',
  },
  landingButton: {
    paddingTop: 4,
    paddingBottom: 4,
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
});

export default Landing;
