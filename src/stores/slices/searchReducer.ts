import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { MAX_PER_PAGE } from '../../constants';
import {
  ISearchCollections,
  ISearchPhotos,
  ISearchUsers,
} from '../../models/generic';
import {
  searchUsersQry,
  searchCollectionsQry,
  searchPhotosQry,
} from '../middleware/search';

export type SearchState = {
  isLoadingSearchUsers: boolean;
  isLoadingSearchCollections: boolean;
  isLoadingSearchPhotos: boolean;
  searchUsers: ISearchUsers | null;
  searchCollections: ISearchCollections | null;
  searchPhotos: ISearchPhotos | null;
  page: number;
  per_page: number;
  error: any | null;
};

const initialState: SearchState = {
  isLoadingSearchUsers: false,
  isLoadingSearchCollections: false,
  isLoadingSearchPhotos: false,
  searchUsers: null,
  searchCollections: null,
  searchPhotos: null,
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
    builder.addCase(searchUsersQry.pending, state => {
      state.isLoadingSearchUsers = true;
    });
    builder.addCase(searchUsersQry.fulfilled, (state, { payload }) => {
      state.isLoadingSearchUsers = false;
      state.searchUsers = payload;
    });
    builder.addCase(searchUsersQry.rejected, (state, action) => {
      state.isLoadingSearchUsers = false;
      state.error = action.error;
    });
    // ===================================================
    // ===================================================
    // ===================================================
    builder.addCase(searchCollectionsQry.pending, state => {
      state.isLoadingSearchCollections = true;
    });
    builder.addCase(searchCollectionsQry.fulfilled, (state, { payload }) => {
      state.isLoadingSearchCollections = false;
      state.searchCollections = payload;
    });
    builder.addCase(searchCollectionsQry.rejected, (state, action) => {
      state.isLoadingSearchCollections = false;
      state.error = action.error;
    });
    // ===================================================
    // ===================================================
    // ===================================================
    builder.addCase(searchPhotosQry.pending, state => {
      state.isLoadingSearchPhotos = true;
    });
    builder.addCase(searchPhotosQry.fulfilled, (state, { payload }) => {
      state.isLoadingSearchPhotos = false;
      state.searchPhotos = payload;
    });
    builder.addCase(searchPhotosQry.rejected, (state, action) => {
      state.isLoadingSearchPhotos = false;
      state.error = action.error;
    });
  },
});

const selectRoot = (state: RootState) => state.search;
export const searchSelectors = {
  searchUsers: createSelector(selectRoot, state => state.searchUsers),
  searchCollections: createSelector(
    selectRoot,
    state => state.searchCollections,
  ),
  isLoadingSearchUsers: createSelector(
    selectRoot,
    state => state.isLoadingSearchUsers,
  ),
  isLoadingSearchCollections: createSelector(
    selectRoot,
    state => state.isLoadingSearchCollections,
  ),
  isLoadingSearchPhotos: createSelector(
    selectRoot,
    state => state.isLoadingSearchPhotos,
  ),
};

export const searchActions = {
  ...actions,
  searchUsersQry,
  searchCollectionsQry,
};
export const searchReducer = reducer;
