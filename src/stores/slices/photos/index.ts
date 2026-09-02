import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { MAX_PER_PAGE, ORDER_BY_TYPES } from '../../../constants';
import {
  fetchListPhotos,
  getPhoto,
  likePhoto,
  unLikePhoto,
} from './thunk';
import { IPhotoExtended } from '../../../interfaces/photo';

export type PhotosState = {
  isLoadingPhoto: boolean;
  isLoadingPhotos: boolean;
  isLoadingRandomPhotos: boolean;
  randomPhotos: IPhotoExtended[];
  photos: IPhotoExtended[];
  photo: IPhotoExtended | null;
  page: number;
  per_page: number;
  order_by: ORDER_BY_TYPES;
  error: any | null;
};

const initialState: PhotosState = {
  isLoadingPhoto: false,
  isLoadingPhotos: false,
  isLoadingRandomPhotos: false,
  photos: [],
  randomPhotos: [],
  photo: null,
  page: 1,
  per_page: MAX_PER_PAGE,
  order_by: 'position',
  error: null,
};

const { actions, reducer } = createSlice({
  name: 'photos',
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
      state.isLoadingPhotos = true;
    });
    builder.addCase(fetchListPhotos.fulfilled, (state, { payload }) => {
      state.isLoadingPhotos = false;
      // state.topics = state.topics.concat(payload);
      state.photos = payload;
    });
    builder.addCase(fetchListPhotos.rejected, (state, action) => {
      state.isLoadingPhotos = false;
      state.error = action.error;
    });

    // ===================================================
    // ===================================================
    // ===================================================

    builder.addCase(getPhoto.pending, state => {
      state.isLoadingPhoto = true;
    });
    builder.addCase(getPhoto.fulfilled, (state, { payload }) => {
      state.isLoadingPhoto = false;
      state.photo = payload;
    });
    builder.addCase(getPhoto.rejected, (state, action) => {
      state.isLoadingPhoto = false;
      state.error = action.error;
    });

    // ===================================================
    // ===================================================
    // ===================================================
    builder.addCase(likePhoto.fulfilled, (state, { payload }) => {
      const id = payload?.id;
      if (id) {
        state.photos = state.photos.map(p =>
          p.id === id
            ? { ...p, liked_by_user: true, likes: payload.likes }
            : p,
        );
        if (state.photo?.id === id) {
          state.photo = {
            ...state.photo,
            liked_by_user: true,
            likes: payload.likes,
          };
        }
      }
    });

    builder.addCase(unLikePhoto.fulfilled, (state, { payload }) => {
      const id = payload?.id;
      if (id) {
        state.photos = state.photos.map(p =>
          p.id === id
            ? { ...p, liked_by_user: false, likes: payload.likes }
            : p,
        );
        if (state.photo?.id === id) {
          state.photo = {
            ...state.photo,
            liked_by_user: false,
            likes: payload.likes,
          };
        }
      }
    });
  },
});

const selectRoot = (state: RootState) => state.photos;
export const photosSelectors = {
  photos: createSelector(selectRoot, state => state.photos),
  photo: createSelector(selectRoot, state => state.photo),
  isLoadingPhoto: createSelector(selectRoot, state => state.isLoadingPhoto),
  isLoadingPhotos: createSelector(selectRoot, state => state.isLoadingPhotos),
};

export const photosActions = {
  ...actions,
  fetchListPhotos,
  getPhoto,
  likePhoto,
  unLikePhoto,
};
export const photosReducer = reducer;
