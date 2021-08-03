import API from '.';
import {ORIENTATION_TYPES} from '../../constants';

export interface SearchPhotosParams {
  query: string;
  page?: number;
  per_page?: number;
  order_by?: 'relevant' | 'latest';
  collections?: string;
  content_filter?: 'low' | 'high';
}

export interface BasicSearchParams {
  query: string;
  page?: number;
  per_page?: number;
}

const SearchService = {
  searchPhotos(params?: SearchPhotosParams) {
    return API.get('/search/photos', {
      params,
    });
  },
  searchCollections(params?: BasicSearchParams) {
    return API.get(`/search/collections`, {
      params,
    });
  },
  searchUsers(params?: BasicSearchParams) {
    return API.get(`/search/users`);
  },
};

export default SearchService;
