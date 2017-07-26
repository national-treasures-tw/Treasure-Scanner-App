import { SESSION, DOCUMENT } from '../actions/ActionTypes';

// Scanning

export function addScanSession(documents) {
  return {
    type: SESSION.ADD_SESSION,
    documents,
  }
}

export function deleteDocument(id) {
  return {
    type: DOCUMENT.DELETE,
    id,
  }
}

export function cropDocument(id, image, polygon) {
  return {
    type: DOCUMENT.CROP,
    id,
    image,
    polygon,
  }
}

export function rotateDocument(id, image) {
  return {
    type: DOCUMENT.ROTATE,
    id,
    image,
  }
}

// Uploading

export function startSessionUpload(sessionId) {
  return {
    type: SESSION.UPLOAD.START,
    sessionId,
  }
}

export function documentUploadStart(sessionId) {
  return {
    type: SESSION.UPLOAD.START,
    sessionId,
  }
}
