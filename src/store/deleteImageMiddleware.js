import * as ActionTypes from '../actions/ActionTypes';
import RNFS from 'react-native-fs';
import getScannedDocuments from '../selectors/getScannedDocuments';
import Status from '../utils/consts';

const deleteImageMiddleware = store => next => action => {
  next(action);

  if (action.type === ActionTypes.DOCUMENT.DELETE) {
    const state = store.getState();
    const document = state.documents[action.id];

    // Delete images and ignore exceptions while deleting
    RNFS.unlink(document.image).catch(() => {});
    RNFS.unlink(document.originalImage).catch(() => {});

  } else if (action.type === ActionTypes.DOCUMENT.UPLOAD.LOADED) {

    // Archive everything ...
    const documents = getScannedDocuments(store.getState());
    documents
      // ... except last 20 documents
      .slice(20)
      // ... and only those which are loaded
      .filter(doc => doc.status === Status.LOADED)
      .forEach(doc => {
        store.dispatch({
          type: ActionTypes.DOCUMENT.ARCHIVE,
          id: doc.id,
        });

        // Delete images and ignore exceptions while deleting
        RNFS.unlink(doc.image).catch(() => {});
        RNFS.unlink(doc.originalImage).catch(() => {});
      });
  }
};

export default deleteImageMiddleware;
