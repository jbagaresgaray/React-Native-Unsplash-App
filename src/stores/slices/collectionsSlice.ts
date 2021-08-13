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
  isLoadingCollection: boolean;
  isLoadingCollections: boolean;
  isLoadingCollectionPhotos: boolean;
  isLoadingCollectionRelated: boolean;
  collection: ICollection | null;
  collections: ICollection[];
  collectionPhotos: IPhoto[];
  collectionRelated: ICollection[];
  page: number;
  per_page: number;
  error: any | null;
};

const initialState: CollectionState = {
  isLoadingCollection: false,
  isLoadingCollections: false,
  isLoadingCollectionPhotos: false,
  isLoadingCollectionRelated: false,
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
      state.isLoadingCollections = true;
    });
    builder.addCase(fetchCollections.fulfilled, (state, { payload }) => {
      state.isLoadingCollections = false;
      state.collections = payload;
    });
    builder.addCase(fetchCollections.rejected, (state, action) => {
      state.isLoadingCollections = false;
      state.error = action.error;
    });
    // ======================================================
    // ======================================================
    // ======================================================
    builder.addCase(getCollection.pending, state => {
      state.isLoadingCollection = true;
    });
    builder.addCase(getCollection.fulfilled, (state, { payload }) => {
      state.isLoadingCollection = false;
      state.collection = payload;
    });
    builder.addCase(getCollection.rejected, (state, action) => {
      state.isLoadingCollection = false;
      state.error = action.error;
    });
    // ======================================================
    // ======================================================
    // ======================================================
    builder.addCase(getCollectionPhotos.pending, state => {
      state.isLoadingCollectionPhotos = true;
    });
    builder.addCase(getCollectionPhotos.fulfilled, (state, { payload }) => {
      state.isLoadingCollectionPhotos = false;
      state.collectionPhotos = payload;
    });
    builder.addCase(getCollectionPhotos.rejected, (state, action) => {
      state.isLoadingCollectionPhotos = false;
      state.error = action.error;
    });
    // ======================================================
    // ======================================================
    // ======================================================
    builder.addCase(getRelatedCollection.pending, state => {
      state.isLoadingCollectionRelated = true;
    });
    builder.addCase(getRelatedCollection.fulfilled, (state, { payload }) => {
      state.isLoadingCollectionRelated = false;
      state.collectionRelated = payload;
    });
    builder.addCase(getRelatedCollection.rejected, (state, action) => {
      state.isLoadingCollectionRelated = false;
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
  isLoadingCollection: createSelector(selectRoot, state => state.isLoadingCollection),
  isLoadingCollections: createSelector(selectRoot, state => state.isLoadingCollections),
  isLoadingCollectionPhotos: createSelector(selectRoot, state => state.isLoadingCollectionPhotos),
  isLoadingCollectionRelated: createSelector(selectRoot, state => state.isLoadingCollectionRelated),
};

export const collectionsActions = {
  ...actions,
  fetchCollections,
  getCollection,
  getRelatedCollection,
  getCollectionPhotos,
};
export const collectionsReducer = reducer;
