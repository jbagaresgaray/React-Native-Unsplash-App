import API from '.';
import {ORIENTATION_TYPES} from '../../constants';

export interface UserPhotosParams {
  page?: number;
  per_page?: number;
  order_by?: 'latest' | 'oldest' | 'popular' | 'views' | 'downloads';
  collections?: string;
  content_filter?: 'low' | 'high';
  stats?: boolean;
  resolution?: 'days' | string;
  quantity?: number;
  orientation?: ORIENTATION_TYPES;
}

export interface UserLikedPhotosParams {
  page?: number;
  per_page?: number;
  orientation?: ORIENTATION_TYPES;
  order_by?: 'latest' | 'oldest' | 'popular';
}

export interface UserCollectionsParams {
    page?: number;
    per_page?: number;
  }

const UsersService = {
  getUserPublicProfile(username: string) {
    return API.get(`/users/${username}`);
  },
  getUserPortfolio(username: string) {
    return API.get(`/users/${username}/portfolio`);
  },
  getUserPhotos(username: string, params?: UserPhotosParams) {
    return API.get(`/users/${username}/photos`, {
      params,
    });
  },
  getUserLikedPhotos(username: string, params?: UserLikedPhotosParams) {
    return API.get(`/users/${username}/likes`, {
      params,
    });
  },
  getUserCollections(username: string, params?: UserCollectionsParams) {
    return API.get(`/users/${username}/collections`, {
      params,
    });
  },
};

export default UsersService;
