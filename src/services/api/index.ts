import axios from 'axios';
import Config from 'react-native-config';

import Storage from '../../utils/storage';

const API = axios.create({
  baseURL: Config.REACT_API_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
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
      'X-Ratelimit-Limit': 1000,
      'X-Ratelimit-Remaining': 999,
    };
    console.log('request', config);
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

API.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  async function (error) {
    console.log(error?.response);
    const originalRequest = error.config;
    return Promise.reject(error);
  },
);

export default API;
