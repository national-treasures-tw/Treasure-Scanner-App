import * as ActionTypes from '../actions/ActionTypes';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_LOCATION:
      return { ...state, location: action.location };

    default:
      return state;
  }
};

export default userReducer;
