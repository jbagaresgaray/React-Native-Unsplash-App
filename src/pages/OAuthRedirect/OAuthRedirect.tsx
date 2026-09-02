import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { COLORS } from '../../constants/Colors';
import { saveToken } from '../../services/auth';
import { authConfig, REDIRECT_URI } from '../../configs/auth';
import AppButton from '../../components/AppButton/AppButton';
import type { RootStackParamList, OAuthRedirectScreenProps } from '../../navigations/types';

const OAuthRedirect: React.FC<OAuthRedirectScreenProps> = ({ route }) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'OAuthRedirect'>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { code, error: authError } = route.params || {};

  useEffect(() => {
    if (authError) {
      setError('Authorization was denied or failed. Please try again.');
      setLoading(false);
      return;
    }

    if (code) {
      exchangeCode(code);
    } else {
      setError('No authorization code received.');
      setLoading(false);
    }
  }, [code, authError]);

  const exchangeCode = async (authorizationCode: string) => {
    try {
      const response = await fetch(
        'https://unsplash.com/oauth/token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id: authConfig.clientId,
            client_secret: authConfig.clientSecret,
            redirect_uri: REDIRECT_URI,
            code: authorizationCode,
            grant_type: 'authorization_code',
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0] || 'Token exchange failed.');
      }

      await saveToken(data.access_token, data.refresh_token, data.expires_in);
      navigation.replace('Main');
    } catch (err) {
      const message =
        (err as Error)?.message ||
        'An error occurred during authentication. Please try again.';
      setError(message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.black} />
        <Text style={styles.statusText}>Signing you in…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
      <AppButton title="Try again" onPress={() => navigation.replace('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
  },
  statusText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.black,
  },
  errorText: {
    fontSize: 15,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default OAuthRedirect;
