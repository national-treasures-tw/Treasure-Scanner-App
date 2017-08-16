import { combineReducers } from 'redux';

import documentsReducer from './documentsReducer';
import getUserReducer from './getUserReducer';

const getRootReducer = AppNavigator => {
  return combineReducers({
    user: getUserReducer,
    documents: documentsReducer,
  })
};

export default getRootReducer;
