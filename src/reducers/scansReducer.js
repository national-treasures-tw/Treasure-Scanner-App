import * as ActionTypes from '../actions/ActionTypes';
import { STATUS } from '../utils/consts';

export const initialState = {
  sessions: {},
  documents: {},
};

export const SESSION_PREFIX = 'session-';
export const DOC_PREFIX = 'doc-';

const scansReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.SESSION.ADD_SESSION:

      const docCount = Object.keys(state.documents).length;
      let documents = action.documents
        // add some props to each document
        .map((document, index) => ({
          ...document,
          id: DOC_PREFIX + (docCount + index),
          rotation: 0,
          deleted: false,
        }));

      // create new sessions object
      const sessionId = SESSION_PREFIX + Object.keys(state.sessions).length;
      return {
        ...state,
        sessions: {
          // all existing sessions
          ...state.sessions,
          // and our new one
          [sessionId]: {
            id: sessionId,
            status: STATUS.UNDEFINED,
            timestamp: Math.round(new Date().getTime() / 1000),
            documents: documents.map(doc => doc.id),
          }
        },
        documents: {
          // all existing documents
          ...state.documents,
          // and our new ones
          ...documents.reduce((res, doc) => ({ ...res, [doc.id]: doc }), {})
        }
      };

    case ActionTypes.DOCUMENT.DELETE:
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.id] : {
            ...state.documents[action.id],
            deleted: true,
          }
        }
      };

    case ActionTypes.DOCUMENT.CROP:
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.id] : {
            ...state.documents[action.id],
            polygon: action.polygon,
            image: action.image,
          }
        }
      };

    case ActionTypes.DOCUMENT.ROTATE:
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.id] : {
            ...state.documents[action.id],
            rotation: state.documents[action.id].rotation + 90,
          }
        }
      };

    default:
      return state;
  }
};

export default scansReducer;

