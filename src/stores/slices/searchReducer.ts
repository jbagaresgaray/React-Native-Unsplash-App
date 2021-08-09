import SearchService, { BasicSearchParams } from '../../services/api/search';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '..';
import { MAX_PER_PAGE } from '../../constants';
import {
  ISearchCollections,
  ISearchPhotos,
  ISearchUsers,
} from '../../models/generic';

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

export const searchUsersQry = createAsyncThunk<ISearchUsers, BasicSearchParams>(
  'search/searchUsers',
  async ({ query, page, per_page }) => {
    const response: AxiosResponse = await SearchService.searchUsers({
      query,
      page,
      per_page,
    });
    return response.data;
  },
);

export const searchCollectionsQry = createAsyncThunk<ISearchCollections, BasicSearchParams>(
    'search/searchCollections',
    async ({ query, page, per_page }) => {
      const response: AxiosResponse = await SearchService.searchCollections({
        query,
        page,
        per_page,
      });
      return response.data;
    },
  );
  

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
  },
});

const selectRoot = (state: RootState) => state.search;
export const searchSelectors = {
  searchUsers: createSelector(selectRoot, state => state.searchUsers),
  searchCollections: createSelector(selectRoot, state => state.searchCollections),
  isLoading: createSelector(selectRoot, state => state.isLoading),
};

export const searchActions = {
  ...actions,
  searchUsersQry,
};
export const searchReducer = reducer;
