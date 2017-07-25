import { createStore, compose, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk';

import getRootReducer from '../reducers/getRootReducer';

const configureStore = (AppNavigator) => {
  return createStore(
    // inject AppNavigator so we can create navigation reducer dynamically
    getRootReducer(AppNavigator),
    compose(
      applyMiddleware(
        thunk.withExtraArgument({ }),
      ),
      autoRehydrate()
    )
  );
};

export default configureStore;
