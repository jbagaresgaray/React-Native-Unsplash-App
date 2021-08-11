import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { IPhotoExtended } from '../../models/photo';
import PhotosService, { ListPhotosParams } from '../../services/api/photos';

export const fetchListPhotos = createAsyncThunk<
  IPhotoExtended[],
  ListPhotosParams
>('photos/fetchPhotos', async ({ page, per_page, order_by }) => {
  const response: AxiosResponse = await PhotosService.listPhotos({
    page,
    per_page,
    order_by,
  });
  return response.data;
});

export const getPhoto = createAsyncThunk<IPhotoExtended, string>(
  'photos/getPhoto',
  async id => {
    const response: AxiosResponse = await PhotosService.getPhoto(id);
    return response.data;
  },
);
