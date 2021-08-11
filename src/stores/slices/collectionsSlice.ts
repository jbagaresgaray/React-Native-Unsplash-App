import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { MAX_PER_PAGE } from '../../constants';
import { ICollection } from '../../models/collection';
import {
  fetchCollections,
  getCollection,
  getCollectionPhotos,
  getRelatedCollection,
} from '../middleware/collection';

import { IPhoto } from './../../models/photo';

export type CollectionState = {
  isLoading: boolean;
  collection: ICollection | null;
  collections: ICollection[];
  collectionPhotos: IPhoto[];
  collectionRelated: ICollection[];
  page: number;
  per_page: number;
  error: any | null;
};

const initialState: CollectionState = {
  isLoading: false,
  collection: null,
  collections: [],
  collectionPhotos: [],
  collectionRelated: [],
  page: 1,
  per_page: MAX_PER_PAGE,
  error: null,
};

const { actions, reducer } = createSlice({
  name: 'collections',
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
    builder.addCase(fetchCollections.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.collections = payload;
    });
    builder.addCase(fetchCollections.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ======================================================
    // ======================================================
    // ======================================================
    builder.addCase(getCollection.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getCollection.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.collection = payload;
    });
    builder.addCase(getCollection.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ======================================================
    // ======================================================
    // ======================================================
    builder.addCase(getCollectionPhotos.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getCollectionPhotos.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.collectionPhotos = payload;
    });
    builder.addCase(getCollectionPhotos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // ======================================================
    // ======================================================
    // ======================================================
    builder.addCase(getRelatedCollection.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getRelatedCollection.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.collectionRelated = payload;
    });
    builder.addCase(getRelatedCollection.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

const selectRoot = (state: RootState) => state.collections;
export const collectionsSelectors = {
  collection: createSelector(selectRoot, state => state.collection),
  collections: createSelector(selectRoot, state => state.collections),
  collectionPhotos: createSelector(selectRoot, state => state.collectionPhotos),
  collectionRelated: createSelector(
    selectRoot,
    state => state.collectionRelated,
  ),
  isLoading: createSelector(selectRoot, state => state.isLoading),
};

export const collectionsActions = {
  ...actions,
  fetchCollections,
  getCollection,
  getRelatedCollection,
  getCollectionPhotos,
};
export const collectionsReducer = reducer;
