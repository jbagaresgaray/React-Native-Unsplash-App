import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {RootState} from '..';
import {MAX_PER_PAGE, ORDER_BY_TYPES} from '../../constants';
import PhotosService, {ListPhotosParams} from '../../services/api/photos';
import {IPhotoExtended} from './../../models/photo';

export type PhotosState = {
  isLoading: boolean;
  randomPhotos: IPhotoExtended[];
  photos: IPhotoExtended[];
  photo: IPhotoExtended | null;
  page: number;
  per_page: number;
  order_by: ORDER_BY_TYPES;
  error: any | null;
};

const initialState: PhotosState = {
  isLoading: false,
  photos: [],
  randomPhotos: [],
  photo: null,
  page: 1,
  per_page: MAX_PER_PAGE,
  order_by: 'position',
  error: null,
};

export const fetchListPhotos = createAsyncThunk<IPhotoExtended[], ListPhotosParams>(
  'photos/fetchPhotos',
  async ({page, per_page, order_by}) => {
    const response: AxiosResponse = await PhotosService.listPhotos({
      page,
      per_page,
      order_by,
    });
    return response.data;
  },
);

export const getPhoto = createAsyncThunk<IPhotoExtended, string>(
  'photos/getPhoto',
  async id => {
    const response: AxiosResponse = await PhotosService.getPhoto(id);
    return response.data;
  },
);

const {actions, reducer} = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    incrementPage: state => {
      state.page += 1;
    },
    decrementPage: state => {
      state.page -= 1;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchListPhotos.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchListPhotos.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      // state.topics = state.topics.concat(payload);
      state.photos = payload;
    });
    builder.addCase(fetchListPhotos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // ===================================================
    // ===================================================
    // ===================================================

    builder.addCase(getPhoto.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getPhoto.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.photo = payload;
    });
    builder.addCase(getPhoto.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

const selectRoot = (state: RootState) => state.photos;
export const photosSelectors = {
  photos: createSelector(selectRoot, state => state.photos),
  photo: createSelector(selectRoot, state => state.photo),
  isLoading: createSelector(selectRoot, state => state.isLoading),
};

export const photosActions = {
  ...actions,
  fetchListPhotos,
};
export const photosReducer = reducer;
