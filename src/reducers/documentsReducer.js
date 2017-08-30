import * as ActionTypes from '../actions/ActionTypes';
import { STATUS } from '../utils/consts';

export const DOC_PREFIX = 'doc-';

const documentsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.DOCUMENT.ADD:
      const id = DOC_PREFIX + Object.keys(state).length;
      return {
        ...state,
        [id]: {
          ...action.document,
          status: STATUS.UNDEFINED,
          timestamp: Math.round(new Date().getTime() / 1000),
          id: id,
          rotation: 0,
          deleted: false,
        }
      };

    case ActionTypes.DOCUMENT.UPLOAD.LOADING:
    case ActionTypes.DOCUMENT.UPLOAD.LOADED:
    case ActionTypes.DOCUMENT.UPLOAD.ERROR:
    case ActionTypes.DOCUMENT.ARCHIVE:
    case ActionTypes.DOCUMENT.DELETE:
    case ActionTypes.DOCUMENT.CROP:
    case ActionTypes.DOCUMENT.ROTATE:
      return {
        ...state,
        [action.id]: documentReducer(state[action.id], action)
      };

    case ActionTypes.DOCUMENT.COMPLETE:
      return {};

    case ActionTypes.USER_SIGNOUT:
      return {};

    default:
      return state;
  }
};

const documentReducer = (document = {}, action) => {
  switch (action.type) {
    // Uploads
    case ActionTypes.DOCUMENT.UPLOAD.LOADING:
      return {
        ...document,
        status: STATUS.LOADING
      };
    case ActionTypes.DOCUMENT.UPLOAD.LOADED:
      return {
        ...document,
        status: STATUS.LOADED
      };
    case ActionTypes.DOCUMENT.UPLOAD.ERROR:
      return {
        ...document,
        status: STATUS.ERROR
      };

    // Manipulations
    case ActionTypes.DOCUMENT.ARCHIVE:
      return {
        ...document,
        archived: true,
      };
    case ActionTypes.DOCUMENT.DELETE:
      return {
        ...document,
        deleted: true,
      };
    case ActionTypes.DOCUMENT.CROP:
      return {
        ...document,
        polygon: action.polygon,
        image: action.image,
      };
    case ActionTypes.DOCUMENT.ROTATE:
      return {
        ...document,
        image: action.image,
        rotation: document.rotation + 90,
      };
    default:
      return document;
  }
};

export default documentsReducer;
