import { DOCUMENT } from '../actions/ActionTypes';

// Scanning

export function addDocument(document) {
  return {
    type: DOCUMENT.ADD,
    document,
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

export function uploadDocument(id) {
  return {
    type: DOCUMENT.UPLOAD.UPLOAD,
    id,
  }
}

export function uploadPendingDocuments() {
  return { type: DOCUMENT.UPLOAD.UPLOAD_PENDING }
}