import {
  DOCUMENT,
  SELECT_LOCATION,
  RECEIVE_RECORD,
  USER_SIGNIN,
  USER_SIGNOUT,
  COMPLETE_TASK,
  RECEIVE_USER_DETAILS } from '../actions/ActionTypes';


// complete task
export function completeTask() {
  return {
    type: DOCUMENT.COMPLETE
  }
}

// receiveUserDetails
export function receiveUserDetails(details) {
  return {
    type: RECEIVE_USER_DETAILS,
    details
  }
}

// Signin in
export function signIn(token) {
  return {
    type: USER_SIGNIN,
    token,
  }
}

// Signin out
export function signOut() {
  return {
    type: USER_SIGNOUT
  }
}

// Selecting location
export function selectLocation(location) {
  return {
    type: SELECT_LOCATION,
    location,
  }
}

// receiving a record dispatch
export function receiveRecord(record) {
  return {
    type: RECEIVE_RECORD,
    record,
  }
}

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
