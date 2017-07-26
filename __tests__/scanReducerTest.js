import deepFreeze from 'deep-freeze';

import documentsReducer, {
  DOC_PREFIX,
} from '../src/reducers/documentsReducer';

import {
  cropDocument,
  deleteDocument,
  rotateDocument,
  addDocument
} from '../src/actions/actions';

import sampleScanData from '../__test_data__/sampleScanData';
import { STATUS } from '../src/utils/consts';

describe('Test sessions reducer with dummy data', () => {
  it('Should have an initial state', () => {
    const state = documentsReducer(undefined, {});
    expect(state).toBeDefined();
  });

  it('Should ignore unknown actions', () => {
    const state = documentsReducer(undefined, {type: 'UNKNOWN'});
    expect(state).toBeDefined();
  });

  it('Should add new document', () => {
    let newState = documentsReducer(undefined, addDocument(sampleScanData[0]));

    deepFreeze(newState);
    newState = documentsReducer(newState, addDocument(sampleScanData[1]));

    expect(Object.keys(newState)).toEqual([
      DOC_PREFIX + 0,
      DOC_PREFIX + 1,
    ]);

    expect(newState[DOC_PREFIX + 1]).toEqual({
      id: DOC_PREFIX + 1,
      polygon: null,
      image: 'path/to/file/1',
      originalImage: 'path/to/file/1',
      deleted: false,
      rotation: 0,
      status: STATUS.UNDEFINED,
      timestamp: Math.round(new Date().getTime() / 1000),
    });
  });
});

describe('Test main reducer with  data', () => {

  let state;
  beforeEach(() => {
    state = documentsReducer(state, addDocument(sampleScanData[0]));
    state = documentsReducer(state, addDocument(sampleScanData[1]));
    state = documentsReducer(state, addDocument(sampleScanData[2]));
    state = documentsReducer(state, addDocument(sampleScanData[3]));
  });

  it('Documents should be valid', () => {
    Object.values(state).map(doc => {
      expect(doc.id).toBeDefined();
      expect(doc.polygon).toBeDefined();
      expect(doc.image).toBeDefined();
      expect(doc.image.length).toBeGreaterThan(4);
      expect(doc.originalImage).toBeDefined();
      expect(doc.originalImage.length).toBeGreaterThan(4);
    })
  });

  it('Document should be deleted', () => {
    const doc = Object.values(state)[0];
    deepFreeze(state);
    let newState = documentsReducer(state, deleteDocument(doc.id));

    // doc 1 and 2 should not have been changed
    expect(state[DOC_PREFIX + 1]).toBe(newState[DOC_PREFIX + 1]);
    expect(state[DOC_PREFIX + 2]).toBe(newState[DOC_PREFIX + 2]);

    // doc 0 should be deleted
    expect(newState[DOC_PREFIX + 0].deleted).toBe(true);
  });

  it('Document should be cropped', () => {
    const doc = Object.values(state)[1];
    deepFreeze(state);
    let newState = documentsReducer(state, cropDocument(doc.id, 'newImage', [1, 2, 3, 4]));

    // doc 2 and 3 should not have been changed
    expect(state[DOC_PREFIX + 2]).toBe(newState[DOC_PREFIX + 2]);
    expect(state[DOC_PREFIX + 3]).toBe(newState[DOC_PREFIX + 3]);

    // doc 1 should be changed
    expect(newState[DOC_PREFIX + 1].image).toBe('newImage');
    expect(newState[DOC_PREFIX + 1].polygon).toEqual([1, 2, 3, 4]);
    expect(newState[DOC_PREFIX + 1].originalImage).toBe(doc.originalImage);
  });

  it('Document should be rotated', () => {
    const doc = Object.values(state)[2];
    deepFreeze(state);
    let newState = documentsReducer(state, rotateDocument(doc.id));

    // doc 0 and 1 should not have been changed
    expect(state[DOC_PREFIX + 0]).toBe(newState[DOC_PREFIX + 0]);
    expect(state[DOC_PREFIX + 1]).toBe(newState[DOC_PREFIX + 1]);

    // doc 2 should be rotated
    expect(newState[DOC_PREFIX + 2].rotation).toBe(90);
  });
});

