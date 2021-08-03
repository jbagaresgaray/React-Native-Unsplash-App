import API from '.';
import {ORIENTATION_TYPES} from '../../constants';

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
  likePhoto(id: string) {
    return API.post(`/photos/${id}/like`);
  },
  unLikePhoto(id: string) {
    return API.delete(`/photos/${id}/like`);
  },
};

export default PhotosService;
