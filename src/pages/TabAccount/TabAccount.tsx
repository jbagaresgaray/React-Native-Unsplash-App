import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton/AppButton';
import AppFacebookButton from '../../components/AppFacebookButton/AppFacebookButton';
import { COLORS } from '../../constants/Colors';

import landingImg from '../../assets/img/landing-unsplash.jpg';
import type { AppNavigation } from '../../navigations/types';

const TabAccount = () => {
  const navigation = useNavigation<AppNavigation>();
  const insets = useSafeAreaInsets();

  const onSignUp = () => {
    navigation.navigate('Register');
  };

  const onLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={landingImg}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={{ height: insets.top }} />
      <View style={styles.emptyView}></View>
      <View
        style={[
          styles.footerContainer,
          { height: 200 + insets.bottom, paddingBottom: insets.bottom },
        ]}
      >
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
});

export default TabAccount;
