import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import landingImg from '../../assets/img/landing-unsplash1.jpg';
import AppButton from '../../components/AppButton/AppButton';
import AppHeaderLogo from '../../components/AppHeaderLogo/AppHeaderLogo';
import { COLORS } from '../../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../navigations/types';
import { authorizeWithUnsplash } from '../../services/auth';

const Login = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const skipLanding = () => {
    navigation.popTo('Main');
  };

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await authorizeWithUnsplash();
      navigation.replace('Main');
    } catch (err) {
      const message =
        (err as Error)?.message ||
        'An error occurred while signing in. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  const SkipButton = () => (
    <Pressable style={styles.skipButton} onPress={skipLanding}>
      <Text style={styles.skipButtonText}>Skip</Text>
    </Pressable>
  );

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={landingImg}
        style={{ width: '100%', height: '100%' }}>
        <View style={{ height: insets.top }} />
        <ScrollView
          contentContainerStyle={[
            styles.scrollView,
            { paddingBottom: 32 + insets.bottom },
          ]}>
          <View style={styles.headerContainer}>{SkipButton()}</View>
          <View style={styles.contentContainer}>
            <AppHeaderLogo />
          </View>
          <View style={styles.footerContainer}>
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            <View style={styles.buttonViews}>
              <AppButton
                title={loading ? 'Signing in…' : 'Continue with Unsplash'}
                onPress={handleSignIn}
                disabled={loading}
                loading={loading}
                loadingStyle={styles.loadingStyle}
                loadingProps={{
                  color: COLORS.white,
                }}
              />
            </View>
            <View style={styles.haveAccountContainer}>
              <Text style={styles.haveAccountText}>Having trouble?</Text>
              <Pressable onPress={() => setError(null)}>
                <Text style={styles.loginButtonText}>Try again</Text>
              </Pressable>
            </View>
          </View>
          {loading ? (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color={COLORS.white} />
            </View>
          ) : null}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
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
    paddingStart: 16,
    paddingEnd: 16,
  },
  buttonViews: { paddingBottom: 8 },
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
    color: COLORS.white,
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
  errorContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  errorText: {
    color: COLORS.white,
    fontSize: 13,
    textAlign: 'center',
  },
  loadingStyle: {
    opacity: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
