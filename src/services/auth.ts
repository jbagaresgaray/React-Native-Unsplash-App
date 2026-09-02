import * as SecureStore from 'expo-secure-store';
import {
  AppAuthError,
  authorize,
  refresh,
  revoke,
} from 'react-native-app-auth';

import { authConfig } from '../configs/auth';

const TOKEN_KEY = 'unsplash_access_token';
const REFRESH_TOKEN_KEY = 'unsplash_refresh_token';
const TOKEN_EXPIRY_KEY = 'unsplash_token_expiry';

export type AuthorizeParams = {
  onError?: (error: unknown) => void;
  onStart?: () => void;
  onSuccess?: (token: string) => void;
};

export const getAccessToken = () => SecureStore.getItemAsync(TOKEN_KEY);

export const getRefreshToken = () =>
  SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

export const isTokenExpired = async () => {
  const expiry = await SecureStore.getItemAsync(TOKEN_EXPIRY_KEY);
  if (!expiry) return true;
  return Number(expiry) < new Date().getTime();
};

export const saveToken = async (
  accessToken: string,
  refreshToken: string,
  expiresIn?: number,
) => {
  await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  if (expiresIn) {
    const expiresAt = new Date().getTime() + expiresIn * 1000;
    await SecureStore.setItemAsync(TOKEN_EXPIRY_KEY, String(expiresAt));
  }
};

export const clearToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  await SecureStore.deleteItemAsync(TOKEN_EXPIRY_KEY);
};

export const authorizeWithUnsplash = async ({
  onStart,
  onSuccess,
  onError,
}: AuthorizeParams = {}) => {
  onStart?.();
  try {
    console.log('authConfig: ', authConfig);
    const result = await authorize(authConfig);
    console.log('authorize result: ', result);
    await saveToken(result.accessToken, result.refreshToken);
    onSuccess?.(result.accessToken);
    return result;
  } catch (error) {
    onError?.(error);
    throw error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available.');
    }
    const result = await refresh(authConfig, { refreshToken });
    const newRefreshToken = result.refreshToken || refreshToken;
    await saveToken(result.accessToken, newRefreshToken);
    return result.accessToken;
  } catch (error) {
    throw error as AppAuthError;
  }
};

export const revokeAccess = async () => {
  try {
    const accessToken = await getAccessToken();
    if (accessToken) {
      await revoke(authConfig, { tokenToRevoke: accessToken });
    }
  } finally {
    await clearToken();
  }
};
