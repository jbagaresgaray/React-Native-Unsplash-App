import { combineReducers } from 'redux';
import { topicsReducer } from './slices/topicsSlice';
import { photosReducer } from './slices/photosSlice';
import { collectionsReducer } from './slices/collectionsSlice';
import { usersReducer } from './slices/usersSlice';
import { searchReducer } from './slices/searchReducer';

const rootReducer = combineReducers({
  topics: topicsReducer,
  photos: photosReducer,
  collections: collectionsReducer,
  users: usersReducer,
  search: searchReducer,
});

export default rootReducer;
