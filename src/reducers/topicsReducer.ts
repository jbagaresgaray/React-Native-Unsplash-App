import {combineReducers} from 'redux';

const INITIAL_STATE = {
  current: [],
  possible: ['Alice', 'Bob', 'Sammy'],
};

const topicsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  topics: topicsReducer,
});
