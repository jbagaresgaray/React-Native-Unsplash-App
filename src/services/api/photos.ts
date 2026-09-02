import API from '.';
import {ORIENTATION_TYPES} from '../../constants';
import { getAccessToken } from '../auth';

export interface ListPhotosParams {
  page?: number;
  per_page?: number;
  order_by?: 'latest' | 'oldest' | 'popular';
}

export interface CollectionPhotosParams {
  page?: number;
  per_page?: number;
  orientation?: ORIENTATION_TYPES;
}

const PhotosService = {
  listPhotos(params?: ListPhotosParams) {
    return API.get('/photos', {
      params,
    });
  },
  getPhoto(id: string) {
    return API.get(`/photos/${id}`);
  },
  trackDownloadPhoto(id: string) {
    return API.get(`/photos/${id}/download`);
  },
  async likePhoto(id: string) {
    const token = await getAccessToken();
    return API.post(`/photos/${id}/like`, null, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  },
  async unLikePhoto(id: string) {
    const token = await getAccessToken();
    return API.delete(`/photos/${id}/like`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  },
};

export default PhotosService;
