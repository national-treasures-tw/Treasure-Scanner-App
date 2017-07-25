import { combineReducers } from 'redux';

import scansReducer from './scansReducer';
import getNavReducer from './getNavReducer';

const getRootReducer = AppNavigator => {
  return combineReducers({
    // create navigation reducer dynamically based on AppNavigator
    nav: getNavReducer(AppNavigator),
    scans: scansReducer,
  })
};

export default getRootReducer;
