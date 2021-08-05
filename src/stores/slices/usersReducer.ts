import SearchService, { BasicSearchParams } from './../../services/api/search';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '..';
import { MAX_PER_PAGE } from '../../constants';
import { ICollection } from '../../models/collection';
import { ISearchUsers } from '../../models/generic';
import { IPhoto } from './../../models/photo';

export type CollectionState = {
  isLoading: boolean;
  searchUsers: ISearchUsers | null;
  page: number;
  per_page: number;
  error: any | null;
};

const initialState: CollectionState = {
  isLoading: false,
  searchUsers: null,
  page: 1,
  per_page: MAX_PER_PAGE,
  error: null,
};

export const searchUsers = createAsyncThunk<ISearchUsers, BasicSearchParams>(
  'users/searchUsers',
  async ({ query, page, per_page }) => {
    const response: AxiosResponse = await SearchService.searchUsers({
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
    builder.addCase(searchUsers.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(searchUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.searchUsers = payload;
    });
    builder.addCase(searchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

const selectRoot = (state: RootState) => state.users;
export const usersSelectors = {
  searchUsers: createSelector(selectRoot, state => state.searchUsers),
  isLoading: createSelector(selectRoot, state => state.isLoading),
};

export const usersActions = {
  ...actions,
  searchUsers,
};
export const usersReducer = reducer;
