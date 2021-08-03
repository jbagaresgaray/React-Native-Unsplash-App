import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Input} from 'react-native-elements';

import landingImg from '../../assets/img/landing-unsplash1.jpg';
import AppButton from '../../components/AppButton/AppButton';
import AppFacebookButton from '../../components/AppFacebookButton/AppFacebookButton';
import AppHeaderLogo from '../../components/AppHeaderLogo/AppHeaderLogo';
import {COLORS} from '../../constants/Colors';

const Login = () => {
  const navigation = useNavigation();

  const skipLanding = () => {
    navigation.navigate('Main');
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
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.headerContainer}>{SkipButton()}</View>
          <View style={styles.contentContainer}>
            <AppHeaderLogo />
          </View>
          <View style={styles.footerContainer}>
            <KeyboardAvoidingView behavior="padding">
              <Input
                label="Email address"
                placeholder="Email address"
                labelStyle={styles.labelText}
                inputStyle={styles.labelText}
              />
              <Input
                label="Password"
                placeholder="Password"
                secureTextEntry
                labelStyle={styles.labelText}
                inputStyle={styles.labelText}
              />
              <View style={styles.haveAccountContainer}>
                <TouchableOpacity activeOpacity={0.6}>
                  <Text style={styles.loginButtonText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <View style={styles.buttonViews}>
              <AppFacebookButton />
              <AppButton title="Login" />
            </View>
            <View style={styles.haveAccountContainer}>
              <Text style={styles.haveAccountText}>Don't have an account?</Text>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.loginButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 32,
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
    // height: 200,
    paddingStart: 16,
    paddingEnd: 16,
  },
  labelText: {
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
    marginBottom: 16,
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
    color: '#111',
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
});

export default Login;
