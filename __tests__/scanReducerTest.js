import deepFreeze from 'deep-freeze';

import scansReducer, {
  DOC_PREFIX,
  SESSION_PREFIX
} from '../src/reducers/scansReducer';

import {
  cropDocument,
  deleteDocument,
  rotateDocument,
  addScanSession
} from '../src/actions/actions';

import sampleScanData from '../__test_data__/sampleScanData';
import sampleMockScanData from '../__test_data__/sampleMockScanData';
import { STATUS } from '../src/utils/consts';

describe('Test sessions reducer with dummy data', () => {
  it('Should have an initial state', () => {
    const state = scansReducer(undefined, {});
    expect(state.sessions).toBeDefined();
    expect(state.documents).toBeDefined();
  });

  it('Should ignore unknown actions', () => {
    const state = scansReducer(undefined, {type: 'UNKNOWN'});
    expect(state.sessions).toBeDefined();
    expect(state.documents).toBeDefined();
  });

  it('Should add newly sessionned documents', () => {
    const sessionAction = addScanSession(sampleMockScanData);

    let newState = scansReducer(undefined, sessionAction);

    deepFreeze(newState);
    newState = scansReducer(newState, sessionAction);

    expect(Object.keys(newState.sessions)).toEqual([
      SESSION_PREFIX + 0,
      SESSION_PREFIX + 1,
    ]);

    expect(newState.sessions[SESSION_PREFIX + 1]).toEqual({
      "id": SESSION_PREFIX + 1,
      "status": STATUS.UNDEFINED,
      "documents": ["doc-2", "doc-3"],
      "timestamp": Math.round(new Date().getTime() / 1000),
    });

    expect(Object.keys(newState.documents)).toEqual([
      DOC_PREFIX + 0,
      DOC_PREFIX + 1,
      DOC_PREFIX + 2,
      DOC_PREFIX + 3,
    ]);

    expect(newState.documents[DOC_PREFIX + 3]).toEqual({
      id: DOC_PREFIX + 3,
      polygon: [],
      image: 'img3',
      originalImage: 'img4',
      deleted: false,
      rotation: 0,
    });
  });
});

describe('Test main reducer with real session data', () => {

  let state;
  beforeEach(() => {
    const sessionAction = addScanSession(sampleScanData);
    state = scansReducer(undefined, sessionAction);
  });

  it('Documents should be valid', () => {
    Object.values(state.documents).map(doc => {
      expect(doc.id).toBeDefined();
      expect(doc.polygon).toBeDefined();
      expect(doc.image).toBeDefined();
      expect(doc.image.length).toBeGreaterThan(100);
      expect(doc.originalImage).toBeDefined();
      expect(doc.originalImage.length).toBeGreaterThan(100);
    })
  });

  it('Document should be deleted', () => {
    const doc = Object.values(state.documents)[0];
    deepFreeze(state);
    let newState = scansReducer(state, deleteDocument(doc.id));

    // doc 1 and 2 should not have been changed
    expect(state.documents[DOC_PREFIX + 1]).toBe(newState.documents[DOC_PREFIX + 1]);
    expect(state.documents[DOC_PREFIX + 2]).toBe(newState.documents[DOC_PREFIX + 2]);

    // doc 0 should be deleted
    expect(newState.documents[DOC_PREFIX + 0].deleted).toBe(true);
  });

  it('Document should be cropped', () => {
    const doc = Object.values(state.documents)[1];
    deepFreeze(state);
    let newState = scansReducer(state, cropDocument(doc.id, 'newImage', [1, 2, 3, 4]));

    // doc 2 and 3 should not have been changed
    expect(state.documents[DOC_PREFIX + 2]).toBe(newState.documents[DOC_PREFIX + 2]);
    expect(state.documents[DOC_PREFIX + 3]).toBe(newState.documents[DOC_PREFIX + 3]);

    // doc 1 should be changed
    expect(newState.documents[DOC_PREFIX + 1].image).toBe('newImage');
    expect(newState.documents[DOC_PREFIX + 1].polygon).toEqual([1, 2, 3, 4]);
    expect(newState.documents[DOC_PREFIX + 1].originalImage).toBe(doc.originalImage);
  });

  it('Document should be rotated', () => {
    const doc = Object.values(state.documents)[2];
    deepFreeze(state);
    let newState = scansReducer(state, rotateDocument(doc.id));

    // doc 0 and 1 should not have been changed
    expect(state.documents[DOC_PREFIX + 0]).toBe(newState.documents[DOC_PREFIX + 0]);
    expect(state.documents[DOC_PREFIX + 1]).toBe(newState.documents[DOC_PREFIX + 1]);

    // doc 2 should be rotated
    expect(newState.documents[DOC_PREFIX + 2].rotation).toBe(90);
  });
});

