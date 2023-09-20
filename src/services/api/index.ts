import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from 'react-native-config';

import Storage from '../../utils/storage';

const baseURL = Config.REACT_API_URL || 'https://api.unsplash.com';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  // Authorization: `Client-ID ${Config.REACT_UNSPLASH_ACCESS_KEY}`,
  Authorization: `Client-ID nllcFdEQkChHOLqrK9iw4AxrC8Hv-N7L8_ada60RgsU`,
  'X-Ratelimit-Limit': 1000,
  'X-Ratelimit-Remaining': 999,
};

console.log('baseURL: ', baseURL);

const API = axios.create({
  baseURL,
  timeout: 30000,
  headers,
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
  async (config: AxiosRequestConfig) => {
    config.headers = headers;
    return config;
  },
  (error: any) => {
    console.log('request error: ', error);
    Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    console.log('response error: ', error);
    const originalRequest = error.config;
    return Promise.reject(error);
  },
);

export default API;
