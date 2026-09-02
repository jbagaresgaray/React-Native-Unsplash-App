import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { IPhoto } from '../../../interfaces/photo';
import { IUser, IUserProfile } from '../../../interfaces/user';
import PhotosService, {
  ListPhotosParams,
} from '../../../services/api/photos';
import UsersService, {
  UserCollectionsParams,
  UserLikedPhotosParams,
  UserPhotosParams,
} from '../../../services/api/users';

export const getCurrentUser = createAsyncThunk<IUser, string | undefined>(
  'users/getCurrentUser',
  async (token?: string) => {
    const response: AxiosResponse = await UsersService.getCurrentUser(token);
    return response.data;
  },
);

export const fetchListUsers = createAsyncThunk<IUser[], ListPhotosParams>(
  'users/fetchListUsers',
  async ({ page = 1, per_page = 21, order_by = 'popular' }) => {
    const response: AxiosResponse = await PhotosService.listPhotos({
      page,
      per_page,
      order_by,
    });
    const photos: IPhoto[] = response.data;
    const seen = new Set<string>();
    const users: IUser[] = [];
    photos.forEach(photo => {
      if (photo.user && !seen.has(photo.user.id)) {
        seen.add(photo.user.id);
        users.push(photo.user);
      }
    });
    return users;
  },
);

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
