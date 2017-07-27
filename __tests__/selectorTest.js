import { DOC_PREFIX } from '../src/reducers/documentsReducer';
import getRootReducer from '../src/reducers/getRootReducer';

const MockAppNavigator =  {
  router: {
    getActionForPathAndParams: str => ({}),
    getStateForAction: () => ({}),
  }
};
const rootReducer = getRootReducer(MockAppNavigator);

import {
  cropDocument,
  deleteDocument,
  rotateDocument,
  addDocument
} from '../src/actions/actions';

import sampleScanData from '../__test_data__/sampleScanData';

import getScannedDocuments from '../src/selectors/getScannedDocuments';

describe('Test selectors', () => {

  let state;
  beforeEach(() => {
    state = rootReducer(undefined, addDocument(sampleScanData[0]));
    state = rootReducer(state, addDocument(sampleScanData[1]));
    state = rootReducer(state, addDocument(sampleScanData[2]));
    state = rootReducer(state, addDocument(sampleScanData[3]));
  });

  it('should only recompute if state changes', () => {
    getScannedDocuments.resetRecomputations();
    expect(getScannedDocuments.recomputations()).toEqual(0);

    let documents1 = getScannedDocuments(state);
    expect(getScannedDocuments.recomputations()).toEqual(1);

    let documents2 = getScannedDocuments(state);
    expect(getScannedDocuments.recomputations()).toEqual(1);
    expect(documents1).toBe(documents2);

    state = rootReducer(state, rotateDocument(DOC_PREFIX + 2));
    documents2 = getScannedDocuments(state);
    expect(getScannedDocuments.recomputations()).toEqual(2);
    expect(documents1).not.toBe(documents2);

    documents1 = getScannedDocuments(state);
    expect(getScannedDocuments.recomputations()).toEqual(2);
    expect(documents1).toBe(documents2);

    state = rootReducer(state, cropDocument(DOC_PREFIX + 3, 'newImage', [1, 2, 3, 4]));
    documents2 = getScannedDocuments(state);
    expect(getScannedDocuments.recomputations()).toEqual(3);
    expect(documents1).not.toBe(documents2);

    documents1 = getScannedDocuments(state);
    expect(getScannedDocuments.recomputations()).toEqual(3);
    expect(documents1).toBe(documents2);
  });

  it('should not return deleted documents', () => {
    // pre check
    let documents = getScannedDocuments(state);
    expect(documents.length).toEqual(4);

    // delete one document
    let newState = rootReducer(state, deleteDocument(DOC_PREFIX + 2));

    // after check
    documents = getScannedDocuments(newState);
    expect(documents.length).toEqual(3);
  });
});

