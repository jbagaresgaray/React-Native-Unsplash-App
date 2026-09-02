import type { AuthConfiguration } from 'react-native-app-auth';

export const REDIRECT_URI =
  process.env.EXPO_PUBLIC_UNSPLASH_REDIRECT_URI ||
  'unsplashapp://oauthredirect';

export const authConfig: AuthConfiguration = {
  clientId: process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY || '',
  clientSecret: process.env.EXPO_PUBLIC_UNSPLASH_SECRET_KEY || '',
  redirectUrl: REDIRECT_URI,
  scopes: [
    'public',
    'read_user',
    'read_photos',
    'write_likes',
    'read_collections',
  ],
  serviceConfiguration: {
    authorizationEndpoint: 'https://unsplash.com/oauth/authorize',
    tokenEndpoint: 'https://unsplash.com/oauth/token',
    revocationEndpoint: 'https://unsplash.com/oauth/revoke',
  },
  useNonce: false,
  usePKCE: false,
};
