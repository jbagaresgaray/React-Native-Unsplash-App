import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ISearchCollections, ISearchUsers } from '../../models/generic';
import SearchService, { BasicSearchParams } from '../../services/api/search';

export const searchUsersQry = createAsyncThunk<ISearchUsers, BasicSearchParams>(
  'search/searchUsers',
  async ({ query, page, per_page }) => {
    const response: AxiosResponse = await SearchService.searchUsers({
      query,
      page,
      per_page,
    });
    return response.data;
  },
);

export const searchCollectionsQry = createAsyncThunk<
  ISearchCollections,
  BasicSearchParams
>('search/searchCollections', async ({ query, page, per_page }) => {
  const response: AxiosResponse = await SearchService.searchCollections({
    query,
    page,
    per_page,
  });
  return response.data;
});
