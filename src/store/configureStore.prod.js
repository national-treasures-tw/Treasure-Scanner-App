import { createStore, compose, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk';

import getRootReducer from '../reducers/getRootReducer';
import deleteImageMiddleware from './deleteImageMiddleware';
import uploadMiddleware from './uploadMiddleware';

const configureStore = (AppNavigator) => {
  return createStore(
    // inject AppNavigator so we can create navigation reducer dynamically
    getRootReducer(AppNavigator),
    compose(
      applyMiddleware(
        deleteImageMiddleware, uploadMiddleware,
        thunk.withExtraArgument({ }),
      ),
      autoRehydrate()
    )
  );
};

export default configureStore;
