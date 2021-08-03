import {ITopic} from '../../models/topic';
import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {MAX_PER_PAGE, ORDER_BY_TYPES} from '../../constants';
import {RootState} from '..';
import TopicsService, {
  ListTopicsParams,
  TopicPhotosParams,
} from '../../services/api/topics';
import {AxiosResponse} from 'axios';
import {IPhoto} from '../../models/photo';

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

export const fetchListTopics = createAsyncThunk<ITopic[], ListTopicsParams>(
  'topics/fetchTopics',
  async ({ids, page, per_page, order_by}) => {
    const response: AxiosResponse = await TopicsService.listTopics({
      ids,
      page,
      per_page,
      order_by,
    });
    return response.data;
  },
);

export const getTopic = createAsyncThunk<ITopic, string>(
  'topics/getTopic',
  async (id_or_slug: string) => {
    const response: AxiosResponse = await TopicsService.getTopic(id_or_slug);
    return response.data;
  },
);

export const getTopicPhotos = createAsyncThunk<
  IPhoto[],
  {id_or_slug: string; params: TopicPhotosParams}
>('topics/getTopicPhotos', async ({id_or_slug, params}) => {
  const response: AxiosResponse = await TopicsService.getTopicPhotos(
    id_or_slug,
    params,
  );
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
    builder.addCase(fetchListTopics.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchListTopics.fulfilled, (state, {payload}) => {
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
    builder.addCase(getTopic.fulfilled, (state, {payload}) => {
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
    builder.addCase(getTopicPhotos.fulfilled, (state, {payload}) => {
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
};
export const topicsReducer = reducer;
