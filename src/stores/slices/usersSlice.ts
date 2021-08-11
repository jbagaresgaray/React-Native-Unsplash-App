import {
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { RootState } from '..';
import { MAX_PER_PAGE } from '../../constants';
import { IPhoto } from '../../models/photo';
import { IUserProfile } from '../../models/user';
import { getUserCollections, getUserLikedPhotos, getUserPhotos, getUserPublicProfile } from '../middleware/users';


export type UsersState = {
  isLoadingUser: boolean;
  isLoadingUserPhotos: boolean;
  publicUser: IUserProfile | null;
  publicUserPhotos: IPhoto[] | null;
  publicUserLikedPhotos: IPhoto[] | null;
  publicUserCollectionPhotos: IPhoto[] | null;
  page: number;
  per_page: number;
  error: any | null;
};

const initialState: UsersState = {
  isLoadingUser: false,
  isLoadingUserPhotos: false,
  publicUser: null,
  publicUserPhotos: null,
  publicUserLikedPhotos: null,
  publicUserCollectionPhotos: null,
  page: 1,
  per_page: MAX_PER_PAGE,
  error: null,
};



const { actions, reducer } = createSlice({
  name: 'users',
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
    // ==========================================================================
    // ==========================================================================
    // ==========================================================================
    builder.addCase(getUserPublicProfile.pending, state => {
      state.isLoadingUser = true;
    });
    builder.addCase(getUserPublicProfile.fulfilled, (state, { payload }) => {
      state.isLoadingUser = false;
      state.publicUser = payload;
    });
    builder.addCase(getUserPublicProfile.rejected, (state, action) => {
      state.isLoadingUser = false;
      state.error = action.error;
    });
    // ==========================================================================
    // ==========================================================================
    // ==========================================================================
    builder.addCase(getUserPhotos.pending, state => {
      state.isLoadingUserPhotos = true;
    });
    builder.addCase(getUserPhotos.fulfilled, (state, { payload }) => {
      state.isLoadingUserPhotos = false;
      state.publicUserPhotos = payload;
    });
    builder.addCase(getUserPhotos.rejected, (state, action) => {
      state.isLoadingUserPhotos = false;
      state.error = action.error;
    });
    // ==========================================================================
    // ==========================================================================
    // ==========================================================================
    builder.addCase(getUserLikedPhotos.pending, state => {
      state.isLoadingUserPhotos = true;
    });
    builder.addCase(getUserLikedPhotos.fulfilled, (state, { payload }) => {
      state.isLoadingUserPhotos = false;
      state.publicUserLikedPhotos = payload;
    });
    builder.addCase(getUserLikedPhotos.rejected, (state, action) => {
      state.isLoadingUserPhotos = false;
      state.error = action.error;
    });
    // ==========================================================================
    // ==========================================================================
    // ==========================================================================
    builder.addCase(getUserCollections.pending, state => {
      state.isLoadingUserPhotos = true;
    });
    builder.addCase(getUserCollections.fulfilled, (state, { payload }) => {
      state.isLoadingUserPhotos = false;
      state.publicUserCollectionPhotos = payload;
    });
    builder.addCase(getUserCollections.rejected, (state, action) => {
      state.isLoadingUserPhotos = false;
      state.error = action.error;
    });
  },
});

const selectRoot = (state: RootState) => state.users;
export const usersSelectors = {
  publicUser: createSelector(selectRoot, state => state.publicUser),
  publicUserPhotos: createSelector(selectRoot, state => state.publicUserPhotos),
  publicUserLikedPhotos: createSelector(
    selectRoot,
    state => state.publicUserLikedPhotos,
  ),
  publicUserCollectionPhotos: createSelector(
    selectRoot,
    state => state.publicUserCollectionPhotos,
  ),
  isLoadingUser: createSelector(selectRoot, state => state.isLoadingUser),
  isLoadingUserPhotos: createSelector(
    selectRoot,
    state => state.isLoadingUserPhotos,
  ),
};

export const usersActions = {
  ...actions,
  getUserPublicProfile,
  getUserPhotos,
  getUserLikedPhotos,
  getUserCollections,
};
export const usersReducer = reducer;
