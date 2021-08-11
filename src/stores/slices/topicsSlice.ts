import { createSelector, createSlice } from '@reduxjs/toolkit';
import { MAX_PER_PAGE, ORDER_BY_TYPES } from '../../constants';
import { ITopic } from '../../models/topic';
import { IPhoto } from '../../models/photo';
import { fetchListTopics, getTopic, getTopicPhotos } from '../middleware/topic';
import { RootState } from '..';

export type TopicsState = {
  isLoading: boolean;
  topics: ITopic[];
  topic: ITopic | null;
  topicPhotos: IPhoto[] | null;
  page: number;
  per_page: number;
  order_by: ORDER_BY_TYPES;
  error: any | null;
};

const initialState: TopicsState = {
  isLoading: false,
  topics: [],
  topic: null,
  topicPhotos: [],
  page: 1,
  per_page: MAX_PER_PAGE,
  order_by: 'position',
  error: null,
};

const { actions, reducer } = createSlice({
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
    builder.addCase(fetchListTopics.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchListTopics.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      // state.topics = state.topics.concat(payload);
      state.topics = payload;
    });
    builder.addCase(fetchListTopics.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // ===================================================
    // ===================================================
    // ===================================================

    builder.addCase(getTopic.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getTopic.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.topic = payload;
    });
    builder.addCase(getTopic.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // ===================================================
    // ===================================================
    // ===================================================

    builder.addCase(getTopicPhotos.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getTopicPhotos.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.topicPhotos = payload;
    });
    builder.addCase(getTopicPhotos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

const selectRoot = (state: RootState) => state.topics;
export const topicsSelectors = {
  topics: createSelector(selectRoot, state => state.topics),
  topic: createSelector(selectRoot, state => state.topic),
  topicPhotos: createSelector(selectRoot, state => state.topicPhotos),
  isLoading: createSelector(selectRoot, state => state.isLoading),
};

export const topicsActions = {
  ...actions,
  fetchListTopics,
  getTopic,
  getTopicPhotos,
};
export const topicsReducer = reducer;
