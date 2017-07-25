import { SESSION, DOCUMENT } from '../actions/ActionTypes';

export function addScanSession(documents) {
  return {
    type: SESSION.ADD_SESSION,
    documents
  }
}

export function deleteDocument(id) {
  return {
    type: DOCUMENT.DELETE,
    id
  }
}

export function cropDocument(id, image, polygon) {
  return {
    type: DOCUMENT.CROP,
    id,
    image,
    polygon
  }
}

export function rotateDocument(id) {
  return {
    type: DOCUMENT.ROTATE,
    id
  }
}