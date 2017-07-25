import { DOC_PREFIX } from '../src/reducers/scansReducer';
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
  addScanSession
} from '../src/actions/actions';

import sampleScanData from '../__test_data__/sampleScanData';

import getScanSessions from '../src/selectors/getScanSessions';

describe('Test selectors', () => {

  let state;
  beforeEach(() => {
    const scanAction = addScanSession(sampleScanData);
    state = rootReducer(undefined, scanAction);
  });

  it('should only recompute if state changes', () => {
    getScanSessions.resetRecomputations();
    expect(getScanSessions.recomputations()).toEqual(0);

    let sessions1 = getScanSessions(state);
    expect(getScanSessions.recomputations()).toEqual(1);

    let sessions2 = getScanSessions(state);
    expect(getScanSessions.recomputations()).toEqual(1);
    expect(sessions1).toBe(sessions2);

    state = rootReducer(state, rotateDocument(DOC_PREFIX + 2));
    sessions2 = getScanSessions(state);
    expect(getScanSessions.recomputations()).toEqual(2);
    expect(sessions1).not.toBe(sessions2);

    sessions1 = getScanSessions(state);
    expect(getScanSessions.recomputations()).toEqual(2);
    expect(sessions1).toBe(sessions2);

    state = rootReducer(state, cropDocument(DOC_PREFIX + 3, 'newImage', [1, 2, 3, 4]));
    sessions2 = getScanSessions(state);
    expect(getScanSessions.recomputations()).toEqual(3);
    expect(sessions1).not.toBe(sessions2);

    sessions1 = getScanSessions(state);
    expect(getScanSessions.recomputations()).toEqual(3);
    expect(sessions1).toBe(sessions2);
  });

  it('should not return deleted documents', () => {
    // pre check
    let scans = getScanSessions(state);
    expect(scans[0].documents.length).toEqual(4);

    // delete one document
    let newState = rootReducer(state, deleteDocument(DOC_PREFIX + 2));

    // after check
    scans = getScanSessions(newState);
    expect(scans[0].documents.length).toEqual(3);
  });
});

