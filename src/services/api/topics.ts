import API from './';
import { ORIENTATION_TYPES, ORDER_BY_TYPES } from '../../constants';

export interface ListTopicsParams {
  ids?: string | null;
  page?: number;
  per_page?: number;
  order_by?: ORDER_BY_TYPES;
}

export interface TopicPhotosParams {
  page?: number;
  per_page?: number;
  orientation?: ORIENTATION_TYPES;
  order_by?: ORDER_BY_TYPES;
}

const TopicsService = {
  listTopics(params?: ListTopicsParams) {
    console.log('listTopics: ', params);
    return API.get('/topics', {
      params,
    });
  },
  getTopic(id_or_slug: string) {
    return API.get(`/topics/${id_or_slug}`);
  },
  getTopicPhotos(id_or_slug: string, params?: TopicPhotosParams) {
    return API.get(`/topics/${id_or_slug}/photos`, {
      params,
    });
  },
};

export default TopicsService;
