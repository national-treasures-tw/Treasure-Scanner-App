import { createSelector } from 'reselect';

const getAllSessions = state => state.scans.sessions;
const getAllDocuments = state => state.scans.documents;
const getScanId = (state, props) => props.sessionId;

const getScanSession = createSelector(
  [getAllSessions, getAllDocuments, getScanId],
  (sessions, documents, id) => {
    if(!id) {
      return {
        documents: [],
      }
    }

    return {
      ...sessions[id],
      documents: sessions[id].documents
        .map(id => documents[id])
        .filter(doc => doc !== undefined && !doc.deleted)
    }
  }
);

export default getScanSession;
