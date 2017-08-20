import * as ActionTypes from '../actions/ActionTypes';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_LOCATION:
      return { ...state, location: action.location };

    case ActionTypes.RECEIVE_RECORD:
      return { ...state, record: action.record };

    case ActionTypes.USER_SIGNIN:
      return { ...state, token: action.token };

    case ActionTypes.USER_SIGNOUT:
      return { ...state, token: null, details: null, record: null, location: null };

    case ActionTypes.RECEIVE_USER_DETAILS:
      return { ...state, details: action.details };

    case ActionTypes.DOCUMENT.COMPLETE:
      return { ...state, record: null, location: null };

    default:
      return state;
  }
};

export default userReducer;
