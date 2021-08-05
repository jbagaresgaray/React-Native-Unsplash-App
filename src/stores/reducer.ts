import { combineReducers } from 'redux';
import { topicsReducer } from './slices/topicsSlice';
import { photosReducer } from './slices/photosSlice';
import { collectionsReducer } from './slices/collectionsSlice';
import { usersReducer } from './slices/usersReducer';

const rootReducer = combineReducers({
  topics: topicsReducer,
  photos: photosReducer,
  collections: collectionsReducer,
  users: usersReducer,
});

export default rootReducer;
