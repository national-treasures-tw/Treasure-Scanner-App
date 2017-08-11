import { combineReducers } from 'redux';

import documentsReducer from './documentsReducer';
import getNavReducer from './getNavReducer';

const getRootReducer = AppNavigator => {
  return combineReducers({
    // create navigation reducer dynamically based on AppNavigator
    // nav: getNavReducer(AppNavigator),
    documents: documentsReducer,
  })
};

export default getRootReducer;
