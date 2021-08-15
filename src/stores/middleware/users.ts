import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { IPhoto } from '../../models/photo';
import { IUserProfile } from '../../models/user';
import UsersService, {
  UserCollectionsParams,
  UserLikedPhotosParams,
  UserPhotosParams,
} from './../../services/api/users';

export const getUserPublicProfile = createAsyncThunk<IUserProfile, string>(
  'users/getUserPublicProfile',
  async (username: string) => {
    const response: AxiosResponse = await UsersService.getUserPublicProfile(
      username,
    );
    return response.data;
  },
);

export const getUserPhotos = createAsyncThunk<
  IPhoto[],
  { username: string; params: UserPhotosParams }
>('users/getUserPhotos', async ({ username, params }) => {
  const response: AxiosResponse = await UsersService.getUserPhotos(
    username,
    params,
  );
  return response.data;
});

export const getUserLikedPhotos = createAsyncThunk<
  IPhoto[],
  { username: string; params: UserLikedPhotosParams }
>('users/getUserLikedPhotos', async ({ username, params }) => {
  const response: AxiosResponse = await UsersService.getUserLikedPhotos(
    username,
    params,
  );
  return response.data;
});

export const getUserCollections = createAsyncThunk<
  IPhoto[],
  { username: string; params: UserCollectionsParams }
>('users/getUserCollections', async ({ username, params }) => {
  const response: AxiosResponse = await UsersService.getUserCollections(
    username,
    params,
  );
  return response.data;
});
