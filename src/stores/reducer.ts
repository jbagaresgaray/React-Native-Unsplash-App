import { combineReducers } from 'redux';
import { topicsReducer } from './slices/topics';
import { photosReducer } from './slices/photos';
import { collectionsReducer } from './slices/collections';
import { usersReducer } from './slices/users';
import { searchReducer } from './slices/search';

const rootReducer = combineReducers({
  topics: topicsReducer,
  photos: photosReducer,
  collections: collectionsReducer,
  users: usersReducer,
  search: searchReducer,
});

export default rootReducer;
