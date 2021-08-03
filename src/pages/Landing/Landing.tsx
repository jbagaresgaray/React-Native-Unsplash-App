import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import landingImg from '../../assets/img/landing-unsplash.jpg';
import AppButton from '../../components/AppButton/AppButton';
import AppFacebookButton from '../../components/AppFacebookButton/AppFacebookButton';
import AppHeaderLogo from '../../components/AppHeaderLogo/AppHeaderLogo';
import {COLORS} from '../../constants/Colors';

const Landing: React.FC = () => {
  const navigation = useNavigation();

  const skipLanding = () => {
    navigation.navigate('Main');
  };

  const onSignUp = () => {
    navigation.navigate('Register');
  };

  const onLogin = () => {
    navigation.navigate('Login');
  };

  const SkipButton = () => (
    <TouchableOpacity style={styles.skipButton} onPress={skipLanding}>
      <Text style={styles.skipButtonText}>Skip</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={landingImg}
        style={{width: '100%', height: '100%'}}>
        <SafeAreaView />
        <View style={styles.headerContainer}>{SkipButton()}</View>
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
            <TouchableOpacity onPress={onLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
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

export default Landing;
