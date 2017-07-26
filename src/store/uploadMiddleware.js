import * as ActionTypes from '../actions/ActionTypes';
import RNFS from 'react-native-fs';
import config from '../config';
import getScanSession from '../selectors/getScanSession';
import { groupCollapsed, groupEnd } from '../utils/logging';

export default store => next => async action => {
  next(action);

  if (action.type === ActionTypes.SESSION.UPLOAD.START) {
    const session = getScanSession(store.getState(), { sessionId: action.sessionId });

    store.dispatch({
      type: ActionTypes.SESSION.UPLOAD.LOADING,
      sessionId: action.sessionId
    });

    const results = await Promise.all(
      session.documents
        .filter(doc => doc.uploaded !== true)
        .map(doc => uploadFile(store.dispatch, doc))
    );

    store.dispatch({
      type: results.includes(false) ? ActionTypes.SESSION.UPLOAD.ERROR : ActionTypes.SESSION.UPLOAD.LOADED,
      sessionId: action.sessionId
    });
  }
};

const uploadFile = async (dispatch, document) => {
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
        email: 'test@examoke.com',
        naId: '1742009',
        recordGroup: '469',
        entry: 'UD409',
        stack: '250',
        row: '075',
        compartment: '035',
        shelf: '02-07',
        box: '1-127',
        containerId: '14',
        title: '...',
      })
    });

    await checkStatus(response);

    dispatch({
      type: ActionTypes.DOCUMENT.UPLOADED,
      id: document.id
    });

    return true;

  } catch (ex) {

    console.warn(`Failed to upload ${ex.description}`);

    return false;
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
