import * as ActionTypes from '../actions/ActionTypes';
import RNFS from 'react-native-fs';

const deleteImageMiddleware = store => next => action => {
  if (action.type === ActionTypes.DOCUMENT.DELETE) {
    const state = store.getState();
    const document = state.scans.documents[action.id];

    // Delete images and ignore exceptions while deleting
    RNFS.unlink(document.image).catch(() => {});
    RNFS.unlink(document.originalImage).catch(() => {});
  }

  next(action);
};

export default deleteImageMiddleware;
