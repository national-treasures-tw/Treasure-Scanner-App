import * as ActionTypes from '../actions/ActionTypes';
import RNFS from 'react-native-fs';
import config from '../config';
import getScannedDocuments from '../selectors/getScannedDocuments';
import { groupCollapsed, groupEnd } from '../utils/logging';
import Status from '../utils/consts';

export default store => next => async action => {
  next(action);

  switch (action.type) {
    case ActionTypes.DOCUMENT.ADD:
      // al but first N
      uploadingPendingDocuments(store, config.autoUploadAllButLastN);
      break;

    case ActionTypes.DOCUMENT.UPLOAD.UPLOAD_PENDING:
      // all
      uploadingPendingDocuments(store, 0);
      break;

    case ActionTypes.DOCUMENT.UPLOAD.UPLOAD:
      const state = store.getState();
      await uploadFile(store.dispatch, state.documents[action.id], state);
      break;
    default:
  }
};

const uploadingPendingDocuments = (store, excludeLastN) => {
  const documents = getScannedDocuments(store.getState());
  const state = store.getState();
  documents
    // skip first N
    .slice(excludeLastN)
    // Don't re-upload Loaded or Loading ones
    .filter(doc => doc.status === Status.UNDEFINED || doc.status === Status.ERROR)
    // Upload!
    .forEach(doc => uploadFile(store.dispatch, doc, state));
};
/*
* state = {
  user: { location }
  record: { RG... }
}
*
*/
const uploadFile = async (dispatch, document, state) => {

  dispatch({
    type: ActionTypes.DOCUMENT.UPLOAD.LOADING,
    id: document.id,
  });

  const { location, details, record } = state.user;
  const {
    dispatchId,
    catalogId,
    RGNumber,
    stackArea,
    rowNumber,
    compartment,
    shelfNumber,
    NAID,
    EN,
    Title,
    boxRangeString,
    recordIdText
  } = record || {};

  try {
    const base64Image = await RNFS.readFile(document.image, 'base64');
    const response = await fetch(config.bucket, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: `data:image/jpeg;base64,${base64Image}`,
        isNotDocument: document.isNotDocument,
        timestamp: document.timestamp,

        // @Hsin please add the right meta data here
        dispatchId,
        userId: details.info.userId,
        docId: NAID || 'some-id-from-UN',
        location: location,
        metadata: {
          recordGroup: RGNumber,
          entry: EN,
          stack: stackArea,
          row: rowNumber,
          compartment: compartment,
          shelf: shelfNumber,
          box: boxRangeString,
          containerId: boxRangeString,
          title: Title
        }
      })
    });

    await checkStatus(response);
    dispatch({
      type: ActionTypes.DOCUMENT.UPLOAD.LOADED,
      id: document.id
    });

  } catch (ex) {
    console.log('Upload failed', ex);
    dispatch({
      type: ActionTypes.DOCUMENT.UPLOAD.ERROR,
      id: document.id
    });
  }
};

// https://github.com/github/fetch#handling-http-error-statuses
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    groupCollapsed(`%cGot response ${response.status}`, 'color: #ccc; font-style: italic;');
    console.log(response);
    groupEnd();

    return;
  }

  const error = new Error(`Got response ${response.status} ${response.statusText}`);
  error.response = response;
  throw error;
}
