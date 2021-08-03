import {useNavigation} from '@react-navigation/core';
import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AppButton from '../../components/AppButton/AppButton';
import AppFacebookButton from '../../components/AppFacebookButton/AppFacebookButton';
import {COLORS} from '../../constants/Colors';

import landingImg from '../../assets/img/landing-unsplash.jpg';

const TabAccount = () => {
  const navigation: any = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerLeft: () => null,
      headerTitle: () => null,
    });
  }, [navigation]);

  const onSignUp = () => {
    navigation.navigate('Register');
  };

  const onLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={landingImg}
      style={{width: '100%', height: '100%'}}>
      <SafeAreaView />
      <View style={styles.emptyView}></View>
      <View style={styles.footerContainer}>
        <View style={styles.buttonViews}>
          <AppFacebookButton />
          <AppButton title="Sign up with email" onPress={onSignUp} />
        </View>
        <View style={styles.haveAccountContainer}>
          <Text style={styles.haveAccountText}>Already have an account?</Text>
          <TouchableOpacity onPress={onLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyView: {flex: 1, justifyContent: 'flex-start', alignItems: 'center'},
  footerContainer: {
    height: 200,
    paddingStart: 16,
    paddingEnd: 16,
  },
  buttonViews: {paddingBottom: 8},
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

export default TabAccount;
