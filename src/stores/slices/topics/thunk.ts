import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { IPhoto } from '../../../interfaces/photo';
import { ITopic } from '../../../interfaces/topic';
import TopicsService, {
  ListTopicsParams,
  TopicPhotosParams,
} from '../../../services/api/topics';

export const fetchListTopics = createAsyncThunk<ITopic[], ListTopicsParams>(
  'topics/fetchTopics',
  async ({ ids, page, per_page, order_by }) => {
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
  { id_or_slug: string; params: TopicPhotosParams }
>('topics/getTopicPhotos', async ({ id_or_slug, params }) => {
  const response: AxiosResponse = await TopicsService.getTopicPhotos(
    id_or_slug,
    params,
  );
  return response.data;
});
