import axios from 'axios';
import Config from 'react-native-config';

import Storage from '../../utils/storage';

const API = axios.create({
  baseURL: Config.REACT_API_URL || 'https://api.unsplash.com/',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      // `Client-ID ${Config.REACT_UNSPLASH_ACCESS_KEY}` ||
      `Client-ID nllcFdEQkChHOLqrK9iw4AxrC8Hv-N7L8_ada60RgsU`,
    'X-Ratelimit-Limit': 1000,
    'X-Ratelimit-Remaining': 999,
  },
  transformResponse: data => {
    try {
      return JSON.parse(data);
    } catch (error) {
      throw Error(
        `[requestClient] Error parsing response JSON data - ${JSON.stringify(
          error,
        )}`,
      );
    }
  },
});

API.interceptors.request.use(
  async config => {
    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Client-ID nllcFdEQkChHOLqrK9iw4AxrC8Hv-N7L8_ada60RgsU`,
      // Authorization: `Client-ID ${Config.REACT_UNSPLASH_ACCESS_KEY}`,
      'X-Ratelimit-Limit': 1000,
      'X-Ratelimit-Remaining': 999,
    };
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

API.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    return Promise.reject(error);
  },
);

export default API;
