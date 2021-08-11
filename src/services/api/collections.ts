import API from '.';
import {ORIENTATION_TYPES} from '../../constants';

export interface ListCollectionsParams {
  page?: number;
  per_page?: number;
}

export interface CollectionPhotosParams {
  page?: number;
  per_page?: number;
  orientation?: ORIENTATION_TYPES;
}

const CollectionsService = {
  listCollections(params?: ListCollectionsParams) {
    return API.get('/collections', {
      params,
    });
  },
  getCollection(id: string) {
    return API.get(`/collections/${id}`);
  },
  getCollectionPhotos(id: string, params?: CollectionPhotosParams) {
    return API.get(`/collections/${id}/photos`, {
      params,
    });
  },
  getRelatedCollection(id: string) {
    return API.get(`/collections/${id}/related`);
  },
};

export default CollectionsService;
