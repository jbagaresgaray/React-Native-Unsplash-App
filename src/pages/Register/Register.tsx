import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Input } from 'react-native-elements';

import landingImg from '../../assets/img/landing-unsplash1.jpg';
import AppButton from '../../components/AppButton/AppButton';
import AppFacebookButton from '../../components/AppFacebookButton/AppFacebookButton';
import AppHeaderLogo from '../../components/AppHeaderLogo/AppHeaderLogo';
import { COLORS } from '../../constants/Colors';

const Register = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={landingImg}
        style={{ width: '100%', height: '100%' }}>
        <SafeAreaView />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.contentContainer}>
            <AppHeaderLogo />
          </View>
          <View style={styles.footerContainer}>
            <KeyboardAvoidingView behavior="padding">
              <Input
                label="First name"
                placeholder="First name"
                labelStyle={styles.labelText}
                inputStyle={styles.labelText}
              />
              <Input
                label="Last name"
                placeholder="Last name"
                labelStyle={styles.labelText}
                inputStyle={styles.labelText}
              />
              <Input
                label="Email address"
                placeholder="Email address"
                labelStyle={styles.labelText}
                inputStyle={styles.labelText}
              />
              <Input
                label="Username"
                placeholder="Username"
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
            </KeyboardAvoidingView>
            <View style={styles.buttonViews}>
              <AppFacebookButton />
              <AppButton title="Join" />
            </View>
            <View style={styles.haveAccountContainer}>
              <Text style={styles.haveAccountText}>
                By joining, you agree to the
              </Text>
              <Pressable>
                <Text style={styles.loginButtonText}>Terms</Text>
              </Pressable>
              <Text style={styles.haveAccountText}>and</Text>
              <Pressable>
                <Text style={styles.loginButtonText}>Privacy Policy</Text>
              </Pressable>
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
    color: '#111',
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

export default Register;
