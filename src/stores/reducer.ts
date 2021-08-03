import {combineReducers} from 'redux';
import {topicsReducer} from './slices/topicsSlice';
import {photosReducer} from './slices/photosSlice';
import {collectionsReducer} from './slices/collectionsSlice';

const rootReducer = combineReducers({
  topics: topicsReducer,
  photos: photosReducer,
  collections: collectionsReducer,
});

export default rootReducer;
