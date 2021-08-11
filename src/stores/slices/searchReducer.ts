import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { MAX_PER_PAGE } from '../../constants';
import {
  ISearchCollections,
  ISearchPhotos,
  ISearchUsers,
} from '../../models/generic';
import { searchUsersQry, searchCollectionsQry } from '../middleware/search';

export type SearchState = {
  isLoading: boolean;
  searchUsers: ISearchUsers | null;
  searchCollections: ISearchCollections | null;
  searchPhotos: ISearchPhotos | null;
  page: number;
  per_page: number;
  error: any | null;
};

const initialState: SearchState = {
  isLoading: false,
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
      state.isLoading = true;
    });
    builder.addCase(searchUsersQry.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.searchUsers = payload;
    });
    builder.addCase(searchUsersQry.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ===================================================
    // ===================================================
    // ===================================================
    builder.addCase(searchCollectionsQry.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(searchCollectionsQry.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.searchCollections = payload;
    });
    builder.addCase(searchCollectionsQry.rejected, (state, action) => {
      state.isLoading = false;
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
  isLoading: createSelector(selectRoot, state => state.isLoading),
};

export const searchActions = {
  ...actions,
  searchUsersQry,
  searchCollectionsQry,
};
export const searchReducer = reducer;
