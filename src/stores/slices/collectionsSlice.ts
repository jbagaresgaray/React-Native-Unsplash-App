import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {RootState} from '..';
import {MAX_PER_PAGE} from '../../constants';
import {ICollection} from '../../models/collection';
import CollectionsService, {
  ListCollectionsParams,
} from '../../services/api/collections';
import {IPhoto} from './../../models/photo';

export type CollectionState = {
  isLoading: boolean;
  collections: ICollection[];
  collectionPhotos: IPhoto[];
  page: number;
  per_page: number;
  error: any | null;
};

const initialState: CollectionState = {
  isLoading: false,
  collections: [],
  collectionPhotos: [],
  page: 1,
  per_page: MAX_PER_PAGE,
  error: null,
};

export const fetchCollections = createAsyncThunk<
  ICollection[],
  ListCollectionsParams
>('collections/fetchCollections', async ({page, per_page}) => {
  const response: AxiosResponse = await CollectionsService.listCollections({
    page,
    per_page,
  });
  return response.data;
});

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
    builder.addCase(fetchCollections.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchCollections.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.collections = payload;
    });
    builder.addCase(fetchCollections.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

const selectRoot = (state: RootState) => state.collections;
export const collectionsSelectors = {
  collections: createSelector(selectRoot, state => state.collections),
  isLoading: createSelector(selectRoot, state => state.isLoading),
};

export const collectionsActions = {
  ...actions,
  fetchCollections,
};
export const collectionsReducer = reducer;
